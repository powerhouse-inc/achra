import type { SubscriptionInstanceMetricsOperations } from "document-models/subscription-instance/v1";
import {
  AccrueMetricUsageMetricNotFoundError,
  AccrueMetricUsageServiceNotFoundError,
  AccrueMissingSliceIdError,
  AddServiceMetricServiceNotFoundError,
  DecrementMetricUsageNotFoundError,
  DecrementMetricUsageServiceNotFoundError,
  IncrementMetricUsageNotFoundError,
  IncrementMetricUsageServiceNotFoundError,
  RemoveServiceMetricNotFoundError,
  RemoveServiceMetricServiceNotFoundError,
  SubscriptionNotActiveAccrueMetricUsageError,
  SubscriptionNotActiveDecrementUsageError,
  SubscriptionNotActiveIncrementUsageError,
  SubscriptionNotActiveUpdateUsageError,
  UpdateMetricNotFoundError,
  UpdateMetricServiceNotFoundError,
  UpdateMetricUsageNotFoundError,
  UpdateMetricUsageServiceNotFoundError,
} from "../../gen/metrics/error.js";
import type {
  ServiceMetric,
  SubscriptionInstanceState,
} from "../../gen/schema/types.js";
import {
  addAccrualPeriod,
  appendDebtSlice,
  calculateOverageCost,
  currentAccrualPeriodStart,
  findActiveDynamicSlice,
  findServiceById,
  freezeDynamicSlice,
  updateDynamicSliceAmount,
} from "../utils.js";

// Live-update helper shared across UPDATE/INCREMENT/DECREMENT.
// Recomputes the metric's overage cost from current usage, then either
// mutates the active DYNAMIC slice's amount or opens a new one. Slice
// creation only happens once overage is non-zero — a metric still under its
// free limit has no slice in the ledger.
function syncMetricSliceToUsage(
  state: SubscriptionInstanceState,
  metric: ServiceMetric,
  newSliceId: string,
  currentTime: string,
): void {
  const newCost = calculateOverageCost(metric);
  const active = findActiveDynamicSlice(state, metric.id);
  if (active) {
    updateDynamicSliceAmount(state, active, newCost);
    return;
  }
  if (newCost <= 0) return;
  appendDebtSlice(state, {
    id: newSliceId,
    origin: "DYNAMIC",
    status: "CHARGED",
    invoiced: false,
    debitAmount: newCost,
    settledAmount: 0,
    currency: metric.unitCost?.currency ?? state.globalCurrency ?? "USD",
    chargedAt: currentTime,
    invoicedAt: null,
    fullyPaidAt: null,
    sourceServiceId: null,
    sourceMetricId: metric.id,
    sourceGroupId: null,
    frozen: false,
    accrualPeriodStart: currentAccrualPeriodStart(metric, currentTime),
    invoiceRef: null,
    lastPaymentRef: null,
    description: `Overage — metric ${metric.name}`,
  });
}

export const subscriptionInstanceMetricsOperations: SubscriptionInstanceMetricsOperations =
  {
    addServiceMetricOperation(state, action) {
      const svc = findServiceById(
        action.input.serviceId,
        state.services,
        state.serviceGroups,
      );
      if (!svc) {
        throw new AddServiceMetricServiceNotFoundError(
          `Service with ID ${action.input.serviceId} not found`,
        );
      }
      svc.metrics.push({
        id: action.input.metricId,
        name: action.input.name,
        unitName: action.input.unitName,
        freeLimit: action.input.freeLimit || null,
        paidLimit: action.input.paidLimit || null,
        unitCost:
          action.input.unitCostAmount &&
          action.input.unitCostCurrency &&
          action.input.unitCostBillingCycle
            ? {
                amount: action.input.unitCostAmount,
                currency: action.input.unitCostCurrency,
                billingCycle: action.input.unitCostBillingCycle,
                lastPaymentDate: null,
                discount: null,
              }
            : null,
        currentUsage: action.input.currentUsage,
        metricType: action.input.metricType,
        accrualCycle: action.input.accrualCycle,
        lastAccrualDate: action.input.lastAccrualDate || null,
      });
    },
    updateMetricOperation(state, action) {
      const svc = findServiceById(
        action.input.serviceId,
        state.services,
        state.serviceGroups,
      );
      if (!svc) {
        throw new UpdateMetricServiceNotFoundError(
          `Service with ID ${action.input.serviceId} not found`,
        );
      }
      const metric = svc.metrics.find((m) => m.id === action.input.metricId);
      if (!metric) {
        throw new UpdateMetricNotFoundError(
          `Metric with ID ${action.input.metricId} not found`,
        );
      }
      if (action.input.name) metric.name = action.input.name;
      if (action.input.unitName) metric.unitName = action.input.unitName;
      if (action.input.freeLimit !== undefined)
        metric.freeLimit = action.input.freeLimit || null;
      if (action.input.paidLimit !== undefined)
        metric.paidLimit = action.input.paidLimit || null;
      if (action.input.metricType) metric.metricType = action.input.metricType;
      if (action.input.accrualCycle)
        metric.accrualCycle = action.input.accrualCycle;
      if (action.input.lastAccrualDate)
        metric.lastAccrualDate = action.input.lastAccrualDate;
    },
    updateMetricUsageOperation(state, action) {
      if (state.status !== "ACTIVE") {
        throw new SubscriptionNotActiveUpdateUsageError(
          `Cannot update metric usage when status is ${state.status}`,
        );
      }
      const svc = findServiceById(
        action.input.serviceId,
        state.services,
        state.serviceGroups,
      );
      if (!svc) {
        throw new UpdateMetricUsageServiceNotFoundError(
          `Service with ID ${action.input.serviceId} not found`,
        );
      }
      const metric = svc.metrics.find((m) => m.id === action.input.metricId);
      if (!metric) {
        throw new UpdateMetricUsageNotFoundError(
          `Metric with ID ${action.input.metricId} not found`,
        );
      }
      if (action.input.isAdjustment === true) {
        metric.currentUsage = action.input.currentUsage;
      } else {
        metric.currentUsage =
          metric.paidLimit != null
            ? Math.min(action.input.currentUsage, metric.paidLimit)
            : action.input.currentUsage;
      }
      syncMetricSliceToUsage(
        state,
        metric,
        action.input.newSliceId,
        action.input.currentTime,
      );
    },
    removeServiceMetricOperation(state, action) {
      const svc = findServiceById(
        action.input.serviceId,
        state.services,
        state.serviceGroups,
      );
      if (!svc) {
        throw new RemoveServiceMetricServiceNotFoundError(
          `Service with ID ${action.input.serviceId} not found`,
        );
      }
      const index = svc.metrics.findIndex(
        (m) => m.id === action.input.metricId,
      );
      if (index === -1) {
        throw new RemoveServiceMetricNotFoundError(
          `Metric with ID ${action.input.metricId} not found`,
        );
      }
      svc.metrics.splice(index, 1);
    },
    // DEPRECATED: prefer UPDATE_METRIC_USAGE with an absolute value. Retained
    // pending external-consumer audit (spec §4.5 / §10 Q4).
    incrementMetricUsageOperation(state, action) {
      if (state.status !== "ACTIVE") {
        throw new SubscriptionNotActiveIncrementUsageError(
          `Cannot increment metric usage when status is ${state.status}`,
        );
      }
      const svc = findServiceById(
        action.input.serviceId,
        state.services,
        state.serviceGroups,
      );
      if (!svc) {
        throw new IncrementMetricUsageServiceNotFoundError(
          `Service with ID ${action.input.serviceId} not found`,
        );
      }
      const metric = svc.metrics.find((m) => m.id === action.input.metricId);
      if (!metric) {
        throw new IncrementMetricUsageNotFoundError(
          `Metric with ID ${action.input.metricId} not found`,
        );
      }
      const newUsage = metric.currentUsage + action.input.incrementBy;
      metric.currentUsage =
        metric.paidLimit != null
          ? Math.min(newUsage, metric.paidLimit)
          : newUsage;
      syncMetricSliceToUsage(
        state,
        metric,
        action.input.newSliceId,
        action.input.currentTime,
      );
    },
    // DEPRECATED: see incrementMetricUsageOperation note.
    decrementMetricUsageOperation(state, action) {
      if (state.status !== "ACTIVE") {
        throw new SubscriptionNotActiveDecrementUsageError(
          `Cannot decrement metric usage when status is ${state.status}`,
        );
      }
      const svc = findServiceById(
        action.input.serviceId,
        state.services,
        state.serviceGroups,
      );
      if (!svc) {
        throw new DecrementMetricUsageServiceNotFoundError(
          `Service with ID ${action.input.serviceId} not found`,
        );
      }
      const metric = svc.metrics.find((m) => m.id === action.input.metricId);
      if (!metric) {
        throw new DecrementMetricUsageNotFoundError(
          `Metric with ID ${action.input.metricId} not found`,
        );
      }
      metric.currentUsage -= action.input.decrementBy;
      syncMetricSliceToUsage(
        state,
        metric,
        action.input.newSliceId,
        action.input.currentTime,
      );
    },
    accrueMetricUsageOperation(state, action) {
      if (state.status !== "ACTIVE") {
        throw new SubscriptionNotActiveAccrueMetricUsageError(
          `Cannot accrue metric usage when status is ${state.status}`,
        );
      }
      const svc = findServiceById(
        action.input.serviceId,
        state.services,
        state.serviceGroups,
      );
      if (!svc) {
        throw new AccrueMetricUsageServiceNotFoundError(
          `Service with ID ${action.input.serviceId} not found`,
        );
      }
      const metric = svc.metrics.find((m) => m.id === action.input.metricId);
      if (!metric) {
        throw new AccrueMetricUsageMetricNotFoundError(
          `Metric with ID ${action.input.metricId} not found`,
        );
      }

      // Time-based accrual: only fire if at least one full accrual period has
      // elapsed since `lastAccrualDate`. If the clock has jumped multiple
      // periods, walk forward one period at a time so each period boundary is
      // accounted for.
      //
      // First-ever accrual on a metric without a `lastAccrualDate`: anchor it
      // to `accrualDate` and skip the charge — there's nothing to crystallise
      // yet and we can't invent retroactive usage.
      if (!metric.lastAccrualDate) {
        metric.lastAccrualDate = action.input.accrualDate;
        return;
      }

      let nextBoundary = addAccrualPeriod(
        metric.lastAccrualDate,
        metric.accrualCycle,
      );
      // Pre-generated slice IDs for periods that close with overage but no
      // active slice. Consumed in array order; throw if exhausted.
      const sliceIdQueue = [...action.input.newSliceIds];
      function takeSliceId(): string {
        const id = sliceIdQueue.shift();
        if (!id) {
          throw new AccrueMissingSliceIdError(
            "Accrual loop exhausted pre-generated slice IDs",
          );
        }
        return id;
      }

      // Safety bound: prevent runaway loops on weird inputs.
      let iterations = 0;
      while (action.input.accrualDate >= nextBoundary && iterations < 10000) {
        const periodStart = metric.lastAccrualDate;
        // Discriminate by accrualPeriodStart, not by "is slice live". A
        // FULLY_PAID slice for this period means the operator already
        // collected for this overage — emitting a fresh frozen slice
        // would double-charge. The right question at period close is:
        // "does ANY slice already represent this period's overage?"
        const sliceForPeriod = state.debtLineItems.find(
          (s) =>
            s.origin === "DYNAMIC" &&
            s.sourceMetricId === metric.id &&
            s.accrualPeriodStart === periodStart,
        );
        if (sliceForPeriod) {
          // Period already has a slice (paid, unpaid, frozen, or live).
          // If still live, freeze it. Otherwise no-op.
          if (!sliceForPeriod.frozen) {
            freezeDynamicSlice(state, sliceForPeriod);
          }
        } else {
          // No slice for this period — emit a fresh frozen slice if the
          // metric has overage to crystallise.
          const cost = calculateOverageCost(metric);
          if (cost > 0) {
            appendDebtSlice(state, {
              id: takeSliceId(),
              origin: "DYNAMIC",
              status: "CHARGED",
              invoiced: false,
              debitAmount: cost,
              settledAmount: 0,
              currency:
                metric.unitCost?.currency ?? state.globalCurrency ?? "USD",
              chargedAt: nextBoundary,
              invoicedAt: null,
              fullyPaidAt: null,
              sourceServiceId: null,
              sourceMetricId: metric.id,
              sourceGroupId: null,
              frozen: true,
              accrualPeriodStart: periodStart,
              invoiceRef: null,
              lastPaymentRef: null,
              description: `Overage — metric ${metric.name} (period close)`,
            });
          }
        }
        if (metric.metricType === "CUMULATIVE") {
          metric.currentUsage = 0;
        }
        metric.lastAccrualDate = nextBoundary;
        nextBoundary = addAccrualPeriod(nextBoundary, metric.accrualCycle);
        iterations += 1;
      }
    },
  };
