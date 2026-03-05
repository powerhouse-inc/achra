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
import type { GroupPriceFromBreakdown, PurchaseTotals } from '../types'

/**
 * Wraps the offering in the shape expected by getUserSelectionPriceBreakdown.
 * RsServiceOffering matches ServiceOfferingGlobalState; we cast via unknown to bridge type systems.
 */
export function getPriceBreakdown(
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
  const breakdown = getPriceBreakdown(offering, tierId, billingCycle, activeGroupIds)
  const monthsInCycle = BILLING_CYCLE_MONTHS[breakdown.billingCycle] || 1
  return breakdown.totals.grandRecurringTotal / monthsInCycle
}

/**
 * Returns the discount badge label for a billing cycle (e.g. "Save 20%"),
 * computed by comparing the undiscounted vs discounted totals from
 * getUserSelectionPriceBreakdown across the full user selection (plan + active add-ons).
 *
 * undiscounted = tierCycleTotal + Σ addOnBreakdowns[].cycleAmount
 * discounted   = totals.grandRecurringTotal
 */
export function computePeriodDiscountLabel(
  offering: RsServiceOffering,
  tierId: string,
  cycle: RsBillingCycle,
  activeGroupIds: Set<string>,
): string | null {
  if (activeGroupIds.size === 0) return null

  const breakdown = getPriceBreakdown(offering, tierId, cycle, activeGroupIds)

  const addOnUndiscounted = breakdown.addOnBreakdowns.reduce((sum, a) => sum + a.cycleAmount, 0)
  const undiscounted = breakdown.tierCycleTotal + addOnUndiscounted
  const discounted = breakdown.totals.grandRecurringTotal

  if (undiscounted <= 0 || discounted >= undiscounted) return null

  const savingsPercent = Math.round(((undiscounted - discounted) / undiscounted) * 100)
  return savingsPercent > 0 ? `Save ${savingsPercent}%` : null
}

/**
 * Converts a PriceBreakdown into PurchaseTotals for display.
 * recurringTotal = monthly equivalent; setupTotal = one-time fees.
 */
export function computeTotalsFromBreakdown(breakdown: PriceBreakdown): PurchaseTotals {
  const monthsInCycle = BILLING_CYCLE_MONTHS[breakdown.billingCycle] || 1
  return {
    recurringTotal: breakdown.totals.grandRecurringTotal / monthsInCycle,
    setupTotal: breakdown.totals.grandSetupTotal,
  }
}

/**
 * Resolves the display price for a group from the breakdown.
 * - Recurring: uses monthlyBase (for /mo display)
 * - Setup: uses setupCost (one-time)
 */
export function getGroupPriceFromBreakdown(
  breakdown: PriceBreakdown,
  groupId: string,
  isSetup: boolean,
): GroupPriceFromBreakdown | null {
  if (isSetup) {
    const setupEntry =
      breakdown.setupGroupBreakdowns.find((b) => b.optionGroupId === groupId) ??
      breakdown.addOnBreakdowns.find((b) => b.optionGroupId === groupId)
    if (setupEntry?.setupCost == null) return null
    return { amount: setupEntry.setupCost, isRecurring: false }
  }

  const recurringEntry =
    breakdown.optionGroupBreakdowns.find((b) => b.optionGroupId === groupId) ??
    breakdown.addOnBreakdowns.find((b) => b.optionGroupId === groupId)
  if (!recurringEntry) return null
  return { amount: recurringEntry.monthlyBase, isRecurring: true }
}
