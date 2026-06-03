import type { TierDistribution } from "../../hooks/useSubscriptionMetrics.js";

const TIER_COLORS: Record<string, string> = {
  Custom: "#a855f7",
  Standard: "#5b6abf",
  Starter: "#00b8a9",
  Essentials: "#c4c9cf",
};

const DEFAULT_COLOR = "#94a3b8";

interface SubscriptionsByPlanChartProps {
  data: TierDistribution[];
}

export function SubscriptionsByPlanChart({
  data,
}: SubscriptionsByPlanChartProps) {
  const total = data.reduce((sum, d) => sum + d.count, 0);
  if (total === 0) {
    return (
      <div className="flex items-center justify-center h-full text-stone-400 text-sm">
        No subscriptions
      </div>
    );
  }

  // Build SVG donut segments
  const size = 160;
  const cx = size / 2;
  const cy = size / 2;
  const r = 56;
  const strokeWidth = 28;

  let cumulativeAngle = -90; // start at top
  const segments = data.map((item) => {
    const angle = (item.count / total) * 360;
    const startAngle = cumulativeAngle;
    cumulativeAngle += angle;

    const startRad = (startAngle * Math.PI) / 180;
    const endRad = ((startAngle + angle) * Math.PI) / 180;

    const x1 = cx + r * Math.cos(startRad);
    const y1 = cy + r * Math.sin(startRad);
    const x2 = cx + r * Math.cos(endRad);
    const y2 = cy + r * Math.sin(endRad);
    const largeArc = angle > 180 ? 1 : 0;

    return {
      ...item,
      d: `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`,
      color: TIER_COLORS[item.tierName] ?? DEFAULT_COLOR,
    };
  });

  return (
    <div className="flex flex-col items-center gap-4">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        aria-label="Subscriptions by plan"
        role="img"
      >
        {segments.map((seg) => (
          <path
            key={seg.tierName}
            d={seg.d}
            fill="none"
            stroke={seg.color}
            strokeWidth={strokeWidth}
            strokeLinecap="butt"
          />
        ))}
        <text
          x={cx}
          y={cy - 6}
          textAnchor="middle"
          className="text-2xl font-bold"
          fill="#2d3436"
        >
          {total}
        </text>
        <text
          x={cx}
          y={cy + 12}
          textAnchor="middle"
          className="text-xs"
          fill="#636e72"
        >
          total
        </text>
      </svg>

      <div className="w-full space-y-2">
        {segments.map((seg) => (
          <div key={seg.tierName} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className="inline-block h-3 w-3 rounded-sm"
                style={{ backgroundColor: seg.color }}
              />
              <span className="text-sm text-stone-600">{seg.tierName}</span>
            </div>
            <span className="text-sm font-semibold text-stone-700">
              {seg.count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
