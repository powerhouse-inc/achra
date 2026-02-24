import {
  RsBillingCycle,
  RsDiscountMode,
  RsDiscountType,
  RsGroupCostType,
  type RsOfferingOptionGroup,
  type RsServiceOffering,
  type RsServiceSubscriptionTier,
} from '@/modules/__generated__/graphql/switchboard-generated'

// ─── Public types ─────────────────────────────────────────────────────────────

export interface AppliedDiscount {
  sourceId: string
  sourceName: string
  source: 'tier' | 'option-group'
  discountType: RsDiscountType
  discountValue: number
  /** Positive amount saved (base − discounted) */
  savedAmount: number
}

export interface CalculateTotalsResult {
  /** Tier price + active recurring groups, before billing-cycle discounts */
  recurringSubtotal: number
  /** recurringSubtotal after all billing-cycle discounts are applied */
  recurringTotal: number
  /** Sum of active SETUP groups — one-time, never affected by billing cycle */
  setupTotal: number
  appliedDiscounts: AppliedDiscount[]
  /** True if at least one group or tier was missing price data */
  isPending: boolean
  currency: string
}

export interface CalculateTotalsInput {
  offering: RsServiceOffering
  selectedTierId: string
  selectedBillingCycle: RsBillingCycle
  /** IDs of every option group the user currently has enabled */
  activeGroupIds: Set<string>
}

// ─── Internal types ───────────────────────────────────────────────────────────

/** Locally-typed discount rule to avoid the any-tainted generated RsDiscountRule */
interface DiscountRule {
  discountType: RsDiscountType
  discountValue: number
}

interface ResolvedGroupPrice {
  /** Pre-discount base amount; null → caller marks isPending */
  baseAmount: number | null
  /** Discount to apply to baseAmount, if any */
  discountRule: DiscountRule | null
}

// ─── Internal helpers ─────────────────────────────────────────────────────────

/** Safe coercion — Amount_Money scalar is typed `any` in codegen */
function toNumber(raw: unknown): number | null {
  if (raw === null || raw === undefined) return null
  const n = Number(raw)
  return isNaN(n) ? null : n
}

function applyDiscountRule(baseAmount: number, rule?: DiscountRule): number {
  if (rule?.discountType === RsDiscountType.Percentage) {
    return baseAmount * (1 - rule.discountValue / 100)
  }
  if (rule?.discountType === RsDiscountType.FlatAmount) {
    return Math.max(0, baseAmount - rule.discountValue)
  }
  return baseAmount
}

/**
 * Given an add-on group's discountMode and the available discount sources,
 * returns the effective discount rule to apply.
 *
 * - Independent → group's own billingCycleDiscounts (or inline entry discount)
 * - InheritTier → mirror the selected tier's billing-cycle discount
 * - null        → no discount (add-ons without a discountMode are never discounted)
 */
function resolveAddOnDiscountRule(
  group: RsOfferingOptionGroup,
  inlineEntryDiscount: DiscountRule | null,
  selectedBillingCycle: RsBillingCycle,
  tierBillingCycleDiscounts: RsServiceSubscriptionTier['billingCycleDiscounts'],
): DiscountRule | null {
  if (group.discountMode === RsDiscountMode.Independent) {
    // Prefer the inline discount on the price entry; fall back to the group-level discount
    if (inlineEntryDiscount) return inlineEntryDiscount
    const matchingGroupDiscount = group.billingCycleDiscounts.find(
      (d) => d.billingCycle === selectedBillingCycle,
    )
    return matchingGroupDiscount?.discountRule ?? null
  }

  if (group.discountMode === RsDiscountMode.InheritTier) {
    const matchingTierDiscount = tierBillingCycleDiscounts.find(
      (d) => d.billingCycle === selectedBillingCycle,
    )
    return matchingTierDiscount?.discountRule ?? null
  }

  // discountMode is null → no discount for this add-on
  return null
}

/**
 * Resolves the recurring price for an option group given the active tier and
 * billing cycle.
 *
 * Price resolution priority:
 *  1. `group.standalonePricing.recurringPricing` — per-cycle entries with inline discounts
 *     (fallback within: Monthly entry + group.billingCycleDiscounts)
 *  2. `group.price` (legacy flat) + `group.billingCycleDiscounts`
 *  3. `group.tierDependentPricing` → matching tier → exact billingCycle entry
 *     (fallback within: Monthly entry + group.billingCycleDiscounts)
 *
 * Discount resolution (applied after price is found):
 *  - Non-add-on groups: use inline entry discount or group.billingCycleDiscounts
 *  - Add-on groups: determined by `discountMode` via resolveAddOnDiscountRule
 *
 * Returns `{ baseAmount: null }` when data is insufficient → caller marks isPending.
 */
function resolveOptionGroupRecurringPrice(
  group: RsOfferingOptionGroup,
  selectedTierId: string,
  selectedBillingCycle: RsBillingCycle,
  tierBillingCycleDiscounts: RsServiceSubscriptionTier['billingCycleDiscounts'],
): ResolvedGroupPrice {
  let baseAmount: number | null = null
  let inlineEntryDiscount: DiscountRule | null = null

  // ── Path 1: standalonePricing.recurringPricing (per-cycle, newest API shape) ──
  const standalonePricingEntries = group.standalonePricing?.recurringPricing
  if (standalonePricingEntries?.length) {
    const exactCycleEntry = standalonePricingEntries.find(
      (rp) => rp.billingCycle === selectedBillingCycle,
    )
    if (exactCycleEntry) {
      baseAmount = toNumber(exactCycleEntry.amount)
      inlineEntryDiscount = exactCycleEntry.discount ?? null
    } else {
      // Fallback: use Monthly base + group-level billing-cycle discount
      const monthlyFallbackEntry = standalonePricingEntries.find(
        (rp) => rp.billingCycle === RsBillingCycle.Monthly,
      )
      if (monthlyFallbackEntry) {
        baseAmount = toNumber(monthlyFallbackEntry.amount)
        const matchingCycleDiscount = group.billingCycleDiscounts.find(
          (d) => d.billingCycle === selectedBillingCycle,
        )
        inlineEntryDiscount = matchingCycleDiscount?.discountRule ?? null
      }
    }
  }

  // ── Path 2: legacy flat price ──────────────────────────────────────────────
  else if (group.price !== null && group.price !== undefined) {
    baseAmount = toNumber(group.price)
    const matchingCycleDiscount = group.billingCycleDiscounts.find(
      (d) => d.billingCycle === selectedBillingCycle,
    )
    inlineEntryDiscount = matchingCycleDiscount?.discountRule ?? null
  }

  // ── Path 3: tier-dependent pricing ────────────────────────────────────────
  else {
    const matchingTierPricing = (group.tierDependentPricing ?? []).find(
      (tp) => tp.tierId === selectedTierId,
    )
    if (!matchingTierPricing) return { baseAmount: null, discountRule: null }

    const exactCyclePricing = matchingTierPricing.recurringPricing.find(
      (rp) => rp.billingCycle === selectedBillingCycle,
    )
    if (exactCyclePricing) {
      baseAmount = toNumber(exactCyclePricing.amount)
      inlineEntryDiscount = exactCyclePricing.discount ?? null
    } else {
      // Fallback: Monthly base + group-level billing-cycle discount
      const monthlyFallbackPricing = matchingTierPricing.recurringPricing.find(
        (rp) => rp.billingCycle === RsBillingCycle.Monthly,
      )
      if (!monthlyFallbackPricing) return { baseAmount: null, discountRule: null }

      baseAmount = toNumber(monthlyFallbackPricing.amount)
      const matchingCycleDiscount = group.billingCycleDiscounts.find(
        (d) => d.billingCycle === selectedBillingCycle,
      )
      inlineEntryDiscount = matchingCycleDiscount?.discountRule ?? null
    }
  }

  if (baseAmount === null) return { baseAmount: null, discountRule: null }

  // ── Discount resolution ────────────────────────────────────────────────────
  const discountRule = group.isAddOn
    ? resolveAddOnDiscountRule(
        group,
        inlineEntryDiscount,
        selectedBillingCycle,
        tierBillingCycleDiscounts,
      )
    : inlineEntryDiscount

  return { baseAmount, discountRule }
}

// ─── Engine ───────────────────────────────────────────────────────────────────

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

  // ── 1. Tier base price ─────────────────────────────────────────────────────
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
      recurringSubtotal += tierBaseAmount

      const tierBillingCycleDiscount = selectedTier.billingCycleDiscounts.find(
        (d) => d.billingCycle === selectedBillingCycle,
      )

      if (tierBillingCycleDiscount) {
        const discountedTierAmount = applyDiscountRule(
          tierBaseAmount,
          tierBillingCycleDiscount.discountRule,
        )
        const tierSavedAmount = tierBaseAmount - discountedTierAmount
        recurringTotal += discountedTierAmount
        if (tierSavedAmount > 0) {
          appliedDiscounts.push({
            sourceId: selectedTier.id,
            sourceName: selectedTier.name,
            source: 'tier',
            discountType: tierBillingCycleDiscount.discountRule.discountType,
            discountValue: tierBillingCycleDiscount.discountRule.discountValue,
            savedAmount: tierSavedAmount,
          })
        }
      } else {
        recurringTotal += tierBaseAmount
      }
    }
  }

  // ── 2. Active option groups ────────────────────────────────────────────────
  const tierBillingCycleDiscounts = selectedTier?.billingCycleDiscounts ?? []
  const activeOptionGroups = offering.optionGroups.filter((g) => activeGroupIds.has(g.id))

  for (const group of activeOptionGroups) {
    if (group.costType === RsGroupCostType.Setup) {
      // ── SETUP: one-time fee, no billing-cycle discount ─────────────────────
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
      // ── RECURRING (or costType: null treated as recurring) ─────────────────
      const { baseAmount, discountRule } = resolveOptionGroupRecurringPrice(
        group,
        selectedTierId,
        selectedBillingCycle,
        tierBillingCycleDiscounts,
      )

      if (baseAmount === null) {
        console.warn(
          `[calculateTotals] RECURRING group "${group.name}" (${group.id}) has no price for tier=${selectedTierId} cycle=${selectedBillingCycle} — marking pending`,
        )
        isPending = true
        continue
      }

      recurringSubtotal += baseAmount

      if (discountRule) {
        const discountedGroupAmount = applyDiscountRule(baseAmount, discountRule)
        const groupSavedAmount = baseAmount - discountedGroupAmount
        recurringTotal += discountedGroupAmount
        if (groupSavedAmount > 0) {
          appliedDiscounts.push({
            sourceId: group.id,
            sourceName: group.name,
            source: 'option-group',
            discountType: discountRule.discountType,
            discountValue: discountRule.discountValue,
            savedAmount: groupSavedAmount,
          })
        }
      } else {
        recurringTotal += baseAmount
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
