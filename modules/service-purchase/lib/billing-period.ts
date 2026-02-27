import {
  RsBillingCycle,
  type RsOfferingOptionGroup,
  type RsServiceSubscriptionTier,
} from '@/modules/__generated__/graphql/switchboard-generated'

export const PERIOD_ORDER: RsBillingCycle[] = [
  RsBillingCycle.Monthly,
  RsBillingCycle.Quarterly,
  RsBillingCycle.SemiAnnual,
  RsBillingCycle.Annual,
  RsBillingCycle.OneTime,
]

export const PERIOD_LABELS: Record<RsBillingCycle, string> = {
  [RsBillingCycle.Monthly]: 'Monthly',
  [RsBillingCycle.Quarterly]: 'Quarterly',
  [RsBillingCycle.SemiAnnual]: 'Semi-Annual',
  [RsBillingCycle.Annual]: 'Annual',
  [RsBillingCycle.OneTime]: 'One-Time',
}

/** Billing-cycle discounts are not available on RS tiers — always returns null. */
export function computePeriodDiscountLabel(
  _tier: RsServiceSubscriptionTier,
  _cycle: RsBillingCycle,
): string | null {
  return null
}

/** Derives available billing cycles from the union of all option-group availableBillingCycles. */
export function getAvailableCycles(optionGroups: RsOfferingOptionGroup[]): RsBillingCycle[] {
  const cyclesSet = new Set<RsBillingCycle>()
  for (const group of optionGroups) {
    for (const cycle of group.availableBillingCycles) {
      cyclesSet.add(cycle)
    }
  }
  return PERIOD_ORDER.filter((cycle) => cyclesSet.has(cycle))
}
