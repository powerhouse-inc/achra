import { useState, useEffect, useRef } from "react";
import { generateId } from "document-model/core";
import type { DocumentDispatch } from "@powerhousedao/reactor-browser";
import type {
  ResourceTemplateDocument,
  ResourceTemplateAction,
  TargetAudience,
  FaqField,
  ContentSection,
} from "document-models/resource-template";
import {
  updateTemplateInfo,
  updateTemplateStatus,
  setOperator,
  setWeight,
  addTargetAudience,
  removeTargetAudience,
  setSetupServices,
  setRecurringServices,
  addFaq,
  updateFaq,
  deleteFaq,
  reorderFaqs,
  addContentSection,
  updateContentSection,
  deleteContentSection,
  reorderContentSections,
} from "../../../document-models/resource-template/v1/gen/creators.js";
import { MarkdownEditor } from "./markdown-editor.js";

interface TemplateInfoProps {
  document: ResourceTemplateDocument;
  dispatch: DocumentDispatch<ResourceTemplateAction>;
}

const STATUS_OPTIONS = [
  { value: "DRAFT", label: "Draft", color: "slate" },
  { value: "COMING_SOON", label: "Coming Soon", color: "sky" },
  { value: "ACTIVE", label: "Active", color: "emerald" },
  { value: "DEPRECATED", label: "Deprecated", color: "rose" },
] as const;

const AUDIENCE_PRESETS = [
  { label: "Builders", color: "#0ea5e9" },
  { label: "Networks", color: "#10b981" },
];

// Service templates for quick-add functionality
interface ServiceTemplate {
  title: string;
  description: string;
  icon: string;
}

const SETUP_SERVICE_TEMPLATES: Record<string, ServiceTemplate[]> = {
  "Legal Services": [
    {
      title: "Swiss association entity",
      description: "Legal entity formation as a Swiss association",
      icon: "🏛️",
    },
    {
      title: "Registered address (Zug)",
      description: "Official registered address in Zug, Switzerland",
      icon: "📍",
    },
    {
      title: "Legal document templates",
      description: "Access to standardized legal document templates",
      icon: "📋",
    },
  ],
};

const RECURRING_SERVICE_TEMPLATES: Record<string, ServiceTemplate[]> = {
  "Operations & Finance": [
    {
      title: "Invoice management",
      description: "Professional invoice processing and management",
      icon: "📄",
    },
    {
      title: "Annual tax filing",
      description: "Yearly tax preparation and filing services",
      icon: "💰",
    },
    {
      title: "Monthly accounting & close",
      description: "Monthly bookkeeping and financial close",
      icon: "📊",
    },
  ],
  "Contributor & Payments": [
    {
      title: "Contributor operations",
      description: "Management of contributor payments and operations",
      icon: "👥",
    },
    {
      title: "Multi-currency payouts",
      description: "Support for payments in multiple currencies",
      icon: "💱",
    },
    {
      title: "Multiple entities",
      description: "Support for managing multiple legal entities",
      icon: "🏢",
    },
  ],
  "Support & Advisory": [
    {
      title: "Dedicated ops support",
      description: "Dedicated operations support team",
      icon: "🎯",
    },
    {
      title: "Dedicated account manager",
      description: "Personal point of contact for all needs",
      icon: "👤",
    },
  ],
};

export function TemplateInfo({ document, dispatch }: TemplateInfoProps) {
  const { state } = document;
  const globalState = state.global;

  const [formData, setFormData] = useState({
    title: globalState.title || "",
    subtitle: globalState.subtitle || "",
    summary: globalState.summary || "",
    description: globalState.description || "",
    operatorId: globalState.operatorId || "",
    thumbnailUrl: globalState.thumbnailUrl || "",
    infoLink: globalState.infoLink || "",
    status: globalState.status,
  });

  const [newSetupService, setNewSetupService] = useState("");
  const [newRecurringService, setNewRecurringService] = useState("");
  const [newAudienceLabel, setNewAudienceLabel] = useState("");
  const [showAudienceInput, setShowAudienceInput] = useState(false);
  const [showSetupTemplates, setShowSetupTemplates] = useState(false);
  const [showRecurringTemplates, setShowRecurringTemplates] = useState(false);
  const [newFaqQuestion, setNewFaqQuestion] = useState("");
  const [newFaqAnswer, setNewFaqAnswer] = useState("");
  const [editingFaqId, setEditingFaqId] = useState<string | null>(null);
  const [editingFaqQuestion, setEditingFaqQuestion] = useState("");
  const [editingFaqAnswer, setEditingFaqAnswer] = useState("");
  const [newSectionTitle, setNewSectionTitle] = useState("");
  const [newSectionContent, setNewSectionContent] = useState("");
  const [editingSectionId, setEditingSectionId] = useState<string | null>(null);
  const [editingSectionTitle, setEditingSectionTitle] = useState("");
  const [editingSectionContent, setEditingSectionContent] = useState("");
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(),
  );
  const setupServiceInputRef = useRef<HTMLInputElement>(null);
  const recurringServiceInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setFormData({
      title: globalState.title || "",
      subtitle: globalState.subtitle || "",
      summary: globalState.summary || "",
      description: globalState.description || "",
      operatorId: globalState.operatorId || "",
      thumbnailUrl: globalState.thumbnailUrl || "",
      infoLink: globalState.infoLink || "",
      status: globalState.status,
    });
  }, [
    globalState.title,
    globalState.subtitle,
    globalState.summary,
    globalState.description,
    globalState.operatorId,
    globalState.thumbnailUrl,
    globalState.infoLink,
    globalState.status,
  ]);

  const handleFieldChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleInfoBlur = () => {
    const changes: Record<string, string | null> = {};
    let hasChanges = false;

    if (formData.title !== globalState.title) {
      changes.title = formData.title;
      hasChanges = true;
    }
    if (formData.summary !== globalState.summary) {
      changes.summary = formData.summary;
      hasChanges = true;
    }
    if (formData.description !== (globalState.description || "")) {
      changes.description = formData.description || null;
      hasChanges = true;
    }
    if (formData.thumbnailUrl !== (globalState.thumbnailUrl || "")) {
      changes.thumbnailUrl = formData.thumbnailUrl || null;
      hasChanges = true;
    }
    if (formData.infoLink !== (globalState.infoLink || "")) {
      changes.infoLink = formData.infoLink || null;
      hasChanges = true;
    }
    if (formData.subtitle !== (globalState.subtitle || "")) {
      changes.subtitle = formData.subtitle || null;
      hasChanges = true;
    }

    if (hasChanges) {
      dispatch(
        updateTemplateInfo({
          ...changes,
          lastModified: new Date().toISOString(),
        }),
      );
    }
  };

  const handleOperatorBlur = () => {
    if (formData.operatorId !== globalState.operatorId) {
      dispatch(
        setOperator({
          operatorId: formData.operatorId,
          lastModified: new Date().toISOString(),
        }),
      );
    }
  };

  const handleStatusChange = (value: string) => {
    const status = value as "DRAFT" | "COMING_SOON" | "ACTIVE" | "DEPRECATED";
    setFormData((prev) => ({ ...prev, status }));
    dispatch(
      updateTemplateStatus({
        status,
        lastModified: new Date().toISOString(),
      }),
    );
  };

  const handleAddAudience = (label: string, color?: string) => {
    if (!label.trim()) return;
    dispatch(
      addTargetAudience({
        id: generateId(),
        label: label.trim(),
        color: color || null,
        lastModified: new Date().toISOString(),
      }),
    );
    setNewAudienceLabel("");
    setShowAudienceInput(false);
  };

  const handleRemoveAudience = (id: string) => {
    dispatch(
      removeTargetAudience({
        id,
        lastModified: new Date().toISOString(),
      }),
    );
  };

  const handleAddSetupService = () => {
    if (!newSetupService.trim()) return;
    const updatedServices = [
      ...globalState.setupServices,
      newSetupService.trim(),
    ];
    dispatch(
      setSetupServices({
        services: updatedServices,
        lastModified: new Date().toISOString(),
      }),
    );
    setNewSetupService("");
    setupServiceInputRef.current?.focus();
  };

  const handleRemoveSetupService = (index: number) => {
    const updatedServices = globalState.setupServices.filter(
      (_, i) => i !== index,
    );
    dispatch(
      setSetupServices({
        services: updatedServices,
        lastModified: new Date().toISOString(),
      }),
    );
  };

  const handleAddRecurringService = () => {
    if (!newRecurringService.trim()) return;
    const updatedServices = [
      ...globalState.recurringServices,
      newRecurringService.trim(),
    ];
    dispatch(
      setRecurringServices({
        services: updatedServices,
        lastModified: new Date().toISOString(),
      }),
    );
    setNewRecurringService("");
    recurringServiceInputRef.current?.focus();
  };

  const handleRemoveRecurringService = (index: number) => {
    const updatedServices = globalState.recurringServices.filter(
      (_, i) => i !== index,
    );
    dispatch(
      setRecurringServices({
        services: updatedServices,
        lastModified: new Date().toISOString(),
      }),
    );
  };

  const handleAddSetupFromTemplate = (template: ServiceTemplate) => {
    if (globalState.setupServices.includes(template.title)) return;
    const updatedServices = [...globalState.setupServices, template.title];
    dispatch(
      setSetupServices({
        services: updatedServices,
        lastModified: new Date().toISOString(),
      }),
    );
  };

  const handleAddRecurringFromTemplate = (template: ServiceTemplate) => {
    if (globalState.recurringServices.includes(template.title)) return;
    const updatedServices = [...globalState.recurringServices, template.title];
    dispatch(
      setRecurringServices({
        services: updatedServices,
        lastModified: new Date().toISOString(),
      }),
    );
  };

  const handleMoveSetupService = (index: number, direction: "up" | "down") => {
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= globalState.setupServices.length) return;

    const reorderedServices = [...globalState.setupServices];
    [reorderedServices[index], reorderedServices[newIndex]] = [
      reorderedServices[newIndex],
      reorderedServices[index],
    ];

    dispatch(
      setSetupServices({
        services: reorderedServices,
        lastModified: new Date().toISOString(),
      }),
    );
  };

  const handleMoveRecurringService = (
    index: number,
    direction: "up" | "down",
  ) => {
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= globalState.recurringServices.length)
      return;

    const reorderedServices = [...globalState.recurringServices];
    [reorderedServices[index], reorderedServices[newIndex]] = [
      reorderedServices[newIndex],
      reorderedServices[index],
    ];

    dispatch(
      setRecurringServices({
        services: reorderedServices,
        lastModified: new Date().toISOString(),
      }),
    );
  };

  // FAQ Handlers
  const faqFields = globalState.faqFields || [];
  const sortedFaqs = [...faqFields].sort(
    (a, b) => a.displayOrder - b.displayOrder,
  );

  const handleAddFaq = () => {
    if (!newFaqQuestion.trim() || !newFaqAnswer.trim()) return;
    dispatch(
      addFaq({
        id: generateId(),
        question: newFaqQuestion.trim(),
        answer: newFaqAnswer.trim(),
        displayOrder: faqFields.length,
      }),
    );
    setNewFaqQuestion("");
    setNewFaqAnswer("");
  };

  const handleMoveFaq = (index: number, direction: "up" | "down") => {
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= sortedFaqs.length) return;

    const reorderedIds = sortedFaqs.map((f) => f.id);
    [reorderedIds[index], reorderedIds[newIndex]] = [
      reorderedIds[newIndex],
      reorderedIds[index],
    ];

    dispatch(
      reorderFaqs({
        faqIds: reorderedIds,
        lastModified: new Date().toISOString(),
      }),
    );
  };

  const handleStartEditFaq = (faq: FaqField) => {
    setEditingFaqId(faq.id);
    setEditingFaqQuestion(faq.question || "");
    setEditingFaqAnswer(faq.answer || "");
  };

  const handleSaveFaqEdit = () => {
    if (!editingFaqId || !editingFaqQuestion.trim() || !editingFaqAnswer.trim())
      return;
    dispatch(
      updateFaq({
        id: editingFaqId,
        question: editingFaqQuestion.trim(),
        answer: editingFaqAnswer.trim(),
      }),
    );
    setEditingFaqId(null);
    setEditingFaqQuestion("");
    setEditingFaqAnswer("");
  };

  const handleCancelFaqEdit = () => {
    setEditingFaqId(null);
    setEditingFaqQuestion("");
    setEditingFaqAnswer("");
  };

  const handleDeleteFaq = (id: string) => {
    dispatch(
      deleteFaq({
        id,
      }),
    );
  };

  // Content Section Handlers
  const contentSections = globalState.contentSections;
  const sortedSections = [...contentSections].sort(
    (a, b) => a.displayOrder - b.displayOrder,
  );

  const handleAddContentSection = () => {
    if (!newSectionTitle.trim() || !newSectionContent.trim()) return;
    dispatch(
      addContentSection({
        id: generateId(),
        title: newSectionTitle.trim(),
        content: newSectionContent.trim(),
        displayOrder: contentSections.length,
        lastModified: new Date().toISOString(),
      }),
    );
    setNewSectionTitle("");
    setNewSectionContent("");
  };

  const handleStartEditSection = (section: ContentSection) => {
    setEditingSectionId(section.id);
    setEditingSectionTitle(section.title);
    setEditingSectionContent(section.content);
  };

  const handleSaveSectionEdit = () => {
    if (
      !editingSectionId ||
      !editingSectionTitle.trim() ||
      !editingSectionContent.trim()
    )
      return;
    dispatch(
      updateContentSection({
        id: editingSectionId,
        title: editingSectionTitle.trim(),
        content: editingSectionContent.trim(),
        lastModified: new Date().toISOString(),
      }),
    );
    setEditingSectionId(null);
    setEditingSectionTitle("");
    setEditingSectionContent("");
  };

  const handleCancelSectionEdit = () => {
    setEditingSectionId(null);
    setEditingSectionTitle("");
    setEditingSectionContent("");
  };

  const handleDeleteContentSection = (id: string) => {
    dispatch(
      deleteContentSection({
        id,
        lastModified: new Date().toISOString(),
      }),
    );
  };

  const handleMoveSection = (index: number, direction: "up" | "down") => {
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= sortedSections.length) return;

    const reorderedIds = sortedSections.map((s) => s.id);
    [reorderedIds[index], reorderedIds[newIndex]] = [
      reorderedIds[newIndex],
      reorderedIds[index],
    ];

    dispatch(
      reorderContentSections({
        sectionIds: reorderedIds,
        lastModified: new Date().toISOString(),
      }),
    );
  };

  const toggleSectionExpanded = (id: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const currentStatus = STATUS_OPTIONS.find((s) => s.value === formData.status);

  const availablePresets = AUDIENCE_PRESETS.filter(
    (preset) =>
      !globalState.targetAudiences.some((a) => a.label === preset.label),
  );

  return (
    <>
      <style>{styles}</style>
      <div className="template-editor">
        {/* Hero Section - Thumbnail & Core Identity */}
        <section className="template-editor__hero">
          <div className="template-editor__thumbnail-area">
            <div
              className="template-editor__thumbnail"
              style={{
                backgroundImage: formData.thumbnailUrl
                  ? `url(${formData.thumbnailUrl})`
                  : undefined,
              }}
            >
              {!formData.thumbnailUrl && (
                <div className="template-editor__thumbnail-placeholder">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="M21 15l-5-5L5 21" />
                  </svg>
                  <span>Add Thumbnail</span>
                </div>
              )}
              {formData.thumbnailUrl && (
                <div
                  className={`template-editor__status-badge template-editor__status-badge--${currentStatus?.color}`}
                >
                  {currentStatus?.label}
                </div>
              )}
            </div>
            <div className="template-editor__thumbnail-input">
              <input
                type="text"
                value={formData.thumbnailUrl}
                onChange={(e) =>
                  handleFieldChange("thumbnailUrl", e.target.value)
                }
                onBlur={handleInfoBlur}
                placeholder="https://example.com/image.jpg"
                className="template-editor__input template-editor__input--sm"
              />
            </div>
          </div>

          <div className="template-editor__identity">
            <div className="template-editor__title-row">
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleFieldChange("title", e.target.value)}
                onBlur={handleInfoBlur}
                className="template-editor__title-input"
                placeholder="Product Title"
              />
              <div className="template-editor__status-select">
                <select
                  value={formData.status}
                  onChange={(e) => handleStatusChange(e.target.value)}
                  className="template-editor__select"
                  data-status={currentStatus?.color}
                >
                  {STATUS_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <span
                  className={`template-editor__status-indicator template-editor__status-indicator--${currentStatus?.color}`}
                />
              </div>
            </div>

            <input
              type="text"
              value={formData.subtitle}
              onChange={(e) => handleFieldChange("subtitle", e.target.value)}
              onBlur={handleInfoBlur}
              className="template-editor__title-input"
              placeholder="Subtitle / Tagline"
              style={{
                fontSize: "0.95rem",
                fontWeight: 400,
                color: "var(--rt-slate-600, #475569)",
                marginTop: "-4px",
              }}
            />

            {/* Target Audiences */}
            <div className="template-editor__audiences">
              {globalState.targetAudiences.map((audience: TargetAudience) => (
                <span
                  key={audience.id}
                  className="template-editor__audience-tag"
                  style={
                    audience.color
                      ? {
                          backgroundColor: `${audience.color}15`,
                          borderColor: `${audience.color}40`,
                          color: audience.color,
                        }
                      : undefined
                  }
                >
                  {audience.label}
                  <button
                    type="button"
                    onClick={() => handleRemoveAudience(audience.id)}
                    className="template-editor__audience-remove"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M18 6L6 18M6 6l12 12" strokeWidth="2" />
                    </svg>
                  </button>
                </span>
              ))}

              {showAudienceInput ? (
                <div className="template-editor__audience-input-wrap">
                  <input
                    type="text"
                    value={newAudienceLabel}
                    onChange={(e) => setNewAudienceLabel(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter")
                        handleAddAudience(newAudienceLabel);
                      if (e.key === "Escape") setShowAudienceInput(false);
                    }}
                    placeholder="Audience name..."
                    className="template-editor__audience-input"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => handleAddAudience(newAudienceLabel)}
                    className="template-editor__audience-add-btn"
                  >
                    Add
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowAudienceInput(true)}
                  className="template-editor__add-audience-btn"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M12 5v14M5 12h14" strokeWidth="2" />
                  </svg>
                  Add Audience
                </button>
              )}
            </div>

            {availablePresets.length > 0 && (
              <div className="template-editor__audience-presets">
                <span className="template-editor__presets-label">
                  Quick add:
                </span>
                {availablePresets.slice(0, 4).map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() =>
                      handleAddAudience(preset.label, preset.color)
                    }
                    className="template-editor__preset-btn"
                    style={{ color: preset.color }}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            )}

            <textarea
              value={formData.summary}
              onChange={(e) => handleFieldChange("summary", e.target.value)}
              onBlur={handleInfoBlur}
              className="template-editor__summary"
              placeholder="Brief summary of your product..."
              rows={2}
            />

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginTop: "8px",
              }}
            >
              <label
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  color: "var(--rt-slate-500, #64748b)",
                  whiteSpace: "nowrap",
                }}
              >
                Sort Weight
              </label>
              <input
                type="number"
                value={globalState.weight ?? ""}
                onChange={(e) => {
                  const val =
                    e.target.value === "" ? null : parseInt(e.target.value, 10);
                  dispatch(
                    setWeight({
                      weight: Number.isNaN(val) ? null : val,
                      lastModified: new Date().toISOString(),
                    }),
                  );
                }}
                placeholder="—"
                style={{
                  width: "72px",
                  padding: "4px 8px",
                  fontSize: "0.8125rem",
                  border: "1px solid var(--rt-slate-200, #e2e8f0)",
                  borderRadius: "6px",
                  outline: "none",
                  textAlign: "center",
                  fontFamily: "var(--rt-font-mono, monospace)",
                }}
              />
              <span
                style={{
                  fontSize: "0.6875rem",
                  color: "var(--rt-slate-400, #94a3b8)",
                }}
              >
                Lower = higher priority
              </span>
            </div>
          </div>
        </section>

        {/* Description */}
        {/* <section className="template-editor__card template-editor__card--full">
          <div className="template-editor__card-header">
            <div className="template-editor__card-icon template-editor__card-icon--violet">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
              >
                <path d="M4 6h16M4 12h16M4 18h10" />
              </svg>
            </div>
            <div>
              <h3 className="template-editor__card-title">Description</h3>
              <p className="template-editor__card-subtitle">
                Detailed description of your product
              </p>
            </div>
          </div>
          <textarea
            value={formData.description}
            onChange={(e) => handleFieldChange("description", e.target.value)}
            onBlur={handleInfoBlur}
            className="template-editor__textarea"
            placeholder="Provide a comprehensive description of your product, including what makes it unique and valuable..."
            rows={4}
          />
        </section> */}

        <section className="template-editor__card template-editor__card--full">
          <div className="template-editor__card-header">
            <div className="template-editor__card-icon template-editor__card-icon--violet">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
              >
                <path d="M4 6h16M4 12h16M4 18h10" />
              </svg>
            </div>
            <div>
              <h3 className="template-editor__card-title">Description</h3>
              <p className="template-editor__card-subtitle">
                Detailed description of your product
              </p>
            </div>
          </div>
          <MarkdownEditor
            label=""
            height={350}
            value={formData.description}
            onChange={(value: string) =>
              handleFieldChange("description", value)
            }
            onBlur={handleInfoBlur}
          />
        </section>

        {/* Expandable Content Sections */}
        <section className="template-editor__card template-editor__card--full">
          <div className="template-editor__card-header">
            <div className="template-editor__card-icon template-editor__card-icon--indigo">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
              >
                <path d="M4 6h16M4 10h16M4 14h10M4 18h6" />
              </svg>
            </div>
            <div>
              <h3 className="template-editor__card-title">
                Expandable Content Sections
              </h3>
              <p className="template-editor__card-subtitle">
                Add long-form article content with expandable titles
              </p>
            </div>
          </div>

          <div className="template-editor__sections-list">
            {sortedSections.map((section: ContentSection, index: number) => (
              <div
                key={section.id}
                className={`template-editor__section-item ${editingSectionId === section.id ? "template-editor__section-item--editing" : ""}`}
              >
                {editingSectionId === section.id ? (
                  <div className="template-editor__section-edit-form">
                    <input
                      type="text"
                      value={editingSectionTitle}
                      onChange={(e) => setEditingSectionTitle(e.target.value)}
                      className="template-editor__section-edit-title"
                      placeholder="Section title"
                      autoFocus
                    />
                    <textarea
                      value={editingSectionContent}
                      onChange={(e) => setEditingSectionContent(e.target.value)}
                      className="template-editor__section-edit-content"
                      placeholder="Section content..."
                      rows={6}
                    />
                    <div className="template-editor__section-edit-actions">
                      <button
                        type="button"
                        onClick={handleSaveSectionEdit}
                        className="template-editor__section-save-btn"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={handleCancelSectionEdit}
                        className="template-editor__section-cancel-btn"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="template-editor__section-reorder">
                      <button
                        type="button"
                        onClick={() => handleMoveSection(index, "up")}
                        className="template-editor__section-reorder-btn"
                        disabled={index === 0}
                        title="Move up"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M18 15l-6-6-6 6" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMoveSection(index, "down")}
                        className="template-editor__section-reorder-btn"
                        disabled={index === sortedSections.length - 1}
                        title="Move down"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleSectionExpanded(section.id)}
                      className="template-editor__section-toggle"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className={`template-editor__section-chevron ${expandedSections.has(section.id) ? "template-editor__section-chevron--expanded" : ""}`}
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </button>
                    <div className="template-editor__section-main">
                      <div
                        className="template-editor__section-header"
                        onClick={() => toggleSectionExpanded(section.id)}
                      >
                        <span className="template-editor__section-title">
                          {section.title}
                        </span>
                        <span className="template-editor__section-preview">
                          {section.content.length > 80
                            ? `${section.content.substring(0, 80)}...`
                            : section.content}
                        </span>
                      </div>
                      {expandedSections.has(section.id) && (
                        <div className="template-editor__section-content">
                          {section.content}
                        </div>
                      )}
                    </div>
                    <div className="template-editor__section-actions">
                      <button
                        type="button"
                        onClick={() => handleStartEditSection(section)}
                        className="template-editor__section-action-btn"
                        title="Edit section"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                          <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteContentSection(section.id)}
                        className="template-editor__section-action-btn template-editor__section-action-btn--delete"
                        title="Delete section"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                        </svg>
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Add new section form */}
          <div className="template-editor__section-add-form">
            <input
              type="text"
              value={newSectionTitle}
              onChange={(e) => setNewSectionTitle(e.target.value)}
              placeholder="New section title..."
              className="template-editor__section-new-title"
            />
            <textarea
              value={newSectionContent}
              onChange={(e) => setNewSectionContent(e.target.value)}
              placeholder="Section content (long-form article content)..."
              className="template-editor__section-new-content"
              rows={4}
            />
            {(newSectionTitle || newSectionContent) && (
              <button
                type="button"
                onClick={handleAddContentSection}
                className="template-editor__section-add-btn"
                disabled={!newSectionTitle.trim() || !newSectionContent.trim()}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M12 5v14M5 12h14" strokeWidth="2" />
                </svg>
                Add Section
              </button>
            )}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="template-editor__card template-editor__card--full">
          <div className="template-editor__card-header">
            <div className="template-editor__card-icon template-editor__card-icon--sky">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
                <path d="M12 17h.01" />
              </svg>
            </div>
            <div>
              <h3 className="template-editor__card-title">
                Frequently Asked Questions
              </h3>
              <p className="template-editor__card-subtitle">
                Common questions and answers about this product
              </p>
            </div>
          </div>

          <div className="template-editor__faq-list">
            {sortedFaqs.map((faq: FaqField, index: number) => (
              <div
                key={faq.id}
                className={`template-editor__faq-item ${editingFaqId === faq.id ? "template-editor__faq-item--editing" : ""}`}
              >
                {editingFaqId === faq.id ? (
                  <div className="template-editor__faq-edit-form">
                    <input
                      type="text"
                      value={editingFaqQuestion}
                      onChange={(e) => setEditingFaqQuestion(e.target.value)}
                      className="template-editor__faq-edit-question"
                      placeholder="Question"
                      autoFocus
                    />
                    <textarea
                      value={editingFaqAnswer}
                      onChange={(e) => setEditingFaqAnswer(e.target.value)}
                      className="template-editor__faq-edit-answer"
                      placeholder="Answer"
                      rows={3}
                    />
                    <div className="template-editor__faq-edit-actions">
                      <button
                        type="button"
                        onClick={handleSaveFaqEdit}
                        className="template-editor__faq-save-btn"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={handleCancelFaqEdit}
                        className="template-editor__faq-cancel-btn"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="template-editor__faq-reorder">
                      <button
                        type="button"
                        onClick={() => handleMoveFaq(index, "up")}
                        className="template-editor__faq-reorder-btn"
                        disabled={index === 0}
                        title="Move up"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M18 15l-6-6-6 6" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMoveFaq(index, "down")}
                        className="template-editor__faq-reorder-btn"
                        disabled={index === sortedFaqs.length - 1}
                        title="Move down"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      </button>
                    </div>
                    <div className="template-editor__faq-number">
                      {index + 1}
                    </div>
                    <div className="template-editor__faq-content">
                      <div className="template-editor__faq-question">
                        {faq.question}
                      </div>
                      <div className="template-editor__faq-answer">
                        {faq.answer}
                      </div>
                    </div>
                    <div className="template-editor__faq-actions">
                      <button
                        type="button"
                        onClick={() => handleStartEditFaq(faq)}
                        className="template-editor__faq-action-btn"
                        title="Edit FAQ"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                          <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteFaq(faq.id)}
                        className="template-editor__faq-action-btn template-editor__faq-action-btn--delete"
                        title="Delete FAQ"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                        </svg>
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Add new FAQ form */}
          <div className="template-editor__faq-add-form">
            <input
              type="text"
              value={newFaqQuestion}
              onChange={(e) => setNewFaqQuestion(e.target.value)}
              placeholder="New question..."
              className="template-editor__faq-new-question"
            />
            <textarea
              value={newFaqAnswer}
              onChange={(e) => setNewFaqAnswer(e.target.value)}
              placeholder="Answer to the question..."
              className="template-editor__faq-new-answer"
              rows={2}
            />
            {(newFaqQuestion || newFaqAnswer) && (
              <button
                type="button"
                onClick={handleAddFaq}
                className="template-editor__faq-add-btn"
                disabled={!newFaqQuestion.trim() || !newFaqAnswer.trim()}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M12 5v14M5 12h14" strokeWidth="2" />
                </svg>
                Add FAQ
              </button>
            )}
          </div>
        </section>

        {/* Services Information Section Divider */}
        <div className="template-editor__section-divider">
          <div className="template-editor__section-badge">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
            Services Information
          </div>
          <div className="template-editor__section-divider-line" />
        </div>

        {/* Services Grid */}
        <div className="template-editor__grid">
          <section className="template-editor__card">
            <div className="template-editor__card-header">
              <div className="template-editor__card-icon template-editor__card-icon--emerald">
                <svg
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
                <h3 className="template-editor__card-title">
                  Formation & Setup
                </h3>
                <p className="template-editor__card-subtitle">
                  One-time setup services
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowSetupTemplates(!showSetupTemplates)}
                className={`template-editor__templates-toggle ${showSetupTemplates ? "template-editor__templates-toggle--active" : ""}`}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" />
                </svg>
                Templates
              </button>
            </div>

            {showSetupTemplates && (
              <div className="template-editor__templates-panel">
                {Object.entries(SETUP_SERVICE_TEMPLATES).map(
                  ([category, templates]) => (
                    <div
                      key={category}
                      className="template-editor__template-category"
                    >
                      <span className="template-editor__template-category-label">
                        {category}
                      </span>
                      <div className="template-editor__template-items">
                        {templates.map((template) => {
                          const isAdded = globalState.setupServices.includes(
                            template.title,
                          );
                          return (
                            <button
                              key={template.title}
                              type="button"
                              onClick={() =>
                                handleAddSetupFromTemplate(template)
                              }
                              disabled={isAdded}
                              className={`template-editor__template-item ${isAdded ? "template-editor__template-item--added" : ""}`}
                              title={template.description}
                            >
                              <span className="template-editor__template-icon">
                                {template.icon}
                              </span>
                              <span className="template-editor__template-title">
                                {template.title}
                              </span>
                              {isAdded && (
                                <svg
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2.5"
                                  className="template-editor__template-check"
                                >
                                  <path d="M5 12l5 5L20 7" />
                                </svg>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ),
                )}
              </div>
            )}

            <div className="template-editor__services">
              {globalState.setupServices.map(
                (service: string, index: number) => (
                  <div key={index} className="template-editor__service">
                    <div className="template-editor__service-reorder">
                      <button
                        type="button"
                        onClick={() => handleMoveSetupService(index, "up")}
                        className="template-editor__service-reorder-btn"
                        disabled={index === 0}
                        title="Move up"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M18 15l-6-6-6 6" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMoveSetupService(index, "down")}
                        className="template-editor__service-reorder-btn"
                        disabled={
                          index === globalState.setupServices.length - 1
                        }
                        title="Move down"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      </button>
                    </div>
                    <span className="template-editor__service-bullet" />
                    <span className="template-editor__service-text">
                      {service}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSetupService(index)}
                      className="template-editor__service-remove"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path d="M18 6L6 18M6 6l12 12" strokeWidth="2" />
                      </svg>
                    </button>
                  </div>
                ),
              )}
              <div className="template-editor__add-service">
                <span className="template-editor__service-bullet template-editor__service-bullet--ghost" />
                <input
                  ref={setupServiceInputRef}
                  type="text"
                  value={newSetupService}
                  onChange={(e) => setNewSetupService(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleAddSetupService();
                  }}
                  placeholder="Add a setup service..."
                  className="template-editor__service-new-input"
                />
                {newSetupService && (
                  <button
                    type="button"
                    onClick={handleAddSetupService}
                    className="template-editor__service-add-btn"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M12 5v14M5 12h14" strokeWidth="2" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </section>

          <section className="template-editor__card">
            <div className="template-editor__card-header">
              <div className="template-editor__card-icon template-editor__card-icon--amber">
                <svg
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
                <h3 className="template-editor__card-title">
                  Recurring Services
                </h3>
                <p className="template-editor__card-subtitle">
                  Ongoing services included
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  setShowRecurringTemplates(!showRecurringTemplates)
                }
                className={`template-editor__templates-toggle template-editor__templates-toggle--amber ${showRecurringTemplates ? "template-editor__templates-toggle--active" : ""}`}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" />
                </svg>
                Templates
              </button>
            </div>

            {showRecurringTemplates && (
              <div className="template-editor__templates-panel template-editor__templates-panel--amber">
                {Object.entries(RECURRING_SERVICE_TEMPLATES).map(
                  ([category, templates]) => (
                    <div
                      key={category}
                      className="template-editor__template-category"
                    >
                      <span className="template-editor__template-category-label">
                        {category}
                      </span>
                      <div className="template-editor__template-items">
                        {templates.map((template) => {
                          const isAdded =
                            globalState.recurringServices.includes(
                              template.title,
                            );
                          return (
                            <button
                              key={template.title}
                              type="button"
                              onClick={() =>
                                handleAddRecurringFromTemplate(template)
                              }
                              disabled={isAdded}
                              className={`template-editor__template-item template-editor__template-item--amber ${isAdded ? "template-editor__template-item--added" : ""}`}
                              title={template.description}
                            >
                              <span className="template-editor__template-icon">
                                {template.icon}
                              </span>
                              <span className="template-editor__template-title">
                                {template.title}
                              </span>
                              {isAdded && (
                                <svg
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2.5"
                                  className="template-editor__template-check"
                                >
                                  <path d="M5 12l5 5L20 7" />
                                </svg>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ),
                )}
              </div>
            )}

            <div className="template-editor__services">
              {globalState.recurringServices.map(
                (service: string, index: number) => (
                  <div key={index} className="template-editor__service">
                    <div className="template-editor__service-reorder">
                      <button
                        type="button"
                        onClick={() => handleMoveRecurringService(index, "up")}
                        className="template-editor__service-reorder-btn"
                        disabled={index === 0}
                        title="Move up"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M18 15l-6-6-6 6" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          handleMoveRecurringService(index, "down")
                        }
                        className="template-editor__service-reorder-btn"
                        disabled={
                          index === globalState.recurringServices.length - 1
                        }
                        title="Move down"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      </button>
                    </div>
                    <span className="template-editor__service-bullet template-editor__service-bullet--recurring" />
                    <span className="template-editor__service-text">
                      {service}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveRecurringService(index)}
                      className="template-editor__service-remove"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path d="M18 6L6 18M6 6l12 12" strokeWidth="2" />
                      </svg>
                    </button>
                  </div>
                ),
              )}
              <div className="template-editor__add-service">
                <span className="template-editor__service-bullet template-editor__service-bullet--ghost" />
                <input
                  ref={recurringServiceInputRef}
                  type="text"
                  value={newRecurringService}
                  onChange={(e) => setNewRecurringService(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleAddRecurringService();
                  }}
                  placeholder="Add a recurring service..."
                  className="template-editor__service-new-input"
                />
                {newRecurringService && (
                  <button
                    type="button"
                    onClick={handleAddRecurringService}
                    className="template-editor__service-add-btn"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M12 5v14M5 12h14" strokeWidth="2" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </section>
        </div>

        {/* Metadata Row */}
        <section className="template-editor__metadata">
          <div className="template-editor__meta-field">
            <label className="template-editor__label">Operator ID</label>
            <input
              type="text"
              value={formData.operatorId}
              onChange={(e) => handleFieldChange("operatorId", e.target.value)}
              onBlur={handleOperatorBlur}
              className="template-editor__input template-editor__input--mono"
              placeholder="operator-123"
            />
          </div>
          <div className="template-editor__meta-field">
            <label className="template-editor__label">More Info Link</label>
            <input
              type="text"
              value={formData.infoLink}
              onChange={(e) => handleFieldChange("infoLink", e.target.value)}
              onBlur={handleInfoBlur}
              className="template-editor__input"
              placeholder="https://example.com/more-info"
            />
          </div>
        </section>
      </div>
    </>
  );
}

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&display=swap');

  .template-editor {
    --te-font: 'Instrument Sans', system-ui, sans-serif;
    --te-mono: 'DM Mono', 'SF Mono', monospace;

    --te-ink: #1a1f36;
    --te-ink-light: #4a5578;
    --te-ink-muted: #8792a8;
    --te-surface: #ffffff;
    --te-surface-raised: #fafbfc;
    --te-border: #e4e8f0;
    --te-border-light: #f0f2f7;

    --te-violet: #7c5cff;
    --te-violet-light: #f4f1ff;
    --te-amber: #f59e0b;
    --te-amber-light: #fef7e6;
    --te-emerald: #10b981;
    --te-emerald-light: #e8faf3;
    --te-sky: #0ea5e9;
    --te-sky-light: #e8f7fc;
    --te-rose: #f43f5e;
    --te-rose-light: #fef1f3;
    --te-slate: #64748b;
    --te-slate-light: #f1f5f9;
    --te-teal: #14b8a6;
    --te-teal-light: #ccfbf1;

    font-family: var(--te-font);
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  /* Hero Section */
  .template-editor__hero {
    display: grid;
    grid-template-columns: 160px 1fr;
    gap: 28px;
    background: var(--te-surface);
    border-radius: 16px;
    padding: 24px;
    box-shadow: 0 1px 3px rgba(26, 31, 54, 0.04), 0 4px 16px rgba(26, 31, 54, 0.06);
    border-left: 4px solid var(--te-teal);
  }

  .template-editor__thumbnail-area {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .template-editor__thumbnail {
    width: 160px;
    height: 120px;
    border-radius: 12px;
    background: linear-gradient(135deg, var(--te-border-light) 0%, var(--te-border) 100%);
    background-size: cover;
    background-position: center;
    position: relative;
    overflow: hidden;
    transition: transform 0.2s ease;
  }

  .template-editor__thumbnail:hover {
    transform: scale(1.02);
  }

  .template-editor__thumbnail-placeholder {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    color: var(--te-ink-muted);
    font-size: 0.75rem;
    font-weight: 500;
  }

  .template-editor__thumbnail-placeholder svg {
    width: 32px;
    height: 32px;
    opacity: 0.5;
  }

  .template-editor__status-badge {
    position: absolute;
    top: 8px;
    left: 8px;
    padding: 4px 10px;
    font-size: 0.625rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    border-radius: 100px;
    backdrop-filter: blur(8px);
  }

  .template-editor__status-badge--emerald {
    background: rgba(16, 185, 129, 0.9);
    color: white;
  }

  .template-editor__status-badge--sky {
    background: rgba(14, 165, 233, 0.9);
    color: white;
  }

  .template-editor__status-badge--slate {
    background: rgba(100, 116, 139, 0.9);
    color: white;
  }

  .template-editor__status-badge--rose {
    background: rgba(244, 63, 94, 0.9);
    color: white;
  }

  .template-editor__thumbnail-input {
    width: 100%;
  }

  .template-editor__identity {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .template-editor__title-row {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .template-editor__title-input {
    flex: 1;
    font-family: var(--te-font);
    font-size: 1.75rem;
    font-weight: 700;
    color: var(--te-ink);
    background: transparent;
    border: none;
    outline: none;
    padding: 0;
    letter-spacing: -0.02em;
  }

  .template-editor__title-input::placeholder {
    color: var(--te-ink-muted);
  }

  .template-editor__status-select {
    position: relative;
    display: flex;
    align-items: center;
  }

  .template-editor__select {
    appearance: none;
    font-family: var(--te-font);
    font-size: 0.8125rem;
    font-weight: 600;
    padding: 8px 32px 8px 28px;
    border-radius: 100px;
    border: 1.5px solid var(--te-border);
    background: var(--te-surface-raised);
    color: var(--te-ink-light);
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .template-editor__select:hover {
    border-color: var(--te-ink-muted);
  }

  .template-editor__select:focus {
    outline: none;
    border-color: var(--te-teal);
    box-shadow: 0 0 0 3px var(--te-teal-light);
  }

  .template-editor__status-indicator {
    position: absolute;
    left: 10px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    pointer-events: none;
  }

  .template-editor__status-indicator--emerald { background: var(--te-emerald); }
  .template-editor__status-indicator--sky { background: var(--te-sky); }
  .template-editor__status-indicator--slate { background: var(--te-slate); }
  .template-editor__status-indicator--rose { background: var(--te-rose); }

  /* Audiences */
  .template-editor__audiences {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
  }

  .template-editor__audience-tag {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    font-size: 0.8125rem;
    font-weight: 600;
    border-radius: 100px;
    background: var(--te-teal-light);
    border: 1px solid rgba(20, 184, 166, 0.2);
    color: var(--te-teal);
    transition: all 0.15s ease;
  }

  .template-editor__audience-remove {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    padding: 0;
    background: transparent;
    border: none;
    cursor: pointer;
    opacity: 0.6;
    transition: opacity 0.15s ease;
  }

  .template-editor__audience-remove:hover {
    opacity: 1;
  }

  .template-editor__audience-remove svg {
    width: 12px;
    height: 12px;
  }

  .template-editor__add-audience-btn {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 6px 12px;
    font-family: var(--te-font);
    font-size: 0.8125rem;
    font-weight: 500;
    color: var(--te-ink-muted);
    background: transparent;
    border: 1.5px dashed var(--te-border);
    border-radius: 100px;
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .template-editor__add-audience-btn:hover {
    border-color: var(--te-ink-muted);
    color: var(--te-ink-light);
  }

  .template-editor__add-audience-btn svg {
    width: 14px;
    height: 14px;
  }

  .template-editor__audience-input-wrap {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .template-editor__audience-input {
    width: 140px;
    padding: 6px 12px;
    font-family: var(--te-font);
    font-size: 0.8125rem;
    border: 1.5px solid var(--te-teal);
    border-radius: 100px;
    outline: none;
    background: var(--te-surface);
  }

  .template-editor__audience-add-btn {
    padding: 6px 12px;
    font-family: var(--te-font);
    font-size: 0.75rem;
    font-weight: 600;
    color: white;
    background: var(--te-teal);
    border: none;
    border-radius: 100px;
    cursor: pointer;
    transition: background 0.15s ease;
  }

  .template-editor__audience-add-btn:hover {
    background: #0d9488;
  }

  .template-editor__audience-presets {
    display: flex;
    align-items: center;
    gap: 8px;
    padding-top: 4px;
  }

  .template-editor__presets-label {
    font-size: 0.75rem;
    color: var(--te-ink-muted);
  }

  .template-editor__preset-btn {
    font-family: var(--te-font);
    font-size: 0.75rem;
    font-weight: 500;
    padding: 4px 8px;
    background: transparent;
    border: none;
    cursor: pointer;
    opacity: 0.7;
    transition: opacity 0.15s ease;
  }

  .template-editor__preset-btn:hover {
    opacity: 1;
  }

  .template-editor__summary {
    width: 100%;
    font-family: var(--te-font);
    font-size: 0.9375rem;
    line-height: 1.6;
    color: var(--te-ink-light);
    background: transparent;
    border: none;
    outline: none;
    resize: none;
    padding: 0;
  }

  .template-editor__summary::placeholder {
    color: var(--te-ink-muted);
  }

  /* Section Divider */
  .template-editor__section-divider {
    display: flex;
    align-items: center;
    gap: 16px;
    margin: 8px 0;
  }

  .template-editor__section-divider-line {
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--te-border), transparent);
  }

  .template-editor__section-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 20px;
    background: linear-gradient(135deg, var(--te-emerald-light) 0%, var(--te-teal-light) 100%);
    color: var(--te-emerald);
    border-radius: 100px;
    font-size: 0.8125rem;
    font-weight: 600;
    letter-spacing: 0.02em;
    white-space: nowrap;
  }

  .template-editor__section-badge svg {
    width: 16px;
    height: 16px;
  }

  /* Grid Cards */
  .template-editor__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  .template-editor__card {
    background: var(--te-surface);
    border-radius: 16px;
    padding: 24px;
    box-shadow: 0 1px 3px rgba(26, 31, 54, 0.04), 0 4px 16px rgba(26, 31, 54, 0.06);
  }

  .template-editor__card-header {
    display: flex;
    align-items: flex-start;
    gap: 14px;
    margin-bottom: 20px;
  }

  .template-editor__card-icon {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .template-editor__card-icon svg {
    width: 20px;
    height: 20px;
  }

  .template-editor__card-icon--violet {
    background: var(--te-violet-light);
    color: var(--te-violet);
  }

  .template-editor__card-icon--amber {
    background: var(--te-amber-light);
    color: var(--te-amber);
  }

  .template-editor__card-icon--emerald {
    background: var(--te-emerald-light);
    color: var(--te-emerald);
  }

  .template-editor__card--full {
    grid-column: 1 / -1;
  }

  .template-editor__card-title {
    font-size: 1rem;
    font-weight: 600;
    color: var(--te-ink);
    margin: 0 0 2px;
  }

  .template-editor__card-subtitle {
    font-size: 0.8125rem;
    color: var(--te-ink-muted);
    margin: 0;
  }

  .template-editor__textarea {
    width: 100%;
    font-family: var(--te-font);
    font-size: 0.9375rem;
    line-height: 1.7;
    color: var(--te-ink);
    background: var(--te-surface-raised);
    border: 1.5px solid var(--te-border-light);
    border-radius: 12px;
    padding: 16px;
    resize: vertical;
    transition: all 0.15s ease;
  }

  .template-editor__textarea:hover {
    border-color: var(--te-border);
  }

  .template-editor__textarea:focus {
    outline: none;
    border-color: var(--te-teal);
    box-shadow: 0 0 0 3px var(--te-teal-light);
  }

  .template-editor__textarea::placeholder {
    color: var(--te-ink-muted);
  }

  /* Services */
  .template-editor__services {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .template-editor__service {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 12px;
    background: var(--te-surface-raised);
    border-radius: 8px;
    transition: background 0.15s ease;
  }

  .template-editor__service:hover {
    background: var(--te-border-light);
  }

  .template-editor__service-bullet {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--te-emerald);
    flex-shrink: 0;
  }

  .template-editor__service-bullet--recurring {
    background: var(--te-amber);
  }

  .template-editor__service-bullet--ghost {
    background: var(--te-border);
  }

  .template-editor__service-text {
    flex: 1;
    font-size: 0.875rem;
    color: var(--te-ink);
  }

  .template-editor__service-remove {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    padding: 0;
    background: transparent;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    color: var(--te-ink-muted);
    opacity: 0;
    transition: all 0.15s ease;
  }

  .template-editor__service:hover .template-editor__service-remove {
    opacity: 1;
  }

  .template-editor__service-remove:hover {
    background: var(--te-rose-light);
    color: var(--te-rose);
  }

  .template-editor__service-remove svg {
    width: 14px;
    height: 14px;
  }

  .template-editor__service-reorder {
    display: flex;
    flex-direction: column;
    gap: 2px;
    opacity: 0;
    transition: opacity 0.15s ease;
  }

  .template-editor__service:hover .template-editor__service-reorder {
    opacity: 1;
  }

  .template-editor__service-reorder-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 14px;
    padding: 0;
    background: transparent;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    color: var(--te-ink-muted);
    transition: all 0.15s ease;
  }

  .template-editor__service-reorder-btn:hover:not(:disabled) {
    background: var(--te-emerald-light);
    color: var(--te-emerald);
  }

  .template-editor__service-reorder-btn:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  .template-editor__service-reorder-btn svg {
    width: 12px;
    height: 12px;
  }

  .template-editor__add-service {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 12px;
    background: transparent;
    border: 1.5px dashed var(--te-border);
    border-radius: 8px;
    transition: all 0.15s ease;
  }

  .template-editor__add-service:focus-within {
    border-color: var(--te-teal);
    border-style: solid;
  }

  .template-editor__service-new-input {
    flex: 1;
    font-family: var(--te-font);
    font-size: 0.875rem;
    background: transparent;
    border: none;
    outline: none;
    color: var(--te-ink);
  }

  .template-editor__service-new-input::placeholder {
    color: var(--te-ink-muted);
  }

  .template-editor__service-add-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    padding: 0;
    background: var(--te-teal);
    border: none;
    border-radius: 6px;
    cursor: pointer;
    color: white;
    transition: background 0.15s ease;
  }

  .template-editor__service-add-btn:hover {
    background: #0d9488;
  }

  .template-editor__service-add-btn svg {
    width: 16px;
    height: 16px;
  }

  /* Metadata */
  .template-editor__metadata {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    background: var(--te-surface);
    border-radius: 16px;
    padding: 24px;
    box-shadow: 0 1px 3px rgba(26, 31, 54, 0.04), 0 4px 16px rgba(26, 31, 54, 0.06);
  }

  .template-editor__meta-field {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .template-editor__label {
    font-size: 0.6875rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--te-ink-muted);
  }

  .template-editor__input {
    width: 100%;
    font-family: var(--te-font);
    font-size: 0.9375rem;
    padding: 12px 16px;
    background: var(--te-surface-raised);
    border: 1.5px solid var(--te-border-light);
    border-radius: 10px;
    color: var(--te-ink);
    transition: all 0.15s ease;
  }

  .template-editor__input:hover {
    border-color: var(--te-border);
  }

  .template-editor__input:focus {
    outline: none;
    border-color: var(--te-teal);
    box-shadow: 0 0 0 3px var(--te-teal-light);
  }

  .template-editor__input::placeholder {
    color: var(--te-ink-muted);
  }

  .template-editor__input--sm {
    font-size: 0.8125rem;
    padding: 8px 12px;
  }

  .template-editor__input--mono {
    font-family: var(--te-mono);
    font-size: 0.875rem;
  }

  /* Facet Targeting */
  .template-editor__facets {
    background: var(--te-surface);
    border-radius: 16px;
    padding: 24px;
    box-shadow: 0 1px 3px rgba(26, 31, 54, 0.04), 0 4px 16px rgba(26, 31, 54, 0.06);
  }

  .template-editor__facets-header {
    display: flex;
    align-items: flex-start;
    gap: 14px;
    margin-bottom: 20px;
  }

  .template-editor__card-icon--sky {
    background: var(--te-sky-light);
    color: var(--te-sky);
  }

  .template-editor__facets-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  .template-editor__facet-card {
    background: var(--te-surface-raised);
    border: 1px solid var(--te-border-light);
    border-radius: 12px;
    padding: 16px;
    transition: border-color 0.15s ease;
  }

  .template-editor__facet-card:hover {
    border-color: var(--te-border);
  }

  .template-editor__facet-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 6px;
  }

  .template-editor__facet-label {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--te-ink);
  }

  .template-editor__facet-clear {
    font-family: var(--te-font);
    font-size: 0.75rem;
    font-weight: 500;
    padding: 4px 8px;
    background: transparent;
    border: none;
    color: var(--te-ink-muted);
    cursor: pointer;
    transition: color 0.15s ease;
  }

  .template-editor__facet-clear:hover {
    color: var(--te-rose);
  }

  .template-editor__facet-desc {
    font-size: 0.75rem;
    color: var(--te-ink-muted);
    margin: 0 0 12px;
  }

  .template-editor__facet-options {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .template-editor__facet-option {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 12px;
    font-family: var(--te-font);
    font-size: 0.8125rem;
    color: var(--te-ink-light);
    background: var(--te-surface);
    border: 1.5px solid var(--te-border-light);
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .template-editor__facet-option:hover {
    border-color: var(--te-border);
    background: var(--te-surface);
  }

  .template-editor__facet-option--selected {
    border-color: var(--te-teal);
    background: var(--te-teal-light);
    color: var(--te-ink);
  }

  .template-editor__facet-option--selected:hover {
    border-color: var(--te-teal);
    background: var(--te-teal-light);
  }

  .template-editor__facet-checkbox {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    border-radius: 4px;
    background: var(--te-surface);
    border: 1.5px solid var(--te-border);
    transition: all 0.15s ease;
  }

  .template-editor__facet-option--selected .template-editor__facet-checkbox {
    background: var(--te-teal);
    border-color: var(--te-teal);
  }

  .template-editor__facet-checkbox svg {
    width: 12px;
    height: 12px;
    color: white;
  }

  /* Templates Panel */
  .template-editor__templates-toggle {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    margin-left: auto;
    padding: 6px 12px;
    font-family: var(--te-font);
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--te-emerald);
    background: var(--te-emerald-light);
    border: 1.5px solid transparent;
    border-radius: 100px;
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .template-editor__templates-toggle svg {
    width: 14px;
    height: 14px;
  }

  .template-editor__templates-toggle:hover {
    border-color: var(--te-emerald);
  }

  .template-editor__templates-toggle--active {
    background: var(--te-emerald);
    color: white;
  }

  .template-editor__templates-toggle--amber {
    color: var(--te-amber);
    background: var(--te-amber-light);
  }

  .template-editor__templates-toggle--amber:hover {
    border-color: var(--te-amber);
  }

  .template-editor__templates-toggle--amber.template-editor__templates-toggle--active {
    background: var(--te-amber);
    color: white;
  }

  .template-editor__templates-panel {
    background: var(--te-emerald-light);
    border: 1px solid rgba(16, 185, 129, 0.2);
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 16px;
    animation: templatesPanelSlide 0.2s ease-out;
  }

  .template-editor__templates-panel--amber {
    background: var(--te-amber-light);
    border-color: rgba(245, 158, 11, 0.2);
  }

  @keyframes templatesPanelSlide {
    from {
      opacity: 0;
      transform: translateY(-8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .template-editor__template-category {
    margin-bottom: 12px;
  }

  .template-editor__template-category:last-child {
    margin-bottom: 0;
  }

  .template-editor__template-category-label {
    display: block;
    font-size: 0.6875rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--te-ink-muted);
    margin-bottom: 8px;
  }

  .template-editor__template-items {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .template-editor__template-item {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 10px;
    font-family: var(--te-font);
    font-size: 0.8125rem;
    font-weight: 500;
    color: var(--te-ink);
    background: var(--te-surface);
    border: 1.5px solid var(--te-border-light);
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .template-editor__template-item:hover:not(:disabled) {
    border-color: var(--te-emerald);
    background: white;
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(16, 185, 129, 0.15);
  }

  .template-editor__template-item--amber:hover:not(:disabled) {
    border-color: var(--te-amber);
    box-shadow: 0 2px 8px rgba(245, 158, 11, 0.15);
  }

  .template-editor__template-item--added {
    background: var(--te-emerald-light);
    border-color: var(--te-emerald);
    color: var(--te-emerald);
    cursor: default;
  }

  .template-editor__template-item--amber.template-editor__template-item--added {
    background: var(--te-amber-light);
    border-color: var(--te-amber);
    color: var(--te-amber);
  }

  .template-editor__template-icon {
    font-size: 0.875rem;
  }

  .template-editor__template-title {
    white-space: nowrap;
  }

  .template-editor__template-check {
    width: 14px;
    height: 14px;
    margin-left: 2px;
  }

  /* FAQ Section */
  .template-editor__faq-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 16px;
  }

  .template-editor__faq-item {
    display: flex;
    align-items: flex-start;
    gap: 16px;
    padding: 16px;
    background: var(--te-surface-raised);
    border: 1.5px solid var(--te-border-light);
    border-radius: 12px;
    transition: all 0.15s ease;
  }

  .template-editor__faq-item:hover {
    border-color: var(--te-border);
  }

  .template-editor__faq-item--editing {
    border-color: var(--te-sky);
    background: var(--te-sky-light);
  }

  .template-editor__faq-number {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    background: var(--te-sky-light);
    color: var(--te-sky);
    font-size: 0.8125rem;
    font-weight: 700;
    border-radius: 8px;
    flex-shrink: 0;
  }

  .template-editor__faq-content {
    flex: 1;
    min-width: 0;
  }

  .template-editor__faq-question {
    font-size: 0.9375rem;
    font-weight: 600;
    color: var(--te-ink);
    margin-bottom: 6px;
    line-height: 1.4;
  }

  .template-editor__faq-answer {
    font-size: 0.875rem;
    color: var(--te-ink-light);
    line-height: 1.6;
  }

  .template-editor__faq-actions {
    display: flex;
    gap: 6px;
    opacity: 0;
    transition: opacity 0.15s ease;
  }

  .template-editor__faq-item:hover .template-editor__faq-actions {
    opacity: 1;
  }

  .template-editor__faq-action-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    padding: 0;
    background: var(--te-surface);
    border: 1.5px solid var(--te-border-light);
    border-radius: 8px;
    cursor: pointer;
    color: var(--te-ink-muted);
    transition: all 0.15s ease;
  }

  .template-editor__faq-action-btn:hover {
    border-color: var(--te-sky);
    color: var(--te-sky);
    background: var(--te-sky-light);
  }

  .template-editor__faq-action-btn--delete:hover {
    border-color: var(--te-rose);
    color: var(--te-rose);
    background: var(--te-rose-light);
  }

  .template-editor__faq-action-btn svg {
    width: 16px;
    height: 16px;
  }

  .template-editor__faq-reorder {
    display: flex;
    flex-direction: column;
    gap: 2px;
    opacity: 0;
    transition: opacity 0.15s ease;
  }

  .template-editor__faq-item:hover .template-editor__faq-reorder {
    opacity: 1;
  }

  .template-editor__faq-reorder-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 16px;
    padding: 0;
    background: transparent;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    color: var(--te-ink-muted);
    transition: all 0.15s ease;
  }

  .template-editor__faq-reorder-btn:hover:not(:disabled) {
    background: var(--te-sky-light);
    color: var(--te-sky);
  }

  .template-editor__faq-reorder-btn:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  .template-editor__faq-reorder-btn svg {
    width: 14px;
    height: 14px;
  }

  .template-editor__faq-edit-form {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .template-editor__faq-edit-question {
    font-family: var(--te-font);
    font-size: 0.9375rem;
    font-weight: 600;
    padding: 10px 14px;
    background: var(--te-surface);
    border: 1.5px solid var(--te-border);
    border-radius: 8px;
    color: var(--te-ink);
  }

  .template-editor__faq-edit-question:focus {
    outline: none;
    border-color: var(--te-sky);
  }

  .template-editor__faq-edit-answer {
    font-family: var(--te-font);
    font-size: 0.875rem;
    padding: 10px 14px;
    background: var(--te-surface);
    border: 1.5px solid var(--te-border);
    border-radius: 8px;
    color: var(--te-ink);
    resize: vertical;
    min-height: 60px;
  }

  .template-editor__faq-edit-answer:focus {
    outline: none;
    border-color: var(--te-sky);
  }

  .template-editor__faq-edit-actions {
    display: flex;
    gap: 8px;
    justify-content: flex-end;
  }

  .template-editor__faq-save-btn {
    padding: 8px 16px;
    font-family: var(--te-font);
    font-size: 0.8125rem;
    font-weight: 600;
    color: white;
    background: var(--te-sky);
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.15s ease;
  }

  .template-editor__faq-save-btn:hover {
    background: #0284c7;
  }

  .template-editor__faq-cancel-btn {
    padding: 8px 16px;
    font-family: var(--te-font);
    font-size: 0.8125rem;
    font-weight: 600;
    color: var(--te-ink-light);
    background: var(--te-surface);
    border: 1.5px solid var(--te-border);
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .template-editor__faq-cancel-btn:hover {
    background: var(--te-surface-raised);
    border-color: var(--te-ink-muted);
  }

  .template-editor__faq-add-form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 16px;
    background: var(--te-surface-raised);
    border: 1.5px dashed var(--te-border);
    border-radius: 12px;
  }

  .template-editor__faq-new-question {
    font-family: var(--te-font);
    font-size: 0.9375rem;
    padding: 10px 14px;
    background: var(--te-surface);
    border: 1.5px solid var(--te-border-light);
    border-radius: 8px;
    color: var(--te-ink);
    transition: all 0.15s ease;
  }

  .template-editor__faq-new-question:hover {
    border-color: var(--te-border);
  }

  .template-editor__faq-new-question:focus {
    outline: none;
    border-color: var(--te-sky);
    box-shadow: 0 0 0 3px var(--te-sky-light);
  }

  .template-editor__faq-new-question::placeholder {
    color: var(--te-ink-muted);
  }

  .template-editor__faq-new-answer {
    font-family: var(--te-font);
    font-size: 0.875rem;
    padding: 10px 14px;
    background: var(--te-surface);
    border: 1.5px solid var(--te-border-light);
    border-radius: 8px;
    color: var(--te-ink);
    resize: vertical;
    min-height: 60px;
    transition: all 0.15s ease;
  }

  .template-editor__faq-new-answer:hover {
    border-color: var(--te-border);
  }

  .template-editor__faq-new-answer:focus {
    outline: none;
    border-color: var(--te-sky);
    box-shadow: 0 0 0 3px var(--te-sky-light);
  }

  .template-editor__faq-new-answer::placeholder {
    color: var(--te-ink-muted);
  }

  .template-editor__faq-add-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 10px 20px;
    font-family: var(--te-font);
    font-size: 0.875rem;
    font-weight: 600;
    color: white;
    background: var(--te-sky);
    border: none;
    border-radius: 8px;
    cursor: pointer;
    align-self: flex-start;
    transition: all 0.15s ease;
  }

  .template-editor__faq-add-btn:hover:not(:disabled) {
    background: #0284c7;
  }

  .template-editor__faq-add-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .template-editor__faq-add-btn svg {
    width: 16px;
    height: 16px;
  }

  /* Content Sections */
  .template-editor__card-icon--indigo {
    background: #eef2ff;
    color: #6366f1;
  }

  .template-editor__sections-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 16px;
  }

  .template-editor__section-item {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 16px;
    background: var(--te-surface-raised);
    border: 1.5px solid var(--te-border-light);
    border-radius: 12px;
    transition: all 0.15s ease;
  }

  .template-editor__section-item:hover {
    border-color: var(--te-border);
  }

  .template-editor__section-item--editing {
    border-color: #6366f1;
    background: #eef2ff;
  }

  .template-editor__section-reorder {
    display: flex;
    flex-direction: column;
    gap: 2px;
    opacity: 0;
    transition: opacity 0.15s ease;
  }

  .template-editor__section-item:hover .template-editor__section-reorder {
    opacity: 1;
  }

  .template-editor__section-reorder-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 16px;
    padding: 0;
    background: transparent;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    color: var(--te-ink-muted);
    transition: all 0.15s ease;
  }

  .template-editor__section-reorder-btn:hover:not(:disabled) {
    background: #e0e7ff;
    color: #6366f1;
  }

  .template-editor__section-reorder-btn:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  .template-editor__section-reorder-btn svg {
    width: 14px;
    height: 14px;
  }

  .template-editor__section-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    padding: 0;
    background: var(--te-surface);
    border: 1.5px solid var(--te-border-light);
    border-radius: 8px;
    cursor: pointer;
    color: var(--te-ink-muted);
    flex-shrink: 0;
    transition: all 0.15s ease;
  }

  .template-editor__section-toggle:hover {
    border-color: #6366f1;
    color: #6366f1;
    background: #eef2ff;
  }

  .template-editor__section-chevron {
    width: 16px;
    height: 16px;
    transition: transform 0.2s ease;
  }

  .template-editor__section-chevron--expanded {
    transform: rotate(180deg);
  }

  .template-editor__section-main {
    flex: 1;
    min-width: 0;
    cursor: pointer;
  }

  .template-editor__section-header {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .template-editor__section-title {
    font-size: 0.9375rem;
    font-weight: 600;
    color: var(--te-ink);
    line-height: 1.4;
  }

  .template-editor__section-preview {
    font-size: 0.8125rem;
    color: var(--te-ink-muted);
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .template-editor__section-content {
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px solid var(--te-border-light);
    font-size: 0.875rem;
    color: var(--te-ink-light);
    line-height: 1.7;
    white-space: pre-wrap;
    animation: sectionExpand 0.2s ease-out;
  }

  @keyframes sectionExpand {
    from {
      opacity: 0;
      max-height: 0;
    }
    to {
      opacity: 1;
      max-height: 1000px;
    }
  }

  .template-editor__section-actions {
    display: flex;
    gap: 6px;
    opacity: 0;
    transition: opacity 0.15s ease;
    flex-shrink: 0;
  }

  .template-editor__section-item:hover .template-editor__section-actions {
    opacity: 1;
  }

  .template-editor__section-action-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    padding: 0;
    background: var(--te-surface);
    border: 1.5px solid var(--te-border-light);
    border-radius: 8px;
    cursor: pointer;
    color: var(--te-ink-muted);
    transition: all 0.15s ease;
  }

  .template-editor__section-action-btn:hover {
    border-color: #6366f1;
    color: #6366f1;
    background: #eef2ff;
  }

  .template-editor__section-action-btn--delete:hover {
    border-color: var(--te-rose);
    color: var(--te-rose);
    background: var(--te-rose-light);
  }

  .template-editor__section-action-btn svg {
    width: 16px;
    height: 16px;
  }

  .template-editor__section-edit-form {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .template-editor__section-edit-title {
    font-family: var(--te-font);
    font-size: 0.9375rem;
    font-weight: 600;
    padding: 10px 14px;
    background: var(--te-surface);
    border: 1.5px solid var(--te-border);
    border-radius: 8px;
    color: var(--te-ink);
  }

  .template-editor__section-edit-title:focus {
    outline: none;
    border-color: #6366f1;
  }

  .template-editor__section-edit-content {
    font-family: var(--te-font);
    font-size: 0.875rem;
    padding: 10px 14px;
    background: var(--te-surface);
    border: 1.5px solid var(--te-border);
    border-radius: 8px;
    color: var(--te-ink);
    resize: vertical;
    min-height: 120px;
    line-height: 1.6;
  }

  .template-editor__section-edit-content:focus {
    outline: none;
    border-color: #6366f1;
  }

  .template-editor__section-edit-actions {
    display: flex;
    gap: 8px;
    justify-content: flex-end;
  }

  .template-editor__section-save-btn {
    padding: 8px 16px;
    font-family: var(--te-font);
    font-size: 0.8125rem;
    font-weight: 600;
    color: white;
    background: #6366f1;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.15s ease;
  }

  .template-editor__section-save-btn:hover {
    background: #4f46e5;
  }

  .template-editor__section-cancel-btn {
    padding: 8px 16px;
    font-family: var(--te-font);
    font-size: 0.8125rem;
    font-weight: 600;
    color: var(--te-ink-light);
    background: var(--te-surface);
    border: 1.5px solid var(--te-border);
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .template-editor__section-cancel-btn:hover {
    background: var(--te-surface-raised);
    border-color: var(--te-ink-muted);
  }

  .template-editor__section-add-form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 16px;
    background: var(--te-surface-raised);
    border: 1.5px dashed var(--te-border);
    border-radius: 12px;
  }

  .template-editor__section-new-title {
    font-family: var(--te-font);
    font-size: 0.9375rem;
    font-weight: 600;
    padding: 10px 14px;
    background: var(--te-surface);
    border: 1.5px solid var(--te-border-light);
    border-radius: 8px;
    color: var(--te-ink);
    transition: all 0.15s ease;
  }

  .template-editor__section-new-title:hover {
    border-color: var(--te-border);
  }

  .template-editor__section-new-title:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 3px #eef2ff;
  }

  .template-editor__section-new-title::placeholder {
    color: var(--te-ink-muted);
    font-weight: 400;
  }

  .template-editor__section-new-content {
    font-family: var(--te-font);
    font-size: 0.875rem;
    padding: 10px 14px;
    background: var(--te-surface);
    border: 1.5px solid var(--te-border-light);
    border-radius: 8px;
    color: var(--te-ink);
    resize: vertical;
    min-height: 100px;
    line-height: 1.6;
    transition: all 0.15s ease;
  }

  .template-editor__section-new-content:hover {
    border-color: var(--te-border);
  }

  .template-editor__section-new-content:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 3px #eef2ff;
  }

  .template-editor__section-new-content::placeholder {
    color: var(--te-ink-muted);
  }

  .template-editor__section-add-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 10px 20px;
    font-family: var(--te-font);
    font-size: 0.875rem;
    font-weight: 600;
    color: white;
    background: #6366f1;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    align-self: flex-start;
    transition: all 0.15s ease;
  }

  .template-editor__section-add-btn:hover:not(:disabled) {
    background: #4f46e5;
  }

  .template-editor__section-add-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .template-editor__section-add-btn svg {
    width: 16px;
    height: 16px;
  }

  /* Responsive */
  @media (max-width: 900px) {
    .template-editor__hero {
      grid-template-columns: 1fr;
    }

    .template-editor__thumbnail-area {
      flex-direction: row;
      align-items: flex-start;
    }

    .template-editor__thumbnail {
      width: 120px;
      height: 90px;
    }

    .template-editor__thumbnail-input {
      flex: 1;
    }

    .template-editor__grid {
      grid-template-columns: 1fr;
    }

    .template-editor__metadata {
      grid-template-columns: 1fr;
    }

    .template-editor__facets-grid {
      grid-template-columns: 1fr;
    }
  }
`;
