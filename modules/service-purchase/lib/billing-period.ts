import {
  RsBillingCycle,
  RsDiscountType,
  RsGroupCostType,
  type RsOfferingOptionGroup,
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

/**
 * Returns the discount badge label for a billing cycle (e.g. "Save 10%"),
 * derived from the principal non-add-on recurring option group's
 * tierDependentPricing for the selected tier.
 */
export function computePeriodDiscountLabel(
  optionGroups: RsOfferingOptionGroup[],
  tierId: string,
  cycle: RsBillingCycle,
): string | null {
  const mainGroup = optionGroups.find((g) => !g.isAddOn && g.costType === RsGroupCostType.Recurring)
  if (!mainGroup?.tierDependentPricing) return null

  const tierPricing = mainGroup.tierDependentPricing.find((tp) => tp.tierId === tierId)
  if (!tierPricing) return null

  const entry = tierPricing.recurringPricing.find((rp) => rp.billingCycle === cycle)
  if (!entry?.discount) return null

  const { discountType, discountValue } = entry.discount
  if (discountType === RsDiscountType.Percentage) return `Save ${discountValue}%`
  return `Save $${discountValue}`
}

/** Returns the available billing cycles ordered by PERIOD_ORDER, using the root-level availableBillingCycles from the service offering. */
export function getAvailableCycles(availableBillingCycles: RsBillingCycle[]): RsBillingCycle[] {
  const cyclesSet = new Set(availableBillingCycles)
  return PERIOD_ORDER.filter((cycle) => cyclesSet.has(cycle))
}
