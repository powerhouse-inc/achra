import {
  RsGroupCostType,
  type RsOfferingOptionGroup,
  RsServiceLevel,
  type RsServiceSubscriptionTier,
} from '@/modules/__generated__/graphql/switchboard-generated'

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
  const includedLevels = new Set([
    RsServiceLevel.Included,
    RsServiceLevel.Custom,
    RsServiceLevel.Optional,
    RsServiceLevel.Variable,
  ])

  for (const tier of tiers) {
    if (tier.isCustomPricing) {
      result[tier.name] = 'CUSTOM'
      continue
    }

    const hasIncludedService = tier.serviceLevels.some(
      (sl) => sl.optionGroupId === optionGroup.id && includedLevels.has(sl.level),
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

    let total = 0
    for (const group of activeRecurringGroups) {
      if (group.price != null && tierHasGroupServices(tier, group)) {
        total += group.price
      }
    }

    const currency = activeRecurringGroups[0]?.currency ?? 'USD'
    const symbol = currency === 'USD' || !currency ? '$' : currency
    totals[tier.name] = `${symbol}${total.toLocaleString()}/mo`
  }

  return totals
}
