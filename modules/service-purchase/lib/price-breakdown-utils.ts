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
  RsServiceSubscriptionTier,
} from '@/modules/__generated__/graphql/switchboard-generated'
import type { GroupPriceFromBreakdown, PurchaseTotals } from '../types'

function monthsInBillingCycle(billingCycle: RsBillingCycle): number {
  return BILLING_CYCLE_MONTHS[billingCycle as keyof typeof BILLING_CYCLE_MONTHS] || 1
}

/** Effective one-time setup for a row (discounted amount when a setup discount applies). */
function effectiveSetupAmount(row: {
  setupCost: number | null
  setupCostDiscount?: { discountedAmount: number } | null
}): number {
  if (row.setupCostDiscount) return row.setupCostDiscount.discountedAmount
  return row.setupCost ?? 0
}

/**
 * Sums one-time setup across all breakdown rows (package no longer exposes totals.grandSetupTotal).
 */
export function computeGrandSetupTotal(breakdown: PriceBreakdown): number {
  let sum = 0
  for (const b of breakdown.optionGroupBreakdowns) {
    sum += effectiveSetupAmount(b)
  }
  for (const b of breakdown.setupGroupBreakdowns) {
    sum += effectiveSetupAmount(b)
  }
  for (const b of breakdown.addOnBreakdowns) {
    sum += effectiveSetupAmount(b)
  }
  return sum
}

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
    billingCycle,
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
  const monthsInCycle = monthsInBillingCycle(billingCycle)
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
  const breakdown = getPriceBreakdown(offering, tierId, cycle, activeGroupIds)

  const optionGroupUndiscounted = breakdown.optionGroupBreakdowns.reduce(
    (sum, g) => sum + g.cycleAmount,
    0,
  )
  const addOnUndiscounted = breakdown.addOnBreakdowns.reduce((sum, a) => sum + a.cycleAmount, 0)
  const undiscounted = breakdown.tierCycleTotal + optionGroupUndiscounted + addOnUndiscounted
  const discounted = breakdown.totals.grandRecurringTotal

  if (undiscounted <= 0 || discounted >= undiscounted) return null

  const savingsPercent = Math.round(((undiscounted - discounted) / undiscounted) * 100)
  return savingsPercent > 0 ? `Save ${savingsPercent}%` : null
}

/**
 * Converts a PriceBreakdown into PurchaseTotals for display.
 * recurringTotal = full billing-cycle amount (after discounts); setupTotal = one-time fees.
 */
export function computeTotalsFromBreakdown(breakdown: PriceBreakdown): PurchaseTotals {
  return {
    recurringTotal: breakdown.totals.grandRecurringTotal,
    setupTotal: computeGrandSetupTotal(breakdown),
  }
}

/**
 * Resolves the tier ID to use when computing the billing cycle discount label.
 * When the selected tier is Free ($0/mo), falls back to the first paid non-custom tier
 * so the badge stays visible and doesn't jump from hidden → visible on tier change.
 */
export function resolveDiscountReferenceTierId(
  offering: RsServiceOffering,
  selectedTier: RsServiceSubscriptionTier,
  allTiers: RsServiceSubscriptionTier[],
  billingCycle: RsBillingCycle,
  activeGroupIds: Set<string>,
): string {
  if (selectedTier.isCustomPricing) return selectedTier.id
  const selectedPrice = computeTierHeaderPriceWithBreakdown(
    offering,
    selectedTier.id,
    billingCycle,
    activeGroupIds,
  )
  if (selectedPrice > 0) return selectedTier.id
  const firstPaidTier = allTiers.find(
    (t) =>
      !t.isCustomPricing &&
      computeTierHeaderPriceWithBreakdown(offering, t.id, billingCycle, activeGroupIds) > 0,
  )
  return firstPaidTier?.id ?? selectedTier.id
}

/**
 * Resolves the display price for a group from the breakdown.
 * - Recurring: uses recurringAmount (discounted cycle total)
 * - Setup: uses effective setup (discounted one-time when applicable)
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
    if (!setupEntry) return null
    const hasSetupDiscount =
      'setupCostDiscount' in setupEntry && setupEntry.setupCostDiscount != null
    if (setupEntry.setupCost == null && !hasSetupDiscount) return null
    return { amount: effectiveSetupAmount(setupEntry), isRecurring: false }
  }

  const recurringEntry =
    breakdown.optionGroupBreakdowns.find((b) => b.optionGroupId === groupId) ??
    breakdown.addOnBreakdowns.find((b) => b.optionGroupId === groupId)
  if (!recurringEntry) return null
  return { amount: recurringEntry.recurringAmount, isRecurring: true }
}
