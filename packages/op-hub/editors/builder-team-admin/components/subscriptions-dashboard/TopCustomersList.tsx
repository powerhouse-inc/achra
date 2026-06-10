import type { CustomerSummary } from "../../hooks/useSubscriptionMetrics.js";

const AVATAR_COLORS = [
  "bg-chart-1",
  "bg-chart-2",
  "bg-chart-3",
  "bg-chart-4",
  "bg-chart-5",
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
      <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
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
              className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-primary-foreground ${AVATAR_COLORS[i % AVATAR_COLORS.length]}`}
            >
              {cust.initials}
            </div>
            <div>
              <div className="text-sm font-medium text-foreground">
                {cust.name}
              </div>
              <div className="text-xs text-muted-foreground">
                {cust.subscriptionCount} subscription
                {cust.subscriptionCount !== 1 ? "s" : ""}
              </div>
            </div>
          </div>
          <span className="text-sm font-semibold text-foreground">
            {formatCurrency(cust.mrr)}
          </span>
        </div>
      ))}
    </div>
  );
}
