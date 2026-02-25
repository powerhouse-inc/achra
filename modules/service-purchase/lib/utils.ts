import {
  RsBillingCycle,
  type RsBillingCycleDiscount,
  RsDiscountMode,
  RsDiscountType,
  RsGroupCostType,
  type RsOfferingFacetTarget,
  type RsOfferingOptionGroup,
  type RsOfferingService,
  RsServiceLevel,
  type RsServiceSubscriptionTier,
} from '@/modules/__generated__/graphql/switchboard-generated'
import type { FeatureValue } from '../types'

/** Safe coercion — Amount_Money scalar is typed `any` in codegen */
function toNum(raw: unknown): number {
  if (raw === null || raw === undefined) return 0
  const n = Number(raw)
  return Number.isNaN(n) ? 0 : n
}

const INCLUDED_LEVELS = new Set([
  RsServiceLevel.Included,
  RsServiceLevel.Custom,
  RsServiceLevel.Optional,
  RsServiceLevel.Variable,
])

/** Formats a price value as a dollar string (e.g. "$200") */
export function formatPrice(amount: number, currency?: string | null): string {
  const symbol = currency === 'USD' || !currency ? '$' : currency
  return `${symbol}${amount.toLocaleString()}`
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
 * Computes the monthly-equivalent price after applying a billing cycle discount.
 *
 * Industry-standard SaaS rule:
 * - PERCENTAGE:  netTotal = grossTotal × (1 − value/100)  → same as applying to monthly base
 * - FLAT_AMOUNT: netTotal = grossTotal − value            → discount spread across months
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
 * Computes per-tier subtotal values for a recurring optionGroup.
 */
export function computeRecurringSubtotals(
  optionGroup: RsOfferingOptionGroup,
  tiers: readonly RsServiceSubscriptionTier[],
  selectedBillingCycle: RsBillingCycle = RsBillingCycle.Monthly,
): Record<string, string | null> {
  const result: Record<string, string | null> = {}

  for (const tier of tiers) {
    if (tier.isCustomPricing) {
      result[tier.name] = 'CUSTOM'
      continue
    }

    if (!tierHasGroupServices(tier, optionGroup)) {
      result[tier.name] = null
      continue
    }

    // Resolve price following the same priority as computeGrandTotals
    let basePrice: number | null = null

    // Path 1: standalonePricing.recurringPricing
    const spEntries = optionGroup.standalonePricing?.recurringPricing
    if (spEntries?.length) {
      const exactEntry = spEntries.find((rp) => rp.billingCycle === selectedBillingCycle)
      if (exactEntry?.amount != null) {
        basePrice = Number(exactEntry.amount)
      } else {
        const monthlyEntry = spEntries.find((rp) => rp.billingCycle === RsBillingCycle.Monthly)
        if (monthlyEntry?.amount != null) basePrice = Number(monthlyEntry.amount)
      }
    }
    // Path 2: legacy flat price
    else if (optionGroup.price !== null && optionGroup.price !== undefined) {
      basePrice = toNum(optionGroup.price)
    }
    // Path 3: tierDependentPricing
    else {
      const tierEntry = (optionGroup.tierDependentPricing ?? []).find((tp) => tp.tierId === tier.id)
      if (tierEntry) {
        const exactCycle = tierEntry.recurringPricing.find(
          (rp) => rp.billingCycle === selectedBillingCycle,
        )
        if (exactCycle?.amount != null) {
          basePrice = Number(exactCycle.amount)
        } else {
          const monthly = tierEntry.recurringPricing.find(
            (rp) => rp.billingCycle === RsBillingCycle.Monthly,
          )
          if (monthly?.amount != null) basePrice = Number(monthly.amount)
        }
      }
    }

    if (basePrice === null) {
      result[tier.name] = null
      continue
    }

    // Apply billing cycle discount and return monthly equivalent
    const monthlyEquivalent = applyBillingCycleDiscount(
      basePrice,
      optionGroup.billingCycleDiscounts,
      selectedBillingCycle,
    )

    const symbol =
      optionGroup.currency === 'USD' || !optionGroup.currency ? '$' : optionGroup.currency
    result[tier.name] = `${symbol}${Math.round(monthlyEquivalent).toLocaleString()}`
  }

  return result
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

function applyBillingCycleDiscount(
  monthlyBase: number,
  discounts: RsBillingCycleDiscount[],
  billingCycle: RsBillingCycle,
): number {
  const discount = discounts.find((d) => d.billingCycle === billingCycle)
  return discount
    ? computeMonthlyEquivalent(monthlyBase, billingCycle, discount.discountRule)
    : monthlyBase
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
  const totals: Record<string, string> = {}
  const suffix = '/mo' // always monthly equivalent — allows fair plan comparison

  const activeRecurringGroups = optionGroups.filter(({ costType, isAddOn, id }) => {
    if (costType === RsGroupCostType.Setup) return false
    if (isAddOn && !enabledSections?.[id]) return false
    return true
  })

  for (const tier of tiers) {
    if (tier.isCustomPricing) {
      totals[tier.name] = 'Custom'
      continue
    }

    const tierBase = tier.pricing.amount ?? 0
    let total = applyBillingCycleDiscount(
      tierBase,
      tier.billingCycleDiscounts,
      selectedBillingCycle,
    )

    for (const group of activeRecurringGroups) {
      let groupBasePrice: number | null = null

      const spEntries = group.standalonePricing?.recurringPricing
      if (spEntries?.length) {
        const exactEntry = spEntries.find((rp) => rp.billingCycle === selectedBillingCycle)
        if (exactEntry) {
          groupBasePrice = toNum(exactEntry.amount)
        } else {
          const monthlyEntry = spEntries.find((rp) => rp.billingCycle === RsBillingCycle.Monthly)
          if (monthlyEntry) groupBasePrice = toNum(monthlyEntry.amount)
        }
      } else if (group.price !== null && group.price !== undefined) {
        groupBasePrice = toNum(group.price)
      } else {
        const tierEntry = (group.tierDependentPricing ?? []).find((tp) => tp.tierId === tier.id)
        if (tierEntry) {
          const exactCycle = tierEntry.recurringPricing.find(
            (rp) => rp.billingCycle === selectedBillingCycle,
          )
          if (exactCycle) {
            groupBasePrice = toNum(exactCycle.amount)
          } else {
            const monthly = tierEntry.recurringPricing.find(
              (rp) => rp.billingCycle === RsBillingCycle.Monthly,
            )
            if (monthly) groupBasePrice = toNum(monthly.amount)
          }
        }
      }

      if (groupBasePrice === null) continue
      if (!group.isAddOn && !tierHasGroupServices(tier, group)) continue

      if (!group.isAddOn) {
        total += applyBillingCycleDiscount(
          groupBasePrice,
          group.billingCycleDiscounts,
          selectedBillingCycle,
        )
      } else if (group.discountMode === RsDiscountMode.Independent) {
        total += applyBillingCycleDiscount(
          groupBasePrice,
          group.billingCycleDiscounts,
          selectedBillingCycle,
        )
      } else if (group.discountMode === RsDiscountMode.InheritTier) {
        total += applyBillingCycleDiscount(
          groupBasePrice,
          tier.billingCycleDiscounts,
          selectedBillingCycle,
        )
      } else {
        total += groupBasePrice
      }
    }

    const currency = tier.pricing.currency ?? activeRecurringGroups[0]?.currency ?? 'USD'
    const symbol = currency === 'USD' || !currency ? '$' : currency
    totals[tier.name] = `${symbol}${Math.round(total).toLocaleString()}${suffix}`
  }

  return totals
}

export function computeAddonSubtotals(
  optionGroup: RsOfferingOptionGroup,
  services: ReadonlyArray<{ id: string; optionGroupId?: string | null }>,
  tiers: readonly RsServiceSubscriptionTier[],
): Record<string, string | null> {
  const groupServiceIds = new Set(
    services.filter((s) => s.optionGroupId === optionGroup.id).map((s) => s.id),
  )
  const result: Record<string, string | null> = {}
  for (const tier of tiers) {
    if (tier.isCustomPricing) {
      result[tier.name] = 'CUSTOM'
      continue
    }
    const base = optionGroup.price ?? 0
    const usageTotal = tier.usageLimits
      .filter((ul) => groupServiceIds.has(ul.serviceId))
      .reduce((sum, ul) => sum + (ul.unitPrice ?? 0), 0)
    const total = base + usageTotal
    result[tier.name] = total > 0 ? formatPrice(total, optionGroup.currency) : null
  }
  return result
}

export function getPriceLabel(
  costType?: RsGroupCostType | null,
  price?: number | null,
  currency?: string | null,
): string | null {
  if (!price) return null
  const symbol = currency === 'USD' || !currency ? '$' : currency
  const formatted = `${symbol}${price.toLocaleString()}`
  if (costType === RsGroupCostType.Setup) return `One-time: ${formatted}`
  return `+ ${formatted}/mo`
}

export const DEFAULT_PLAN_INDEX = 1

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
  const values: Record<string, FeatureValue> = {}
  for (const { serviceLevels, name } of tiers) {
    const binding = serviceLevels.find((sl) => sl.serviceId === serviceId)
    values[name] = binding ? mapServiceLevel(binding.level, binding.customValue) : false
  }
  return values
}

export function formatUsageLimit(
  limit: RsServiceSubscriptionTier['usageLimits'][number],
): FeatureValue {
  const { unitPrice, unitPriceCurrency, notes } = limit
  const currency = unitPriceCurrency === 'USD' || !unitPriceCurrency ? '$' : unitPriceCurrency

  if (unitPrice != null && notes) {
    return `${currency}${unitPrice.toLocaleString()} (${notes})`
  }
  if (unitPrice != null) {
    return `${currency}${unitPrice.toLocaleString()}`
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

    for (const { usageLimits, name: tierName } of tiers) {
      const limit = usageLimits.find(
        ({ serviceId: ulServiceId, metric: ulMetric }) =>
          ulServiceId === serviceId && ulMetric === metric,
      )

      if (limit) {
        values[tierName] = formatUsageLimit(limit)
        if (limit.unitName === 'setup') isOneTime = true
      } else {
        values[tierName] = false
      }
    }

    return { metric, values, isOneTime }
  })
}

export function resolveAddOnDisplayPrice(
  group: RsOfferingOptionGroup,
  selectedTierId: string,
  selectedBillingCycle: RsBillingCycle,
  tierBillingCycleDiscounts: RsServiceSubscriptionTier['billingCycleDiscounts'],
): { basePrice: number | null; discountedPrice: number | null } {
  let basePrice: number | null = null
  let inlineDiscount: { discountType: RsDiscountType; discountValue: number } | null = null

  const spEntries = group.standalonePricing?.recurringPricing
  if (spEntries?.length) {
    const exactEntry = spEntries.find((rp) => rp.billingCycle === selectedBillingCycle)
    if (exactEntry) {
      basePrice = exactEntry.amount == null ? null : Number(exactEntry.amount)
      inlineDiscount = exactEntry.discount ?? null
    } else {
      const monthlyEntry = spEntries.find((rp) => rp.billingCycle === RsBillingCycle.Monthly)
      if (monthlyEntry) basePrice = monthlyEntry.amount == null ? null : Number(monthlyEntry.amount)
    }
  } else if (group.price !== null && group.price !== undefined) {
    basePrice = Number(group.price)
  } else {
    const tierEntry = (group.tierDependentPricing ?? []).find((tp) => tp.tierId === selectedTierId)
    if (tierEntry) {
      const exactCycle = tierEntry.recurringPricing.find(
        (rp) => rp.billingCycle === selectedBillingCycle,
      )
      if (exactCycle) {
        basePrice = exactCycle.amount == null ? null : Number(exactCycle.amount)
        inlineDiscount = exactCycle.discount ?? null
      } else {
        const monthly = tierEntry.recurringPricing.find(
          (rp) => rp.billingCycle === RsBillingCycle.Monthly,
        )
        if (monthly) basePrice = monthly.amount == null ? null : Number(monthly.amount)
      }
    }
  }

  if (basePrice === null) return { basePrice: null, discountedPrice: null }

  let discountedPrice: number | null = null

  if (group.discountMode === RsDiscountMode.Independent) {
    const rule =
      inlineDiscount ??
      group.billingCycleDiscounts.find((d) => d.billingCycle === selectedBillingCycle)
        ?.discountRule ??
      null
    if (rule) {
      const result = computeMonthlyEquivalent(basePrice, selectedBillingCycle, rule)
      if (result < basePrice) discountedPrice = result
    }
  } else if (group.discountMode === RsDiscountMode.InheritTier) {
    const tierDiscount = tierBillingCycleDiscounts.find(
      (d) => d.billingCycle === selectedBillingCycle,
    )
    if (tierDiscount) {
      const result = computeMonthlyEquivalent(
        basePrice,
        selectedBillingCycle,
        tierDiscount.discountRule,
      )
      if (result < basePrice) discountedPrice = result
    }
  }

  return { basePrice, discountedPrice }
}

export const getBillingCycleValue = (section: RsOfferingOptionGroup) => {
  return section.isAddOn || section.costType === RsGroupCostType.Setup ? section.price : undefined
}

export const getCurrency = (section: RsOfferingOptionGroup) => {
  return section.isAddOn || section.costType === RsGroupCostType.Setup
    ? section.currency
    : undefined
}

export const getConstTpe = (section: RsOfferingOptionGroup) => {
  return section.isAddOn || section.costType === RsGroupCostType.Setup
    ? section.costType
    : undefined
}

export function isServiceVisibleForFacets(
  service: RsOfferingService,
  facetSelections: Record<string, string>,
  facetTargets: RsOfferingFacetTarget[],
): boolean {
  if (service.facetBindings.length === 0) return true

  return service.facetBindings.every((binding) => {
    const target = facetTargets.find((ft) => ft.id === binding.facetType)
    if (!target) return true

    const userSelection = facetSelections[target.categoryKey]
    if (!userSelection) return true

    return binding.supportedOptions.includes(userSelection)
  })
}
