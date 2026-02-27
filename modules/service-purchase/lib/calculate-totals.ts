import {
  RsBillingCycle,
  RsDiscountType,
  RsGroupCostType,
  type RsOfferingOptionGroup,
} from '@/modules/__generated__/graphql/switchboard-generated'
import { getMonths } from './utils'
import type { AppliedDiscount, CalculateTotalsInput, CalculateTotalsResult } from '../types'

interface DiscountRule {
  discountType: RsDiscountType
  discountValue: number
}

// ─── Internal helpers ─────────────────────────────────────────────────────────

/** Safe coercion — Amount_Money scalar is typed `any` in codegen */
function toNumber(raw: unknown): number | null {
  if (raw === null || raw === undefined) return null
  const n = Number(raw)
  return isNaN(n) ? null : n
}

/**
 * Applies an inline discount rule to a monthly base price using period-based math.
 *
 * Golden rule: discounts are applied to the PERIOD TOTAL, not the monthly base.
 *   grossTotal  = monthlyBase × months
 *   PERCENTAGE  → netTotal = grossTotal × (1 − value/100)
 *   FLAT_AMOUNT → netTotal = grossTotal − value
 *
 * Returns the period net total (invoice amount) and the total period saving.
 */
function applyDiscountRule(
  monthlyBase: number,
  rule: DiscountRule,
  billingCycle: RsBillingCycle,
): { discountedPeriodTotal: number; savedAmount: number } {
  const months = getMonths(billingCycle)
  const grossTotal = monthlyBase * months
  const netTotal =
    rule.discountType === RsDiscountType.Percentage
      ? grossTotal * (1 - rule.discountValue / 100)
      : Math.max(0, grossTotal - rule.discountValue)
  return {
    discountedPeriodTotal: netTotal,
    savedAmount: grossTotal - netTotal,
  }
}

/**
 * Resolves the recurring price for an option group given the active tier and
 * billing cycle.
 *
 * Price resolution priority:
 *  1. `group.standalonePricing.recurringPricing` — per-cycle entries with inline discounts
 *     (fallback within: Monthly entry)
 *  2. `group.price` (legacy flat)
 *  3. `group.tierDependentPricing` → matching tier → exact billingCycle entry
 *     (fallback within: Monthly entry)
 *
 * Returns `{ baseAmount: null }` when data is insufficient → caller marks isPending.
 */
function resolveOptionGroupRecurringPrice(
  group: RsOfferingOptionGroup,
  selectedTierId: string,
  selectedBillingCycle: RsBillingCycle,
): { baseAmount: number | null; discountRule: DiscountRule | null } {
  let baseAmount: number | null = null
  let discountRule: DiscountRule | null = null

  // ── Path 1: standalonePricing.recurringPricing (per-cycle, newest API shape) ──
  const standalonePricingEntries = group.standalonePricing?.recurringPricing
  if (standalonePricingEntries?.length) {
    const exactCycleEntry = standalonePricingEntries.find(
      (rp) => rp.billingCycle === selectedBillingCycle,
    )
    if (exactCycleEntry) {
      baseAmount = toNumber(exactCycleEntry.amount)
      discountRule = exactCycleEntry.discount ?? null
    } else {
      const monthlyFallbackEntry = standalonePricingEntries.find(
        (rp) => rp.billingCycle === RsBillingCycle.Monthly,
      )
      if (monthlyFallbackEntry) {
        baseAmount = toNumber(monthlyFallbackEntry.amount)
      }
    }
  } else if (group.price !== null && group.price !== undefined) {
    baseAmount = toNumber(group.price)
  } else {
    const matchingTierPricing = (group.tierDependentPricing ?? []).find(
      (tp) => tp.tierId === selectedTierId,
    )
    if (!matchingTierPricing) return { baseAmount: null, discountRule: null }

    const exactCyclePricing = matchingTierPricing.recurringPricing.find(
      (rp) => rp.billingCycle === selectedBillingCycle,
    )
    if (exactCyclePricing) {
      baseAmount = toNumber(exactCyclePricing.amount)
      discountRule = exactCyclePricing.discount ?? null
    } else {
      const monthlyFallbackPricing = matchingTierPricing.recurringPricing.find(
        (rp) => rp.billingCycle === RsBillingCycle.Monthly,
      )
      if (!monthlyFallbackPricing) return { baseAmount: null, discountRule: null }
      baseAmount = toNumber(monthlyFallbackPricing.amount)
    }
  }

  return { baseAmount, discountRule }
}

export function calculateTotals({
  offering,
  selectedTierId,
  selectedBillingCycle,
  activeGroupIds,
}: CalculateTotalsInput): CalculateTotalsResult {
  const appliedDiscounts: AppliedDiscount[] = []
  let isPending = false
  let recurringSubtotal = 0
  let recurringTotal = 0
  let setupTotal = 0
  const currency = 'USD'
  const months = getMonths(selectedBillingCycle)

  const selectedTier = offering.tiers.find((t) => t.id === selectedTierId)

  if (!selectedTier) {
    console.warn(`[calculateTotals] Tier "${selectedTierId}" not found in offering ${offering.id}`)
    isPending = true
  } else if (selectedTier.isCustomPricing) {
    // Custom tiers have no numeric subscription price — UI shows "Custom"
  } else {
    const tierBaseAmount = toNumber(selectedTier.pricing.amount)

    if (tierBaseAmount === null) {
      console.warn(
        `[calculateTotals] Tier "${selectedTier.name}" (${selectedTier.id}) is missing pricing.amount`,
      )
      isPending = true
    } else {
      const tierGross = tierBaseAmount * months
      recurringSubtotal += tierGross
      recurringTotal += tierGross
    }
  }

  const activeOptionGroups = offering.optionGroups.filter((g) => activeGroupIds.has(g.id))

  for (const group of activeOptionGroups) {
    if (group.costType === RsGroupCostType.Setup) {
      // ── SETUP: one-time fee, never affected by billing cycle ───────────────
      const setupPrice = toNumber(group.price)

      if (setupPrice === null) {
        console.warn(
          `[calculateTotals] SETUP group "${group.name}" (${group.id}) has no price — marking pending`,
        )
        isPending = true
        continue
      }

      setupTotal += setupPrice
    } else {
      const { baseAmount, discountRule } = resolveOptionGroupRecurringPrice(
        group,
        selectedTierId,
        selectedBillingCycle,
      )

      if (baseAmount === null) {
        console.warn(
          `[calculateTotals] RECURRING group "${group.name}" (${group.id}) has no price for tier=${selectedTierId} cycle=${selectedBillingCycle} — marking pending`,
        )
        isPending = true
        continue
      }

      const groupGross = baseAmount * months
      recurringSubtotal += groupGross

      if (discountRule) {
        const { discountedPeriodTotal, savedAmount } = applyDiscountRule(
          baseAmount,
          discountRule,
          selectedBillingCycle,
        )
        recurringTotal += discountedPeriodTotal
        if (savedAmount > 0) {
          appliedDiscounts.push({
            sourceId: group.id,
            sourceName: group.name,
            source: 'option-group',
            discountType: discountRule.discountType,
            discountValue: discountRule.discountValue,
            savedAmount,
          })
        }
      } else {
        recurringTotal += groupGross
      }
    }
  }

  return {
    recurringSubtotal,
    recurringTotal,
    setupTotal,
    appliedDiscounts,
    isPending,
    currency,
  }
}
