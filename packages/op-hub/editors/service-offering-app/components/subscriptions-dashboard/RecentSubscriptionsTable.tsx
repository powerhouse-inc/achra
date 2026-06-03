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
            <tr className="border-b border-stone-200 dark:border-slate-700">
              <th className="pb-2 text-xs font-medium uppercase tracking-wider text-stone-400 dark:text-gray-400">
                Customer
              </th>
              <th className="pb-2 text-xs font-medium uppercase tracking-wider text-stone-400 dark:text-gray-400">
                Plan
              </th>
              <th className="pb-2 text-xs font-medium uppercase tracking-wider text-stone-400 dark:text-gray-400">
                Resources
              </th>
              <th className="pb-2 text-xs font-medium uppercase tracking-wider text-stone-400 dark:text-gray-400">
                MRR
              </th>
              <th className="pb-2 text-xs font-medium uppercase tracking-wider text-stone-400 dark:text-gray-400">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="py-8 text-center text-sm text-stone-400 dark:text-gray-400"
                >
                  No subscriptions yet
                </td>
              </tr>
            ) : (
              sorted.map((sub) => (
                <tr
                  key={sub.id}
                  className="border-b border-stone-100 last:border-0 dark:border-slate-700/60"
                >
                  <td className="py-2.5 text-sm">
                    <button
                      type="button"
                      onClick={() => setSelectedNode(sub.id)}
                      className="group inline-flex max-w-full min-w-0 items-center gap-1.5 rounded-md px-1 -mx-1 py-0.5 text-left font-medium text-teal-700 transition-colors hover:bg-teal-50 hover:text-teal-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-teal-500 dark:text-teal-300 dark:hover:bg-teal-900/30 dark:hover:text-teal-200"
                      title="Open subscription instance document"
                    >
                      <span className="truncate">{sub.customerName}</span>
                      <SquareArrowOutUpRight
                        className="h-3.5 w-3.5 shrink-0 text-teal-500/80 opacity-80 transition-opacity group-hover:opacity-100"
                        aria-hidden
                      />
                      <span className="sr-only">Open in editor</span>
                    </button>
                  </td>
                  <td className="py-2.5 text-sm text-stone-500 dark:text-gray-400">
                    {sub.tierName}
                  </td>
                  <td className="py-2.5 text-sm text-stone-500 dark:text-gray-400">
                    {sub.resourceCount}
                  </td>
                  <td className="py-2.5 text-sm font-medium text-stone-700 dark:text-gray-200">
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
        <div className="mt-4 border-t border-stone-200 pt-3 space-y-2">
          <div className="flex flex-wrap gap-3">
            {statusEntries.map(([status, { count, mrr }]) => (
              <div
                key={status}
                className="flex items-center gap-1.5 rounded-md bg-stone-100 px-2.5 py-1.5 dark:bg-slate-700"
              >
                <StatusBadge status={status} />
                <span className="text-xs text-stone-500 dark:text-gray-400">
                  {count} &middot; {formatCurrency(mrr)}
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-stone-500 dark:text-gray-400">
              Active MRR:{" "}
              <span className="font-semibold text-emerald-600">
                {formatCurrency(activeMrr)}
              </span>
            </span>
            <span className="text-stone-400 dark:text-gray-400">
              Total (all statuses): {formatCurrency(totalMrr)}
            </span>
          </div>
        </div>
      ) : null}
    </div>
  );
}
