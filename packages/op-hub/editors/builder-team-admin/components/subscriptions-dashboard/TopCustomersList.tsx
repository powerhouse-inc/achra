import type { CustomerSummary } from "../../hooks/useSubscriptionMetrics.js";

const AVATAR_COLORS = [
  "bg-indigo-500",
  "bg-teal-500",
  "bg-amber-500",
  "bg-rose-400",
  "bg-violet-500",
];

interface TopCustomersListProps {
  customers: CustomerSummary[];
}

function formatCurrency(amount: number): string {
  return `$${amount.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

export function TopCustomersList({ customers }: TopCustomersListProps) {
  if (customers.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-stone-400 text-sm">
        No customers yet
      </div>
    );
  }

  return (
    <div className="max-h-96 space-y-3 overflow-y-auto pr-1">
      {customers.map((cust, i) => (
        <div
          key={cust.customerId}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div
              className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-white ${AVATAR_COLORS[i % AVATAR_COLORS.length]}`}
            >
              {cust.initials}
            </div>
            <div>
              <div className="text-sm font-medium text-stone-700">
                {cust.name}
              </div>
              <div className="text-xs text-stone-400">
                {cust.subscriptionCount} subscription
                {cust.subscriptionCount !== 1 ? "s" : ""}
              </div>
            </div>
          </div>
          <span className="text-sm font-semibold text-stone-700">
            {formatCurrency(cust.mrr)}
          </span>
        </div>
      ))}
    </div>
  );
}
