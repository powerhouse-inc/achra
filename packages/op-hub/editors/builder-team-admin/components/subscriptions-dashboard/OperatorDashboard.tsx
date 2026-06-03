import type { SubscriptionMetrics } from "../../hooks/useSubscriptionMetrics.js";
import { DashboardHeader } from "./DashboardHeader.js";
import { KpiCard } from "./KpiCard.js";
import { RevenueByResourceChart } from "./RevenueByResourceChart.js";
import { SubscriptionsByPlanChart } from "./SubscriptionsByPlanChart.js";
import { RecentSubscriptionsTable } from "./RecentSubscriptionsTable.js";
import { TopCustomersList } from "./TopCustomersList.js";
import { StatusBadge, STATUS_TEXT_COLORS } from "./StatusBadge.js";
import { CustomerMetricsCard } from "./CustomerMetricsCard.js";
import { ActionItemsCard } from "./ActionItemsCard.js";

interface OperatorDashboardProps {
  metrics: SubscriptionMetrics;
  operatorName: string | null;
  onBrowseFiles: () => void;
}

function formatCurrency(amount: number): string {
  return `$${amount.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

export function OperatorDashboard({
  metrics,
  operatorName,
  onBrowseFiles,
}: OperatorDashboardProps) {
  const title = operatorName
    ? `${operatorName} Operator Dashboard`
    : "Operator Dashboard";

  return (
    <div className="space-y-6 p-2">
      <DashboardHeader
        title={title}
        subtitle="Track resources, subscriptions, and customer activity"
        onBrowseFiles={onBrowseFiles}
      />

      {/* KPI Row */}
      <div className="grid grid-cols-4 gap-4 items-start">
        <KpiCard
          label="Active Subscriptions"
          value={String(metrics.activeSubscriptionCount)}
          subtitle={
            metrics.activeSubscriptionCount > 0
              ? `across ${metrics.activeCustomerCount} customer${metrics.activeCustomerCount !== 1 ? "s" : ""}`
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
          {metrics.revenueByStatus.length > 0 ? (
            <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
              {metrics.revenueByStatus
                .filter((s) => s.status !== "ACTIVE")
                .map((s) => (
                  <span
                    key={s.status}
                    className="text-xs flex items-center gap-1"
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
          ) : null}
        </div>
        <KpiCard
          label="Active Customers"
          value={String(metrics.activeCustomerCount)}
        />
        <KpiCard
          label="Resource Utilization"
          value={`${metrics.resourceUtilization}%`}
          subtitle={`${metrics.activeResourceCount} active resource${metrics.activeResourceCount !== 1 ? "s" : ""}`}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-5 gap-4 items-start">
        <div className="col-span-3 rounded-xl bg-stone-50 p-5 shadow-sm border border-stone-200/60">
          <h2 className="mb-4 text-base font-bold text-stone-700">
            Monthly Revenue by Resource
          </h2>
          <RevenueByResourceChart
            data={metrics.revenueByTemplate}
            currency={metrics.currency}
          />
        </div>
        <div className="col-span-2 rounded-xl bg-stone-50 p-5 shadow-sm border border-stone-200/60">
          <h2 className="mb-4 text-base font-bold text-stone-700">
            Subscriptions by Plan
          </h2>
          <SubscriptionsByPlanChart data={metrics.subscriptionsByTier} />
        </div>
      </div>

      {/* Tables Row */}
      <div className="grid grid-cols-5 gap-4 items-start">
        <div className="col-span-3 rounded-xl bg-stone-50 p-5 shadow-sm border border-stone-200/60">
          <h2 className="mb-4 text-base font-bold text-stone-700">
            Recent Subscriptions
          </h2>
          <RecentSubscriptionsTable
            subscriptions={metrics.subscriptionSummaries}
          />
        </div>
        <div className="col-span-2 rounded-xl bg-stone-50 p-5 shadow-sm border border-stone-200/60">
          <h2 className="mb-3 text-base font-bold text-stone-700">
            Top Customers
          </h2>
          <p className="mb-4 text-xs text-stone-400">
            By monthly recurring revenue
          </p>
          <TopCustomersList customers={metrics.topCustomers} />
        </div>
      </div>

      {/* Metrics & Actions Row */}
      <div className="grid grid-cols-5 gap-4 items-start">
        <div className="col-span-3 rounded-xl bg-stone-50 p-5 shadow-sm border border-stone-200/60">
          <h2 className="mb-1 text-base font-bold text-stone-700">
            Customer Usage Metrics
          </h2>
          <p className="mb-4 text-xs text-stone-400">
            Live consumption across all tracked service metrics
          </p>
          <CustomerMetricsCard metrics={metrics.customerMetrics} />
        </div>
        <div className="col-span-2 rounded-xl bg-stone-50 p-5 shadow-sm border border-stone-200/60">
          <h2 className="mb-1 text-base font-bold text-stone-700">
            Action Items
          </h2>
          <p className="mb-4 text-xs text-stone-400">
            Issues requiring operator attention
          </p>
          <ActionItemsCard items={metrics.actionItems} />
        </div>
      </div>
    </div>
  );
}
