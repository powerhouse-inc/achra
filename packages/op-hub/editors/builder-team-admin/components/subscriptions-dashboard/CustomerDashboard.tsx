import type { SubscriptionMetrics } from "../../hooks/useSubscriptionMetrics.js";
import { DashboardHeader } from "./DashboardHeader.js";
import { KpiCard } from "./KpiCard.js";
import { MySubscriptionsTable } from "./MySubscriptionsTable.js";
import { SpendBreakdown } from "./SpendBreakdown.js";

interface CustomerDashboardProps {
  metrics: SubscriptionMetrics;
  customerName: string | null;
  onBrowseFiles: () => void;
}

function formatCurrency(amount: number): string {
  return `$${amount.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function CustomerDashboard({
  metrics,
  customerName,
  onBrowseFiles,
}: CustomerDashboardProps) {
  const welcome = customerName
    ? `Welcome back, ${customerName}. Here's your bought services overview.`
    : "Here's your bought services overview.";

  // Build status subtitle for active resources
  const statusCounts = new Map<string, number>();
  for (const r of metrics.resourceSummaries) {
    statusCounts.set(r.status, (statusCounts.get(r.status) ?? 0) + 1);
  }
  const statusParts: string[] = [];
  const active = statusCounts.get("ACTIVE") ?? 0;
  const provisioning = statusCounts.get("PROVISIONING") ?? 0;
  const draft = statusCounts.get("DRAFT") ?? 0;
  if (active > 0) statusParts.push(`${active} active`);
  if (provisioning > 0) statusParts.push(`${provisioning} provisioning`);
  if (draft > 0) statusParts.push(`${draft} draft`);
  const resourceSubtitle = statusParts.join(", ") || undefined;

  // Resource health label
  const healthLabel =
    metrics.resourceHealth === 100
      ? "All systems operational"
      : metrics.resourceHealth > 0
        ? `${metrics.activeResourceCount} of ${metrics.resourceSummaries.length} operational`
        : metrics.resourceSummaries.length > 0
          ? "No active resources"
          : undefined;

  return (
    <div className="space-y-6 p-2">
      <DashboardHeader
        title="Service Subscriptions"
        subtitle={welcome}
        onBrowseFiles={onBrowseFiles}
      />

      {/* KPI Row */}
      <div className="grid grid-cols-4 gap-4">
        <KpiCard
          label="Active Resources"
          value={String(metrics.resourceSummaries.length)}
          subtitle={resourceSubtitle}
        />
        <KpiCard
          label="Monthly Spend"
          value={formatCurrency(metrics.totalMonthlyRevenue)}
        />
        <KpiCard
          label="Next Renewal"
          value={
            metrics.nextRenewal ? formatDate(metrics.nextRenewal.date) : "—"
          }
          subtitle={metrics.nextRenewal?.planName ?? undefined}
        />
        <KpiCard
          label="Resource Health"
          value={`${metrics.resourceHealth}%`}
          subtitle={healthLabel}
          deltaType={
            metrics.resourceHealth >= 80
              ? "positive"
              : metrics.resourceHealth > 0
                ? "neutral"
                : "negative"
          }
        />
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-3 rounded-xl bg-stone-50 p-5 shadow-sm border border-stone-200/60">
          <h2 className="mb-4 text-base font-bold text-stone-700">
            My Subscriptions
          </h2>
          <MySubscriptionsTable subscriptions={metrics.subscriptionSummaries} />
        </div>
        <div className="col-span-2 rounded-xl bg-stone-50 p-5 shadow-sm border border-stone-200/60">
          <h2 className="mb-1 text-base font-bold text-stone-700">
            Spend Breakdown
          </h2>
          <p className="mb-4 text-xs text-stone-400">
            Monthly cost by resource template
          </p>
          <SpendBreakdown data={metrics.revenueByTemplate} />
        </div>
      </div>
    </div>
  );
}
