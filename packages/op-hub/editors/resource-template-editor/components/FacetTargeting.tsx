import { useState, useCallback, useMemo } from "react";
import { generateId } from "document-model/core";
import type { DocumentDispatch } from "@powerhousedao/reactor-browser";
import type {
  ResourceTemplateDocument,
  ResourceTemplateAction,
} from "document-models/resource-template";
import {
  setFacetTarget,
  removeFacetTarget,
  addFacetOption,
  removeFacetOption,
} from "../../../document-models/resource-template/v1/gen/creators.js";

interface FacetTargetingProps {
  document: ResourceTemplateDocument;
  dispatch: DocumentDispatch<ResourceTemplateAction>;
}

// FacetPreset type (matches document model schema)
interface FacetPreset {
  id: string;
  categoryKey: string;
  categoryLabel: string;
  description: string | null;
  icon: string | null;
  isRecommended: boolean;
  suggestedOptions: string[];
}

// Default presets (used as fallback if document state doesn't have presets)
const DEFAULT_FACET_PRESETS: FacetPreset[] = [
  {
    id: "sno-function",
    categoryKey: "sno-function",
    categoryLabel: "SNO Function",
    icon: "🎯",
    description: "Sky Node Operator function type",
    suggestedOptions: [
      "Operational Hub for Open Source Builders",
      "Operational Hub",
      "IP SPV",
      "Revenue Generating Hub",
      "SNO Embryonic Hub",
      "Self-Insurance Risk Management Hub",
    ],
    isRecommended: true,
  },
  {
    id: "legal-entity",
    categoryKey: "legal-entity",
    categoryLabel: "Legal Entity",
    icon: "🏛️",
    description: "Type of legal structure for the resource",
    suggestedOptions: ["Swiss Association", "BVI Entity"],
    isRecommended: true,
  },
  {
    id: "team",
    categoryKey: "team",
    categoryLabel: "Team",
    icon: "👥",
    description: "Team structure and work arrangement",
    suggestedOptions: ["Remote", "Local", "Hybrid"],
    isRecommended: true,
  },
  {
    id: "anonymity",
    categoryKey: "anonymity",
    categoryLabel: "Anonymity",
    icon: "🔒",
    description: "Privacy and identity disclosure level",
    suggestedOptions: ["High", "Highest"],
    isRecommended: true,
  },
];

// Calculate completion status for Goal-Gradient Effect
function calculateProgress(
  facetTargets: { categoryKey: string; selectedOptions: string[] }[],
  presets: FacetPreset[],
): {
  configured: number;
  recommended: number;
  percentage: number;
  isComplete: boolean;
} {
  const recommendedKeys = new Set(
    presets.filter((p) => p.isRecommended).map((p) => p.categoryKey),
  );

  const configuredRecommended = facetTargets.filter(
    (t) => recommendedKeys.has(t.categoryKey) && t.selectedOptions.length > 0,
  ).length;

  const percentage =
    recommendedKeys.size > 0
      ? Math.round((configuredRecommended / recommendedKeys.size) * 100)
      : 0;

  return {
    configured: configuredRecommended,
    recommended: recommendedKeys.size,
    percentage,
    isComplete:
      recommendedKeys.size > 0 && configuredRecommended >= recommendedKeys.size,
  };
}

export function FacetTargeting({ document, dispatch }: FacetTargetingProps) {
  const facetTargets = document.state.global.facetTargets;

  // Use facetPresets from document state if available, otherwise use defaults
  // Type assertion needed because generated types don't include facetPresets yet
  const documentState = document.state.global as Record<string, unknown>;
  const facetPresets: FacetPreset[] = Array.isArray(documentState.facetPresets)
    ? (documentState.facetPresets as FacetPreset[])
    : DEFAULT_FACET_PRESETS;

  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategoryLabel, setNewCategoryLabel] = useState("");
  const [showPresets, setShowPresets] = useState(true);

  const [editingOptionFor, setEditingOptionFor] = useState<string | null>(null);
  const [newOptionId, setNewOptionId] = useState("");

  // Use Set for O(1) lookups - React Best Practice
  const existingCategoryKeys = useMemo(
    () => new Set(facetTargets.map((t) => t.categoryKey)),
    [facetTargets],
  );

  // Calculate progress for Goal-Gradient Effect
  const progress = useMemo(
    () => calculateProgress(facetTargets, facetPresets),
    [facetTargets, facetPresets],
  );

  // Get available presets (not yet added)
  const availablePresets = useMemo(
    () => facetPresets.filter((p) => !existingCategoryKeys.has(p.categoryKey)),
    [facetPresets, existingCategoryKeys],
  );

  const recommendedPresets = availablePresets.filter((p) => p.isRecommended);
  const otherPresets = availablePresets.filter((p) => !p.isRecommended);

  const handleAddCategory = useCallback(() => {
    if (!newCategoryLabel.trim()) return;

    const label = newCategoryLabel.trim();
    const key = label.toLowerCase().replace(/\s+/g, "-");

    dispatch(
      setFacetTarget({
        id: generateId(),
        categoryKey: key,
        categoryLabel: label,
        selectedOptions: [],
        lastModified: new Date().toISOString(),
      }),
    );

    setNewCategoryLabel("");
    setShowAddCategory(false);
  }, [newCategoryLabel, dispatch]);

  // Quick-add from preset - reduces activation energy
  const handleAddFromPreset = useCallback(
    (preset: FacetPreset, withOptions: boolean = false) => {
      dispatch(
        setFacetTarget({
          id: generateId(),
          categoryKey: preset.categoryKey,
          categoryLabel: preset.categoryLabel,
          selectedOptions: withOptions ? preset.suggestedOptions : [],
          lastModified: new Date().toISOString(),
        }),
      );
    },
    [dispatch],
  );

  // Add all recommended facets at once - Commitment & Consistency
  const handleAddAllRecommended = useCallback(() => {
    const now = new Date().toISOString();
    recommendedPresets.forEach((preset) => {
      dispatch(
        setFacetTarget({
          id: generateId(),
          categoryKey: preset.categoryKey,
          categoryLabel: preset.categoryLabel,
          selectedOptions: [],
          lastModified: now,
        }),
      );
    });
  }, [recommendedPresets, dispatch]);

  const handleRemoveCategory = useCallback(
    (categoryKey: string) => {
      if (
        window.confirm(
          "Are you sure you want to remove this facet category and all its options?",
        )
      ) {
        dispatch(
          removeFacetTarget({
            categoryKey,
            lastModified: new Date().toISOString(),
          }),
        );
      }
    },
    [dispatch],
  );

  const handleAddOption = useCallback(
    (categoryKey: string) => {
      if (!newOptionId.trim()) return;

      dispatch(
        addFacetOption({
          categoryKey,
          optionId: newOptionId.trim(),
          lastModified: new Date().toISOString(),
        }),
      );

      setNewOptionId("");
      setEditingOptionFor(null);
    },
    [newOptionId, dispatch],
  );

  // Quick-add suggested option
  const handleAddSuggestedOption = useCallback(
    (categoryKey: string, optionId: string) => {
      dispatch(
        addFacetOption({
          categoryKey,
          optionId,
          lastModified: new Date().toISOString(),
        }),
      );
    },
    [dispatch],
  );

  const handleRemoveOption = useCallback(
    (categoryKey: string, optionId: string) => {
      dispatch(
        removeFacetOption({
          categoryKey,
          optionId,
          lastModified: new Date().toISOString(),
        }),
      );
    },
    [dispatch],
  );

  // Get preset for a category to show suggested options
  const getPresetForCategory = (categoryKey: string) =>
    facetPresets.find((p) => p.categoryKey === categoryKey);

  return (
    <>
      <style>{styles}</style>
      <section className="facet-targeting">
        {/* Progress Header - Goal-Gradient Effect */}
        <div className="facet-targeting__progress">
          <div className="facet-targeting__progress-header">
            <div className="facet-targeting__progress-info">
              <span className="facet-targeting__progress-percent">
                {progress.percentage}%
              </span>
              <span className="facet-targeting__progress-label">
                {progress.configured}/{progress.recommended} recommended facets
                configured
              </span>
            </div>
            {progress.isComplete && (
              <span className="facet-targeting__complete-badge">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M5 12l5 5L20 7" />
                </svg>
                All set!
              </span>
            )}
          </div>
          <div className="facet-targeting__progress-bar">
            <div
              className="facet-targeting__progress-fill"
              style={{ width: `${progress.percentage}%` }}
            />
          </div>
        </div>

        <div className="facet-targeting__header">
          <div className="facet-targeting__header-content">
            <div className="facet-targeting__icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
              >
                <path d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                <path d="M6 6h.008v.008H6V6z" />
              </svg>
            </div>
            <div>
              <h3 className="facet-targeting__title">Facet Targeting</h3>
              <p className="facet-targeting__subtitle">
                Define configuration dimensions for this product
              </p>
            </div>
          </div>
          <div className="facet-targeting__header-actions">
            <button
              type="button"
              className={`facet-targeting__toggle-btn ${showPresets ? "facet-targeting__toggle-btn--active" : ""}`}
              onClick={() => setShowPresets(!showPresets)}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" />
              </svg>
              Presets
            </button>
            <button
              type="button"
              className="facet-targeting__add-btn"
              onClick={() => setShowAddCategory(true)}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
              Custom
            </button>
          </div>
        </div>

        {/* Presets Panel - Default Effect */}
        {showPresets && availablePresets.length > 0 && (
          <div className="facet-targeting__presets">
            <div className="facet-targeting__presets-header">
              <h4 className="facet-targeting__presets-title">
                Quick Add Facets
              </h4>
              {recommendedPresets.length > 1 && (
                <button
                  type="button"
                  className="facet-targeting__add-all-btn"
                  onClick={handleAddAllRecommended}
                >
                  Add all recommended ({recommendedPresets.length})
                </button>
              )}
            </div>

            {recommendedPresets.length > 0 && (
              <div className="facet-targeting__presets-section">
                <span className="facet-targeting__presets-label">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  Recommended
                </span>
                <div className="facet-targeting__presets-grid">
                  {recommendedPresets.map((preset) => (
                    <PresetCard
                      key={preset.categoryKey}
                      preset={preset}
                      onAdd={() => handleAddFromPreset(preset, false)}
                      onAddWithOptions={() => handleAddFromPreset(preset, true)}
                    />
                  ))}
                </div>
              </div>
            )}

            {otherPresets.length > 0 && (
              <div className="facet-targeting__presets-section">
                <span className="facet-targeting__presets-label">
                  Other Facets
                </span>
                <div className="facet-targeting__presets-grid">
                  {otherPresets.map((preset) => (
                    <PresetCard
                      key={preset.categoryKey}
                      preset={preset}
                      onAdd={() => handleAddFromPreset(preset, false)}
                      onAddWithOptions={() => handleAddFromPreset(preset, true)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {showAddCategory && (
          <div className="facet-targeting__new-category">
            <div className="facet-targeting__new-category-form">
              <div className="facet-targeting__form-group">
                <label className="facet-targeting__label">
                  Custom Category Name
                </label>
                <input
                  type="text"
                  value={newCategoryLabel}
                  onChange={(e) => setNewCategoryLabel(e.target.value)}
                  placeholder="e.g., Region, Environment, Storage Type"
                  className="facet-targeting__input"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleAddCategory();
                    if (e.key === "Escape") setShowAddCategory(false);
                  }}
                />
              </div>
              <div className="facet-targeting__form-actions">
                <button
                  type="button"
                  className="facet-targeting__btn facet-targeting__btn--secondary"
                  onClick={() => {
                    setShowAddCategory(false);
                    setNewCategoryLabel("");
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="facet-targeting__btn facet-targeting__btn--primary"
                  onClick={handleAddCategory}
                  disabled={!newCategoryLabel.trim()}
                >
                  Add Category
                </button>
              </div>
            </div>
          </div>
        )}

        {facetTargets.length === 0 && !showAddCategory && !showPresets ? (
          <div className="facet-targeting__empty">
            <div className="facet-targeting__empty-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                <path d="M6 6h.008v.008H6V6z" />
              </svg>
            </div>
            <p className="facet-targeting__empty-text">
              No facet categories defined. Use the presets above or add custom
              categories.
            </p>
            <button
              type="button"
              className="facet-targeting__btn facet-targeting__btn--primary"
              onClick={() => setShowPresets(true)}
            >
              Show Presets
            </button>
          </div>
        ) : (
          facetTargets.length > 0 && (
            <div className="facet-targeting__categories">
              {facetTargets.map((target) => {
                const preset = getPresetForCategory(target.categoryKey);
                const existingOptionsSet = new Set(target.selectedOptions);
                const suggestedOptions = preset?.suggestedOptions.filter(
                  (opt) => !existingOptionsSet.has(opt),
                );

                return (
                  <div key={target.categoryKey} className="facet-category">
                    <div className="facet-category__header">
                      <div className="facet-category__info">
                        {preset && (
                          <span className="facet-category__icon">
                            {preset.icon}
                          </span>
                        )}
                        <span className="facet-category__label">
                          {target.categoryLabel}
                        </span>
                        <span className="facet-category__key">
                          {target.categoryKey}
                        </span>
                        {preset?.isRecommended && (
                          <span className="facet-category__recommended">
                            Recommended
                          </span>
                        )}
                      </div>
                      <div className="facet-category__actions">
                        <button
                          type="button"
                          className="facet-category__btn"
                          onClick={() =>
                            setEditingOptionFor(
                              editingOptionFor === target.categoryKey
                                ? null
                                : target.categoryKey,
                            )
                          }
                          title="Add option"
                        >
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M12 5v14M5 12h14" />
                          </svg>
                        </button>
                        <button
                          type="button"
                          className="facet-category__btn facet-category__btn--danger"
                          onClick={() =>
                            handleRemoveCategory(target.categoryKey)
                          }
                          title="Remove category"
                        >
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {editingOptionFor === target.categoryKey && (
                      <div className="facet-category__add-option">
                        <input
                          type="text"
                          value={newOptionId}
                          onChange={(e) => setNewOptionId(e.target.value)}
                          placeholder="Enter option value..."
                          className="facet-targeting__input facet-targeting__input--sm"
                          autoFocus
                          onKeyDown={(e) => {
                            if (e.key === "Enter")
                              handleAddOption(target.categoryKey);
                            if (e.key === "Escape") {
                              setEditingOptionFor(null);
                              setNewOptionId("");
                            }
                          }}
                        />
                        <button
                          type="button"
                          className="facet-targeting__btn facet-targeting__btn--primary facet-targeting__btn--sm"
                          onClick={() => handleAddOption(target.categoryKey)}
                          disabled={!newOptionId.trim()}
                        >
                          Add
                        </button>
                      </div>
                    )}

                    {/* Suggested Options - Paradox of Choice (show only available) */}
                    {suggestedOptions && suggestedOptions.length > 0 && (
                      <div className="facet-category__suggestions">
                        <span className="facet-category__suggestions-label">
                          Quick add:
                        </span>
                        {suggestedOptions.slice(0, 5).map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            className="facet-category__suggestion-btn"
                            onClick={() =>
                              handleAddSuggestedOption(target.categoryKey, opt)
                            }
                          >
                            {opt}
                          </button>
                        ))}
                        {suggestedOptions.length > 5 && (
                          <span className="facet-category__more">
                            +{suggestedOptions.length - 5} more
                          </span>
                        )}
                      </div>
                    )}

                    <div className="facet-category__options">
                      {target.selectedOptions.length === 0 ? (
                        <p className="facet-category__no-options">
                          No options added yet - use quick add above or add
                          custom options
                        </p>
                      ) : (
                        target.selectedOptions.map((optionId) => (
                          <div key={optionId} className="facet-option">
                            <span className="facet-option__label">
                              {optionId}
                            </span>
                            <button
                              type="button"
                              className="facet-option__remove"
                              onClick={() =>
                                handleRemoveOption(target.categoryKey, optionId)
                              }
                              title="Remove option"
                            >
                              <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                              >
                                <path
                                  d="M18 6L6 18M6 6l12 12"
                                  strokeWidth="2"
                                />
                              </svg>
                            </button>
                          </div>
                        ))
                      )}
                    </div>

                    {/* Micro-commitment feedback */}
                    {target.selectedOptions.length > 0 && (
                      <div className="facet-category__status">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M5 12l5 5L20 7" />
                        </svg>
                        {target.selectedOptions.length} option
                        {target.selectedOptions.length !== 1 ? "s" : ""}{" "}
                        configured
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )
        )}
      </section>
    </>
  );
}

// Memoized Preset Card - React Best Practice (rerender-memo)
interface PresetCardProps {
  preset: FacetPreset;
  onAdd: () => void;
  onAddWithOptions: () => void;
}

function PresetCard({ preset, onAdd, onAddWithOptions }: PresetCardProps) {
  return (
    <div
      className={`preset-card ${preset.isRecommended ? "preset-card--recommended" : ""}`}
    >
      <div className="preset-card__header">
        <span className="preset-card__icon">{preset.icon}</span>
        <div className="preset-card__info">
          <span className="preset-card__name">{preset.categoryLabel}</span>
          <span className="preset-card__desc">{preset.description}</span>
        </div>
      </div>
      <div className="preset-card__options-preview">
        {preset.suggestedOptions.slice(0, 3).map((opt) => (
          <span key={opt} className="preset-card__option-tag">
            {opt}
          </span>
        ))}
        {preset.suggestedOptions.length > 3 && (
          <span className="preset-card__option-more">
            +{preset.suggestedOptions.length - 3}
          </span>
        )}
      </div>
      <div className="preset-card__actions">
        <button type="button" className="preset-card__btn" onClick={onAdd}>
          Add Empty
        </button>
        <button
          type="button"
          className="preset-card__btn preset-card__btn--primary"
          onClick={onAddWithOptions}
        >
          Add with Options
        </button>
      </div>
    </div>
  );
}

const styles = `
  .facet-targeting {
    background: var(--te-surface, #ffffff);
    border-radius: 16px;
    padding: 24px;
    box-shadow: 0 1px 3px rgba(26, 31, 54, 0.04), 0 4px 16px rgba(26, 31, 54, 0.06);
  }

  /* Progress Section - Goal-Gradient Effect */
  .facet-targeting__progress {
    background: linear-gradient(135deg, #f5f3ff 0%, #ecfdf5 100%);
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 20px;
  }

  .facet-targeting__progress-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  .facet-targeting__progress-info {
    display: flex;
    align-items: baseline;
    gap: 8px;
  }

  .facet-targeting__progress-percent {
    font-size: 1.5rem;
    font-weight: 700;
    color: #7c5cff;
    font-family: 'DM Mono', monospace;
  }

  .facet-targeting__progress-label {
    font-size: 0.75rem;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .facet-targeting__complete-badge {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 4px 10px;
    background: #10b981;
    color: white;
    font-size: 0.6875rem;
    font-weight: 600;
    border-radius: 100px;
    animation: badge-pop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .facet-targeting__complete-badge svg {
    width: 12px;
    height: 12px;
  }

  @keyframes badge-pop {
    from { transform: scale(0.8); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }

  .facet-targeting__progress-bar {
    height: 8px;
    background: rgba(124, 92, 255, 0.15);
    border-radius: 100px;
    overflow: hidden;
  }

  .facet-targeting__progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #7c5cff, #10b981);
    border-radius: 100px;
    transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .facet-targeting__header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .facet-targeting__header-content {
    display: flex;
    align-items: flex-start;
    gap: 14px;
  }

  .facet-targeting__header-actions {
    display: flex;
    gap: 8px;
  }

  .facet-targeting__icon {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    background: #f5f3ff;
    color: #7c5cff;
  }

  .facet-targeting__icon svg {
    width: 20px;
    height: 20px;
  }

  .facet-targeting__title {
    font-size: 1rem;
    font-weight: 600;
    color: var(--te-ink, #1a1f36);
    margin: 0 0 2px;
  }

  .facet-targeting__subtitle {
    font-size: 0.8125rem;
    color: var(--te-ink-muted, #8792a8);
    margin: 0;
  }

  .facet-targeting__toggle-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 14px;
    font-family: inherit;
    font-size: 0.8125rem;
    font-weight: 500;
    color: #7c5cff;
    background: #f5f3ff;
    border: 1.5px solid transparent;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .facet-targeting__toggle-btn:hover {
    border-color: #7c5cff;
  }

  .facet-targeting__toggle-btn--active {
    background: #7c5cff;
    color: white;
  }

  .facet-targeting__toggle-btn svg {
    width: 16px;
    height: 16px;
  }

  .facet-targeting__add-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 16px;
    font-family: inherit;
    font-size: 0.875rem;
    font-weight: 500;
    color: white;
    background: #14b8a6;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.15s ease;
  }

  .facet-targeting__add-btn:hover {
    background: #0d9488;
  }

  .facet-targeting__add-btn svg {
    width: 16px;
    height: 16px;
  }

  /* Presets Panel */
  .facet-targeting__presets {
    background: linear-gradient(135deg, #f5f3ff 0%, #faf5ff 100%);
    border: 1px solid rgba(124, 92, 255, 0.2);
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 20px;
    animation: presets-slide 0.2s ease-out;
  }

  @keyframes presets-slide {
    from { opacity: 0; transform: translateY(-8px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .facet-targeting__presets-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
  }

  .facet-targeting__presets-title {
    font-size: 1rem;
    font-weight: 600;
    color: #1a1f36;
    margin: 0;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .facet-targeting__presets-title::before {
    content: "⚡";
  }

  .facet-targeting__add-all-btn {
    padding: 6px 12px;
    font-family: inherit;
    font-size: 0.75rem;
    font-weight: 600;
    color: #7c5cff;
    background: white;
    border: 1px solid rgba(124, 92, 255, 0.3);
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .facet-targeting__add-all-btn:hover {
    background: #7c5cff;
    color: white;
    border-color: #7c5cff;
  }

  .facet-targeting__presets-section {
    margin-bottom: 16px;
  }

  .facet-targeting__presets-section:last-child {
    margin-bottom: 0;
  }

  .facet-targeting__presets-label {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.6875rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #64748b;
    margin-bottom: 10px;
  }

  .facet-targeting__presets-label svg {
    width: 12px;
    height: 12px;
    color: #f59e0b;
  }

  .facet-targeting__presets-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 12px;
  }

  /* Preset Card */
  .preset-card {
    background: white;
    border: 1.5px solid #e4e8f0;
    border-radius: 10px;
    padding: 14px;
    transition: all 0.15s ease;
  }

  .preset-card:hover {
    border-color: #7c5cff;
    box-shadow: 0 4px 12px rgba(124, 92, 255, 0.1);
  }

  .preset-card--recommended {
    border-color: rgba(245, 158, 11, 0.4);
    background: linear-gradient(135deg, white 0%, #fffbeb 100%);
  }

  .preset-card--recommended:hover {
    border-color: #f59e0b;
    box-shadow: 0 4px 12px rgba(245, 158, 11, 0.15);
  }

  .preset-card__header {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    margin-bottom: 10px;
  }

  .preset-card__icon {
    font-size: 1.25rem;
    flex-shrink: 0;
  }

  .preset-card__info {
    flex: 1;
    min-width: 0;
  }

  .preset-card__name {
    display: block;
    font-size: 0.875rem;
    font-weight: 600;
    color: #1a1f36;
  }

  .preset-card__desc {
    display: block;
    font-size: 0.75rem;
    color: #64748b;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .preset-card__options-preview {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    margin-bottom: 12px;
  }

  .preset-card__option-tag {
    padding: 2px 8px;
    font-size: 0.6875rem;
    font-weight: 500;
    color: #64748b;
    background: #f1f5f9;
    border-radius: 4px;
  }

  .preset-card__option-more {
    padding: 2px 8px;
    font-size: 0.6875rem;
    font-weight: 500;
    color: #94a3b8;
    font-style: italic;
  }

  .preset-card__actions {
    display: flex;
    gap: 6px;
  }

  .preset-card__btn {
    flex: 1;
    padding: 6px 10px;
    font-family: inherit;
    font-size: 0.75rem;
    font-weight: 500;
    color: #64748b;
    background: #f1f5f9;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .preset-card__btn:hover {
    background: #e2e8f0;
    color: #475569;
  }

  .preset-card__btn--primary {
    background: #7c5cff;
    color: white;
  }

  .preset-card__btn--primary:hover {
    background: #6d4aeb;
  }

  .facet-targeting__new-category {
    background: var(--te-surface-raised, #fafbfc);
    border: 1.5px solid var(--te-border, #e4e8f0);
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 16px;
  }

  .facet-targeting__new-category-form {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .facet-targeting__form-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .facet-targeting__label {
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--te-ink-muted, #8792a8);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .facet-targeting__input {
    width: 100%;
    padding: 10px 14px;
    font-family: inherit;
    font-size: 0.875rem;
    border: 1.5px solid var(--te-border, #e4e8f0);
    border-radius: 8px;
    background: var(--te-surface, #ffffff);
    color: var(--te-ink, #1a1f36);
    transition: all 0.15s ease;
    box-sizing: border-box;
  }

  .facet-targeting__input:focus {
    outline: none;
    border-color: #14b8a6;
    box-shadow: 0 0 0 3px rgba(20, 184, 166, 0.1);
  }

  .facet-targeting__input--sm {
    padding: 8px 12px;
    font-size: 0.8125rem;
  }

  .facet-targeting__form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
  }

  .facet-targeting__btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 8px 16px;
    font-family: inherit;
    font-size: 0.875rem;
    font-weight: 500;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.15s ease;
    border: none;
  }

  .facet-targeting__btn svg {
    width: 16px;
    height: 16px;
  }

  .facet-targeting__btn--primary {
    background: #14b8a6;
    color: white;
  }

  .facet-targeting__btn--primary:hover:not(:disabled) {
    background: #0d9488;
  }

  .facet-targeting__btn--primary:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .facet-targeting__btn--secondary {
    background: var(--te-surface-raised, #fafbfc);
    color: var(--te-ink-light, #4a5578);
    border: 1px solid var(--te-border, #e4e8f0);
  }

  .facet-targeting__btn--secondary:hover {
    background: var(--te-border-light, #f0f2f7);
  }

  .facet-targeting__btn--sm {
    padding: 6px 12px;
    font-size: 0.8125rem;
  }

  .facet-targeting__empty {
    padding: 40px 24px;
    text-align: center;
    background: var(--te-surface-raised, #fafbfc);
    border: 2px dashed var(--te-border, #e4e8f0);
    border-radius: 12px;
  }

  .facet-targeting__empty-icon {
    width: 48px;
    height: 48px;
    margin: 0 auto 12px;
    color: var(--te-border, #e4e8f0);
  }

  .facet-targeting__empty-icon svg {
    width: 100%;
    height: 100%;
  }

  .facet-targeting__empty-text {
    font-size: 0.875rem;
    color: var(--te-ink-muted, #8792a8);
    margin: 0 0 16px;
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
  }

  .facet-targeting__categories {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .facet-category {
    background: var(--te-surface-raised, #fafbfc);
    border: 1px solid var(--te-border-light, #f0f2f7);
    border-radius: 12px;
    padding: 16px;
    transition: border-color 0.15s ease;
  }

  .facet-category:hover {
    border-color: var(--te-border, #e4e8f0);
  }

  .facet-category__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
  }

  .facet-category__info {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .facet-category__icon {
    font-size: 1.125rem;
  }

  .facet-category__label {
    font-size: 0.9375rem;
    font-weight: 600;
    color: var(--te-ink, #1a1f36);
  }

  .facet-category__key {
    font-size: 0.75rem;
    font-family: 'DM Mono', monospace;
    color: var(--te-ink-muted, #8792a8);
    background: var(--te-border-light, #f0f2f7);
    padding: 2px 8px;
    border-radius: 4px;
  }

  .facet-category__recommended {
    font-size: 0.625rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: #f59e0b;
    background: #fef3c7;
    padding: 2px 8px;
    border-radius: 4px;
  }

  .facet-category__actions {
    display: flex;
    gap: 4px;
  }

  .facet-category__btn {
    width: 32px;
    height: 32px;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    border-radius: 6px;
    color: var(--te-ink-muted, #8792a8);
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .facet-category__btn:hover {
    background: var(--te-border-light, #f0f2f7);
    color: var(--te-ink-light, #4a5578);
  }

  .facet-category__btn--danger:hover {
    background: #fee2e2;
    color: #dc2626;
  }

  .facet-category__btn svg {
    width: 16px;
    height: 16px;
  }

  .facet-category__add-option {
    display: flex;
    gap: 8px;
    margin-bottom: 12px;
  }

  .facet-category__add-option .facet-targeting__input {
    flex: 1;
  }

  /* Suggestions - Paradox of Choice */
  .facet-category__suggestions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 6px;
    margin-bottom: 12px;
    padding: 10px 12px;
    background: linear-gradient(135deg, #f5f3ff 0%, #faf5ff 100%);
    border-radius: 8px;
  }

  .facet-category__suggestions-label {
    font-size: 0.6875rem;
    font-weight: 600;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .facet-category__suggestion-btn {
    padding: 4px 10px;
    font-family: inherit;
    font-size: 0.75rem;
    font-weight: 500;
    color: #7c5cff;
    background: white;
    border: 1px solid rgba(124, 92, 255, 0.3);
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .facet-category__suggestion-btn:hover {
    background: #7c5cff;
    color: white;
    border-color: #7c5cff;
    transform: translateY(-1px);
  }

  .facet-category__more {
    font-size: 0.6875rem;
    color: #94a3b8;
    font-style: italic;
  }

  .facet-category__options {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .facet-category__no-options {
    font-size: 0.8125rem;
    color: var(--te-ink-muted, #8792a8);
    margin: 0;
    font-style: italic;
  }

  /* Micro-commitment feedback */
  .facet-category__status {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px dashed #e4e8f0;
    font-size: 0.75rem;
    font-weight: 500;
    color: #10b981;
  }

  .facet-category__status svg {
    width: 14px;
    height: 14px;
  }

  .facet-option {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 10px 6px 12px;
    background: var(--te-surface, #ffffff);
    border: 1px solid var(--te-border, #e4e8f0);
    border-radius: 6px;
    font-size: 0.8125rem;
    color: var(--te-ink, #1a1f36);
    transition: all 0.15s ease;
  }

  .facet-option:hover {
    border-color: var(--te-ink-muted, #8792a8);
  }

  .facet-option__label {
    font-weight: 500;
  }

  .facet-option__remove {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    padding: 0;
    background: transparent;
    border: none;
    border-radius: 4px;
    color: var(--te-ink-muted, #8792a8);
    cursor: pointer;
    opacity: 0.6;
    transition: all 0.15s ease;
  }

  .facet-option__remove:hover {
    opacity: 1;
    color: #dc2626;
    background: #fee2e2;
  }

  .facet-option__remove svg {
    width: 12px;
    height: 12px;
  }

  @media (max-width: 640px) {
    .facet-targeting__header {
      flex-direction: column;
      gap: 16px;
    }

    .facet-targeting__header-actions {
      width: 100%;
    }

    .facet-targeting__toggle-btn,
    .facet-targeting__add-btn {
      flex: 1;
      justify-content: center;
    }

    .facet-targeting__presets-grid {
      grid-template-columns: 1fr;
    }
  }
`;
