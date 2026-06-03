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
  ACTIVE: "bg-emerald-100 text-emerald-700",
  PENDING: "bg-stone-100 text-stone-600",
  PAUSED: "bg-amber-100 text-amber-700",
  EXPIRING: "bg-amber-100 text-amber-700",
  CANCELLED: "bg-rose-100 text-rose-700",
};

function StatusPill({ status }: { status: string }) {
  const cls = STATUS_STYLES[status] ?? "bg-stone-100 text-stone-600";
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
    "pb-2 text-xs font-medium uppercase tracking-wider text-stone-400";

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left" role="table">
        <thead>
          <tr className="border-b border-stone-200">
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
                className="py-8 text-center text-sm text-stone-400"
              >
                No subscriptions yet
              </td>
            </tr>
          ) : (
            subscriptions.map((sub) => (
              <tr
                key={sub.id}
                className="border-b border-stone-100 last:border-0"
              >
                <td
                  className="py-2.5 text-sm font-medium text-teal-600 cursor-pointer hover:underline whitespace-nowrap"
                  onClick={() => setSelectedNode(sub.id)}
                  title="Open subscription instance document"
                >
                  {sub.name}
                </td>
                <td
                  className="py-2.5 text-sm text-stone-700 whitespace-nowrap"
                  title={sub.linkedTemplateName ?? undefined}
                >
                  {sub.linkedTemplateName ?? "—"}
                </td>
                <td className="py-2.5">
                  <StatusPill status={sub.status} />
                </td>
                <td className="py-2.5 text-sm text-stone-500 whitespace-nowrap">
                  {sub.tierName}
                </td>
                <td className="py-2.5 text-sm text-stone-500 whitespace-nowrap">
                  {formatCycle(sub.billingCycle)}
                </td>
                <td className="py-2.5 text-sm font-medium text-stone-700 whitespace-nowrap">
                  {formatCurrency(sub.mrr)}
                </td>
                <td
                  className={`py-2.5 text-sm font-medium whitespace-nowrap ${
                    sub.outstandingAmount > 0
                      ? "text-rose-600"
                      : "text-stone-400"
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
                <td className="py-2.5 text-sm text-stone-500 whitespace-nowrap">
                  {formatDate(sub.createdAt)}
                </td>
                <td className="py-2.5 text-sm text-stone-500 whitespace-nowrap">
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
