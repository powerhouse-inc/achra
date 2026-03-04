import {
  RsBillingCycle,
  type RsDiscountRule,
  RsDiscountType,
  RsGroupCostType,
  type RsOfferingOptionGroup,
  type RsRecurringPriceOption,
  RsServiceLevel,
  type RsServiceSubscriptionTier,
} from '@/modules/__generated__/graphql/switchboard-generated'
import type { FeatureValue } from '../types'

const INCLUDED_LEVELS = new Set([
  RsServiceLevel.Included,
  RsServiceLevel.Custom,
  RsServiceLevel.Optional,
  RsServiceLevel.Variable,
])

/** Safe coercion — Amount_Money scalar is typed `any` in codegen */
function toNum(raw: unknown): number {
  if (raw === null || raw === undefined) return 0
  const n = Number(raw)
  return Number.isNaN(n) ? 0 : n
}

function getCurrencySymbol(currency?: string | null): string {
  return currency === 'USD' || !currency ? '$' : currency
}

const CUSTOM_PRICING_LABEL = 'Custom'

/** Formats a price value as a dollar string (e.g. "$200") */
export function formatPrice(amount: number, currency?: string | null): string {
  return `${getCurrencySymbol(currency)}${amount.toLocaleString()}`
}

/**
 * Returns the number of months in a billing cycle.
 * Used to compute period totals for discount calculations.
 */
export function getMonths(cycle: RsBillingCycle): number {
  switch (cycle) {
    case RsBillingCycle.Quarterly:
      return 3
    case RsBillingCycle.SemiAnnual:
      return 6
    case RsBillingCycle.Annual:
      return 12
    case RsBillingCycle.Monthly:
      return 1
    case RsBillingCycle.OneTime:
      return 1
    default:
      throw new Error(`Unhandled billing cycle: ${String(cycle)}`)
  }
}

/**
 * Computes the monthly-equivalent price after applying an inline discount rule.
 *
 * - PERCENTAGE:  netTotal = grossTotal × (1 − value/100)
 * - FLAT_AMOUNT: netTotal = grossTotal − value
 *
 * Always returns the monthly equivalent so all prices are comparable across plans.
 */
export function computeMonthlyEquivalent(
  baseMonthlyPrice: number,
  cycle: RsBillingCycle,
  rule: { discountType: RsDiscountType; discountValue: number },
): number {
  const months = getMonths(cycle)
  const grossTotal = baseMonthlyPrice * months
  const netTotal =
    rule.discountType === RsDiscountType.Percentage
      ? grossTotal * (1 - rule.discountValue / 100)
      : Math.max(0, grossTotal - rule.discountValue)
  return netTotal / months
}

/**
 * Checks whether a tier has at least one service with an "included" level
 */
function tierHasGroupServices(
  tier: RsServiceSubscriptionTier,
  group: RsOfferingOptionGroup,
): boolean {
  return tier.serviceLevels.some(
    (sl) => sl.optionGroupId === group.id && INCLUDED_LEVELS.has(sl.level),
  )
}

function computeTierGrandTotal(
  tier: RsServiceSubscriptionTier,
  activeGroups: readonly RsOfferingOptionGroup[],
  selectedBillingCycle: RsBillingCycle,
): number {
  let total = toNum(tier.pricing.amount)

  for (const group of activeGroups) {
    const { basePrice } = resolveAddOnBasePrice(group, tier.id, selectedBillingCycle)
    if (basePrice === null) continue
    if (!group.isAddOn && !tierHasGroupServices(tier, group)) continue
    total += basePrice
  }

  return total
}

/**
 * Computes the grand total per tier by summing the prices of all enabled
 * RECURRING option groups that have services for that tier.
 */
export function computeGrandTotals(
  tiers: readonly RsServiceSubscriptionTier[],
  optionGroups: readonly RsOfferingOptionGroup[],
  enabledSections?: Record<string, boolean>,
  selectedBillingCycle: RsBillingCycle = RsBillingCycle.Monthly,
): Record<string, string> {
  const suffix = '/mo' // always monthly equivalent — allows fair plan comparison

  const activeRecurringGroups = optionGroups.filter(({ costType, isAddOn, id }) => {
    if (costType === RsGroupCostType.Setup) return false
    if (isAddOn && !enabledSections?.[id]) return false
    return true
  })

  return Object.fromEntries(
    tiers.map((tier) => {
      if (tier.isCustomPricing) return [tier.id, CUSTOM_PRICING_LABEL]

      const total = computeTierGrandTotal(tier, activeRecurringGroups, selectedBillingCycle)
      const currency = tier.pricing.currency ?? activeRecurringGroups[0]?.currency ?? 'USD'
      return [
        tier.id,
        `${getCurrencySymbol(currency)}${Math.round(total).toLocaleString()}${suffix}`,
      ]
    }),
  )
}

export function getPriceLabel(
  costType?: RsGroupCostType | null,
  price?: number | null,
  currency?: string | null,
): string | null {
  if (!price) return null
  const formatted = `${getCurrencySymbol(currency)}${price.toLocaleString()}`
  if (costType === RsGroupCostType.Setup) return `One-time: ${formatted}`
  return `+ ${formatted}/mo`
}

function mapServiceLevel(level: RsServiceLevel, customValue?: string | null): FeatureValue {
  switch (level) {
    case RsServiceLevel.Included:
      return true
    case RsServiceLevel.NotIncluded:
    case RsServiceLevel.NotApplicable:
      return false
    case RsServiceLevel.Custom:
      return customValue ?? 'Custom'
    case RsServiceLevel.Optional:
      return customValue ?? 'Optional'
    case RsServiceLevel.Variable:
      return customValue ?? 'Variable'
  }
}

export function buildServiceValues(
  serviceId: string,
  tiers: readonly RsServiceSubscriptionTier[],
): Record<string, FeatureValue> {
  return Object.fromEntries(
    tiers.map(({ serviceLevels, id }) => {
      const binding = serviceLevels.find((sl) => sl.serviceId === serviceId)
      return [id, binding ? mapServiceLevel(binding.level, binding.customValue) : false]
    }),
  )
}

export function formatUsageLimit(
  limit: RsServiceSubscriptionTier['usageLimits'][number],
): FeatureValue {
  const { unitPrice, unitPriceCurrency, notes } = limit
  const symbol = getCurrencySymbol(unitPriceCurrency)

  if (unitPrice != null && notes) {
    return `${symbol}${unitPrice.toLocaleString()} (${notes})`
  }
  if (unitPrice != null) {
    return `${symbol}${unitPrice.toLocaleString()}`
  }
  return notes ?? false
}

export function buildServiceMetrics(
  serviceId: string,
  tiers: readonly RsServiceSubscriptionTier[],
): Array<{ metric: string; values: Record<string, FeatureValue>; isOneTime?: boolean }> {
  const metricNames = new Set<string>()

  for (const { usageLimits } of tiers) {
    for (const { serviceId: ulServiceId, metric } of usageLimits) {
      if (ulServiceId === serviceId) metricNames.add(metric)
    }
  }

  return Array.from(metricNames).map((metric) => {
    const values: Record<string, FeatureValue> = {}
    let isOneTime = false

    for (const { usageLimits, id: tierId } of tiers) {
      const limit = usageLimits.find(
        ({ serviceId: ulServiceId, metric: ulMetric }) =>
          ulServiceId === serviceId && ulMetric === metric,
      )

      if (limit) {
        values[tierId] = formatUsageLimit(limit)
        if (limit.unitName === 'setup') isOneTime = true
      } else {
        values[tierId] = false
      }
    }

    return { metric, values, isOneTime }
  })
}

interface PriceWithDiscount {
  basePrice: number | null
  inlineDiscount: RsDiscountRule | null
}

/** Finds a recurring pricing entry for the requested cycle, falling back to monthly. */
function resolveCyclePrice(
  entries: readonly RsRecurringPriceOption[],
  cycle: RsBillingCycle,
): PriceWithDiscount {
  const exact = entries.find((e) => e.billingCycle === cycle)
  if (exact) {
    return {
      basePrice: exact.amount == null ? null : Number(exact.amount),
      inlineDiscount: exact.discount ?? null,
    }
  }
  const monthly = entries.find((e) => e.billingCycle === RsBillingCycle.Monthly)
  return {
    basePrice: monthly?.amount == null ? null : Number(monthly.amount),
    inlineDiscount: null,
  }
}

/** Resolves base price from the three pricing sources in priority order. */
function resolveAddOnBasePrice(
  group: RsOfferingOptionGroup,
  selectedTierId: string,
  selectedBillingCycle: RsBillingCycle,
): PriceWithDiscount {
  const spEntries = group.standalonePricing?.recurringPricing
  if (spEntries?.length) {
    return resolveCyclePrice(spEntries, selectedBillingCycle)
  }

  if (group.price != null) {
    return { basePrice: Number(group.price), inlineDiscount: null }
  }

  const tierEntry = (group.tierDependentPricing ?? []).find((tp) => tp.tierId === selectedTierId)
  if (tierEntry) {
    return resolveCyclePrice(tierEntry.recurringPricing, selectedBillingCycle)
  }

  return { basePrice: null, inlineDiscount: null }
}

export function resolveAddOnDisplayPrice(
  group: RsOfferingOptionGroup,
  selectedTierId: string,
  selectedBillingCycle: RsBillingCycle,
): { basePrice: number | null; discountedPrice: number | null } {
  const { basePrice, inlineDiscount } = resolveAddOnBasePrice(
    group,
    selectedTierId,
    selectedBillingCycle,
  )

  if (basePrice === null) return { basePrice: null, discountedPrice: null }
  if (!inlineDiscount) return { basePrice, discountedPrice: null }

  const discounted = computeMonthlyEquivalent(basePrice, selectedBillingCycle, inlineDiscount)
  return { basePrice, discountedPrice: discounted < basePrice ? discounted : null }
}

function isAddOnOrSetup(section: RsOfferingOptionGroup): boolean {
  return section.isAddOn || section.costType === RsGroupCostType.Setup
}

export const getBillingCycleValue = (section: RsOfferingOptionGroup) => {
  return isAddOnOrSetup(section) ? section.price : undefined
}

export const getCurrency = (section: RsOfferingOptionGroup) => {
  return isAddOnOrSetup(section) ? section.currency : undefined
}

export const getCostType = (section: RsOfferingOptionGroup) => {
  return isAddOnOrSetup(section) ? section.costType : undefined
}

/**
 * Computes the price label for a single tier in a non-add-on recurring
 * option group header cell.
 * - Custom pricing tiers → "Custom" (rendered uppercase via CSS)
 * - Tiers with explicit pricing → "$X"
 * - Tiers with no pricing entry → "$0"
 */
function computeOptionGroupHeaderPriceForTier(
  group: RsOfferingOptionGroup,
  tier: RsServiceSubscriptionTier,
  selectedBillingCycle: RsBillingCycle,
): string | null {
  if (tier.isCustomPricing) return CUSTOM_PRICING_LABEL

  const tierPricing = (group.tierDependentPricing ?? []).find((tp) => tp.tierId === tier.id)
  if (!tierPricing) return formatPrice(0, group.currency)

  const entry =
    tierPricing.recurringPricing.find((rp) => rp.billingCycle === selectedBillingCycle) ??
    tierPricing.recurringPricing.find((rp) => rp.billingCycle === RsBillingCycle.Monthly)

  const amount = entry?.amount == null ? 0 : Math.round(Number(entry.amount))
  return formatPrice(amount, group.currency)
}

/**
 * Returns per-tier price labels for non-add-on recurring option group headers.
 * Returns null for setup or add-on groups — those use a single flat-price display.
 */
export function computeOptionGroupHeaderPrices(
  group: RsOfferingOptionGroup,
  tiers: readonly RsServiceSubscriptionTier[],
  selectedBillingCycle: RsBillingCycle,
): Record<string, string | null> | null {
  if (group.costType === RsGroupCostType.Setup) return null
  return Object.fromEntries(
    tiers.map((tier) => {
      if (group.isAddOn) {
        if (tier.isCustomPricing) return [tier.id, CUSTOM_PRICING_LABEL]
        const { basePrice } = resolveAddOnDisplayPrice(group, tier.id, selectedBillingCycle)
        return [
          tier.id,
          basePrice == null ? null : formatPrice(Math.round(basePrice), group.currency),
        ]
      }
      return [tier.id, computeOptionGroupHeaderPriceForTier(group, tier, selectedBillingCycle)]
    }),
  )
}

const SERVICE_PRIORITY = {
  SETUP: 0,
  INCLUDED: 1,
  ADD_ON: 2,
} as const

export const getPriorityOptionGroup = (group: RsOfferingOptionGroup): number => {
  if (group.costType === 'SETUP') return SERVICE_PRIORITY.SETUP
  if (!group.isAddOn) return SERVICE_PRIORITY.INCLUDED
  return SERVICE_PRIORITY.ADD_ON
}
