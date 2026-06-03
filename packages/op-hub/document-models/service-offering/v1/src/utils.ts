import type {
  BillingCycle,
  OptionGroup,
  ServiceSubscriptionTier,
} from "../gen/schema/types.js";
import type { ServiceOfferingPHState } from "../gen/types.js";

export const BILLING_CYCLE_MONTHS: Record<BillingCycle, number> = {
  MONTHLY: 1,
  QUARTERLY: 3,
  SEMI_ANNUAL: 6,
  ANNUAL: 12,
  ONE_TIME: 0,
};

export interface DiscountBreakdown {
  discountType: string;
  discountValue: number;
  originalAmount: number;
  discountedAmount: number;
}

export interface SetupCostDiscountBreakdown {
  originalAmount: number;
  discountedAmount: number;
  discountType: string;
  discountValue: number;
}

export interface OptionGroupBreakdown {
  optionGroupId: string;
  optionGroupName: string;
  effectiveBillingCycle: BillingCycle;
  monthlyBase: number;
  cycleAmount: number;
  recurringAmount: number;
  currency: string;
  discount: DiscountBreakdown | null;
  setupCost: number | null;
  setupCostCurrency: string | null;
  setupCostDiscount: SetupCostDiscountBreakdown | null;
}

export interface AddOnBreakdown {
  optionGroupId: string;
  optionGroupName: string;
  selectedBillingCycle: BillingCycle;
  monthlyBase: number;
  cycleAmount: number;
  recurringAmount: number;
  currency: string;
  discount: DiscountBreakdown | null;
  setupCost: number | null;
  setupCostCurrency: string | null;
}

export interface PriceBreakdownTotals {
  grandRecurringTotal: number;
}

export interface PriceBreakdown {
  tierCycleTotal: number;
  tierCurrency: string;
  tierMonthlyBase: number;
  optionGroupBreakdowns: OptionGroupBreakdown[];
  setupGroupBreakdowns: OptionGroupBreakdown[];
  addOnBreakdowns: AddOnBreakdown[];
  totals: PriceBreakdownTotals;
}

export interface UserSelection {
  tierId: string;
  billingCycle: BillingCycle;
  optionGroupIds: string[];
  groupBillingCycleOverrides?: Record<string, BillingCycle>;
  addonBillingCycleOverrides?: Record<string, BillingCycle>;
}

function emptyBreakdown(currency: string): PriceBreakdown {
  return {
    tierCycleTotal: 0,
    tierCurrency: currency,
    tierMonthlyBase: 0,
    optionGroupBreakdowns: [],
    setupGroupBreakdowns: [],
    addOnBreakdowns: [],
    totals: { grandRecurringTotal: 0 },
  };
}

function applyDiscount(
  amount: number,
  rule: { discountType: string; discountValue: number },
): { discountedAmount: number; discount: DiscountBreakdown } {
  let discountedAmount: number;
  if (rule.discountType === "PERCENTAGE") {
    discountedAmount = amount * (1 - rule.discountValue / 100);
  } else {
    discountedAmount = amount - rule.discountValue;
  }
  discountedAmount = Math.max(0, Math.round(discountedAmount * 100) / 100);
  return {
    discountedAmount,
    discount: {
      discountType: rule.discountType,
      discountValue: rule.discountValue,
      originalAmount: amount,
      discountedAmount,
    },
  };
}

function resolveGroupPricing(
  group: OptionGroup,
  tier: ServiceSubscriptionTier,
  effectiveCycle: BillingCycle,
  globalCurrency: string,
): {
  monthlyBase: number;
  cycleAmount: number;
  recurringAmount: number;
  currency: string;
  discount: DiscountBreakdown | null;
  setupCost: number | null;
  setupCostCurrency: string | null;
  setupCostDiscount: SetupCostDiscountBreakdown | null;
} {
  const months = BILLING_CYCLE_MONTHS[effectiveCycle];

  // Get pricing source: tier-dependent first, then standalone
  const tierPricing = group.tierDependentPricing?.find(
    (tp) => tp.tierId === tier.id,
  );
  const pricing =
    tierPricing?.recurringPricing ||
    group.standalonePricing?.recurringPricing ||
    [];

  // Monthly base
  const monthlyOption = pricing.find((p) => p.billingCycle === "MONTHLY");
  const monthlyBase = monthlyOption?.amount ?? 0;

  // Price for effective cycle — amounts represent monthly rates,
  // so multiply by months to get the total for the billing period
  const cycleOption = pricing.find((p) => p.billingCycle === effectiveCycle);
  const cycleAmount = (cycleOption?.amount ?? monthlyBase) * (months || 1);

  let discount: DiscountBreakdown | null = null;
  let recurringAmount = cycleAmount;

  // Check for discount on the cycle option itself
  const optionDiscount = cycleOption?.discount;
  if (optionDiscount && optionDiscount.discountValue > 0) {
    const result = applyDiscount(cycleAmount, optionDiscount);
    recurringAmount = result.discountedAmount;
    discount = result.discount;
  }

  // If no direct discount, check tier billing cycle discounts for inherited groups
  if (!discount && group.discountMode === "INHERIT_TIER") {
    const tierDiscount = tier.billingCycleDiscounts.find(
      (d) => d.billingCycle === effectiveCycle,
    );
    if (tierDiscount && tierDiscount.discountRule.discountValue > 0) {
      const result = applyDiscount(cycleAmount, tierDiscount.discountRule);
      recurringAmount = result.discountedAmount;
      discount = result.discount;
    }
  }

  // Setup cost — skip entirely when the tier is excluded from setup fees
  let setupCost: number | null = null;
  let setupCostCurrency: string | null = null;
  let setupCostDiscount: SetupCostDiscountBreakdown | null = null;

  if (!tier.excludeFromSetupFee) {
    const setupCostSource =
      tierPricing?.setupCost || group.standalonePricing?.setupCost;
    setupCost = setupCostSource?.amount ?? null;
    setupCostCurrency = setupCostSource?.currency ?? null;

    if (
      setupCostSource?.discount &&
      setupCostSource.discount.discountValue > 0
    ) {
      const original = setupCostSource.amount;
      const rule = setupCostSource.discount;
      let discounted: number;
      if (rule.discountType === "PERCENTAGE") {
        discounted = original * (1 - rule.discountValue / 100);
      } else {
        discounted = original - rule.discountValue;
      }
      discounted = Math.max(0, Math.round(discounted * 100) / 100);
      setupCostDiscount = {
        originalAmount: original,
        discountedAmount: discounted,
        discountType: rule.discountType,
        discountValue: rule.discountValue,
      };
    }
  }

  const priceCurrency =
    cycleOption?.currency || monthlyOption?.currency || globalCurrency;

  return {
    monthlyBase,
    cycleAmount,
    recurringAmount,
    currency: priceCurrency,
    discount,
    setupCost,
    setupCostCurrency,
    setupCostDiscount,
  };
}

function computeGroupBreakdown(
  group: OptionGroup,
  tier: ServiceSubscriptionTier,
  globalBillingCycle: BillingCycle,
  globalCurrency: string,
  overrides?: Record<string, BillingCycle>,
): OptionGroupBreakdown {
  const effectiveCycle = overrides?.[group.id] || globalBillingCycle;
  const pricing = resolveGroupPricing(
    group,
    tier,
    effectiveCycle,
    globalCurrency,
  );

  return {
    optionGroupId: group.id,
    optionGroupName: group.name,
    effectiveBillingCycle: effectiveCycle,
    ...pricing,
  };
}

function computeAddOnBreakdown(
  group: OptionGroup,
  tier: ServiceSubscriptionTier,
  globalBillingCycle: BillingCycle,
  globalCurrency: string,
  overrides?: Record<string, BillingCycle>,
): AddOnBreakdown {
  const selectedCycle = overrides?.[group.id] || globalBillingCycle;
  const pricing = resolveGroupPricing(
    group,
    tier,
    selectedCycle,
    globalCurrency,
  );

  return {
    optionGroupId: group.id,
    optionGroupName: group.name,
    selectedBillingCycle: selectedCycle,
    monthlyBase: pricing.monthlyBase,
    cycleAmount: pricing.cycleAmount,
    recurringAmount: pricing.recurringAmount,
    currency: pricing.currency,
    discount: pricing.discount,
    setupCost: pricing.setupCost,
    setupCostCurrency: pricing.setupCostCurrency,
  };
}

export function getUserSelectionPriceBreakdown(
  state: ServiceOfferingPHState,
  selection: UserSelection,
): PriceBreakdown {
  const {
    tierId,
    billingCycle,
    optionGroupIds,
    groupBillingCycleOverrides,
    addonBillingCycleOverrides,
  } = selection;
  const globalState = state.global;

  const tier = globalState.tiers.find((t) => t.id === tierId);
  if (!tier) {
    return emptyBreakdown("USD");
  }

  const currency = tier.pricing.currency || "USD";
  const months = BILLING_CYCLE_MONTHS[billingCycle];

  // Tier cycle total from tier pricing
  const tierMonthlyAmount = tier.pricing.amount ?? 0;
  const tierCycleTotal = tierMonthlyAmount * (months || 1);

  // Only include option groups explicitly selected by the user
  const selectedGroupSet = new Set(optionGroupIds);

  // Sum of monthly base prices across selected regular (non-setup, non-addon) option groups
  const regularGroups = globalState.optionGroups.filter(
    (g) => g.costType !== "SETUP" && !g.isAddOn && selectedGroupSet.has(g.id),
  );
  const tierMonthlyBase = regularGroups.reduce((sum, group) => {
    const tierPricing = group.tierDependentPricing?.find(
      (tp) => tp.tierId === tierId,
    );
    const pricing =
      tierPricing?.recurringPricing ||
      group.standalonePricing?.recurringPricing ||
      [];
    const monthlyOption = pricing.find((p) => p.billingCycle === "MONTHLY");
    return sum + (monthlyOption?.amount ?? 0);
  }, 0);

  // Separate option groups by type (all filtered by user selection)
  const setupGroups = globalState.optionGroups.filter(
    (g) => g.costType === "SETUP" && selectedGroupSet.has(g.id),
  );
  const addonGroups = globalState.optionGroups.filter(
    (g) => g.isAddOn && selectedGroupSet.has(g.id),
  );

  const optionGroupBreakdowns = regularGroups.map((group) =>
    computeGroupBreakdown(
      group,
      tier,
      billingCycle,
      currency,
      groupBillingCycleOverrides,
    ),
  );

  const setupGroupBreakdowns = setupGroups.map((group) =>
    computeGroupBreakdown(
      group,
      tier,
      billingCycle,
      currency,
      groupBillingCycleOverrides,
    ),
  );

  const addOnBreakdowns = addonGroups.map((group) =>
    computeAddOnBreakdown(
      group,
      tier,
      billingCycle,
      currency,
      addonBillingCycleOverrides,
    ),
  );

  // Grand recurring total
  const optionGroupRecurring = optionGroupBreakdowns.reduce(
    (sum, b) => sum + b.recurringAmount,
    0,
  );
  const addOnRecurring = addOnBreakdowns.reduce(
    (sum, b) => sum + b.recurringAmount,
    0,
  );
  const grandRecurringTotal =
    tierCycleTotal + optionGroupRecurring + addOnRecurring;

  return {
    tierCycleTotal,
    tierCurrency: currency,
    tierMonthlyBase,
    optionGroupBreakdowns,
    setupGroupBreakdowns,
    addOnBreakdowns,
    totals: {
      grandRecurringTotal,
    },
  };
}
