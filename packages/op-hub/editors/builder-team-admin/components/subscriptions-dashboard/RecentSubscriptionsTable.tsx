import { setSelectedNode } from "@powerhousedao/reactor-browser";
import { SquareArrowOutUpRight } from "lucide-react";
import type { SubscriptionSummary } from "../../hooks/useSubscriptionMetrics.js";
import { StatusBadge } from "./StatusBadge.js";

interface RecentSubscriptionsTableProps {
  subscriptions: SubscriptionSummary[];
}

function formatCurrency(amount: number): string {
  return `$${amount.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

export function RecentSubscriptionsTable({
  subscriptions,
}: RecentSubscriptionsTableProps) {
  const sorted = subscriptions.toSorted((a, b) => {
    if (!a.createdAt && !b.createdAt) return 0;
    if (!a.createdAt) return 1;
    if (!b.createdAt) return -1;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  // Status summary
  const statusCounts = new Map<string, { count: number; mrr: number }>();
  for (const sub of subscriptions) {
    const existing = statusCounts.get(sub.status);
    if (existing) {
      existing.count += 1;
      existing.mrr += sub.mrr;
    } else {
      statusCounts.set(sub.status, { count: 1, mrr: sub.mrr });
    }
  }
  const statusEntries = [...statusCounts.entries()].toSorted(
    (a, b) => b[1].mrr - a[1].mrr,
  );

  const activeMrr = statusCounts.get("ACTIVE")?.mrr ?? 0;
  const totalMrr = subscriptions.reduce((sum, s) => sum + s.mrr, 0);

  return (
    <div>
      <div className="max-h-96 overflow-y-auto">
        <table className="w-full text-left" role="table">
          <thead>
            <tr className="border-b border-border">
              <th className="pb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Customer
              </th>
              <th className="pb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Plan
              </th>
              <th className="pb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Resources
              </th>
              <th className="pb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                MRR
              </th>
              <th className="pb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="py-8 text-center text-sm text-muted-foreground"
                >
                  No subscriptions yet
                </td>
              </tr>
            ) : (
              sorted.map((sub) => (
                <tr
                  key={sub.id}
                  className="border-b border-border last:border-0"
                >
                  <td className="py-2.5 text-sm">
                    <button
                      type="button"
                      onClick={() => setSelectedNode(sub.id)}
                      className="group inline-flex max-w-full min-w-0 items-center gap-1.5 rounded-md px-1 -mx-1 py-0.5 text-left font-medium text-primary transition-colors hover:bg-accent hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ring"
                      title="Open subscription instance document"
                    >
                      <span className="truncate">{sub.customerName}</span>
                      <SquareArrowOutUpRight
                        className="h-3.5 w-3.5 shrink-0 text-primary/80 opacity-80 transition-opacity group-hover:opacity-100"
                        aria-hidden
                      />
                      <span className="sr-only">Open in editor</span>
                    </button>
                  </td>
                  <td className="py-2.5 text-sm text-muted-foreground">
                    {sub.tierName}
                  </td>
                  <td className="py-2.5 text-sm text-muted-foreground">
                    {sub.resourceCount}
                  </td>
                  <td className="py-2.5 text-sm font-medium text-foreground">
                    {formatCurrency(sub.mrr)}
                  </td>
                  <td className="py-2.5">
                    <StatusBadge status={sub.status} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Summary footer */}
      {subscriptions.length > 0 ? (
        <div className="mt-4 border-t border-border pt-3 space-y-2">
          <div className="flex flex-wrap gap-3">
            {statusEntries.map(([status, { count, mrr }]) => (
              <div
                key={status}
                className="flex items-center gap-1.5 rounded-md bg-muted px-2.5 py-1.5"
              >
                <StatusBadge status={status} />
                <span className="text-xs text-muted-foreground">
                  {count} &middot; {formatCurrency(mrr)}
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              Active MRR:{" "}
              <span className="font-semibold text-status-success">
                {formatCurrency(activeMrr)}
              </span>
            </span>
            <span className="text-muted-foreground">
              Total (all statuses): {formatCurrency(totalMrr)}
            </span>
          </div>
        </div>
      ) : null}
    </div>
  );
}
