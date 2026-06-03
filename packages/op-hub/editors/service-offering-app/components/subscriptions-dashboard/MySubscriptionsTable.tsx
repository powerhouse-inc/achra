import type { SubscriptionSummary } from "../../hooks/useSubscriptionMetrics.js";

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

export function MySubscriptionsTable({
  subscriptions,
}: MySubscriptionsTableProps) {
  return (
    <table className="w-full text-left" role="table">
      <thead>
        <tr className="border-b border-stone-200">
          <th className="pb-2 text-xs font-medium uppercase tracking-wider text-stone-400">
            Plan
          </th>
          <th className="pb-2 text-xs font-medium uppercase tracking-wider text-stone-400">
            Tier
          </th>
          <th className="pb-2 text-xs font-medium uppercase tracking-wider text-stone-400">
            Cycle
          </th>
          <th className="pb-2 text-xs font-medium uppercase tracking-wider text-stone-400">
            Monthly
          </th>
          <th className="pb-2 text-xs font-medium uppercase tracking-wider text-stone-400">
            Renewal
          </th>
        </tr>
      </thead>
      <tbody>
        {subscriptions.length === 0 ? (
          <tr>
            <td colSpan={5} className="py-8 text-center text-sm text-stone-400">
              No subscriptions yet
            </td>
          </tr>
        ) : (
          subscriptions.map((sub) => (
            <tr
              key={sub.id}
              className="border-b border-stone-100 last:border-0"
            >
              <td className="py-2.5 text-sm font-medium text-stone-700">
                {sub.name}
              </td>
              <td className="py-2.5 text-sm text-stone-500">{sub.tierName}</td>
              <td className="py-2.5 text-sm text-stone-500">
                {formatCycle(sub.billingCycle)}
              </td>
              <td className="py-2.5 text-sm font-medium text-stone-700">
                {formatCurrency(sub.mrr)}
              </td>
              <td className="py-2.5 text-sm text-stone-500">
                {formatDate(sub.renewalDate)}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
