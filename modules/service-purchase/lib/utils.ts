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
  const result: Record<string, string | null> = {}

  for (const tier of tiers) {
    if (tier.isCustomPricing) {
      result[tier.name] = 'CUSTOM'
      continue
    }

    const hasIncludedService = tier.serviceLevels.some(
      (sl) => sl.optionGroupId === optionGroup.id && INCLUDED_LEVELS.has(sl.level),
    )

    if (hasIncludedService && optionGroup.price != null) {
      result[tier.name] = formatPrice(optionGroup.price, optionGroup.currency)
    } else {
      result[tier.name] = null
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

  // Filter to only recurring groups that are enabled
  const activeRecurringGroups = optionGroups.filter((group) => {
    if (group.costType !== RsGroupCostType.Recurring) return false
    // Non-addon sections are always enabled; addon sections check enabledSections
    if (group.isAddOn && !enabledSections?.[group.id]) return false
    return true
  })

  for (const tier of tiers) {
    if (tier.isCustomPricing) {
      totals[tier.name] = 'Custom'
      continue
    }

    let total = tier.pricing.amount ?? 0
    for (const group of activeRecurringGroups) {
      if (group.price != null && tierHasGroupServices(tier, group)) {
        total += group.price
      }
    }

    const currency = tier.pricing.currency ?? activeRecurringGroups[0]?.currency ?? 'USD'
    const symbol = currency === 'USD' || !currency ? '$' : currency
    totals[tier.name] = `${symbol}${Math.round(total).toLocaleString()}/mo`
  }

  return totals
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
  for (const tier of tiers) {
    const binding = tier.serviceLevels.find((sl) => sl.serviceId === serviceId)
    values[tier.name] = binding ? mapServiceLevel(binding.level, binding.customValue) : false
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
  const currency =
    limit.unitPriceCurrency === 'USD' || !limit.unitPriceCurrency ? '$' : limit.unitPriceCurrency
  if (limit.unitPrice != null && limit.notes) {
    return `${currency}${limit.unitPrice.toLocaleString()} (${limit.notes})`
  }
  if (limit.unitPrice != null) {
    return `${currency}${limit.unitPrice.toLocaleString()}`
  }
  if (limit.notes) {
    return limit.notes
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
  for (const tier of tiers) {
    for (const ul of tier.usageLimits) {
      if (ul.serviceId === serviceId) metricNames.add(ul.metric)
    }
  }

  // Build per-tier values for each metric
  return Array.from(metricNames).map((metric) => {
    const values: Record<string, FeatureValue> = {}
    let isOneTime = false
    for (const tier of tiers) {
      const limit = tier.usageLimits.find(
        (ul) => ul.serviceId === serviceId && ul.metric === metric,
      )
      if (limit) {
        values[tier.name] = formatUsageLimit(limit)
        if (limit.unitName === 'setup') isOneTime = true
      } else {
        values[tier.name] = false
      }
    }
    return { metric, values, isOneTime }
  })
}
