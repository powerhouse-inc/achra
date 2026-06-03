import { useMemo } from "react";
import {
  StatusBadge,
  STATUS_TEXT_COLORS,
} from "./subscriptions-dashboard/StatusBadge.js";
import { CustomerMetricsCard } from "./subscriptions-dashboard/CustomerMetricsCard.js";
import { KpiCard } from "./subscriptions-dashboard/KpiCard.js";
import { useServiceSubscriptionAutoPlacement } from "../hooks/useServiceSubscriptionAutoPlacement.js";
import { useSubscriptionMetrics } from "../hooks/useSubscriptionMetrics.js";

function formatCurrency(amount: number): string {
  return `$${amount.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;
}

function computeUtilizationPct(m: {
  currentUsage: number;
  paidLimit: number | null;
  freeLimit: number;
}): number {
  const limit = m.paidLimit ?? m.freeLimit;
  if (!limit || limit <= 0) return 0;
  return (m.currentUsage / limit) * 100;
}

/**
 * Landing-page 'stats' card for operators inside the main `DriveContents` view.
 * Mirrors key operator-dashboard KPIs and shows only high-utilization usage metrics.
 */
export function OperatorDashboardStats() {
  const { subscriptionInstanceDocuments, resourceInstanceDocuments } =
    useServiceSubscriptionAutoPlacement();

  const metrics = useSubscriptionMetrics(
    subscriptionInstanceDocuments as Array<{
      header: { id: string; documentType: string; name?: string };
      state: { global: unknown };
    }>,
    resourceInstanceDocuments as Array<{
      header: { id: string; documentType: string; name?: string };
      state: { global: unknown };
    }>,
  );

  const UTILIZATION_THRESHOLD_PCT = 80;

  const pendingAndOtherRevenue = useMemo(() => {
    return metrics.revenueByStatus.filter(
      (s) => s.status !== "ACTIVE" && s.mrr > 0,
    );
  }, [metrics.revenueByStatus]);

  const utilizationDisplay = useMemo(() => {
    const sorted = metrics.customerMetrics.toSorted((a, b) => {
      return computeUtilizationPct(b) - computeUtilizationPct(a);
    });

    const highUtil = sorted.filter(
      (m) => computeUtilizationPct(m) >= UTILIZATION_THRESHOLD_PCT,
    );

    if (sorted.length === 0) {
      return { displayMetrics: [], hasAnyMetrics: false, hasHighUtil: false };
    }

    if (highUtil.length > 0) {
      return {
        displayMetrics: highUtil,
        hasAnyMetrics: true,
        hasHighUtil: true,
      };
    }

    // Ensure the landing view isn't empty even when nothing crosses the threshold.
    return {
      displayMetrics: sorted.slice(0, 1),
      hasAnyMetrics: true,
      hasHighUtil: false,
    };
  }, [metrics.customerMetrics]);

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
      <div className="flex flex-row items-start justify-between gap-10">
        {/* Left: KPI cards */}
        <div className="flex flex-col gap-4 w-[360px] flex-shrink-0">
          <KpiCard
            label="Active Subscriptions"
            value={String(metrics.activeSubscriptionCount)}
            subtitle={
              metrics.activeSubscriptionCount > 0
                ? `across ${metrics.activeCustomerCount} customer${
                    metrics.activeCustomerCount !== 1 ? "s" : ""
                  }`
                : undefined
            }
          />

          <div className="flex flex-col justify-between rounded-xl bg-stone-50 p-5 shadow-sm border border-stone-200/60 min-h-[120px]">
            <span className="text-xs font-medium uppercase tracking-wider text-stone-400">
              Monthly Revenue
            </span>

            <div className="mt-2">
              <span className="text-3xl font-bold text-emerald-600">
                {formatCurrency(metrics.totalMonthlyRevenue)}
              </span>
            </div>

            {pendingAndOtherRevenue.length > 0 ? (
              <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
                {pendingAndOtherRevenue.map((s) => (
                  <span
                    key={s.status}
                    className="text-xs flex items-center gap-2"
                  >
                    <StatusBadge status={s.status} />
                    <span
                      className={
                        STATUS_TEXT_COLORS[s.status] ?? "text-stone-500"
                      }
                    >
                      {formatCurrency(s.mrr)}
                    </span>
                  </span>
                ))}
              </div>
            ) : (
              <div className="mt-3 text-xs text-stone-400">
                No pending revenue
              </div>
            )}
          </div>
        </div>

        {/* Right: actionable customer usage */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-slate-900 mb-1">
            Customer Usage Metrics
          </h3>
          <p className="text-xs text-stone-400 mb-4">
            Live consumption across all tracked service metrics
          </p>

          {!utilizationDisplay.hasAnyMetrics ? (
            <div className="rounded-xl border border-dashed border-stone-300 bg-stone-50/40 p-6 text-center text-sm text-stone-500">
              No trackable usage metrics from resources yet.
            </div>
          ) : (
            <>
              {!utilizationDisplay.hasHighUtil ? (
                <div className="mb-3 text-xs text-stone-400">
                  No resources are at or above {UTILIZATION_THRESHOLD_PCT}%
                  utilization. Showing the highest usage metric instead.
                </div>
              ) : null}
              <CustomerMetricsCard
                metrics={utilizationDisplay.displayMetrics}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
