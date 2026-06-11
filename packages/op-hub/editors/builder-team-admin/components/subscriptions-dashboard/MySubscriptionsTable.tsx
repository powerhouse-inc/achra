import type { SubscriptionSummary } from "../../hooks/useSubscriptionMetrics.js";
import { setSelectedNode } from "@powerhousedao/reactor-browser";

interface MySubscriptionsTableProps {
  subscriptions: SubscriptionSummary[];
}

function formatCurrency(amount: number): string {
  return `$${amount.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function formatCycle(cycle: string): string {
  const map: Record<string, string> = {
    MONTHLY: "Monthly",
    QUARTERLY: "Quarterly",
    SEMI_ANNUAL: "Semi-Annual",
    ANNUAL: "Annual",
    ONE_TIME: "One-time",
  };
  return map[cycle] ?? cycle;
}

// Matches the SubscriptionStatus enum in the document model.
const STATUS_STYLES: Record<string, string> = {
  ACTIVE: "bg-status-success/20 text-status-success",
  PENDING: "bg-muted text-muted-foreground",
  PAUSED: "bg-status-warning/20 text-status-warning",
  EXPIRING: "bg-status-warning/20 text-status-warning",
  CANCELLED: "bg-destructive/15 text-destructive",
};

function StatusPill({ status }: { status: string }) {
  const cls = STATUS_STYLES[status] ?? "bg-muted text-muted-foreground";
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${cls}`}
    >
      {status}
    </span>
  );
}

export function MySubscriptionsTable({
  subscriptions,
}: MySubscriptionsTableProps) {
  const headerCellClass =
    "pb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground";

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left" role="table">
        <thead>
          <tr className="border-b border-border">
            <th className={headerCellClass}>Plan</th>
            <th className={headerCellClass}>Product</th>
            <th className={headerCellClass}>Status</th>
            <th className={headerCellClass}>Tier</th>
            <th className={headerCellClass}>Cycle</th>
            <th className={headerCellClass}>Monthly</th>
            <th className={headerCellClass}>Outstanding</th>
            <th className={headerCellClass}>Started</th>
            <th className={headerCellClass}>Renewal</th>
          </tr>
        </thead>
        <tbody>
          {subscriptions.length === 0 ? (
            <tr>
              <td
                colSpan={9}
                className="py-8 text-center text-sm text-muted-foreground"
              >
                No subscriptions yet
              </td>
            </tr>
          ) : (
            subscriptions.map((sub) => (
              <tr key={sub.id} className="border-b border-border last:border-0">
                <td
                  className="py-2.5 text-sm font-medium text-primary cursor-pointer hover:underline whitespace-nowrap"
                  onClick={() => setSelectedNode(sub.id)}
                  title="Open subscription instance document"
                >
                  {sub.name}
                </td>
                <td
                  className="py-2.5 text-sm text-foreground whitespace-nowrap"
                  title={sub.linkedTemplateName ?? undefined}
                >
                  {sub.linkedTemplateName ?? "—"}
                </td>
                <td className="py-2.5">
                  <StatusPill status={sub.status} />
                </td>
                <td className="py-2.5 text-sm text-muted-foreground whitespace-nowrap">
                  {sub.tierName}
                </td>
                <td className="py-2.5 text-sm text-muted-foreground whitespace-nowrap">
                  {formatCycle(sub.billingCycle)}
                </td>
                <td className="py-2.5 text-sm font-medium text-foreground whitespace-nowrap">
                  {formatCurrency(sub.mrr)}
                </td>
                <td
                  className={`py-2.5 text-sm font-medium whitespace-nowrap ${
                    sub.outstandingAmount > 0
                      ? "text-destructive"
                      : "text-muted-foreground"
                  }`}
                  title={
                    sub.outstandingAmount > 0
                      ? "Unpaid balance — payment required"
                      : "No outstanding balance"
                  }
                >
                  {sub.outstandingAmount > 0
                    ? formatCurrency(sub.outstandingAmount)
                    : "—"}
                </td>
                <td className="py-2.5 text-sm text-muted-foreground whitespace-nowrap">
                  {formatDate(sub.createdAt)}
                </td>
                <td className="py-2.5 text-sm text-muted-foreground whitespace-nowrap">
                  {formatDate(sub.renewalDate)}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
