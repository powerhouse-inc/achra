import type {
  DebtLineItem,
  Service,
  ServiceGroup,
  SubscriptionInstanceState,
} from "../gen/schema/types.js";

// ─── Constants ──────────────────────────────────────────────

export const BILLING_CYCLE_DAYS: Record<string, number> = {
  MONTHLY: 30,
  QUARTERLY: 91,
  SEMI_ANNUAL: 182,
  ANNUAL: 365,
  ONE_TIME: 0,
};

// ─── Accrual period helper ─────────────────────────────────
// Pure: takes an ISO timestamp + AccrualCycle, returns the ISO timestamp one
// period later. Calendar-aware for MONTHLY+ (so "+1 month" handles short/long
// months correctly); fixed-duration for HOURLY/DAILY/WEEKLY.
export function addAccrualPeriod(fromISO: string, cycle: string): string {
  const d = new Date(fromISO);
  switch (cycle) {
    case "HOURLY":
      d.setUTCHours(d.getUTCHours() + 1);
      return d.toISOString();
    case "DAILY":
      d.setUTCDate(d.getUTCDate() + 1);
      return d.toISOString();
    case "WEEKLY":
      d.setUTCDate(d.getUTCDate() + 7);
      return d.toISOString();
    case "MONTHLY":
      d.setUTCMonth(d.getUTCMonth() + 1);
      return d.toISOString();
    case "QUARTERLY":
      d.setUTCMonth(d.getUTCMonth() + 3);
      return d.toISOString();
    case "SEMI_ANNUAL":
      d.setUTCMonth(d.getUTCMonth() + 6);
      return d.toISOString();
    case "ANNUAL":
      d.setUTCFullYear(d.getUTCFullYear() + 1);
      return d.toISOString();
    default:
      // Unknown cycle: behave as MONTHLY to stay safe.
      d.setUTCMonth(d.getUTCMonth() + 1);
      return d.toISOString();
  }
}

// ─── Accrual period anchor ─────────────────────────────────
// Returns the start timestamp of the accrual period that `now` falls into,
// given the metric's `lastAccrualDate` (= start of previous period boundary).
// We trust ACCRUE_METRIC_USAGE to keep `lastAccrualDate` walking forward at
// every period boundary, so when a usage update fires, the current period
// started at `lastAccrualDate`. Falls back to `now` when never accrued.
export function currentAccrualPeriodStart(
  metric: {
    lastAccrualDate?: string | null;
  },
  now: string,
): string {
  return metric.lastAccrualDate ?? now;
}

// ─── Date helpers ───────────────────────────────────────────

function daysBetween(a: string, b: string): number {
  return (
    (new Date(b).getTime() - new Date(a).getTime()) / (1000 * 60 * 60 * 24)
  );
}

// ─── Core billing functions ─────────────────────────────────

/**
 * Adds the billing cycle duration to a date.
 * Returns ISO date string.
 */
export function calculateNextBillingDate(
  fromDate: string,
  billingCycle: string,
): string {
  const days = BILLING_CYCLE_DAYS[billingCycle] || 30;
  if (days <= 0) return fromDate;
  const d = new Date(fromDate);
  d.setDate(d.getDate() + days);
  return d.toISOString();
}

/**
 * Core proration formula: (remainingDays / totalCycleDays) × amount
 *
 * D-1: mid-cycle add = prorated debit
 * D-2: mid-cycle remove = prorated credit (same formula, reversed direction)
 */
export function calculateProratedCost(
  amount: number,
  cycleStart: string,
  cycleEnd: string,
  effectiveDate: string,
): number {
  const totalDays = daysBetween(cycleStart, cycleEnd);
  const remainingDays = daysBetween(effectiveDate, cycleEnd);
  if (totalDays <= 0 || remainingDays <= 0) return 0;
  return (remainingDays / totalDays) * amount;
}

/**
 * Per-metric overage cost.
 * Formula: max(0, currentUsage - freeLimit) × unitCost.amount
 * Capped at (paidLimit - freeLimit) if paidLimit is defined.
 */
export function calculateOverageCost(metric: {
  currentUsage: number;
  freeLimit?: number | null;
  paidLimit?: number | null;
  unitCost?: { amount: number } | null;
}): number {
  if (!metric.unitCost) return 0;
  const freeLimit = metric.freeLimit ?? 0;
  let overage = Math.max(0, metric.currentUsage - freeLimit);
  if (metric.paidLimit) {
    // Cap to the paid band (paidLimit - freeLimit). Floor at 0 to defend
    // against misconfigured metrics where paidLimit < freeLimit, which
    // would otherwise produce a negative cost.
    const paidBand = Math.max(0, metric.paidLimit - freeLimit);
    overage = Math.min(overage, paidBand);
  }
  return overage * metric.unitCost.amount;
}

/**
 * Find a service by ID across both flat services and services nested in groups.
 * Returns the service or undefined if not found.
 */
export function findServiceById(
  serviceId: string,
  services: readonly Service[],
  serviceGroups: readonly ServiceGroup[],
): Service | undefined {
  const flat = services.find((s) => s.id === serviceId);
  if (flat) return flat;
  for (const group of serviceGroups) {
    const grouped = group.services.find((s) => s.id === serviceId);
    if (grouped) return grouped;
  }
  return undefined;
}

// ─── Debt line item helpers (spec §6.1) ─────────────────────
//
// The slice array `state.debtLineItems` is the canonical ledger. The scalars
// `totalDebt`, `totalCredit`, `currentCycleOverage` are cached aggregates.
// Every reducer that mutates a slice MUST go through these helpers so the
// invariant `totalDebt === sum(slices.debitAmount)` etc. holds at the end of
// every operation.

/**
 * Append a slice to the ledger and update cached aggregates.
 * Use for any slice creation: SETUP/SUBSCRIPTION_FEE at activation/settle/
 * mid-cycle change, DYNAMIC at first overage, etc.
 *
 * settledAmount on a new slice is always 0, so totalCredit is unchanged here.
 *
 * `creditApplied` defaults to 0 if the caller omits it — this lets
 * existing call sites stay compact. APPLY_CREDIT mutates it in-place
 * when credit lands on a slice, so it tracks cumulative credit applied
 * (separate from settledAmount, which combines cash payments + credit).
 */
export function appendDebtSlice(
  state: SubscriptionInstanceState,
  slice: Omit<DebtLineItem, "creditApplied"> &
    Partial<Pick<DebtLineItem, "creditApplied">>,
): void {
  // Origin gate: throws if a reducer accidentally tries to emit a reserved
  // origin (ESTIMATED_USAGE / RECONCILIATION) before its reducer logic
  // exists. This makes the BA Q2 reserved-with-throw pattern actually
  // load-bearing — without this call, the helper was conceptual.
  assertEmittableOrigin(slice.origin);
  const fullSlice: DebtLineItem = {
    ...slice,
    creditApplied: slice.creditApplied ?? 0,
  };
  state.debtLineItems.push(fullSlice);
  state.totalDebt = (state.totalDebt ?? 0) + fullSlice.debitAmount;
  if (
    fullSlice.origin === "DYNAMIC" &&
    !fullSlice.frozen &&
    state.currentBillingCycleStart &&
    fullSlice.chargedAt >= state.currentBillingCycleStart
  ) {
    state.currentCycleOverage =
      (state.currentCycleOverage ?? 0) + fullSlice.debitAmount;
  }
}

/**
 * Mutate an active DYNAMIC slice's debitAmount during the live-update model.
 * Used by UPDATE_METRIC_USAGE (and INCREMENT/DECREMENT) when usage changes
 * within the active accrual period.
 *
 * Guard: only call on unfrozen DYNAMIC slices. Frozen slices are immutable.
 */
export function updateDynamicSliceAmount(
  state: SubscriptionInstanceState,
  slice: DebtLineItem,
  newDebitAmount: number,
): void {
  const delta = newDebitAmount - slice.debitAmount;
  slice.debitAmount = newDebitAmount;
  state.totalDebt = (state.totalDebt ?? 0) + delta;
  if (!slice.frozen) {
    state.currentCycleOverage = (state.currentCycleOverage ?? 0) + delta;
  }
}

/**
 * Freeze an active DYNAMIC slice at the accrual-cycle boundary.
 * Idempotent: calling on an already-frozen slice is a no-op.
 *
 * The frozen slice's debitAmount is whatever UPDATE_METRIC_USAGE last set it
 * to. Freezing removes it from currentCycleOverage but keeps it in totalDebt.
 */
export function freezeDynamicSlice(
  state: SubscriptionInstanceState,
  slice: DebtLineItem,
): void {
  if (slice.frozen) return;
  slice.frozen = true;
  if (
    state.currentBillingCycleStart &&
    slice.chargedAt >= state.currentBillingCycleStart
  ) {
    state.currentCycleOverage =
      (state.currentCycleOverage ?? 0) - slice.debitAmount;
  }
}

// ─── Origin emittability (O-02) ─────────────────────────────
//
// `DebtOriginType` declares 5 values per BA Q2: SETUP, SUBSCRIPTION_FEE,
// DYNAMIC, ESTIMATED_USAGE, RECONCILIATION. MVP reducers emit only the
// first three. ESTIMATED_USAGE and RECONCILIATION are reserved for
// utility-style billing (where billing cycle < accrual cycle) and
// reconciliation true-ups; both are explicitly out of scope today.
//
// This helper is load-bearing documentation: any new reducer that branches
// on origin should funnel through `assertEmittableOrigin` so the type
// system surfaces what's reserved without requiring a walkthrough read.

export const EMITTABLE_ORIGINS = [
  "SETUP",
  "SUBSCRIPTION_FEE",
  "DYNAMIC",
] as const;

export type EmittableOrigin = (typeof EMITTABLE_ORIGINS)[number];

export function assertEmittableOrigin(origin: string): EmittableOrigin {
  if (
    origin === "SETUP" ||
    origin === "SUBSCRIPTION_FEE" ||
    origin === "DYNAMIC"
  ) {
    return origin;
  }
  if (origin === "ESTIMATED_USAGE" || origin === "RECONCILIATION") {
    throw new Error(
      `DebtOriginType '${origin}' is reserved for utility-style billing and reconciliation; not yet supported in MVP reducers.`,
    );
  }
  throw new Error(`Unknown DebtOriginType: ${origin}`);
}

/**
 * Find the active (unfrozen, not-yet-paid) DYNAMIC slice for a given metric.
 *
 * "Active" excludes FULLY_PAID slices: once an operator has collected for an
 * overage, that slice is closed for mutation even if not yet frozen by the
 * accrual boundary. Subsequent usage updates within the same period must
 * open a new slice for the marginal charge.
 *
 * At any moment there is at most one such slice per metric — accrual
 * freezes the prior one at the period boundary before usage updates can
 * open a new one.
 */
export function findActiveDynamicSlice(
  state: SubscriptionInstanceState,
  metricId: string,
): DebtLineItem | undefined {
  return state.debtLineItems.find(
    (s) =>
      s.origin === "DYNAMIC" &&
      !s.frozen &&
      s.status !== "FULLY_PAID" &&
      s.sourceMetricId === metricId,
  );
}
