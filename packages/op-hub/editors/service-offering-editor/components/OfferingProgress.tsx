import { useMemo, useState, useRef, useEffect } from "react";
import type { DocumentDispatch } from "@powerhousedao/reactor-browser";
import type {
  ServiceOfferingDocument,
  ServiceOfferingAction,
  ServiceStatus,
} from "document-models/service-offering";
import { updateOfferingStatus } from "../../../document-models/service-offering/v1/gen/offering/creators.js";
import type { TabId } from "../editor.js";

interface OfferingProgressProps {
  document: ServiceOfferingDocument;
  dispatch: DocumentDispatch<ServiceOfferingAction>;
  activeTab: TabId;
  onTabChange: (tabId: TabId) => void;
}

interface ProgressStep {
  id: TabId;
  label: string;
  isComplete: boolean;
  details: string;
  explainer: string;
}

// Only count services that belong to an existing group
function getGroupedServices(state: ServiceOfferingDocument["state"]["global"]) {
  const existingGroupIds = new Set(state.optionGroups?.map((g) => g.id) ?? []);
  return state.services.filter(
    (s) => s.optionGroupId && existingGroupIds.has(s.optionGroupId),
  );
}

// Helper to check if matrix is reasonably complete
export function hasCompleteMatrix(
  state: ServiceOfferingDocument["state"]["global"],
): boolean {
  const grouped = getGroupedServices(state);
  if (grouped.length === 0 || state.tiers.length === 0) return false;

  // Check if at least 50% of grouped services have tier assignments
  const servicesWithLevels = grouped.filter((service) =>
    state.tiers.some((tier) =>
      tier.serviceLevels.some((sl) => sl.serviceId === service.id),
    ),
  ).length;

  return servicesWithLevels >= Math.ceil(grouped.length * 0.5);
}

function getMatrixCompletionText(
  state: ServiceOfferingDocument["state"]["global"],
): string {
  const grouped = getGroupedServices(state);
  if (grouped.length === 0 || state.tiers.length === 0) {
    return "Add services and tiers first";
  }

  const servicesWithLevels = grouped.filter((service) =>
    state.tiers.some((tier) =>
      tier.serviceLevels.some((sl) => sl.serviceId === service.id),
    ),
  ).length;

  return `${servicesWithLevels}/${grouped.length} services configured`;
}

const fontSans = { fontFamily: "'DM Sans', system-ui, sans-serif" };
const fontMono = { fontFamily: "'DM Mono', 'SF Mono', monospace" };

const STATUS_CONFIG: Record<
  ServiceStatus,
  { label: string; badgeClass: string; description: string }
> = {
  DRAFT: {
    label: "Draft",
    badgeClass: "bg-slate-100 text-slate-600",
    description: "Not visible on Achra",
  },
  COMING_SOON: {
    label: "Coming Soon",
    badgeClass: "bg-amber-100 text-amber-700",
    description: "Visible on Achra as coming soon",
  },
  ACTIVE: {
    label: "Active",
    badgeClass: "bg-emerald-50 text-emerald-600",
    description: "Live on Achra",
  },
  DEPRECATED: {
    label: "Deprecated",
    badgeClass: "bg-rose-50 text-rose-600",
    description: "Marked as deprecated on Achra",
  },
};

const STATUS_ORDER: ServiceStatus[] = [
  "DRAFT",
  "COMING_SOON",
  "ACTIVE",
  "DEPRECATED",
];

// Transitions that require confirmation (publishing / going live)
function needsConfirmation(
  from: ServiceStatus,
  to: ServiceStatus,
): { title: string; message: string } | null {
  if (from === "DRAFT" && to === "COMING_SOON") {
    return {
      title: "Publish as Coming Soon?",
      message:
        'This service offering will be visible on Achra with a "Coming Soon" status. Subscribers won\'t be able to sign up yet.',
    };
  }
  if (from === "DRAFT" && to === "ACTIVE") {
    return {
      title: "Go Live on Achra?",
      message:
        "This service offering will be published and available for subscribers on Achra immediately.",
    };
  }
  if (from === "COMING_SOON" && to === "ACTIVE") {
    return {
      title: "Go Live on Achra?",
      message:
        'This service offering will change from "Coming Soon" to fully active. Subscribers will be able to sign up.',
    };
  }
  return null;
}

export function OfferingProgress({
  document,
  dispatch,
  activeTab,
  onTabChange,
}: OfferingProgressProps) {
  const state = document.state.global;
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [pendingStatus, setPendingStatus] = useState<ServiceStatus | null>(
    null,
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    if (!dropdownOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    window.addEventListener("mousedown", handleClick);
    return () => window.removeEventListener("mousedown", handleClick);
  }, [dropdownOpen]);

  const handleStatusSelect = (newStatus: ServiceStatus) => {
    setDropdownOpen(false);
    if (newStatus === state.status) return;

    const confirmation = needsConfirmation(state.status, newStatus);
    if (confirmation) {
      setPendingStatus(newStatus);
    } else {
      dispatch(
        updateOfferingStatus({
          status: newStatus,
          lastModified: new Date().toISOString(),
        }),
      );
    }
  };

  const confirmStatusChange = () => {
    if (!pendingStatus) return;
    dispatch(
      updateOfferingStatus({
        status: pendingStatus,
        lastModified: new Date().toISOString(),
      }),
    );
    setPendingStatus(null);
  };

  const cancelStatusChange = () => {
    setPendingStatus(null);
  };

  const currentConfig = STATUS_CONFIG[state.status];
  const pendingConfig = pendingStatus ? STATUS_CONFIG[pendingStatus] : null;
  const pendingConfirmation = pendingStatus
    ? needsConfirmation(state.status, pendingStatus)
    : null;

  const steps: ProgressStep[] = useMemo(() => {
    const groupCount = state.optionGroups?.length ?? 0;
    const existingGroupIds = new Set(
      state.optionGroups?.map((g) => g.id) ?? [],
    );
    const groupedServiceCount = state.services.filter(
      (s) => s.optionGroupId && existingGroupIds.has(s.optionGroupId),
    ).length;
    return [
      {
        id: "scope-facets",
        label: "Product",
        isComplete: !!state.resourceTemplateId,
        details: state.resourceTemplateId
          ? `${state.facetTargets.length} facets configured`
          : "Select a product to continue",
        explainer: state.resourceTemplateId
          ? "Product selected — configure facets if needed"
          : "Choose a product to define scope and available services",
      },
      {
        id: "tier-definition",
        label: "Tiers",
        isComplete: state.tiers.length >= 2,
        details:
          state.tiers.length >= 2
            ? `${state.tiers.length} tiers defined`
            : `Add at least ${2 - state.tiers.length} more tier${2 - state.tiers.length !== 1 ? "s" : ""} to continue`,
        explainer:
          state.tiers.length >= 2
            ? "Set billing cycles and tier pricing"
            : "Create at least 2 pricing tiers for your offering",
      },
      {
        id: "service-catalog",
        label: "Services",
        isComplete: groupedServiceCount >= 1,
        details:
          groupedServiceCount >= 1
            ? `${groupedServiceCount} service${groupedServiceCount !== 1 ? "s" : ""} in ${groupCount} group${groupCount !== 1 ? "s" : ""}`
            : "Add at least 1 service to a group to continue",
        explainer:
          groupedServiceCount >= 1
            ? "Organize services into groups and set pricing"
            : "Add services and organize them into option groups",
      },
      {
        id: "the-matrix",
        label: "Matrix",
        isComplete: hasCompleteMatrix(state),
        details: getMatrixCompletionText(state),
        explainer: hasCompleteMatrix(state)
          ? "Review tier assignments, pricing, and usage metrics"
          : "Assign services to tiers and configure pricing",
      },
    ];
  }, [state]);

  const totalPercent = useMemo(() => {
    const count = steps.filter((s) => s.isComplete).length;
    return Math.round((count / steps.length) * 100);
  }, [steps]);

  return (
    <>
      <div className="bg-white rounded-xl py-4 px-6 mb-4 shadow-sm border border-slate-100">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-baseline gap-2">
            {totalPercent < 100 ? (
              <>
                <span
                  className="text-2xl font-bold text-violet-600"
                  style={fontMono}
                >
                  {totalPercent}%
                </span>
                <span className="text-xs text-slate-500 uppercase tracking-[0.05em]">
                  Complete
                </span>
              </>
            ) : (
              <span className="text-[0.8125rem] font-medium text-emerald-600 leading-[1.4]">
                Review pricing in the Matrix and set usage metrics
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <div className="relative" ref={dropdownRef}>
              <button
                className={`inline-flex items-center gap-1.5 py-1.5 px-3 text-[0.6875rem] font-bold uppercase tracking-[0.04em] rounded-full border-none cursor-pointer transition-all duration-150 hover:brightness-95 ${currentConfig.badgeClass}`}
                style={fontSans}
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                {state.status === "ACTIVE" && (
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    style={{
                      width: 10,
                      height: 10,
                      animation: "progress-pulse 2s ease-in-out infinite",
                    }}
                  >
                    <circle cx="12" cy="12" r="6" />
                  </svg>
                )}
                {currentConfig.label}
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  style={{
                    width: 12,
                    height: 12,
                    marginLeft: 2,
                    transition: "transform 0.15s ease",
                    transform: dropdownOpen ? "rotate(180deg)" : "rotate(0)",
                  }}
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              {dropdownOpen && (
                <div
                  className="absolute right-0 w-[220px] bg-white rounded-[10px] shadow-lg border border-slate-200 p-1 z-50"
                  style={{
                    top: "calc(100% + 6px)",
                    animation: "progress-dropdown-in 0.15s ease-out",
                  }}
                >
                  {STATUS_ORDER.map((status) => {
                    const config = STATUS_CONFIG[status];
                    const isCurrent = status === state.status;
                    return (
                      <button
                        key={status}
                        className={`flex flex-col items-start relative w-full py-2 px-3 border-none bg-transparent rounded-md cursor-pointer text-left transition-colors duration-100 ${isCurrent ? "bg-violet-50 hover:bg-violet-50" : "hover:bg-slate-50"}`}
                        style={fontSans}
                        onClick={() => handleStatusSelect(status)}
                      >
                        <span className="text-[0.8125rem] font-semibold text-slate-800">
                          {config.label}
                        </span>
                        <span className="text-[0.6875rem] text-slate-400">
                          {config.description}
                        </span>
                        {isCurrent && (
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            className="absolute top-2.5 right-2.5 w-3.5 h-3.5 text-violet-500"
                          >
                            <path d="M5 12l5 5L20 7" />
                          </svg>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden mb-4">
          <div
            className="h-full rounded-full"
            style={{
              width: `${totalPercent}%`,
              background:
                "linear-gradient(90deg, rgb(139, 92, 246), rgb(16, 185, 129))",
              transition: "width 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          />
        </div>
        <div className="flex flex-wrap md:flex-nowrap justify-between gap-2">
          {steps.map((step, i) => {
            const isActive = step.id === activeTab;

            return (
              <button
                key={step.id}
                onClick={() => onTabChange(step.id)}
                className={`flex-[1_1_45%] md:flex-1 flex items-center gap-2.5 py-2 px-3 bg-transparent border-none rounded-[10px] cursor-pointer transition-all duration-150 text-left ${isActive ? "bg-violet-50" : "hover:bg-slate-50"}`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 transition-all duration-200 ${
                    step.isComplete
                      ? "bg-emerald-500 text-white"
                      : isActive
                        ? "bg-violet-500 text-white"
                        : "bg-slate-200 text-slate-500"
                  }`}
                  style={
                    isActive && !step.isComplete
                      ? { boxShadow: "0 0 0 3px rgb(237, 233, 254)" }
                      : undefined
                  }
                >
                  {step.isComplete ? (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      className="w-3.5 h-3.5"
                    >
                      <path d="M5 12l5 5L20 7" />
                    </svg>
                  ) : (
                    <span>{i + 1}</span>
                  )}
                </div>
                <div className="flex flex-col min-w-0">
                  <span
                    className={`text-[0.8125rem] font-semibold ${isActive ? "text-violet-700" : "text-slate-700"}`}
                  >
                    {step.label}
                  </span>
                  <span className="text-[0.625rem] text-slate-400 leading-[1.3] mt-px">
                    {step.explainer}
                  </span>
                  <span
                    className={`text-[0.6875rem] whitespace-nowrap overflow-hidden text-ellipsis ${step.isComplete ? "text-emerald-600" : "text-slate-400"}`}
                  >
                    {step.details}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Confirmation Modal */}
      {pendingStatus && pendingConfirmation && pendingConfig && (
        <div
          className="fixed inset-0 flex items-center justify-center z-[1000]"
          style={{
            background: "rgba(15, 23, 42, 0.4)",
            backdropFilter: "blur(4px)",
            animation: "progress-overlay-in 0.2s ease-out",
          }}
          onClick={cancelStatusChange}
        >
          <div
            className="bg-white rounded-xl p-6 max-w-[400px] w-[90%] shadow-xl"
            style={{
              animation:
                "progress-modal-in 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold text-slate-800 m-0 mb-2">
              {pendingConfirmation.title}
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed m-0 mb-5">
              {pendingConfirmation.message}
            </p>
            <div className="flex items-center justify-center gap-3 p-3 bg-slate-50 rounded-[10px] mb-5">
              <span
                className={`inline-flex items-center gap-1.5 py-1.5 px-3 text-[0.6875rem] font-bold uppercase tracking-[0.04em] rounded-full border-none cursor-default ${currentConfig.badgeClass}`}
                style={fontSans}
              >
                {currentConfig.label}
              </span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                style={{ width: 20, height: 20, color: "rgb(148, 163, 184)" }}
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
              <span
                className={`inline-flex items-center gap-1.5 py-1.5 px-3 text-[0.6875rem] font-bold uppercase tracking-[0.04em] rounded-full border-none cursor-default ${pendingConfig.badgeClass}`}
                style={fontSans}
              >
                {pendingConfig.label}
              </span>
            </div>
            <div className="flex justify-end gap-2">
              <button
                className="py-2 px-5 text-[0.8125rem] font-semibold border-none rounded-[10px] cursor-pointer transition-all duration-150 bg-slate-100 text-slate-600 hover:bg-slate-200"
                style={fontSans}
                onClick={cancelStatusChange}
              >
                Cancel
              </button>
              <button
                className="py-2 px-5 text-[0.8125rem] font-semibold border-none rounded-[10px] cursor-pointer transition-all duration-150 text-white hover:-translate-y-px active:translate-y-0"
                style={{
                  ...fontSans,
                  background:
                    "linear-gradient(135deg, rgb(16, 185, 129), rgb(5, 150, 105))",
                  boxShadow: "0 2px 6px rgba(16, 185, 129, 0.3)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 4px 10px rgba(16, 185, 129, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 2px 6px rgba(16, 185, 129, 0.3)";
                }}
                onClick={confirmStatusChange}
              >
                {pendingStatus === "ACTIVE" ? "Go Live" : "Publish"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
