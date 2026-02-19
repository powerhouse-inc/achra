import {
  RsGroupCostType,
  type RsOfferingOptionGroup,
  RsServiceLevel,
  type RsServiceSubscriptionTier,
} from '@/modules/__generated__/graphql/switchboard-generated'
import type { FeatureValue } from '../components/configure-services-purchase/components/types'

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
 * Computes per-tier subtotal values for a recurring optionGroup.
 * For each tier:
 * - If tier.isCustomPricing → "CUSTOM"
 * - If the tier has at least one service for this group with level != NotIncluded/NotApplicable
 *   → formatted group.price
 * - Otherwise → null (displayed as "—")
 */
export function computeRecurringSubtotals(
  optionGroup: RsOfferingOptionGroup,
  tiers: readonly RsServiceSubscriptionTier[],
): Record<string, string | null> {
  const { id: groupId, price, currency } = optionGroup
  const result: Record<string, string | null> = {}

  for (const { isCustomPricing, name, serviceLevels } of tiers) {
    if (isCustomPricing) {
      result[name] = 'CUSTOM'
      continue
    }

    const hasIncludedService = serviceLevels.some(
      ({ optionGroupId, level }) => optionGroupId === groupId && INCLUDED_LEVELS.has(level),
    )

    if (hasIncludedService && price != null) {
      result[name] = formatPrice(price, currency)
    } else {
      result[name] = null
    }
  }
  return result
}

/**
 * Checks whether a tier has at least one service with an "included" level
 * for the given option group.
 */
function tierHasGroupServices(
  tier: RsServiceSubscriptionTier,
  group: RsOfferingOptionGroup,
): boolean {
  return tier.serviceLevels.some(
    (sl) => sl.optionGroupId === group.id && INCLUDED_LEVELS.has(sl.level),
  )
}

/**
 * Computes the grand total per tier by summing the prices of all enabled
 * RECURRING option groups that have services for that tier.
 */
export function computeGrandTotals(
  tiers: readonly RsServiceSubscriptionTier[],
  optionGroups: readonly RsOfferingOptionGroup[],
  enabledSections?: Record<string, boolean>,
): Record<string, string> {
  const totals: Record<string, string> = {}

  const activeRecurringGroups = optionGroups.filter(({ costType, isAddOn, id }) => {
    if (costType !== RsGroupCostType.Recurring) return false
    if (isAddOn && !enabledSections?.[id]) return false
    return true
  })

  for (const tier of tiers) {
    if (tier.isCustomPricing) {
      totals[tier.name] = 'Custom'
      continue
    }

    let total = tier.pricing.amount ?? 0

    for (const group of activeRecurringGroups) {
      if (group.price == null) continue
      // Add-ons apply a flat rate to all tiers (they use usageLimits, not serviceLevels).
      // Non-add-ons only apply if the tier actually includes services from that group.
      if (group.isAddOn || tierHasGroupServices(tier, group)) {
        total += group.price
      }
    }

    const currency = tier.pricing.currency ?? activeRecurringGroups[0]?.currency ?? 'USD'
    const symbol = currency === 'USD' || !currency ? '$' : currency
    totals[tier.name] = `${symbol}${Math.round(total).toLocaleString()}/mo`
  }

  return totals
}

/**
 * Computes per-tier subtotal values for an add-on optionGroup.
 * For each tier:
 * - If tier.isCustomPricing → "CUSTOM"
 * - base = optionGroup.price + Σ usageLimits.unitPrice for services in this group
 * - If total > 0 → formatted price, otherwise null
 */
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
  if (costType === RsGroupCostType.Recurring) return `+ ${formatted}/mo`
  return null
}

/** Default plan index for mobile carousel */
export const DEFAULT_PLAN_INDEX = 1

/** Maps an API service level to a UI-renderable FeatureValue */
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

/** Builds a Record<tierName, FeatureValue> for a given service across all tiers */
export function buildServiceValues(
  serviceId: string,
  tiers: readonly RsServiceSubscriptionTier[],
): Record<string, FeatureValue> {
  const values: Record<string, FeatureValue> = {}
  for (const { serviceLevels, name } of tiers) {
    const binding = serviceLevels.find((sl) => sl.serviceId === serviceId)

    if (binding) {
      const { level, customValue } = binding
      values[name] = mapServiceLevel(level, customValue)
    } else {
      values[name] = false
    }
  }
  return values
}

/**
 * Formats a usage limit into a display string.
 * - unitPrice + notes → "$500 (One-time setup fee)"
 * - unitPrice only   → "$500"
 * - notes only        → "5 invoices included per month"
 * - neither           → false (renders as —)
 */
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
  if (notes) {
    return notes
  }
  return false
}

/** Collects unique metric names for a service and builds per-tier values */
export function buildServiceMetrics(
  serviceId: string,
  tiers: readonly RsServiceSubscriptionTier[],
): Array<{ metric: string; values: Record<string, FeatureValue>; isOneTime?: boolean }> {
  // Collect all unique metric names for this service across tiers
  const metricNames = new Set<string>()

  for (const { usageLimits } of tiers) {
    for (const { serviceId: ulServiceId, metric } of usageLimits) {
      if (ulServiceId === serviceId) {
        metricNames.add(metric)
      }
    }
  }

  // Build per-tier values for each metric
  return Array.from(metricNames).map((metric) => {
    const values: Record<string, FeatureValue> = {}
    let isOneTime = false

    for (const { usageLimits, name: tierName } of tiers) {
      const limit = usageLimits.find(
        ({ serviceId: ulServiceId, metric: ulMetric }) =>
          ulServiceId === serviceId && ulMetric === metric,
      )

      if (limit) {
        const { unitName } = limit
        values[tierName] = formatUsageLimit(limit)
        if (unitName === 'setup') {
          isOneTime = true
        }
      } else {
        values[tierName] = false
      }
    }

    return { metric, values, isOneTime }
  })
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
