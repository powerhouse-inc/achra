import {
  RsBillingCycle,
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

// TODO: replace with real discount data from API once endpoint is stable
export const PERIOD_DISCOUNTS: Partial<Record<RsBillingCycle, string>> = {
  [RsBillingCycle.Quarterly]: '5%',
  [RsBillingCycle.SemiAnnual]: '10%',
  [RsBillingCycle.Annual]: '20%',
}

export function getAvailableCycles(tiers: RsServiceSubscriptionTier[]): RsBillingCycle[] {
  const cyclesSet = new Set<RsBillingCycle>()

  for (const tier of tiers) {
    if (tier.defaultBillingCycle) {
      cyclesSet.add(tier.defaultBillingCycle)
    }
    for (const { billingCycle } of tier.billingCycleDiscounts) {
      cyclesSet.add(billingCycle)
    }
  }

  return PERIOD_ORDER.filter((cycle) => cyclesSet.has(cycle))
}
