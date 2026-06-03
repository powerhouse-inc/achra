import type {
  SubscriptionInstanceState,
  ServiceMetric,
  DiscountInfo,
} from "../../../document-models/subscription-instance/v1/gen/schema/types.js";
import { calculateOverageCost } from "../../../document-models/subscription-instance/v1/src/utils.js";

// ─── Formatting ─────────────────────────────────────────────

export function formatCurrency(amount: number, currency: string): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency || "USD",
  }).format(amount);
}

export function formatDate(date: string | null | undefined): string {
  if (!date) return "—";
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const BILLING_CYCLE_SUFFIX: Record<string, string> = {
  MONTHLY: "/mo",
  QUARTERLY: "/qtr",
  SEMI_ANNUAL: "/6mo",
  ANNUAL: "/yr",
  ONE_TIME: "",
};

export function formatBillingCycleSuffix(
  cycle: string | null | undefined,
): string {
  if (!cycle) return "";
  return BILLING_CYCLE_SUFFIX[cycle] || "";
}

export const BILLING_CYCLE_LABELS: Record<string, string> = {
  MONTHLY: "monthly",
  QUARTERLY: "quarterly",
  SEMI_ANNUAL: "semi-annually",
  ANNUAL: "annually",
  ONE_TIME: "one-time",
};

// ─── Discount display ───────────────────────────────────────

export function formatDiscountBadge(discount: DiscountInfo): string {
  if (discount.discountType === "PERCENTAGE") {
    return `${discount.discountValue}% off`;
  }
  return `${formatCurrency(discount.discountValue, "USD")} off`;
}

export function getDiscountSourceLabel(source: string): string {
  switch (source) {
    case "TIER_INHERITED":
      return "Tier discount";
    case "GROUP_INDEPENDENT":
      return "Group discount";
    case "BUNDLE":
      return "Bundle discount";
    default:
      return "Discount";
  }
}

// ─── Overage calculation ────────────────────────────────────

export interface MetricOverage {
  metricId: string;
  metricName: string;
  unitName: string;
  currentUsage: number;
  freeLimit: number;
  paidLimit: number | null;
  excess: number;
  unitCostAmount: number;
  unitCostCurrency: string;
  projectedCost: number;
}

export function computeMetricOverage(
  metric: ServiceMetric,
): MetricOverage | null {
  const freeLimit = metric.freeLimit ?? 0;
  const paidLimit = metric.paidLimit ?? null;

  if (freeLimit <= 0 && paidLimit == null) return null;
  if (metric.currentUsage <= freeLimit) return null;
  if (!metric.unitCost) return null;

  // Delegate to doc model util for the cost calculation
  const projectedCost = calculateOverageCost(metric);
  const excess = metric.currentUsage - freeLimit;

  return {
    metricId: metric.id,
    metricName: metric.name,
    unitName: metric.unitName,
    currentUsage: metric.currentUsage,
    freeLimit,
    paidLimit,
    excess,
    unitCostAmount: metric.unitCost.amount,
    unitCostCurrency: metric.unitCost.currency,
    projectedCost,
  };
}

// ─── Group billing breakdown ────────────────────────────────

export interface GroupBillingBreakdown {
  groupId: string;
  groupName: string;
  optional: boolean;
  /** Group-level recurring cost (fixed cost) */
  recurringAmount: number | null;
  recurringCurrency: string;
  recurringCycle: string | null;
  discount: DiscountInfo | null;
  /** Dynamic costs from service metrics */
  metricOverages: MetricOverage[];
  dynamicTotal: number;
}

export interface SetupCostLine {
  name: string;
  amount: number;
  currency: string;
  paid: boolean;
  source: "group" | "service";
}

export interface BillingBreakdown {
  currency: string;
  /** Sum of group recurring costs */
  fixedTotal: number;
  /** Sum of metric overage projections */
  dynamicTotal: number;
  /** fixedTotal + dynamicTotal */
  projectedTotal: number;
  /** Standalone service recurring costs (not in groups) */
  standaloneFixedTotal: number;
  /** Breakdown per service group */
  groupBreakdowns: GroupBillingBreakdown[];
  /** Standalone services with metrics */
  standaloneOverages: MetricOverage[];
  /** All setup costs */
  setupLines: SetupCostLine[];
  setupTotal: number;
  billingCycle: string | null;
}

export function computeBillingBreakdown(
  state: SubscriptionInstanceState,
): BillingBreakdown {
  const currency = state.globalCurrency || state.tierCurrency || "USD";
  const billingCycle = state.selectedBillingCycle || null;

  // Slice-driven payment status: a setup is "paid" only if the corresponding
  // SETUP slice exists in the ledger AND has status FULLY_PAID. Lookup is
  // keyed by (sourceServiceId, sourceGroupId).
  const setupPaidByServiceId = new Set<string>();
  const setupPaidByGroupId = new Set<string>();
  for (const slice of state.debtLineItems) {
    if (slice.origin !== "SETUP" || slice.status !== "FULLY_PAID") continue;
    if (slice.sourceServiceId) setupPaidByServiceId.add(slice.sourceServiceId);
    if (slice.sourceGroupId && !slice.sourceServiceId) {
      setupPaidByGroupId.add(slice.sourceGroupId);
    }
  }

  // Group breakdowns
  const groupBreakdowns: GroupBillingBreakdown[] = [];
  const setupLines: SetupCostLine[] = [];

  for (const group of state.serviceGroups) {
    const metricOverages: MetricOverage[] = [];
    for (const svc of group.services) {
      for (const metric of svc.metrics) {
        const overage = computeMetricOverage(metric);
        if (overage) metricOverages.push(overage);
      }
    }

    const dynamicTotal = metricOverages.reduce(
      (sum, o) => sum + o.projectedCost,
      0,
    );

    groupBreakdowns.push({
      groupId: group.id,
      groupName: group.name,
      optional: group.optional,
      recurringAmount: group.recurringCost?.amount ?? null,
      recurringCurrency: group.recurringCost?.currency ?? currency,
      recurringCycle: group.recurringCost?.billingCycle ?? billingCycle,
      discount: group.recurringCost?.discount ?? null,
      metricOverages,
      dynamicTotal,
    });

    // Collect setup costs from group level
    if (group.setupCost) {
      setupLines.push({
        name: group.name,
        amount: group.setupCost.amount,
        currency: group.setupCost.currency,
        paid: setupPaidByGroupId.has(group.id),
        source: "group",
      });
    }

    // Collect setup costs from services in group
    for (const svc of group.services) {
      if (svc.setupCost) {
        setupLines.push({
          name: `${svc.name || "Service"} (${group.name})`,
          amount: svc.setupCost.amount,
          currency: svc.setupCost.currency,
          paid: setupPaidByServiceId.has(svc.id),
          source: "service",
        });
      }
    }
  }

  // Standalone services (not in groups)
  const standaloneOverages: MetricOverage[] = [];
  let standaloneFixedTotal = 0;

  for (const svc of state.services) {
    if (svc.recurringCost) {
      standaloneFixedTotal += svc.recurringCost.amount;
    }
    for (const metric of svc.metrics) {
      const overage = computeMetricOverage(metric);
      if (overage) standaloneOverages.push(overage);
    }
    if (svc.setupCost) {
      setupLines.push({
        name: svc.name || "Service",
        amount: svc.setupCost.amount,
        currency: svc.setupCost.currency,
        paid: setupPaidByServiceId.has(svc.id),
        source: "service",
      });
    }
  }

  const fixedTotal =
    groupBreakdowns.reduce((sum, g) => sum + (g.recurringAmount ?? 0), 0) +
    standaloneFixedTotal;
  const dynamicTotal =
    groupBreakdowns.reduce((sum, g) => sum + g.dynamicTotal, 0) +
    standaloneOverages.reduce((sum, o) => sum + o.projectedCost, 0);
  const projectedTotal = fixedTotal + dynamicTotal;
  const setupTotal = setupLines.reduce((sum, l) => sum + l.amount, 0);

  return {
    currency,
    fixedTotal,
    dynamicTotal,
    projectedTotal,
    standaloneFixedTotal,
    groupBreakdowns,
    standaloneOverages,
    setupLines,
    setupTotal,
    billingCycle,
  };
}
