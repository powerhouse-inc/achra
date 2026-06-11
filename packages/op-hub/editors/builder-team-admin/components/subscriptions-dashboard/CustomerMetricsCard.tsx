import type { CustomerMetric } from "../../hooks/useSubscriptionMetrics.js";

interface CustomerMetricsCardProps {
  metrics: CustomerMetric[];
}

function formatCurrency(amount: number): string {
  return `$${amount.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

const SEVERITY_STROKE = {
  critical: "var(--destructive)",
  warning: "var(--status-warning)",
  ok: "var(--status-success)",
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
    <div className="flex flex-col items-center rounded-lg border border-border bg-card px-5 py-4 min-w-[190px]">
      {/* Customer + severity */}
      <div className="flex items-center gap-2 mb-2 w-full">
        <span className="text-sm font-semibold text-foreground truncate">
          {m.customerName}
        </span>
        {m.severity === "critical" ? (
          <span className="shrink-0 inline-block h-2 w-2 rounded-full bg-destructive" />
        ) : m.severity === "warning" ? (
          <span className="shrink-0 inline-block h-2 w-2 rounded-full bg-status-warning" />
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
          style={{ stroke: "var(--border)" }}
          strokeWidth={sw}
          strokeLinecap="round"
        />
        {sweepFraction > 0 ? (
          <path
            d={`M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`}
            fill="none"
            style={{ stroke }}
            strokeWidth={sw}
            strokeLinecap="round"
          />
        ) : null}
        <text
          x={cx}
          y={cy - 12}
          textAnchor="middle"
          className="text-2xl font-bold"
          style={{ fill: "var(--foreground)" }}
        >
          {m.currentUsage}
        </text>
        <text
          x={cx}
          y={cy + 4}
          textAnchor="middle"
          className="text-xs"
          style={{ fill: "var(--muted-foreground)" }}
        >
          / {limit}
        </text>
      </svg>

      {/* Metric name */}
      <div className="text-sm text-muted-foreground text-center leading-tight mt-1">
        {m.metricName}
      </div>

      {/* Overage or status */}
      {m.overageUnits > 0 ? (
        <div className="text-sm font-semibold text-destructive text-center mt-1.5">
          {formatCurrency(m.overageCost)} overage
        </div>
      ) : (
        <div className="text-sm text-muted-foreground text-center mt-1.5">
          {m.freeLimit > 0 ? `${m.freeLimit} free` : "—"}
        </div>
      )}
    </div>
  );
}

export function CustomerMetricsCard({ metrics }: CustomerMetricsCardProps) {
  if (metrics.length === 0) {
    return (
      <div className="flex items-center justify-center py-8 text-sm text-muted-foreground">
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
