import type { TemplateRevenue } from "../../hooks/useSubscriptionMetrics.js";

interface SpendBreakdownProps {
  data: TemplateRevenue[];
}

function formatCurrency(amount: number): string {
  return `$${amount.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

export function SpendBreakdown({ data }: SpendBreakdownProps) {
  const total = data.reduce((sum, d) => sum + d.amount, 0);
  const maxAmount = Math.max(...data.map((d) => d.amount), 1);

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-stone-400 text-sm">
        No spend data
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {data.map((item) => {
        const widthPct = (item.amount / maxAmount) * 100;
        return (
          <div key={item.templateName}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm font-medium text-stone-700">
                {item.templateName}
              </span>
              <span className="text-sm font-semibold text-stone-700">
                {formatCurrency(item.amount)}
              </span>
            </div>
            <div className="h-2.5 w-full rounded-full bg-stone-200/60">
              <div
                className="h-2.5 rounded-full transition-all"
                style={{
                  width: `${widthPct}%`,
                  backgroundColor: item.color,
                }}
              />
            </div>
          </div>
        );
      })}

      <div className="border-t border-stone-200 pt-3 flex items-center justify-between">
        <span className="text-sm text-stone-500">Total Monthly</span>
        <span className="text-lg font-bold text-stone-800">
          {formatCurrency(total)}
        </span>
      </div>
    </div>
  );
}
