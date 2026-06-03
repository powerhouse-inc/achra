import type { ActionItem } from "../../hooks/useSubscriptionMetrics.js";
import { AlertTriangle, AlertCircle, Info } from "lucide-react";

interface ActionItemsCardProps {
  items: ActionItem[];
}

const SEVERITY_CONFIG = {
  critical: {
    icon: AlertTriangle,
    border: "border-l-red-500",
    iconColor: "text-red-500",
    bg: "bg-red-50/50",
  },
  warning: {
    icon: AlertCircle,
    border: "border-l-amber-400",
    iconColor: "text-amber-500",
    bg: "bg-amber-50/50",
  },
  info: {
    icon: Info,
    border: "border-l-blue-400",
    iconColor: "text-blue-400",
    bg: "bg-blue-50/30",
  },
};

export function ActionItemsCard({ items }: ActionItemsCardProps) {
  if (items.length === 0) {
    return (
      <div className="flex items-center justify-center py-8 text-sm text-stone-400">
        No action items — all systems normal
      </div>
    );
  }

  // Group by severity
  const critical = items.filter((i) => i.severity === "critical");
  const warning = items.filter((i) => i.severity === "warning");
  const info = items.filter((i) => i.severity === "info");

  const grouped = [...critical, ...warning, ...info];

  // Summary counts
  const counts = {
    critical: critical.length,
    warning: warning.length,
    info: info.length,
  };

  return (
    <div>
      {/* Summary bar */}
      <div className="flex gap-3 mb-3">
        {counts.critical > 0 ? (
          <span className="flex items-center gap-1 text-xs font-medium text-red-600">
            <AlertTriangle size={12} />
            {counts.critical} critical
          </span>
        ) : null}
        {counts.warning > 0 ? (
          <span className="flex items-center gap-1 text-xs font-medium text-amber-600">
            <AlertCircle size={12} />
            {counts.warning} warning
          </span>
        ) : null}
        {counts.info > 0 ? (
          <span className="flex items-center gap-1 text-xs font-medium text-blue-500">
            <Info size={12} />
            {counts.info} info
          </span>
        ) : null}
      </div>

      <div className="max-h-96 space-y-2 overflow-y-auto pr-1">
        {grouped.map((item, i) => {
          const config = SEVERITY_CONFIG[item.severity];
          const Icon = config.icon;

          return (
            <div
              key={`${item.title}-${item.customerName ?? ""}-${String(i)}`}
              className={`flex items-start gap-2.5 rounded-md border-l-[3px] ${config.border} ${config.bg} px-3 py-2.5`}
            >
              <Icon
                size={14}
                className={`mt-0.5 shrink-0 ${config.iconColor}`}
              />
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-medium text-stone-700">
                    {item.title}
                  </span>
                  {item.customerName ? (
                    <span className="text-xs text-stone-400">
                      — {item.customerName}
                    </span>
                  ) : null}
                </div>
                <p className="mt-0.5 text-xs text-stone-500">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
