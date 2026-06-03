import { useState, useRef, useEffect, useCallback } from "react";
import { DocumentToolbar } from "@powerhousedao/design-system/connect";
import { TooltipProvider } from "@powerhousedao/design-system/ui/components/tooltip/tooltip";
import { useSelectedServiceOfferingDocument } from "./hooks/useServiceOfferingDocument.js";
import {
  OfferingProgress,
  hasCompleteMatrix,
} from "./components/OfferingProgress.js";
import { ResourceTemplateSelector } from "./components/ResourceTemplateSelector.js";
import { ServiceCatalog } from "./components/ServiceCatalog.js";
import { TierDefinition } from "./components/TierDefinition.js";
import { TheMatrix } from "./components/TheMatrix.js";
import "./editor.css";

export type TabId =
  | "scope-facets"
  | "service-catalog"
  | "tier-definition"
  | "the-matrix";

const TAB_ORDER: TabId[] = [
  "scope-facets",
  "tier-definition",
  "service-catalog",
  "the-matrix",
];

const TAB_LABELS: Record<TabId, string> = {
  "scope-facets": "Product",
  "tier-definition": "Tiers",
  "service-catalog": "Services",
  "the-matrix": "Matrix",
};

export default function ServiceOfferingEditor() {
  const [document, dispatch] = useSelectedServiceOfferingDocument();
  const [activeTab, setActiveTab] = useState<TabId>("scope-facets");
  const nextBarRef = useRef<HTMLDivElement>(null);
  const [nextBarVisible, setNextBarVisible] = useState(true);

  const currentIndex = TAB_ORDER.indexOf(activeTab);
  const nextTab =
    currentIndex < TAB_ORDER.length - 1 ? TAB_ORDER[currentIndex + 1] : null;

  useEffect(() => {
    const el = nextBarRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setNextBarVisible(entry.isIntersecting),
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [activeTab]);

  const goNext = useCallback(() => {
    if (nextTab) setActiveTab(nextTab);
  }, [nextTab]);

  if (!document) {
    return (
      <div
        className="min-h-full overflow-y-auto"
        style={{
          fontFamily: "'DM Sans', system-ui, sans-serif",
          background:
            "linear-gradient(135deg, #f1f5f9 0%, #f8fafc 50%, #f0f4f8 100%)",
        }}
      >
        <div className="flex flex-col items-center justify-center min-h-screen text-center p-12">
          <div
            className="w-20 h-20 mb-6 text-slate-300"
            style={{ animation: "so-float 3s ease-in-out infinite" }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              className="w-full h-full"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-slate-700 m-0 mb-2 tracking-tight">
            No service offering selected
          </h2>
          <p className="text-base text-slate-500 m-0">
            Select a document to start editing
          </p>
        </div>
      </div>
    );
  }

  const state = document.state.global;
  const existingGroupIds = new Set(state.optionGroups?.map((g) => g.id) ?? []);
  const isCurrentStepComplete: boolean = {
    "scope-facets": !!state.resourceTemplateId,
    "tier-definition": state.tiers.length >= 2,
    "service-catalog":
      state.services.filter(
        (s) => s.optionGroupId && existingGroupIds.has(s.optionGroupId),
      ).length >= 1,
    "the-matrix": hasCompleteMatrix(state),
  }[activeTab];

  const renderTabContent = () => {
    switch (activeTab) {
      case "scope-facets":
        return (
          <ResourceTemplateSelector document={document} dispatch={dispatch} />
        );
      case "service-catalog":
        return <ServiceCatalog document={document} dispatch={dispatch} />;
      case "tier-definition":
        return <TierDefinition document={document} dispatch={dispatch} />;
      case "the-matrix":
        return <TheMatrix document={document} dispatch={dispatch} />;
      default:
        return null;
    }
  };

  return (
    <TooltipProvider>
      <div
        className="min-h-full overflow-y-auto"
        style={{
          fontFamily: "'DM Sans', system-ui, sans-serif",
          background:
            "linear-gradient(135deg, #f1f5f9 0%, #f8fafc 50%, #f0f4f8 100%)",
        }}
      >
        <DocumentToolbar />
        <div className="max-w-[1400px] mx-auto px-8 pt-6 pb-12">
          <OfferingProgress
            document={document}
            dispatch={dispatch}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
          <div
            className="min-h-[500px]"
            style={{ animation: "so-fade-in 300ms ease-out" }}
          >
            {renderTabContent()}
            {nextTab && (
              <div
                className="flex items-center justify-end gap-3 py-4 mt-6 border-t border-slate-200"
                ref={nextBarRef}
              >
                {!isCurrentStepComplete && (
                  <span className="text-[0.6875rem] text-amber-600">
                    This step is not yet complete — you can still continue
                  </span>
                )}
                <button
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-[0.8125rem] font-semibold text-white bg-violet-600 border-none rounded-[10px] cursor-pointer transition-colors duration-150 hover:bg-violet-700"
                  style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
                  onClick={goNext}
                >
                  Next: {TAB_LABELS[nextTab]}
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    style={{ width: 16, height: 16 }}
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
        {nextTab && !nextBarVisible && (
          <button
            className="fixed bottom-6 right-8 inline-flex items-center gap-1.5 px-5 py-2.5 text-[0.8125rem] font-semibold text-white bg-violet-600 border-none rounded-full cursor-pointer z-50 hover:bg-violet-700"
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              boxShadow:
                "0 4px 12px rgba(109, 40, 217, 0.3), 0 2px 4px rgba(0, 0, 0, 0.1)",
              animation: "so-fab-in 0.2s ease-out",
            }}
            onClick={goNext}
          >
            Next: {TAB_LABELS[nextTab]}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              style={{ width: 16, height: 16 }}
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>
    </TooltipProvider>
  );
}
