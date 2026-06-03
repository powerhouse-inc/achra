import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import {
  type DocumentDispatch,
  usePHToast,
} from "@powerhousedao/reactor-browser";
import type {
  ServiceOfferingDocument,
  ServiceOfferingAction,
} from "document-models/service-offering";
import {
  selectResourceTemplate,
  changeResourceTemplate,
  setOperator,
  updateOfferingInfo,
  addFacetOption,
  removeFacetOption,
  setFacetTarget,
} from "../../../document-models/service-offering/v1/gen/offering/creators.js";
import { generateId } from "document-model/core";
import { useResourceTemplateDocumentsInSelectedDrive } from "../../../document-models/resource-template/v1/hooks.js";
import type {
  ResourceTemplateDocument,
  ResourceTemplateGlobalState,
} from "document-models/resource-template";
import { MarkdownPreview } from "./MarkdownPreview.js";
import { InfoIcon } from "./InfoIcon.js";
import { ConfirmDialog } from "./ConfirmDialog.js";
import { useRemoteResourceTemplates } from "../hooks/useRemoteResourceTemplates.js";
import type { RemoteResourceTemplate } from "../../utils/graphql-client.js";

/**
 * Normalized template shape used by all UI components.
 * Both local ResourceTemplateDocument and remote templates are mapped to this.
 */
interface NormalizedTemplate {
  id: string;
  isRemote: boolean;
  /** Resolved operator/builder name for remote templates */
  operatorName: string | null;
  state: {
    global: ResourceTemplateGlobalState;
  };
}

function normalizeLocalTemplate(
  doc: ResourceTemplateDocument,
): NormalizedTemplate {
  return {
    id: doc.header.id,
    isRemote: false,
    operatorName: null,
    state: { global: doc.state.global },
  };
}

function normalizeRemoteTemplate(
  remote: RemoteResourceTemplate,
): NormalizedTemplate {
  return {
    id: remote.id,
    isRemote: true,
    operatorName: remote.operatorName ?? null,
    state: {
      global: {
        id: remote.state.id ?? remote.id,
        operatorId: remote.state.operatorId ?? "",
        title: remote.state.title || remote.name || "Untitled",
        summary: remote.state.summary || "",
        description: remote.state.description || null,
        thumbnailUrl: remote.state.thumbnailUrl || null,
        infoLink: remote.state.infoLink || null,
        status:
          (remote.state.status as ResourceTemplateGlobalState["status"]) ||
          "DRAFT",
        lastModified: remote.state.lastModified || new Date().toISOString(),
        targetAudiences: remote.state.targetAudiences ?? [],
        setupServices: remote.state.setupServices ?? [],
        recurringServices: remote.state.recurringServices ?? [],
        facetTargets: remote.state.facetTargets ?? [],
        services: (remote.state.services ?? []).map((s) => ({
          ...s,
          description: s.description || null,
          displayOrder: s.displayOrder || null,
          parentServiceId: null,
          optionGroupId: s.optionGroupId || null,
          facetBindings: [],
        })),
        optionGroups: [],
        faqFields: [],
        contentSections: [],
        weight: null,
        subtitle: null,
      },
    },
  };
}

interface ResourceTemplateSelectorProps {
  document: ServiceOfferingDocument;
  dispatch: DocumentDispatch<ServiceOfferingAction>;
}

export function ResourceTemplateSelector({
  document,
  dispatch,
}: ResourceTemplateSelectorProps) {
  const localTemplates = useResourceTemplateDocumentsInSelectedDrive();
  const toast = usePHToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [showingSelector, setShowingSelector] = useState(false);
  const [pendingTemplateChange, setPendingTemplateChange] =
    useState<NormalizedTemplate | null>(null);

  // Build set of local template IDs for deduplication
  const localTemplateIds = useMemo(
    () => new Set((localTemplates ?? []).map((t) => t.header.id)),
    [localTemplates],
  );

  // Fetch remote templates (filtered to exclude locals)
  const { templates: remoteTemplates, isLoading: isLoadingRemote } =
    useRemoteResourceTemplates(localTemplateIds);

  // Normalize, merge, and deduplicate local + remote templates
  const allTemplates = useMemo(() => {
    const seen = new Set<string>();
    const normalized: NormalizedTemplate[] = [];
    // Local templates take priority
    for (const doc of localTemplates ?? []) {
      if (!seen.has(doc.header.id)) {
        seen.add(doc.header.id);
        normalized.push(normalizeLocalTemplate(doc));
      }
    }
    // Add remote templates only if not already present
    for (const remote of remoteTemplates) {
      if (!seen.has(remote.id)) {
        seen.add(remote.id);
        normalized.push(normalizeRemoteTemplate(remote));
      }
    }
    return normalized;
  }, [localTemplates, remoteTemplates]);

  // Get the currently selected template ID from document state
  const currentTemplateId = document.state.global.resourceTemplateId;

  // Aggregate all unique facets + options across every product (union)
  const aggregatedFacets = useMemo(() => {
    const facetMap = new Map<
      string,
      { categoryKey: string; categoryLabel: string; options: Set<string> }
    >();
    for (const t of allTemplates) {
      for (const ft of t.state.global.facetTargets) {
        const existing = facetMap.get(ft.categoryKey);
        if (existing) {
          for (const opt of ft.selectedOptions) existing.options.add(opt);
        } else {
          facetMap.set(ft.categoryKey, {
            categoryKey: ft.categoryKey,
            categoryLabel: ft.categoryLabel,
            options: new Set(ft.selectedOptions),
          });
        }
      }
    }
    return Array.from(facetMap.values()).map((f) => ({
      categoryKey: f.categoryKey,
      categoryLabel: f.categoryLabel,
      options: Array.from(f.options).sort(),
    }));
  }, [allTemplates]);

  // Facet filter state: which facets are active and which options are selected
  const [activeFacets, setActiveFacets] = useState<Set<string>>(new Set());
  const [selectedFacetOptions, setSelectedFacetOptions] = useState<
    Record<string, Set<string>>
  >({});

  const toggleFacet = useCallback((categoryKey: string) => {
    setActiveFacets((prev) => {
      const next = new Set(prev);
      if (next.has(categoryKey)) {
        next.delete(categoryKey);
        // Also clear options for this facet
        setSelectedFacetOptions((opts) => {
          const updated = { ...opts };
          delete updated[categoryKey];
          return updated;
        });
      } else {
        next.add(categoryKey);
      }
      return next;
    });
  }, []);

  const toggleFacetOption = useCallback(
    (categoryKey: string, option: string) => {
      setSelectedFacetOptions((prev) => {
        const current = prev[categoryKey] ?? new Set<string>();
        const next = new Set(current);
        if (next.has(option)) {
          next.delete(option);
        } else {
          next.add(option);
        }
        return { ...prev, [categoryKey]: next };
      });
    },
    [],
  );

  const clearAllFacetFilters = useCallback(() => {
    setActiveFacets(new Set());
    setSelectedFacetOptions({});
  }, []);

  const hasAnyFacetFilter = activeFacets.size > 0;

  const filteredTemplates = useMemo(() => {
    let results = allTemplates;

    // Apply text search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        (t) =>
          t.state.global.title.toLowerCase().includes(query) ||
          t.state.global.summary.toLowerCase().includes(query),
      );
    }

    // Apply facet filters (AND across facets, OR within a facet's options)
    if (activeFacets.size > 0) {
      results = results.filter((t) => {
        for (const facetKey of activeFacets) {
          // Product must have this facet
          const productFacet = t.state.global.facetTargets.find(
            (ft) => ft.categoryKey === facetKey,
          );
          if (!productFacet) return false;

          // If specific options are selected, product must have at least one
          const selectedOpts = selectedFacetOptions[facetKey];
          if (selectedOpts && selectedOpts.size > 0) {
            const hasMatch = productFacet.selectedOptions.some((opt) =>
              selectedOpts.has(opt),
            );
            if (!hasMatch) return false;
          }
        }
        return true;
      });
    }

    return results;
  }, [allTemplates, searchQuery, activeFacets, selectedFacetOptions]);

  const selectedTemplate = useMemo(() => {
    if (!currentTemplateId || !allTemplates.length) return null;
    return allTemplates.find((t) => t.id === currentTemplateId) || null;
  }, [currentTemplateId, allTemplates]);

  const applyTemplate = useCallback(
    (template: NormalizedTemplate) => {
      const now = new Date().toISOString();

      // Deselect if clicking the already-selected product
      if (currentTemplateId === template.id) {
        dispatch(
          changeResourceTemplate({
            previousTemplateId: currentTemplateId,
            newTemplateId: "",
            lastModified: now,
          }),
        );
        return;
      }

      if (currentTemplateId) {
        dispatch(
          changeResourceTemplate({
            previousTemplateId: currentTemplateId,
            newTemplateId: template.id,
            lastModified: now,
          }),
        );
      } else {
        dispatch(
          selectResourceTemplate({
            resourceTemplateId: template.id,
            lastModified: now,
          }),
        );
      }

      // Copy offering info from the resource template
      const g = template.state.global;
      dispatch(
        updateOfferingInfo({
          title: g.title || undefined,
          summary: g.summary || undefined,
          description: g.description || undefined,
          thumbnailUrl: g.thumbnailUrl || undefined,
          infoLink: g.infoLink || undefined,
          lastModified: now,
        }),
      );

      // Set operator from the resource template if it has one
      const templateOperatorId = template.state.global.operatorId;
      if (templateOperatorId) {
        dispatch(
          setOperator({
            operatorId: templateOperatorId,
            lastModified: now,
          }),
        );
      } else if (!document.state.global.operatorId) {
        // Template has no operatorId and offering doesn't have one either
        toast?.(
          "This product doesn't define an Operator ID. Please set one manually below.",
          { type: "connect-warning" },
        );
      }
      setShowingSelector(false);
    },
    [currentTemplateId, dispatch],
  );

  const handleSelectTemplate = useCallback(
    (template: NormalizedTemplate) => {
      // Changing from one template to another needs confirmation
      if (currentTemplateId && currentTemplateId !== template.id) {
        setPendingTemplateChange(template);
        return;
      }
      applyTemplate(template);
    },
    [currentTemplateId, applyTemplate],
  );

  const confirmTemplateChange = useCallback(() => {
    if (!pendingTemplateChange) return;
    applyTemplate(pendingTemplateChange);
    setPendingTemplateChange(null);
  }, [pendingTemplateChange, applyTemplate]);

  const handleChangeTemplate = useCallback(() => {
    setShowingSelector(true);
  }, []);

  const { activeTemplates, otherTemplates } = useMemo(() => {
    const active: typeof filteredTemplates = [];
    const other: typeof filteredTemplates = [];
    for (const t of filteredTemplates) {
      if (t.state.global.status === "ACTIVE") active.push(t);
      else other.push(t);
    }
    return { activeTemplates: active, otherTemplates: other };
  }, [filteredTemplates]);

  // Determine recommended template (Social Proof / Authority Bias)
  // The most complete active template is recommended
  const recommendedTemplateId = useMemo(() => {
    if (!activeTemplates || activeTemplates.length === 0) return null;

    // Score templates by completeness (more services, facets, audiences = better)
    const scored = activeTemplates.map((t) => ({
      id: t.id,
      score:
        t.state.global.services.length * 3 + // Services weighted highest
        t.state.global.facetTargets.length * 2 +
        t.state.global.targetAudiences.length +
        (t.state.global.description ? 2 : 0) +
        (t.state.global.thumbnailUrl ? 1 : 0),
    }));

    const best = scored.sort((a, b) => b.score - a.score)[0];
    return best?.id || null;
  }, [activeTemplates]);

  // If a template is selected and user is not changing, show the detail view with facet selection
  if (selectedTemplate && !showingSelector) {
    return (
      <>
        <div
          className="flex flex-col gap-6"
          style={{ fontFamily: "'Instrument Sans', system-ui, sans-serif" }}
        >
          <TemplateDetailView
            template={selectedTemplate}
            offeringDocument={document}
            dispatch={dispatch}
            onChangeTemplate={handleChangeTemplate}
          />
        </div>
      </>
    );
  }

  return (
    <>
      <div
        className="flex flex-col gap-6"
        style={{ fontFamily: "'Instrument Sans', system-ui, sans-serif" }}
      >
        {/* Header */}
        <div
          className="flex items-start gap-5 p-6 bg-white rounded-2xl border-l-4 border-l-teal-500 max-md:flex-col"
          style={{
            boxShadow:
              "0 1px 3px rgba(26, 31, 54, 0.04), 0 4px 16px rgba(26, 31, 54, 0.06)",
          }}
        >
          <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-500 flex items-center justify-center shrink-0">
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
            >
              <path d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-[#1a1f36] m-0 mb-2 tracking-tight">
              Select a Product
              <InfoIcon content="A Product defines the scope and available services for your offering. Select one to pre-populate your offering structure." />
            </h2>
            <p className="text-[0.9375rem] text-[#4a5578] m-0 leading-relaxed max-w-[600px]">
              Choose a product to base this service offering on. The product
              defines the configuration, target audiences, and available
              services.
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="flex items-center gap-3 py-3.5 px-[18px] bg-white border-[1.5px] border-[#e4e8f0] rounded-xl transition-all duration-150 focus-within:border-teal-500 focus-within:shadow-[0_0_0_3px_#ccfbf1]">
          <svg
            className="w-5 h-5 text-[#8792a8] shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8" strokeWidth="2" />
            <path d="M21 21l-4.35-4.35" strokeWidth="2" />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="flex-1 text-[0.9375rem] bg-transparent border-none outline-none text-[#1a1f36] placeholder:text-[#8792a8]"
            style={{ fontFamily: "'Instrument Sans', system-ui, sans-serif" }}
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="flex items-center justify-center w-6 h-6 p-0 bg-[#f0f2f7] border-none rounded-md text-[#8792a8] cursor-pointer transition-all duration-150 hover:bg-[#e4e8f0] hover:text-[#4a5578]"
            >
              <svg
                className="w-3.5 h-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path d="M18 6L6 18M6 6l12 12" strokeWidth="2" />
              </svg>
            </button>
          )}
        </div>

        {/* Facet Filters */}
        {aggregatedFacets.length > 0 && (
          <div className="flex flex-col gap-3 py-4 px-5 bg-slate-50 border border-slate-200 rounded-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Filter by facet
                <InfoIcon content="Facets are customizable dimensions of your service (e.g., Legal Entity type, Team size). Clients choose from these options when subscribing." />
              </span>
              {hasAnyFacetFilter && (
                <button
                  type="button"
                  onClick={clearAllFacetFilters}
                  className="text-xs font-medium text-violet-600 bg-transparent border-none cursor-pointer p-0 hover:underline"
                  style={{ fontFamily: "system-ui" }}
                >
                  Clear filters
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {aggregatedFacets.map((facet) => {
                const isActive = activeFacets.has(facet.categoryKey);
                const selectedCount =
                  selectedFacetOptions[facet.categoryKey]?.size ?? 0;
                return (
                  <button
                    key={facet.categoryKey}
                    type="button"
                    onClick={() => toggleFacet(facet.categoryKey)}
                    className={`inline-flex items-center gap-1.5 py-1.5 px-3.5 text-[0.8125rem] font-medium rounded-full cursor-pointer transition-all duration-150 ${
                      isActive
                        ? "bg-violet-600 border-[1.5px] border-violet-600 text-white hover:bg-violet-700 hover:border-violet-700"
                        : "bg-white border-[1.5px] border-slate-200 text-slate-600 hover:border-violet-300 hover:text-violet-700"
                    }`}
                    style={{ fontFamily: "system-ui" }}
                  >
                    {facet.categoryLabel}
                    {selectedCount > 0 && (
                      <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-[5px] text-[0.6875rem] font-bold bg-white/25 rounded-full">
                        {selectedCount}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
            {/* Expanded options for active facets */}
            {aggregatedFacets
              .filter((f) => activeFacets.has(f.categoryKey))
              .map((facet) => {
                const selected =
                  selectedFacetOptions[facet.categoryKey] ?? new Set<string>();
                return (
                  <div
                    key={facet.categoryKey}
                    className="flex items-start gap-2.5 pt-2.5 border-t border-slate-200"
                  >
                    <span className="text-xs font-semibold text-slate-500 whitespace-nowrap pt-[5px] min-w-[80px]">
                      {facet.categoryLabel}:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {facet.options.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() =>
                            toggleFacetOption(facet.categoryKey, opt)
                          }
                          className={`py-1 px-3 text-xs font-medium rounded-lg cursor-pointer transition-all duration-150 ${
                            selected.has(opt)
                              ? "bg-emerald-50 border border-emerald-500 text-emerald-700 hover:bg-emerald-100"
                              : "bg-white border border-slate-200 text-slate-600 hover:border-emerald-400 hover:text-emerald-700"
                          }`}
                          style={{ fontFamily: "system-ui" }}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            {hasAnyFacetFilter && (
              <div className="text-xs font-medium text-slate-500 pt-1">
                Showing {filteredTemplates.length} of {allTemplates.length}{" "}
                product{allTemplates.length !== 1 ? "s" : ""}
              </div>
            )}
          </div>
        )}

        {/* Templates List */}
        <div className="flex flex-col gap-6">
          {isLoadingRemote && allTemplates.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-2xl border-2 border-dashed border-[#e4e8f0]">
              <div
                className="w-8 h-8 border-[3px] border-[#e4e8f0] border-t-teal-500 rounded-full mx-auto mb-3"
                style={{ animation: "rts-spin 0.8s linear infinite" }}
              />
              <p className="text-[0.9375rem] text-[#8792a8] m-0 max-w-[400px] mx-auto leading-relaxed">
                Loading products...
              </p>
            </div>
          ) : allTemplates.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-2xl border-2 border-dashed border-[#e4e8f0]">
              <div className="w-16 h-16 mx-auto mb-4 text-[#8792a8] opacity-50">
                <svg
                  className="w-full h-full"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-[#1a1f36] m-0 mb-2">
                No Products Found
              </h3>
              <p className="text-[0.9375rem] text-[#8792a8] m-0 max-w-[400px] mx-auto leading-relaxed">
                Create a product first to define the base configuration for your
                service offering.
              </p>
            </div>
          ) : filteredTemplates.length === 0 ? (
            <div className="p-6 text-center bg-[#fafbfc] rounded-2xl border-2 border-solid border-[#e4e8f0]">
              <p className="text-[0.9375rem] text-[#8792a8] m-0 max-w-[400px] mx-auto leading-relaxed">
                No products match
                {searchQuery ? ` "${searchQuery}"` : " the selected filters"}
              </p>
            </div>
          ) : (
            <>
              {/* Active Templates Section */}
              {activeTemplates.length > 0 && (
                <div>
                  <h3 className="flex items-center gap-2.5 text-[0.8125rem] font-semibold text-[#4a5578] uppercase tracking-wide m-0 mb-4">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    Active Products
                  </h3>
                  <div
                    className="grid gap-4 max-md:!grid-cols-1"
                    style={{
                      gridTemplateColumns:
                        "repeat(auto-fill, minmax(320px, 1fr))",
                    }}
                  >
                    {activeTemplates.map((template) => (
                      <TemplateCard
                        key={template.id}
                        template={template}
                        isSelected={currentTemplateId === template.id}
                        isRecommended={template.id === recommendedTemplateId}
                        onSelect={() => handleSelectTemplate(template)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Other Templates Section */}
              {otherTemplates.length > 0 && (
                <div>
                  <h3 className="flex items-center gap-2.5 text-[0.8125rem] font-semibold text-[#4a5578] uppercase tracking-wide m-0 mb-4">
                    <span className="w-2 h-2 rounded-full bg-slate-500" />
                    Other Products
                  </h3>
                  <div
                    className="grid gap-4 max-md:!grid-cols-1"
                    style={{
                      gridTemplateColumns:
                        "repeat(auto-fill, minmax(320px, 1fr))",
                    }}
                  >
                    {otherTemplates.map((template) => (
                      <TemplateCard
                        key={template.id}
                        template={template}
                        isSelected={currentTemplateId === template.id}
                        onSelect={() => handleSelectTemplate(template)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Remote loading indicator */}
              {isLoadingRemote && (
                <div className="flex items-center justify-center gap-2.5 p-3 text-[0.8125rem] text-[#8792a8] bg-[#fafbfc] rounded-lg border border-[#f0f2f7]">
                  <div
                    className="w-4 h-4 border-2 border-[#e4e8f0] border-t-teal-500 rounded-full"
                    style={{ animation: "rts-spin 0.8s linear infinite" }}
                  />
                  <span>Loading remote products...</span>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {pendingTemplateChange && (
        <ConfirmDialog
          title="Change product template?"
          message="Switching to a different product will update the offering info and may affect existing facet configurations."
          confirmLabel="Change Product"
          variant="warning"
          onConfirm={confirmTemplateChange}
          onCancel={() => setPendingTemplateChange(null)}
        />
      )}
    </>
  );
}

interface TemplateCardProps {
  template: NormalizedTemplate;
  isSelected: boolean;
  isRecommended?: boolean;
  onSelect: () => void;
}

function TemplateCard({
  template,
  isSelected,
  isRecommended,
  onSelect,
}: TemplateCardProps) {
  const globalState = template.state.global;

  const statusStyle = getStatusStyle(globalState.status);

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`relative flex flex-col text-left bg-white border-2 rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 ${
        isSelected
          ? "border-teal-500 bg-teal-100 hover:border-teal-500"
          : isRecommended
            ? "border-amber-500 hover:border-amber-500"
            : "border-[#f0f2f7] hover:border-[#e4e8f0] hover:-translate-y-0.5"
      }`}
      style={
        isRecommended && !isSelected
          ? {
              boxShadow:
                "0 0 0 1px #f59e0b, 0 4px 16px rgba(245, 158, 11, 0.15)",
            }
          : !isSelected
            ? undefined
            : undefined
      }
    >
      {isRecommended && !isSelected && (
        <div
          className="absolute -top-px right-10 flex items-center gap-1 py-1.5 px-3 text-[0.625rem] font-bold uppercase tracking-[0.04em] text-white rounded-b-lg z-[5]"
          style={{
            background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
            boxShadow: "0 2px 8px rgba(245, 158, 11, 0.4)",
          }}
        >
          <svg
            className="w-3 h-3 fill-current stroke-current"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          Recommended
        </div>
      )}
      {!template.isRemote && (
        <div
          className="absolute top-2.5 right-2.5 flex items-center gap-1 py-1 px-2.5 text-[0.625rem] font-bold uppercase tracking-[0.04em] rounded-full z-[4] text-emerald-600 bg-emerald-50"
          style={{ backdropFilter: "blur(8px)" }}
        >
          <svg
            className="w-3 h-3"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
          </svg>
          This Drive
        </div>
      )}
      {template.isRemote && (
        <div
          className={`absolute top-2.5 right-2.5 flex items-center gap-1 py-1 px-2.5 text-[0.625rem] font-bold uppercase tracking-[0.04em] rounded-full z-[4] ${
            template.operatorName
              ? "normal-case font-semibold text-teal-500 bg-teal-100"
              : "text-[#7c5cff] bg-[#f4f1ff]"
          }`}
          style={{ backdropFilter: "blur(8px)" }}
        >
          <svg
            className="w-3 h-3"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {template.operatorName ? (
              <>
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </>
            ) : (
              <>
                <path d="M2 15c6.667-6 13.333 0 20-6" />
                <path d="M9 22c1.798-1.998 2.54-3.995 2.807-5.993" />
                <path d="M15 2c-1.798 1.998-2.54 3.995-2.807 5.993" />
              </>
            )}
          </svg>
          {template.operatorName ?? "Remote"}
        </div>
      )}
      <div className="relative h-[100px]">
        {globalState.thumbnailUrl ? (
          <div
            className="w-full h-full bg-cover bg-center bg-[#f0f2f7]"
            style={{ backgroundImage: `url(${globalState.thumbnailUrl})` }}
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center text-[#8792a8]"
            style={{
              background: "linear-gradient(135deg, #f0f2f7 0%, #e4e8f0 100%)",
            }}
          >
            <svg
              className="w-8 h-8 opacity-50"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
          </div>
        )}
        <span
          className="absolute top-2.5 left-2.5 flex items-center gap-1.5 py-1 px-2.5 text-[0.625rem] font-bold uppercase tracking-[0.04em] rounded-full"
          style={{
            backgroundColor: statusStyle.bg,
            color: statusStyle.text,
            backdropFilter: "blur(8px)",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: statusStyle.dot }}
          />
          {globalState.status.replace("_", " ")}
        </span>
      </div>
      <div className="p-4 flex flex-col gap-2 flex-1">
        <h4 className="text-base font-semibold text-[#1a1f36] m-0 tracking-tight">
          {globalState.title || "Untitled"}
        </h4>
        <p
          className="text-[0.8125rem] text-[#4a5578] m-0 leading-normal overflow-hidden"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {globalState.summary || "No summary provided"}
        </p>
        <div className="flex gap-3 mt-auto pt-2">
          {globalState.targetAudiences.length > 0 && (
            <span className="inline-flex items-center gap-1 text-xs text-[#8792a8]">
              <svg
                className="w-3.5 h-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
                  strokeWidth="2"
                />
                <circle cx="9" cy="7" r="4" strokeWidth="2" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" strokeWidth="2" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" strokeWidth="2" />
              </svg>
              {globalState.targetAudiences.length}
            </span>
          )}
          {globalState.services.length > 0 && (
            <span className="inline-flex items-center gap-1 text-xs text-[#8792a8]">
              <svg
                className="w-3.5 h-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5z" strokeWidth="2" />
                <path d="M2 17l10 5 10-5" strokeWidth="2" />
                <path d="M2 12l10 5 10-5" strokeWidth="2" />
              </svg>
              {globalState.services.length}
            </span>
          )}
          {globalState.facetTargets.length > 0 && (
            <span className="inline-flex items-center gap-1 text-xs text-[#8792a8]">
              <svg
                className="w-3.5 h-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path d="M3 6h18M7 12h10M10 18h4" strokeWidth="2" />
              </svg>
              {globalState.facetTargets.length}
            </span>
          )}
        </div>
      </div>
      {isSelected && (
        <div
          className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-teal-500 text-white flex items-center justify-center"
          style={{ boxShadow: "0 2px 8px rgba(20, 184, 166, 0.4)" }}
        >
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path d="M5 12l5 5L20 7" strokeWidth="2.5" />
          </svg>
        </div>
      )}
    </button>
  );
}

interface TemplateDetailViewProps {
  template: NormalizedTemplate;
  offeringDocument: ServiceOfferingDocument;
  dispatch: DocumentDispatch<ServiceOfferingAction>;
  onChangeTemplate: () => void;
}

function TemplateDetailView({
  template,
  offeringDocument,
  dispatch,
  onChangeTemplate,
}: TemplateDetailViewProps) {
  const globalState = template.state.global;
  const statusStyle = getStatusStyle(globalState.status);

  // Sync template info to the offering document.
  // Compares the resource template's current values against the offering's
  // persisted state. If the template has newer data (e.g. updated description),
  // dispatch updateOfferingInfo so the offering document catches up.
  const offeringState = offeringDocument.state.global;
  const hasSyncedRef = useRef(false);

  useEffect(() => {
    const drifted =
      (globalState.title && offeringState.title !== globalState.title) ||
      (globalState.summary && offeringState.summary !== globalState.summary) ||
      (globalState.description ?? null) !==
        (offeringState.description ?? null) ||
      (globalState.thumbnailUrl ?? null) !==
        (offeringState.thumbnailUrl ?? null) ||
      (globalState.infoLink ?? null) !== (offeringState.infoLink ?? null);

    if (drifted) {
      hasSyncedRef.current = true;
      dispatch(
        updateOfferingInfo({
          title: globalState.title || undefined,
          summary: globalState.summary || undefined,
          description: globalState.description || undefined,
          thumbnailUrl: globalState.thumbnailUrl || undefined,
          infoLink: globalState.infoLink || undefined,
          lastModified: new Date().toISOString(),
        }),
      );
    }
  }, [
    globalState.title,
    globalState.summary,
    globalState.description,
    globalState.thumbnailUrl,
    globalState.infoLink,
    offeringState.title,
    offeringState.summary,
    offeringState.description,
    offeringState.thumbnailUrl,
    offeringState.infoLink,
    dispatch,
  ]);

  // Operator ID from the offering document (may have come from template or manual input)
  const offeringOperatorId = offeringDocument.state.global.operatorId;
  const [operatorIdInput, setOperatorIdInput] = useState(
    offeringOperatorId || "",
  );
  const [isEditingOperator, setIsEditingOperator] = useState(false);

  const handleSaveOperatorId = useCallback(() => {
    const trimmed = operatorIdInput.trim();
    if (trimmed) {
      dispatch(
        setOperator({
          operatorId: trimmed,
          lastModified: new Date().toISOString(),
        }),
      );
    }
    setIsEditingOperator(false);
  }, [operatorIdInput, dispatch]);

  // Get the current facet selections from the offering document
  const offeringFacetTargets = offeringDocument.state.global.facetTargets;

  // Check if an option is selected in the offering
  const isOptionSelected = useCallback(
    (categoryKey: string, optionId: string) => {
      const facetTarget = offeringFacetTargets.find(
        (f) => f.categoryKey === categoryKey,
      );
      return facetTarget?.selectedOptions.includes(optionId) ?? false;
    },
    [offeringFacetTargets],
  );

  // Toggle a facet option in the offering
  const handleToggleFacetOption = useCallback(
    (categoryKey: string, categoryLabel: string, optionId: string) => {
      const now = new Date().toISOString();
      const existingFacetTarget = offeringFacetTargets.find(
        (f) => f.categoryKey === categoryKey,
      );

      if (!existingFacetTarget) {
        // Create the facet target with this option selected
        dispatch(
          setFacetTarget({
            id: generateId(),
            categoryKey,
            categoryLabel,
            selectedOptions: [optionId],
            lastModified: now,
          }),
        );
      } else if (existingFacetTarget.selectedOptions.includes(optionId)) {
        // Remove the option
        dispatch(
          removeFacetOption({
            categoryKey,
            optionId,
            lastModified: now,
          }),
        );
      } else {
        // Add the option
        dispatch(
          addFacetOption({
            categoryKey,
            optionId,
            lastModified: now,
          }),
        );
      }
    },
    [offeringFacetTargets, dispatch],
  );

  // Calculate facet completion progress (Goal-Gradient Effect)
  const facetProgress = useMemo(() => {
    const totalOptions = globalState.facetTargets.reduce(
      (sum, facet) => sum + facet.selectedOptions.length,
      0,
    );
    const selectedOptions = offeringFacetTargets.reduce(
      (sum, facet) => sum + facet.selectedOptions.length,
      0,
    );
    const percent =
      totalOptions > 0 ? Math.round((selectedOptions / totalOptions) * 100) : 0;
    return { total: totalOptions, selected: selectedOptions, percent };
  }, [globalState.facetTargets, offeringFacetTargets]);

  return (
    <div className="flex flex-col gap-5">
      {/* Selected Template Header */}
      <div className="flex items-center justify-between py-4 px-5 bg-teal-100 border-2 border-teal-500 rounded-xl">
        <div className="flex items-center justify-between w-full">
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-teal-500">
            <svg
              className="w-[18px] h-[18px]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12l5 5L20 7" />
            </svg>
            Selected Product
          </span>
          <button
            type="button"
            onClick={onChangeTemplate}
            className="inline-flex items-center gap-1.5 py-2 px-4 text-[0.8125rem] font-semibold text-teal-500 bg-white border-[1.5px] border-teal-500 rounded-lg cursor-pointer transition-all duration-150 hover:bg-teal-500 hover:text-white"
            style={{ fontFamily: "'Instrument Sans', system-ui, sans-serif" }}
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Change Product
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <section
        className="grid gap-6 bg-white rounded-2xl p-6 max-[900px]:grid-cols-1"
        style={{
          gridTemplateColumns: "180px 1fr",
          boxShadow:
            "0 1px 3px rgba(26, 31, 54, 0.04), 0 4px 16px rgba(26, 31, 54, 0.06)",
        }}
      >
        <div className="relative max-[900px]:-order-1">
          <div
            className="w-[180px] h-[135px] rounded-xl bg-cover bg-center relative overflow-hidden max-[900px]:w-full max-[900px]:h-40"
            style={{
              backgroundImage: globalState.thumbnailUrl
                ? `url(${globalState.thumbnailUrl})`
                : undefined,
              background: !globalState.thumbnailUrl
                ? "linear-gradient(135deg, #f0f2f7 0%, #e4e8f0 100%)"
                : undefined,
            }}
          >
            {!globalState.thumbnailUrl && (
              <div className="absolute inset-0 flex items-center justify-center text-[#8792a8]">
                <svg
                  className="w-10 h-10 opacity-50"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
              </div>
            )}
            <span
              className="absolute top-2.5 left-2.5 flex items-center gap-1.5 py-[5px] px-3 text-[0.6875rem] font-bold uppercase tracking-[0.04em] rounded-full"
              style={{
                backgroundColor: statusStyle.bg,
                color: statusStyle.text,
                backdropFilter: "blur(8px)",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: statusStyle.dot }}
              />
              {globalState.status.replace("_", " ")}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h1 className="text-[1.75rem] font-bold text-[#1a1f36] m-0 tracking-tight">
            {globalState.title || "Untitled Product"}
          </h1>

          {/* Target Audiences */}
          {globalState.targetAudiences.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {globalState.targetAudiences.map((audience) => (
                <span
                  key={audience.id}
                  className="inline-flex items-center py-[5px] px-3 text-[0.8125rem] font-semibold rounded-full bg-teal-100 text-teal-500"
                  style={
                    audience.color
                      ? {
                          backgroundColor: `${audience.color}15`,
                          borderColor: `${audience.color}40`,
                          border: `1px solid ${audience.color}40`,
                          color: audience.color,
                        }
                      : {
                          border: "1px solid rgba(20, 184, 166, 0.2)",
                        }
                  }
                >
                  {audience.label}
                </span>
              ))}
            </div>
          )}

          <p className="text-[0.9375rem] leading-relaxed text-[#4a5578] m-0">
            {globalState.summary || "No summary provided"}
          </p>
        </div>
      </section>

      {/* Description */}
      {globalState.description && (
        <section
          className="bg-white rounded-2xl p-6"
          style={{
            boxShadow:
              "0 1px 3px rgba(26, 31, 54, 0.04), 0 4px 16px rgba(26, 31, 54, 0.06)",
          }}
        >
          <div className="flex items-start gap-3.5 mb-4">
            <div className="w-10 h-10 rounded-[10px] flex items-center justify-center shrink-0 bg-[#f4f1ff] text-[#7c5cff]">
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
              >
                <path d="M4 6h16M4 12h16M4 18h10" />
              </svg>
            </div>
            <div>
              <h3 className="text-base font-semibold text-[#1a1f36] m-0">
                Description
              </h3>
            </div>
          </div>
          <MarkdownPreview
            content={globalState.description}
            className="text-[0.9375rem] leading-[1.7] text-[#4a5578] m-0"
          />
        </section>
      )}

      {/* Services Grid */}
      <div
        className="grid gap-5 max-[900px]:grid-cols-1"
        style={{ gridTemplateColumns: "1fr 1fr" }}
      >
        {/* Setup Services */}
        <section
          className="bg-white rounded-2xl p-6"
          style={{
            boxShadow:
              "0 1px 3px rgba(26, 31, 54, 0.04), 0 4px 16px rgba(26, 31, 54, 0.06)",
          }}
        >
          <div className="flex items-start gap-3.5 mb-4">
            <div className="w-10 h-10 rounded-[10px] flex items-center justify-center shrink-0 bg-[#e8faf3] text-emerald-500">
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <div>
              <h3 className="text-base font-semibold text-[#1a1f36] m-0">
                Formation & Setup
              </h3>
              <p className="text-[0.8125rem] text-[#8792a8] mt-0.5 mb-0">
                One-time setup services
              </p>
            </div>
          </div>
          {globalState.setupServices.length > 0 ? (
            <div className="flex flex-col gap-1.5">
              {globalState.setupServices.map((service, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2.5 py-2.5 px-3 bg-[#fafbfc] rounded-lg"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                  <span className="text-sm text-[#1a1f36]">{service}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-[#8792a8] italic m-0">
              No setup services defined
            </p>
          )}
        </section>

        {/* Recurring Services */}
        <section
          className="bg-white rounded-2xl p-6"
          style={{
            boxShadow:
              "0 1px 3px rgba(26, 31, 54, 0.04), 0 4px 16px rgba(26, 31, 54, 0.06)",
          }}
        >
          <div className="flex items-start gap-3.5 mb-4">
            <div className="w-10 h-10 rounded-[10px] flex items-center justify-center shrink-0 bg-[#fef7e6] text-amber-500">
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
              >
                <path d="M12 8v4l3 3" />
                <circle cx="12" cy="12" r="9" />
              </svg>
            </div>
            <div>
              <h3 className="text-base font-semibold text-[#1a1f36] m-0">
                Recurring Services
              </h3>
              <p className="text-[0.8125rem] text-[#8792a8] mt-0.5 mb-0">
                Ongoing services included
              </p>
            </div>
          </div>
          {globalState.recurringServices.length > 0 ? (
            <div className="flex flex-col gap-1.5">
              {globalState.recurringServices.map((service, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2.5 py-2.5 px-3 bg-[#fafbfc] rounded-lg"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                  <span className="text-sm text-[#1a1f36]">{service}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-[#8792a8] italic m-0">
              No recurring services defined
            </p>
          )}
        </section>
      </div>

      {/* Facet Targeting - Interactive Selection */}
      {globalState.facetTargets.length > 0 && (
        <section
          className="bg-white rounded-2xl p-6"
          style={{
            boxShadow:
              "0 1px 3px rgba(26, 31, 54, 0.04), 0 4px 16px rgba(26, 31, 54, 0.06)",
          }}
        >
          <div className="flex items-start gap-3.5 mb-4 flex-wrap justify-between">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-[10px] flex items-center justify-center shrink-0 bg-[#e8f7fc] text-sky-500">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                >
                  <path d="M3 6h18M7 12h10M10 18h4" />
                </svg>
              </div>
              <div>
                <h3 className="text-base font-semibold text-[#1a1f36] m-0">
                  Facet Targeting
                </h3>
                <p className="text-[0.8125rem] text-[#8792a8] mt-0.5 mb-0">
                  Select which facet options apply to this offering
                </p>
              </div>
            </div>
            {/* Goal-Gradient Progress Indicator */}
            <div className="flex flex-col items-end gap-1.5 min-w-[140px]">
              <div className="w-full h-1.5 bg-[#f0f2f7] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-[width] duration-300 ease-out"
                  style={{
                    width: `${facetProgress.percent}%`,
                    background: "linear-gradient(90deg, #0ea5e9, #10b981)",
                  }}
                />
              </div>
              <span className="text-[0.6875rem] text-[#8792a8] font-medium">
                {facetProgress.selected} of {facetProgress.total} selected
                {facetProgress.percent === 100 && (
                  <span className="text-emerald-500 font-semibold"> ✓</span>
                )}
              </span>
            </div>
          </div>
          <div
            className="grid gap-3 max-[900px]:grid-cols-1"
            style={{ gridTemplateColumns: "repeat(2, 1fr)" }}
          >
            {globalState.facetTargets.map((facet) => (
              <div
                key={facet.id}
                className="p-3.5 bg-white rounded-[10px] border-[1.5px] border-[#e4e8f0]"
              >
                <span className="block text-xs font-semibold text-[#8792a8] uppercase tracking-[0.04em] mb-2">
                  {facet.categoryLabel}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {facet.selectedOptions.map((option) => {
                    const selected = isOptionSelected(
                      facet.categoryKey,
                      option,
                    );
                    return (
                      <button
                        key={option}
                        type="button"
                        className={`inline-flex items-center gap-2 py-2 px-3.5 text-[0.8125rem] font-medium rounded-lg cursor-pointer transition-all duration-150 capitalize ${
                          selected
                            ? "bg-teal-100 border-[1.5px] border-teal-500 text-teal-500"
                            : "bg-[#fafbfc] border-[1.5px] border-[#e4e8f0] text-[#4a5578] hover:border-sky-500 hover:bg-[#e8f7fc] hover:text-sky-500"
                        }`}
                        style={{
                          fontFamily:
                            "'Instrument Sans', system-ui, sans-serif",
                        }}
                        onClick={() =>
                          handleToggleFacetOption(
                            facet.categoryKey,
                            facet.categoryLabel,
                            option,
                          )
                        }
                      >
                        <span
                          className={`flex items-center justify-center w-[18px] h-[18px] rounded shrink-0 transition-all duration-150 ${
                            selected
                              ? "bg-teal-500 border-[1.5px] border-teal-500"
                              : "bg-white border-[1.5px] border-[#e4e8f0]"
                          }`}
                        >
                          {selected && (
                            <svg
                              className="w-3 h-3 text-white"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="3"
                            >
                              <path d="M5 12l5 5L20 7" />
                            </svg>
                          )}
                        </span>
                        {option.replace(/-/g, " ")}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Services Catalog */}
      {globalState.services.length > 0 && (
        <section
          className="bg-white rounded-2xl p-6"
          style={{
            boxShadow:
              "0 1px 3px rgba(26, 31, 54, 0.04), 0 4px 16px rgba(26, 31, 54, 0.06)",
          }}
        >
          <div className="flex items-start gap-3.5 mb-4">
            <div className="w-10 h-10 rounded-[10px] flex items-center justify-center shrink-0 bg-teal-100 text-teal-500">
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
              >
                <path d="M4 6h16M4 10h16M4 14h10M4 18h6" />
              </svg>
            </div>
            <div>
              <h3 className="text-base font-semibold text-[#1a1f36] m-0">
                Services Defined
              </h3>
              <p className="text-[0.8125rem] text-[#8792a8] mt-0.5 mb-0">
                {globalState.services.length} service
                {globalState.services.length !== 1 ? "s" : ""} available
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            {globalState.services.map((service) => (
              <div
                key={service.id}
                className="py-3.5 px-4 bg-[#fafbfc] rounded-[10px] border border-[#f0f2f7]"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-[0.9375rem] font-semibold text-[#1a1f36]">
                    {service.title}
                  </span>
                  {service.isSetupFormation && (
                    <span className="py-0.5 px-2 text-[0.625rem] font-bold uppercase tracking-[0.04em] text-emerald-500 bg-[#e8faf3] rounded">
                      Setup
                    </span>
                  )}
                </div>
                {service.description && (
                  <p className="text-[0.8125rem] text-[#4a5578] mt-1.5 mb-0 leading-normal">
                    {service.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Operator ID */}
      <section
        className="bg-white rounded-2xl p-6"
        style={{
          boxShadow:
            "0 1px 3px rgba(26, 31, 54, 0.04), 0 4px 16px rgba(26, 31, 54, 0.06)",
        }}
      >
        <div className="flex items-start gap-3.5 mb-4">
          <div className="w-10 h-10 rounded-[10px] flex items-center justify-center shrink-0 bg-[#f4f1ff] text-[#7c5cff]">
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <div>
            <h3 className="text-base font-semibold text-[#1a1f36] m-0">
              Operator
              <InfoIcon content="Your Powerhouse ID (PHID) as the service provider. This links the offering to your builder profile." />
            </h3>
            <p className="text-[0.8125rem] text-[#8792a8] mt-0.5 mb-0">
              {offeringOperatorId
                ? "Operator assigned to this offering"
                : "No operator set — please provide one"}
            </p>
          </div>
        </div>
        {isEditingOperator || !offeringOperatorId ? (
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={operatorIdInput}
              onChange={(e) => setOperatorIdInput(e.target.value)}
              placeholder="Enter operator ID (PHID)"
              className="flex-1 py-2.5 px-3.5 text-sm text-[#1a1f36] bg-[#fafbfc] border-[1.5px] border-[#e4e8f0] rounded-lg outline-none transition-[border-color,box-shadow] duration-150 focus:border-[#7c5cff] focus:shadow-[0_0_0_3px_#f4f1ff] placeholder:text-[#8792a8]"
              style={{
                fontFamily: "'DM Mono', 'SF Mono', monospace",
              }}
            />
            <button
              type="button"
              onClick={handleSaveOperatorId}
              disabled={!operatorIdInput.trim()}
              className="py-2.5 px-[18px] text-[0.8125rem] font-semibold text-white bg-[#7c5cff] border-none rounded-lg cursor-pointer whitespace-nowrap transition-[background,opacity] duration-150 hover:bg-[#6a4de6] disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ fontFamily: "'Instrument Sans', system-ui, sans-serif" }}
            >
              {offeringOperatorId ? "Update" : "Set Operator"}
            </button>
            {isEditingOperator && offeringOperatorId && (
              <button
                type="button"
                onClick={() => {
                  setIsEditingOperator(false);
                  setOperatorIdInput(offeringOperatorId);
                }}
                className="py-2.5 px-3.5 text-[0.8125rem] font-medium text-[#8792a8] bg-transparent border-[1.5px] border-[#e4e8f0] rounded-lg cursor-pointer transition-all duration-150 hover:border-[#8792a8] hover:text-[#4a5578]"
                style={{
                  fontFamily: "'Instrument Sans', system-ui, sans-serif",
                }}
              >
                Cancel
              </button>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-between py-2.5 px-3.5 bg-[#fafbfc] rounded-lg border border-[#f0f2f7]">
            <span
              className="text-[0.9375rem] text-[#1a1f36]"
              style={{
                fontFamily: "'DM Mono', 'SF Mono', monospace",
                fontSize: "0.875rem",
              }}
            >
              {offeringOperatorId}
            </span>
            <button
              type="button"
              onClick={() => setIsEditingOperator(true)}
              className="flex items-center justify-center w-8 h-8 p-0 text-[#8792a8] bg-transparent border-[1.5px] border-[#e4e8f0] rounded-md cursor-pointer transition-all duration-150 hover:border-[#7c5cff] hover:text-[#7c5cff] hover:bg-[#f4f1ff]"
            >
              <svg
                className="w-3.5 h-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </button>
          </div>
        )}
      </section>

      {/* Metadata */}
      {globalState.infoLink && (
        <section
          className="grid gap-4 p-5 bg-white rounded-xl max-[900px]:grid-cols-1"
          style={{
            gridTemplateColumns: "1fr 1fr",
            boxShadow: "0 1px 3px rgba(26, 31, 54, 0.04)",
          }}
        >
          <div className="flex flex-col gap-1.5">
            <span className="text-[0.6875rem] font-bold uppercase tracking-[0.06em] text-[#8792a8]">
              More Info
            </span>
            <a
              href={globalState.infoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-teal-500 no-underline transition-colors duration-150 hover:text-[#0d9488]"
            >
              {globalState.infoLink}
              <svg
                className="w-3.5 h-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          </div>
        </section>
      )}
    </div>
  );
}

function getStatusStyle(status: ResourceTemplateGlobalState["status"]) {
  const statusColors: Record<
    string,
    { bg: string; text: string; dot: string }
  > = {
    ACTIVE: {
      bg: "#e8faf3",
      text: "#10b981",
      dot: "#10b981",
    },
    DRAFT: {
      bg: "#f1f5f9",
      text: "#64748b",
      dot: "#64748b",
    },
    COMING_SOON: {
      bg: "#e8f7fc",
      text: "#0ea5e9",
      dot: "#0ea5e9",
    },
    DEPRECATED: {
      bg: "#fef1f3",
      text: "#f43f5e",
      dot: "#f43f5e",
    },
  };

  return statusColors[status] || statusColors.DRAFT;
}
