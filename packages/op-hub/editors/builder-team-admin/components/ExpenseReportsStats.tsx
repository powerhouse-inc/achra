import { useMemo, useState } from "react";
import type { ExpenseReportDocument } from "../../../document-models/expense-report/v1/gen/types.js";

type ExpenseReportDataPoint = {
  periodStart: Date | null;
  periodEnd: Date | null;
  totalActuals: number;
  documentName: string;
};

type ExpenseReportsStatsProps = {
  expenseReportDocuments: ExpenseReportDocument[];
};

/**
 * Formats a number as USD currency
 */
function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Formats a date as "MMM YYYY" (e.g., "Jan 2025")
 */
function formatPeriod(date: Date | null): string {
  if (!date) return "N/A";
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

/**
 * Simple SVG Line Chart component with hover tooltips
 */
function LineChart({ data }: { data: ExpenseReportDataPoint[] }) {
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  // Sort data by period start date
  const sortedData = useMemo(() => {
    return [...data]
      .filter((d) => d.periodStart !== null)
      .sort((a, b) => {
        if (!a.periodStart || !b.periodStart) return 0;
        return a.periodStart.getTime() - b.periodStart.getTime();
      });
  }, [data]);

  if (sortedData.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-gray-400">
        No data with valid periods to display
      </div>
    );
  }

  // Chart dimensions - increased padding to prevent clipping
  const width = 450;
  const height = 240;
  const padding = { top: 50, right: 50, bottom: 60, left: 50 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  // Calculate scales
  const maxActuals = Math.max(...sortedData.map((d) => d.totalActuals), 1);
  const minTime = sortedData[0]?.periodStart?.getTime() ?? 0;
  const maxTime =
    sortedData[sortedData.length - 1]?.periodStart?.getTime() ?? 1;
  const timeRange = maxTime - minTime || 1;

  // Generate points for the line
  const points = sortedData.map((d, i) => {
    const x =
      sortedData.length === 1
        ? chartWidth / 2 + padding.left
        : padding.left +
          ((d.periodStart!.getTime() - minTime) / timeRange) * chartWidth;
    const y =
      padding.top + chartHeight - (d.totalActuals / maxActuals) * chartHeight;
    return { x, y, data: d, index: i };
  });

  // Create SVG path for the line
  const linePath =
    points.length > 1
      ? points.reduce((path, point, i) => {
          return (
            path +
            (i === 0 ? `M ${point.x},${point.y}` : ` L ${point.x},${point.y}`)
          );
        }, "")
      : "";

  // Create area path (for gradient fill under line)
  const areaPath =
    points.length > 1
      ? linePath +
        ` L ${points[points.length - 1].x},${padding.top + chartHeight}` +
        ` L ${points[0].x},${padding.top + chartHeight} Z`
      : "";

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="w-full max-w-md"
      style={{ minHeight: "200px" }}
    >
      {/* Gradient definition */}
      <defs>
        <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgb(99, 102, 241)" stopOpacity="0.3" />
          <stop
            offset="100%"
            stopColor="rgb(99, 102, 241)"
            stopOpacity="0.05"
          />
        </linearGradient>
      </defs>

      {/* Y-axis line */}
      <line
        x1={padding.left}
        y1={padding.top}
        x2={padding.left}
        y2={padding.top + chartHeight}
        stroke="#d1d5db"
        strokeWidth="1"
      />

      {/* X-axis line with arrow */}
      <line
        x1={padding.left}
        y1={padding.top + chartHeight}
        x2={width - 5}
        y2={padding.top + chartHeight}
        stroke="#374151"
        strokeWidth="1.5"
      />
      <polygon
        points={`${width - 5},${padding.top + chartHeight - 4} ${width - 5},${padding.top + chartHeight + 4} ${width},${padding.top + chartHeight}`}
        fill="#374151"
      />

      {/* Area fill */}
      {areaPath && <path d={areaPath} fill="url(#areaGradient)" />}

      {/* Line */}
      {linePath && (
        <path
          d={linePath}
          fill="none"
          stroke="rgb(99, 102, 241)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}

      {/* Data points with hover interaction */}
      {points.map((point, i) => (
        <g key={i}>
          {/* Larger invisible hit area for easier hover */}
          <circle
            cx={point.x}
            cy={point.y}
            r="20"
            fill="transparent"
            style={{ cursor: "pointer" }}
            onMouseEnter={() => setHoveredPoint(i)}
            onMouseLeave={() => setHoveredPoint(null)}
          />
          {/* Visible point */}
          <circle
            cx={point.x}
            cy={point.y}
            r={hoveredPoint === i ? 6 : 4}
            fill="white"
            stroke="rgb(99, 102, 241)"
            strokeWidth="2"
            style={{ transition: "r 0.15s ease" }}
          />
          {/* Tooltip on hover */}
          {hoveredPoint === i && (
            <g>
              {/* Tooltip background */}
              <rect
                x={point.x - 45}
                y={point.y - 35}
                width="90"
                height="24"
                rx="4"
                fill="#1f2937"
              />
              {/* Tooltip arrow */}
              <polygon
                points={`${point.x - 5},${point.y - 11} ${point.x + 5},${point.y - 11} ${point.x},${point.y - 6}`}
                fill="#1f2937"
              />
              {/* Tooltip text */}
              <text
                x={point.x}
                y={point.y - 18}
                fontSize="12"
                fill="white"
                textAnchor="middle"
                fontWeight="500"
              >
                {formatCurrency(point.data.totalActuals)}
              </text>
            </g>
          )}
        </g>
      ))}

      {/* X-axis labels (first and last) */}
      {sortedData.length > 0 && (
        <>
          <text
            x={points[0].x}
            y={padding.top + chartHeight + 20}
            fontSize="11"
            fill="#6b7280"
            textAnchor="middle"
          >
            {formatPeriod(sortedData[0].periodStart)}
          </text>
          {sortedData.length > 1 && (
            <text
              x={points[points.length - 1].x}
              y={padding.top + chartHeight + 20}
              fontSize="11"
              fill="#6b7280"
              textAnchor="middle"
            >
              {formatPeriod(sortedData[sortedData.length - 1].periodStart)}
            </text>
          )}
        </>
      )}

      {/* Y-axis label */}
      <text
        x={padding.left - 5}
        y={padding.top - 10}
        fontSize="14"
        fill="#374151"
        fontWeight="bold"
      >
        $
      </text>

      {/* Chart title */}
      <text
        x={width / 2}
        y={16}
        fontSize="14"
        fill="#374151"
        textAnchor="middle"
        fontWeight="600"
      >
        Actuals Over Time
      </text>

      {/* Legend */}
      <g transform={`translate(${width / 2 - 50}, ${height - 10})`}>
        <circle cx="0" cy="-4" r="4" fill="rgb(99, 102, 241)" />
        <text x="10" y="0" fontSize="11" fill="#6b7280">
          Total Actuals (USD)
        </text>
      </g>
    </svg>
  );
}

/**
 * Displays statistics and a line chart for expense reports.
 * Shows total count, date range, total amount, and actuals over time.
 */
export function ExpenseReportsStats({
  expenseReportDocuments,
}: ExpenseReportsStatsProps) {
  // Extract and process data from expense report documents
  const chartData = useMemo<ExpenseReportDataPoint[]>(() => {
    return expenseReportDocuments.map((doc) => {
      const state = doc.state.global;

      // First try to get total actuals from group totals
      let totalActuals = 0;
      if (state.wallets) {
        for (const wallet of state.wallets) {
          // Try group totals first
          if (wallet.totals) {
            for (const groupTotal of wallet.totals) {
              if (groupTotal?.totalActuals) {
                totalActuals += groupTotal.totalActuals;
              }
            }
          }
        }

        // If group totals are empty/zero, fall back to summing line item actuals
        if (totalActuals === 0) {
          for (const wallet of state.wallets) {
            if (wallet.lineItems) {
              for (const lineItem of wallet.lineItems) {
                if (lineItem?.actuals) {
                  totalActuals += lineItem.actuals;
                }
              }
            }
          }
        }
      }

      return {
        periodStart: state.periodStart ? new Date(state.periodStart) : null,
        periodEnd: state.periodEnd ? new Date(state.periodEnd) : null,
        totalActuals,
        documentName: doc.header.name,
      };
    });
  }, [expenseReportDocuments]);

  // Calculate summary stats
  const stats = useMemo(() => {
    const validPeriods = chartData.filter((d) => d.periodStart !== null);
    const sortedByStart = [...validPeriods].sort((a, b) => {
      if (!a.periodStart || !b.periodStart) return 0;
      return a.periodStart.getTime() - b.periodStart.getTime();
    });

    const earliestPeriod = sortedByStart[0]?.periodStart ?? null;
    const latestPeriod =
      sortedByStart[sortedByStart.length - 1]?.periodStart ?? null;
    const totalActualsSum = chartData.reduce(
      (sum, d) => sum + d.totalActuals,
      0,
    );

    return {
      count: expenseReportDocuments.length,
      earliestPeriod,
      latestPeriod,
      totalActualsSum,
    };
  }, [chartData, expenseReportDocuments.length]);

  return (
    <div className="bg-white rounded-xl p-6 mb-6 border border-gray-200 shadow-sm">
      <div className="flex flex-row items-center justify-between gap-8">
        {/* Left side: Stats */}
        <div className="space-y-3 flex-shrink-0">
          <h3 className="text-lg font-semibold text-gray-600 mb-4">
            Some Stats :
          </h3>
          <div className="space-y-2 text-gray-700">
            <p>
              <span className="text-gray-500">Total Expense Reports :</span>{" "}
              <span className="font-semibold text-xl text-gray-900">
                {stats.count}
              </span>
            </p>
            <p>
              <span className="text-gray-500">Start Period :</span>{" "}
              <span className="font-medium text-gray-900">
                {formatPeriod(stats.earliestPeriod)}
              </span>
            </p>
            <p>
              <span className="text-gray-500">Latest Period :</span>{" "}
              <span className="font-medium text-gray-900">
                {formatPeriod(stats.latestPeriod)}
              </span>
            </p>
            <p>
              <span className="text-gray-500">Total Amount :</span>{" "}
              <span className="font-semibold text-xl text-indigo-600">
                {formatCurrency(stats.totalActualsSum)}
              </span>
            </p>
          </div>
        </div>

        {/* Right side: Chart */}
        <div className="flex-1 max-w-md">
          <LineChart data={chartData} />
        </div>
      </div>
    </div>
  );
}
