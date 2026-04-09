import { RsBillingCycle } from '@/modules/__generated__/graphql/switchboard-generated'

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
  [RsBillingCycle.SemiAnnual]: 'Semi-Annually',
  [RsBillingCycle.Annual]: 'Annually',
  [RsBillingCycle.OneTime]: 'One-Time',
}

/** Returns the available billing cycles ordered by PERIOD_ORDER, using the root-level availableBillingCycles from the service offering. */
export function getAvailableCycles(availableBillingCycles: RsBillingCycle[]): RsBillingCycle[] {
  const cyclesSet = new Set(availableBillingCycles)
  return PERIOD_ORDER.filter((cycle) => cyclesSet.has(cycle))
}
