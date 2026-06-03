import type { CustomerMetric } from "../../hooks/useSubscriptionMetrics.js";

interface CustomerMetricsCardProps {
  metrics: CustomerMetric[];
}

function formatCurrency(amount: number): string {
  return `$${amount.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

const SEVERITY_STROKE = {
  critical: "#ef4444",
  warning: "#f59e0b",
  ok: "#10b981",
};

function MiniGauge({ m }: { m: CustomerMetric }) {
  const limit = m.paidLimit ?? m.freeLimit;
  const pct = limit > 0 ? (m.currentUsage / limit) * 100 : 0;
  const stroke = SEVERITY_STROKE[m.severity];

  const size = 160;
  const cx = size / 2;
  const cy = 96;
  const r = 64;
  const sw = 10;

  const sweepFraction = Math.min(pct, 100) / 100;
  const startAngle = Math.PI;
  const endAngle = startAngle - sweepFraction * Math.PI;

  const x1 = cx + r * Math.cos(startAngle);
  const y1 = cy + r * Math.sin(startAngle);
  const x2 = cx + r * Math.cos(endAngle);
  const y2 = cy + r * Math.sin(endAngle);
  const largeArc = sweepFraction > 0.5 ? 1 : 0;

  const bgX2 = cx + r * Math.cos(0);
  const bgY2 = cy + r * Math.sin(0);

  return (
    <div className="flex flex-col items-center rounded-lg border border-stone-200/60 bg-white px-5 py-4 min-w-[190px]">
      {/* Customer + severity */}
      <div className="flex items-center gap-2 mb-2 w-full">
        <span className="text-sm font-semibold text-stone-700 truncate">
          {m.customerName}
        </span>
        {m.severity === "critical" ? (
          <span className="shrink-0 inline-block h-2 w-2 rounded-full bg-red-500" />
        ) : m.severity === "warning" ? (
          <span className="shrink-0 inline-block h-2 w-2 rounded-full bg-amber-400" />
        ) : null}
      </div>

      {/* Gauge */}
      <svg
        width={size}
        height={106}
        viewBox={`0 0 ${size} 106`}
        role="img"
        aria-label={`${m.currentUsage} of ${limit} ${m.unitName}`}
      >
        <path
          d={`M ${x1} ${y1} A ${r} ${r} 0 1 1 ${bgX2} ${bgY2}`}
          fill="none"
          stroke="#e7e5e4"
          strokeWidth={sw}
          strokeLinecap="round"
        />
        {sweepFraction > 0 ? (
          <path
            d={`M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`}
            fill="none"
            stroke={stroke}
            strokeWidth={sw}
            strokeLinecap="round"
          />
        ) : null}
        <text
          x={cx}
          y={cy - 12}
          textAnchor="middle"
          className="text-2xl font-bold"
          fill="#292524"
        >
          {m.currentUsage}
        </text>
        <text
          x={cx}
          y={cy + 4}
          textAnchor="middle"
          className="text-xs"
          fill="#a8a29e"
        >
          / {limit}
        </text>
      </svg>

      {/* Metric name */}
      <div className="text-sm text-stone-500 text-center leading-tight mt-1">
        {m.metricName}
      </div>

      {/* Overage or status */}
      {m.overageUnits > 0 ? (
        <div className="text-sm font-semibold text-red-600 text-center mt-1.5">
          {formatCurrency(m.overageCost)} overage
        </div>
      ) : (
        <div className="text-sm text-stone-400 text-center mt-1.5">
          {m.freeLimit > 0 ? `${m.freeLimit} free` : "—"}
        </div>
      )}
    </div>
  );
}

export function CustomerMetricsCard({ metrics }: CustomerMetricsCardProps) {
  if (metrics.length === 0) {
    return (
      <div className="flex items-center justify-center py-8 text-sm text-stone-400">
        No usage metrics tracked across subscriptions
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {metrics.map((m) => (
        <MiniGauge key={`${m.subscriptionId}-${m.metricName}`} m={m} />
      ))}
    </div>
  );
}
