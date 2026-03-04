import {
  BILLING_CYCLE_MONTHS,
  getUserSelectionPriceBreakdown,
  type PriceBreakdown,
  type ServiceOfferingPHState,
  type UserSelection,
} from '@powerhousedao/service-offering/document-models/service-offering'
import type {
  RsBillingCycle,
  RsServiceOffering,
} from '@/modules/__generated__/graphql/switchboard-generated'

/**
 * Wraps the offering in the shape expected by getUserSelectionPriceBreakdown.
 * RsServiceOffering matches ServiceOfferingGlobalState; we cast via unknown to bridge type systems.
 */
function getPriceBreakdownInternal(
  offering: RsServiceOffering,
  tierId: string,
  billingCycle: RsBillingCycle,
  activeGroupIds: Set<string>,
): PriceBreakdown {
  const state = { global: offering } as unknown as ServiceOfferingPHState

  return getUserSelectionPriceBreakdown(state, {
    tierId,
    billingCycle: billingCycle as string,
    optionGroupIds: Array.from(activeGroupIds),
    groupBillingCycleOverrides: {},
    addonBillingCycleOverrides: {},
  } as UserSelection)
}

/** Returns the monthly-equivalent price for the tier header. */
export function computeTierHeaderPriceWithBreakdown(
  offering: RsServiceOffering,
  tierId: string,
  billingCycle: RsBillingCycle,
  activeGroupIds: Set<string>,
): number {
  const breakdown = getPriceBreakdownInternal(offering, tierId, billingCycle, activeGroupIds)
  const monthsInCycle = BILLING_CYCLE_MONTHS[breakdown.billingCycle] || 1
  return breakdown.totals.grandRecurringTotal / monthsInCycle
}
