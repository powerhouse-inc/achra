import type { TemplateRevenue } from "../../hooks/useSubscriptionMetrics.js";

interface RevenueByResourceChartProps {
  data: TemplateRevenue[];
  currency: string;
}

function formatCurrency(amount: number): string {
  if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(amount % 1000 === 0 ? 0 : 1)}k`;
  }
  return `$${amount.toLocaleString()}`;
}

/**
 * Stacked bar chart showing current MRR distribution by resource template.
 * Since no historical data exists, we show a single bar with the template breakdown.
 */
export function RevenueByResourceChart({
  data,
  currency,
}: RevenueByResourceChartProps) {
  const total = data.reduce((sum, d) => sum + d.amount, 0);

  if (total === 0) {
    return (
      <div className="flex items-center justify-center h-full text-stone-400 text-sm">
        No revenue data
      </div>
    );
  }

  const maxBarHeight = 180;
  const barWidth = 60;
  const chartWidth = 320;
  const chartHeight = 220;

  // Single stacked bar showing current MRR split
  let yOffset = 0;
  const barSegments = data.map((item) => {
    const height = total > 0 ? (item.amount / total) * maxBarHeight : 0;
    const segment = {
      ...item,
      y: maxBarHeight - yOffset - height,
      height,
    };
    yOffset += height;
    return segment;
  });

  return (
    <div className="flex flex-col gap-4">
      {/* Legend */}
      <div className="flex flex-wrap gap-4">
        {data.map((item) => (
          <div key={item.templateName} className="flex items-center gap-1.5">
            <span
              className="inline-block h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-xs text-stone-500">{item.templateName}</span>
          </div>
        ))}
      </div>

      {/* Chart */}
      <svg
        width={chartWidth}
        height={chartHeight}
        viewBox={`0 0 ${chartWidth} ${chartHeight}`}
        aria-label={`Monthly revenue breakdown: ${formatCurrency(total)} ${currency} total`}
        role="img"
      >
        {/* Y-axis labels */}
        <text x="0" y="16" className="text-xs" fill="#636e72">
          {formatCurrency(total)}
        </text>
        <text x="0" y={maxBarHeight + 4} className="text-xs" fill="#636e72">
          $0
        </text>

        {/* Stacked bar */}
        <g transform={`translate(${chartWidth / 2 - barWidth / 2}, 8)`}>
          {barSegments.map((seg) => (
            <rect
              key={seg.templateName}
              x={0}
              y={seg.y}
              width={barWidth}
              height={Math.max(seg.height, 1)}
              rx={seg.y === barSegments[0].y ? 4 : 0}
              fill={seg.color}
            />
          ))}
        </g>

        {/* X-axis label */}
        <text
          x={chartWidth / 2}
          y={maxBarHeight + 28}
          textAnchor="middle"
          className="text-xs"
          fill="#636e72"
        >
          Current MRR
        </text>

        {/* Per-template amount labels on right */}
        <g transform={`translate(${chartWidth / 2 + barWidth / 2 + 12}, 8)`}>
          {barSegments.map((seg) => (
            <text
              key={seg.templateName}
              x={0}
              y={seg.y + seg.height / 2 + 4}
              className="text-xs font-medium"
              fill={seg.color}
            >
              {formatCurrency(seg.amount)}
            </text>
          ))}
        </g>
      </svg>
    </div>
  );
}
