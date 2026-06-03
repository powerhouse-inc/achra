import { generateId } from "document-model/core";
import type {
  ServiceOfferingState,
  ServiceSubscriptionTier,
  Service as SOService,
  ServiceUsageLimit,
} from "../../../document-models/service-offering/v1/gen/schema/types.js";
import type {
  PriceBreakdown,
  OptionGroupBreakdown,
} from "../../../document-models/service-offering/v1/src/utils.js";
import type {
  InitializeSubscriptionInput,
  InitializeServiceGroupInput,
  InitializeServiceInput,
  InitializeMetricInput,
  DiscountInfoInitInput,
  DiscountType,
  BillingCycle as SIBillingCycle,
  AccrualCycle,
  MetricType,
} from "../../../document-models/subscription-instance/v1/gen/schema/types.js";

export interface MapOfferingOptions {
  /** The service offering state to import from */
  offering: ServiceOfferingState;
  /** The selected tier ID */
  tierId: string;
  /** The selected global billing cycle */
  selectedBillingCycle: SIBillingCycle;
  /** Customer info */
  customerId?: string;
  customerName?: string;
  customerEmail?: string;
  /** Timestamp for createdAt */
  createdAt: string;
  /** Computed price breakdown from getUserSelectionPriceBreakdown */
  priceBreakdown: PriceBreakdown;
  /** Document header UUID of the service offering — preferred over offering.id (PHID) */
  serviceOfferingDocumentId?: string;
}

/**
 * Maps a Service Offering state to an InitializeSubscriptionInput.
 * This is a one-time snapshot — the SI lives independently after creation.
 *
 * Logic:
 * 1. Find the selected tier and resolve pricing from priceBreakdown
 * 2. Map option group breakdowns from priceBreakdown as service groups
 * 3. Map add-on breakdowns from priceBreakdown as optional service groups
 * 4. Map remaining standalone services with tier service levels and usage limits
 * 5. Calculate tier price from breakdown or service group sums (CALCULATED) or manual price
 */
export function mapOfferingToSubscription(
  options: MapOfferingOptions,
): InitializeSubscriptionInput {
  const {
    offering,
    tierId,
    selectedBillingCycle,
    customerId,
    customerName,
    customerEmail,
    createdAt,
    priceBreakdown,
  } = options;

  const tier = offering.tiers.find((t) => t.id === tierId);
  if (!tier) {
    throw new Error(`Tier ${tierId} not found in offering`);
  }

  const currency = priceBreakdown.tierCurrency || tier.pricing.currency;
  const pricingMode = tier.pricingMode || "MANUAL_OVERRIDE";

  // Track which services are accounted for in groups
  const groupedServiceIds = new Set<string>();

  // 1. Map option group and add-on breakdowns from priceBreakdown as service groups
  const serviceGroups: InitializeServiceGroupInput[] = [];
  mapBreakdownGroups(
    offering,
    tier,
    priceBreakdown,
    currency,
    groupedServiceIds,
    serviceGroups,
  );

  // Build set of option group IDs that are part of the breakdown (user-selected)
  const breakdownGroupIds = new Set<string>([
    ...priceBreakdown.optionGroupBreakdowns.map((b) => b.optionGroupId),
    ...priceBreakdown.setupGroupBreakdowns.map((b) => b.optionGroupId),
    ...priceBreakdown.addOnBreakdowns.map((b) => b.optionGroupId),
  ]);

  // 3. Map remaining standalone services (not in any group breakdown)
  // Only include services that either have no optionGroupId (truly standalone)
  // or belong to a selected option group — prevents addon services from leaking
  // into the subscription when the user didn't select that addon.
  const standaloneServices = offering.services
    .filter((s) => !groupedServiceIds.has(s.id))
    .filter((s) => !s.optionGroupId || breakdownGroupIds.has(s.optionGroupId))
    .filter((svc) => {
      const level = tier.serviceLevels.find((sl) => sl.serviceId === svc.id);
      return (
        level &&
        level.level !== "NOT_INCLUDED" &&
        level.level !== "NOT_APPLICABLE"
      );
    })
    .map((svc) => mapServiceToInput(svc, tier, currency, selectedBillingCycle));

  // Calculate tier price
  let tierPrice: number | undefined;
  if (pricingMode === "CALCULATED") {
    tierPrice = serviceGroups.reduce(
      (sum, grp) => sum + (grp.recurringAmount ?? 0),
      0,
    );
  } else {
    tierPrice =
      priceBreakdown.tierCycleTotal ?? tier.pricing.amount ?? undefined;
  }

  return {
    customerId: customerId ?? undefined,
    customerName: customerName ?? undefined,
    customerEmail: customerEmail ?? undefined,
    serviceOfferingId:
      options.serviceOfferingDocumentId ?? offering.id ?? undefined,
    tierName: tier.name,
    tierPricingOptionId: tier.id,
    tierPrice,
    tierCurrency: currency,
    tierPricingMode: pricingMode,
    selectedBillingCycle,
    globalCurrency: currency,
    autoRenew: true,
    createdAt,
    services: standaloneServices,
    serviceGroups,
  };
}

/**
 * Maps price breakdown option group and add-on breakdowns
 * into subscription service groups.
 */
function mapBreakdownGroups(
  offering: ServiceOfferingState,
  tier: ServiceSubscriptionTier,
  breakdown: PriceBreakdown,
  globalCurrency: string,
  groupedServiceIds: Set<string>,
  serviceGroups: InitializeServiceGroupInput[],
): void {
  // Non-add-on option groups (regular + setup)
  const allOptionGroupBreakdowns: OptionGroupBreakdown[] = [
    ...breakdown.optionGroupBreakdowns,
    ...breakdown.setupGroupBreakdowns,
  ];

  for (const ogBreakdown of allOptionGroupBreakdowns) {
    const og = offering.optionGroups.find(
      (g) => g.id === ogBreakdown.optionGroupId,
    );
    if (!og || og.isAddOn) continue;

    const services = offering.services
      .filter((s) => s.optionGroupId === og.id)
      .filter((s) => {
        const level = tier.serviceLevels.find((sl) => sl.serviceId === s.id);
        return (
          level &&
          level.level !== "NOT_INCLUDED" &&
          level.level !== "NOT_APPLICABLE"
        );
      });
    if (services.length === 0) continue;
    services.forEach((s) => groupedServiceIds.add(s.id));

    serviceGroups.push({
      id: generateId(),
      name: og.name,
      optional: false,
      costType: og.costType ?? undefined,
      recurringAmount: ogBreakdown.recurringAmount || undefined,
      recurringCurrency: ogBreakdown.currency || globalCurrency,
      recurringBillingCycle: ogBreakdown.effectiveBillingCycle,
      recurringDiscount: mapBreakdownDiscount(
        ogBreakdown.discount,
        og.discountMode === "INHERIT_TIER"
          ? "TIER_INHERITED"
          : "GROUP_INDEPENDENT",
      ),
      setupAmount: ogBreakdown.setupCost ?? undefined,
      setupCurrency: ogBreakdown.setupCostCurrency ?? undefined,
      services: services.map((svc) =>
        mapServiceToInput(
          svc,
          tier,
          globalCurrency,
          ogBreakdown.effectiveBillingCycle,
        ),
      ),
    });
  }

  // Add-on option groups
  for (const aoBreakdown of breakdown.addOnBreakdowns) {
    const og = offering.optionGroups.find(
      (g) => g.id === aoBreakdown.optionGroupId,
    );
    if (!og) continue;

    const services = offering.services
      .filter((s) => s.optionGroupId === og.id)
      .filter((s) => {
        const level = tier.serviceLevels.find((sl) => sl.serviceId === s.id);
        return (
          level &&
          level.level !== "NOT_INCLUDED" &&
          level.level !== "NOT_APPLICABLE"
        );
      });
    if (services.length === 0) continue;
    services.forEach((s) => groupedServiceIds.add(s.id));

    serviceGroups.push({
      id: generateId(),
      name: og.name,
      optional: true,
      costType: og.costType ?? undefined,
      recurringAmount: aoBreakdown.recurringAmount || undefined,
      recurringCurrency: aoBreakdown.currency || globalCurrency,
      recurringBillingCycle: aoBreakdown.selectedBillingCycle,
      recurringDiscount: mapBreakdownDiscount(
        aoBreakdown.discount,
        og.discountMode === "INHERIT_TIER"
          ? "TIER_INHERITED"
          : "GROUP_INDEPENDENT",
      ),
      setupAmount: aoBreakdown.setupCost ?? undefined,
      setupCurrency: aoBreakdown.setupCostCurrency ?? undefined,
      services: services.map((svc) =>
        mapServiceToInput(
          svc,
          tier,
          globalCurrency,
          aoBreakdown.selectedBillingCycle,
        ),
      ),
    });
  }
}

/**
 * Maps a single service from the offering to an InitializeServiceInput.
 * Includes name, description, customValue from tier service levels,
 * billing cycle, and usage metrics.
 */
function mapServiceToInput(
  svc: SOService,
  tier: ServiceSubscriptionTier,
  globalCurrency: string,
  billingCycle: SIBillingCycle,
): InitializeServiceInput {
  const level = tier.serviceLevels.find((sl) => sl.serviceId === svc.id);
  const metrics = mapUsageLimits(svc.id, tier.usageLimits, globalCurrency);

  return {
    id: generateId(),
    name: svc.title,
    description: svc.description ?? null,
    customValue: level?.customValue ?? null,
    recurringBillingCycle: billingCycle,
    metrics,
  };
}

/**
 * Maps a resolved discount from the price breakdown to a DiscountInfoInitInput,
 * or returns undefined if no discount.
 */
function mapBreakdownDiscount(
  discount: {
    discountType: string;
    discountValue: number;
    originalAmount: number;
    discountedAmount: number;
  } | null,
  source: "TIER_INHERITED" | "GROUP_INDEPENDENT",
): DiscountInfoInitInput | undefined {
  if (!discount) return undefined;
  return {
    originalAmount: discount.originalAmount,
    discountType: discount.discountType as DiscountType,
    discountValue: discount.discountValue,
    source,
  };
}

/**
 * Maps usage limits from the tier to InitializeMetricInput for a given service.
 */
function mapUsageLimits(
  serviceId: string,
  usageLimits: ServiceUsageLimit[],
  globalCurrency: string,
): InitializeMetricInput[] {
  const limits = usageLimits.filter((ul) => ul.serviceId === serviceId);

  return limits.map((ul) => {
    // Legacy fallback: tolerate older SO docs that still carry `resetCycle`
    // and lack `metricType` / `accrualCycle`. The SO editor now requires both
    // fields explicitly (TheMatrix.tsx metric modal), so this `??` fallback
    // is only here for documents created before that change.
    // TODO: remove once all live SO documents have been re-saved.
    const legacyReset = (ul as { resetCycle?: string | null }).resetCycle;
    const accrualCycle: AccrualCycle =
      ul.accrualCycle ??
      (legacyReset && legacyReset !== "NONE"
        ? (legacyReset as AccrualCycle)
        : "MONTHLY");
    const metricType: MetricType = ul.metricType ?? "NON_CUMULATIVE";

    return {
      id: generateId(),
      name: ul.metric,
      unitName: ul.unitName ?? "units",
      freeLimit: ul.freeLimit ?? null,
      paidLimit: ul.paidLimit ?? null,
      currentUsage: 0,
      metricType,
      accrualCycle,
      unitCostAmount: ul.unitPrice ?? undefined,
      unitCostCurrency: ul.unitPriceCurrency ?? globalCurrency,
      unitCostBillingCycle: "MONTHLY" as const,
    };
  });
}
