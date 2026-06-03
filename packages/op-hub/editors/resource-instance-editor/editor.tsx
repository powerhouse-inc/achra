import { useState, useCallback, useEffect } from "react";
import { generateId } from "document-model/core";
import { DocumentToolbar } from "@powerhousedao/design-system/connect";
import type { DocumentDispatch } from "@powerhousedao/reactor-browser";
import { useSelectedResourceInstanceDocument } from "../../document-models/resource-instance/v1/hooks.js";
import type {
  ResourceInstanceAction,
  ResourceInstanceDocument,
  InstanceStatus,
  SuspensionType,
} from "document-models/resource-instance";
import {
  initializeInstance,
  updateInstanceInfo,
  updateInstanceStatus,
  confirmInstance,
  reportProvisioningStarted,
  reportProvisioningCompleted,
  reportProvisioningFailed,
  activateInstance,
  suspendForNonPayment,
  suspendForMaintenance,
  suspendInstance,
  resumeAfterPayment,
  resumeAfterMaintenance,
  terminateInstance,
} from "../../document-models/resource-instance/v1/gen/instance-management/creators.js";
import {
  setInstanceFacet,
  removeInstanceFacet,
  updateInstanceFacet,
} from "../../document-models/resource-instance/v1/gen/configuration-management/creators.js";
import type { ViewMode } from "./types.js";
import { OperatorProfilePanel } from "./components/OperatorProfilePanel.js";
import { useSelectedDrive } from "@powerhousedao/reactor-browser";

export default function ResourceInstanceEditor() {
  const [document, dispatch] = useSelectedResourceInstanceDocument();
  const [mode, setMode] = useState<ViewMode>("client");

  const [selectedDrive] = useSelectedDrive();

  useEffect(() => {
    // Operator mode when this instance is opened from the Service Offering app
    // drive. Connect resolves a drive's app by matching `meta.preferredEditor`
    // against the editor module's `config.id` — which is "service-offering"
    // (see service-offering-app/module.ts). Accept the legacy "service-offering-app"
    // string too in case a drive was tagged with the directory name.
    const preferred = selectedDrive?.header.meta?.preferredEditor;
    if (preferred === "service-offering" || preferred === "service-offering-app") {
      setMode("operator");
    }
  }, [selectedDrive]);

  const handleImportData = useCallback(() => {
    // Initialize instance with sample data
    dispatch(
      initializeInstance({
        operatorId: "phd:operator-profile-123",
        operatorDocumentType: "powerhouse/builder-profile",
        description:
          "A sample resource instance populated with demo data for testing purposes.",
        customerId: "phd:customer-456",
        customerName: "Acme Corporation",
        resourceTemplateId: "phd:template-789",
        templateName: "Basic Hosting Plan",
        operatorName: "Jane Smith (Operator)",
        thumbnailUrl: "https://via.placeholder.com/150",
        infoLink: "https://example.com/resource-info",
      }),
    );

    // Add sample configuration facets
    dispatch(
      setInstanceFacet({
        id: generateId(),
        categoryKey: "region",
        categoryLabel: "Region",
        selectedOption: "us-east-1",
      }),
    );
    dispatch(
      setInstanceFacet({
        id: generateId(),
        categoryKey: "tier",
        categoryLabel: "Service Tier",
        selectedOption: "premium",
      }),
    );
    dispatch(
      setInstanceFacet({
        id: generateId(),
        categoryKey: "storage",
        categoryLabel: "Storage Size",
        selectedOption: "100GB",
      }),
    );
    dispatch(
      setInstanceFacet({
        id: generateId(),
        categoryKey: "backup",
        categoryLabel: "Backup Frequency",
        selectedOption: "daily",
      }),
    );
  }, [dispatch]);

  return (
    <div className="ri-editor" data-mode={mode}>
      <style>{editorStyles}</style>
      <DocumentToolbar />

      <div className="ri-editor__container">
        {/* Mode Toggle and Import Button */}
        <div className="ri-editor__header">
          {mode === "operator" && (
            <button
              type="button"
              className="ri-btn ri-btn--primary"
              onClick={handleImportData}
            >
              <svg
                className="ri-btn__icon"
                viewBox="0 0 20 20"
                fill="currentColor"
                width="16"
                height="16"
              >
                <path
                  fillRule="evenodd"
                  d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Import Data
            </button>
          )}
          {/* <ModeToggle mode={mode} onModeChange={setMode} /> */}
        </div>

        {/* Instance Header */}
        <InstanceHeader document={document} dispatch={dispatch} mode={mode} />

        {/* Main Content Grid */}
        <div className="ri-editor__grid">
          {/* Left Column */}
          <div className="ri-editor__main">
            <ConfigurationPanel
              document={document}
              dispatch={dispatch}
              mode={mode}
            />
            {mode === "operator" && (
              <LifecycleActionsPanel document={document} dispatch={dispatch} />
            )}
          </div>

          {/* Right Column */}
          <div className="ri-editor__sidebar">
            <OperatorProfilePanel
              document={document}
              dispatch={dispatch}
              mode={mode}
            />
            {document.state.global.status === "SUSPENDED" && (
              <SuspensionDetailsPanel document={document} />
            )}
            <LifecycleTimeline document={document} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Mode Toggle Component
// ============================================================

interface ModeToggleProps {
  mode: ViewMode;
  onModeChange: (mode: ViewMode) => void;
}

function ModeToggle({ mode, onModeChange }: ModeToggleProps) {
  return (
    <div className="ri-mode-toggle">
      <button
        type="button"
        className={`ri-mode-toggle__btn ${mode === "client" ? "ri-mode-toggle__btn--active" : ""}`}
        onClick={() => onModeChange("client")}
      >
        <svg
          className="ri-mode-toggle__icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
        Client
      </button>
      <button
        type="button"
        className={`ri-mode-toggle__btn ${mode === "operator" ? "ri-mode-toggle__btn--active" : ""}`}
        onClick={() => onModeChange("operator")}
      >
        <svg
          className="ri-mode-toggle__icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        Operator
      </button>
    </div>
  );
}

// ============================================================
// Status Badge Component
// ============================================================

const STATUS_CONFIG: Record<
  InstanceStatus,
  { label: string; className: string }
> = {
  DRAFT: { label: "Draft", className: "ri-badge--slate" },
  PROVISIONING: { label: "Provisioning", className: "ri-badge--sky" },
  ACTIVE: { label: "Active", className: "ri-badge--emerald" },
  SUSPENDED: { label: "Suspended", className: "ri-badge--amber" },
  TERMINATED: { label: "Terminated", className: "ri-badge--rose" },
};

const ALL_STATUSES: InstanceStatus[] = [
  "DRAFT",
  "PROVISIONING",
  "ACTIVE",
  "SUSPENDED",
  "TERMINATED",
];

function StatusBadge({ status }: { status: InstanceStatus }) {
  const config = STATUS_CONFIG[status];
  return <span className={`ri-badge ${config.className}`}>{config.label}</span>;
}

interface StatusSelectorProps {
  status: InstanceStatus;
  dispatch: DocumentDispatch<ResourceInstanceAction>;
  mode: ViewMode;
}

function StatusSelector({ status, dispatch, mode }: StatusSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleStatusChange = useCallback(
    (newStatus: InstanceStatus) => {
      if (newStatus !== status) {
        dispatch(updateInstanceStatus({ status: newStatus }));
      }
      setIsOpen(false);
    },
    [dispatch, status],
  );

  if (mode !== "operator") {
    return <StatusBadge status={status} />;
  }

  return (
    <div className="ri-status-selector">
      <button
        type="button"
        className={`ri-badge ${STATUS_CONFIG[status].className} ri-badge--clickable`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {STATUS_CONFIG[status].label}
        <svg
          className="ri-badge__chevron"
          viewBox="0 0 20 20"
          fill="currentColor"
          width="14"
          height="14"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {isOpen && (
        <>
          <div
            className="ri-status-selector__backdrop"
            onClick={() => setIsOpen(false)}
          />
          <div className="ri-status-selector__dropdown">
            {ALL_STATUSES.map((s) => (
              <button
                key={s}
                type="button"
                className={`ri-status-selector__option ${s === status ? "ri-status-selector__option--active" : ""}`}
                onClick={() => handleStatusChange(s)}
              >
                <span
                  className={`ri-status-selector__dot ri-status-selector__dot--${s.toLowerCase()}`}
                />
                {STATUS_CONFIG[s].label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ============================================================
// Instance Header Component
// ============================================================

interface InstanceHeaderProps {
  document: ResourceInstanceDocument;
  dispatch: DocumentDispatch<ResourceInstanceAction>;
  mode: ViewMode;
}

function InstanceHeader({ document, dispatch, mode }: InstanceHeaderProps) {
  const state = document.state.global;
  const [isEditing, setIsEditing] = useState(false);
  const [editDescription, setEditDescription] = useState(
    state.description || "",
  );

  const handleSave = useCallback(() => {
    dispatch(
      updateInstanceInfo({
        description: editDescription || undefined,
      }),
    );
    setIsEditing(false);
  }, [dispatch, editDescription]);

  return (
    <div className="ri-header">
      <div className="ri-header__main">
        <div className="ri-header__title-row">
          <div className="ri-header__info">
            {state.thumbnailUrl && (
              <img
                src={state.thumbnailUrl}
                alt=""
                className="ri-header__thumbnail"
              />
            )}
            <div>
              <h1 className="ri-header__title">
                {state.templateName || "Unnamed Instance"}
              </h1>
              {isEditing ? (
                <textarea
                  className="ri-input ri-input--textarea"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  placeholder="Description"
                  rows={2}
                />
              ) : (
                state.description && (
                  <p className="ri-header__subtitle">{state.description}</p>
                )
              )}
            </div>
          </div>
          <div className="ri-header__actions">
            <StatusSelector
              status={state.status}
              dispatch={dispatch}
              mode={mode}
            />
            {mode === "operator" && !isEditing && (
              <button
                type="button"
                className="ri-btn ri-btn--ghost ri-btn--sm"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
            )}
            {isEditing && (
              <>
                <button
                  type="button"
                  className="ri-btn ri-btn--ghost ri-btn--sm"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="ri-btn ri-btn--primary ri-btn--sm"
                  onClick={handleSave}
                >
                  Save
                </button>
              </>
            )}
          </div>
        </div>

        <div className="ri-header__meta">
          {state.customerId && mode === "operator" && (
            <div className="ri-header__meta-item">
              <span className="ri-header__meta-label">Customer</span>
              <span className="ri-header__meta-value">
                {state.customerName || (
                  <span className="ri-header__meta-value--mono">
                    {state.customerId}
                  </span>
                )}
              </span>
            </div>
          )}
          {state.resourceTemplateId && (
            <div className="ri-header__meta-item">
              <span className="ri-header__meta-label">Template</span>
              <span className="ri-header__meta-value">
                {state.templateName || (
                  <span className="ri-header__meta-value--mono">
                    {state.resourceTemplateId}
                  </span>
                )}
              </span>
            </div>
          )}
          {state.infoLink && (
            <div className="ri-header__meta-item">
              <span className="ri-header__meta-label">Info Link</span>
              <a
                href={state.infoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="ri-header__meta-value ri-header__meta-value--link"
              >
                View Info
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Configuration Panel Component
// ============================================================

interface ConfigurationPanelProps {
  document: ResourceInstanceDocument;
  dispatch: DocumentDispatch<ResourceInstanceAction>;
  mode: ViewMode;
}

function ConfigurationPanel({
  document,
  dispatch,
  mode,
}: ConfigurationPanelProps) {
  const facets = document.state.global.configuration;
  const [isAdding, setIsAdding] = useState(false);
  const [newFacet, setNewFacet] = useState({
    categoryKey: "",
    categoryLabel: "",
    selectedOption: "",
  });
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  const handleAddFacet = useCallback(() => {
    if (
      newFacet.categoryKey &&
      newFacet.categoryLabel &&
      newFacet.selectedOption
    ) {
      dispatch(
        setInstanceFacet({
          id: generateId(),
          categoryKey: newFacet.categoryKey,
          categoryLabel: newFacet.categoryLabel,
          selectedOption: newFacet.selectedOption,
        }),
      );
      setNewFacet({ categoryKey: "", categoryLabel: "", selectedOption: "" });
      setIsAdding(false);
    }
  }, [dispatch, newFacet]);

  const handleUpdateFacet = useCallback(
    (categoryKey: string) => {
      if (editValue) {
        dispatch(
          updateInstanceFacet({
            categoryKey,
            selectedOption: editValue,
          }),
        );
        setEditingKey(null);
        setEditValue("");
      }
    },
    [dispatch, editValue],
  );

  const handleRemoveFacet = useCallback(
    (categoryKey: string) => {
      dispatch(removeInstanceFacet({ categoryKey }));
    },
    [dispatch],
  );

  return (
    <div className="ri-panel">
      <div className="ri-panel__header">
        <h3 className="ri-panel__title">Configuration</h3>
        {mode === "operator" && (
          <button
            type="button"
            className="ri-btn ri-btn--primary ri-btn--sm"
            onClick={() => setIsAdding(true)}
          >
            Add Facet
          </button>
        )}
      </div>

      {isAdding && (
        <div className="ri-facet-form">
          <input
            type="text"
            className="ri-input"
            placeholder="Category Key"
            value={newFacet.categoryKey}
            onChange={(e) =>
              setNewFacet({ ...newFacet, categoryKey: e.target.value })
            }
          />
          <input
            type="text"
            className="ri-input"
            placeholder="Category Label"
            value={newFacet.categoryLabel}
            onChange={(e) =>
              setNewFacet({ ...newFacet, categoryLabel: e.target.value })
            }
          />
          <input
            type="text"
            className="ri-input"
            placeholder="Selected Option"
            value={newFacet.selectedOption}
            onChange={(e) =>
              setNewFacet({ ...newFacet, selectedOption: e.target.value })
            }
          />
          <div className="ri-facet-form__actions">
            <button
              type="button"
              className="ri-btn ri-btn--ghost ri-btn--sm"
              onClick={() => setIsAdding(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="ri-btn ri-btn--primary ri-btn--sm"
              onClick={handleAddFacet}
            >
              Add
            </button>
          </div>
        </div>
      )}

      {facets.length === 0 ? (
        <div className="ri-empty">
          <div className="ri-empty__icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <p className="ri-empty__text">No configuration facets</p>
        </div>
      ) : (
        <div className="ri-config-list">
          {facets.map((facet) => (
            <div key={facet.categoryKey} className="ri-config-item">
              <div className="ri-config-item__info">
                <span className="ri-config-item__label">
                  {facet.categoryLabel}
                </span>
                <span className="ri-config-item__key">{facet.categoryKey}</span>
              </div>
              {editingKey === facet.categoryKey ? (
                <div className="ri-config-item__edit">
                  <input
                    type="text"
                    className="ri-input ri-input--sm"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                  />
                  <button
                    type="button"
                    className="ri-btn ri-btn--ghost ri-btn--xs"
                    onClick={() => setEditingKey(null)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="ri-btn ri-btn--primary ri-btn--xs"
                    onClick={() => handleUpdateFacet(facet.categoryKey)}
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div className="ri-config-item__value-row">
                  <span className="ri-config-item__value">
                    {facet.selectedOption}
                  </span>
                  {mode === "operator" && (
                    <div className="ri-config-item__actions">
                      <button
                        type="button"
                        className="ri-btn ri-btn--ghost ri-btn--xs"
                        onClick={() => {
                          setEditingKey(facet.categoryKey);
                          setEditValue(facet.selectedOption);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="ri-btn ri-btn--ghost ri-btn--xs ri-btn--danger"
                        onClick={() => handleRemoveFacet(facet.categoryKey)}
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================================
// Lifecycle Actions Panel Component (Operator Only)
// ============================================================

interface LifecycleActionsPanelProps {
  document: ResourceInstanceDocument;
  dispatch: DocumentDispatch<ResourceInstanceAction>;
}

function LifecycleActionsPanel({
  document,
  dispatch,
}: LifecycleActionsPanelProps) {
  const state = document.state.global;
  const [modalAction, setModalAction] = useState<string | null>(null);
  const [reason, setReason] = useState("");

  const handleAction = useCallback(
    (action: string) => {
      const now = new Date().toISOString();
      switch (action) {
        case "confirm":
          dispatch(confirmInstance({ confirmedAt: now }));
          break;
        case "startProvisioning":
          dispatch(reportProvisioningStarted({ startedAt: now }));
          break;
        case "completeProvisioning":
          dispatch(reportProvisioningCompleted({ completedAt: now }));
          break;
        case "failProvisioning":
          dispatch(
            reportProvisioningFailed({ failedAt: now, failureReason: reason }),
          );
          break;
        case "activate":
          dispatch(activateInstance({ activatedAt: now }));
          break;
        case "suspendNonPayment":
          dispatch(suspendForNonPayment({ suspendedAt: now }));
          break;
        case "suspendMaintenance":
          dispatch(suspendForMaintenance({ suspendedAt: now }));
          break;
        case "suspendOther":
          dispatch(
            suspendInstance({ suspendedAt: now, reason: reason || undefined }),
          );
          break;
        case "resumePayment":
          dispatch(resumeAfterPayment({ resumedAt: now }));
          break;
        case "resumeMaintenance":
          dispatch(resumeAfterMaintenance({ resumedAt: now }));
          break;
        case "terminate":
          dispatch(terminateInstance({ terminatedAt: now, reason }));
          break;
      }
      setModalAction(null);
      setReason("");
    },
    [dispatch, reason],
  );

  const getAvailableActions = () => {
    const actions: Array<{
      id: string;
      label: string;
      variant: string;
      needsReason?: boolean;
    }> = [];

    switch (state.status) {
      case "DRAFT":
        if (!state.confirmedAt) {
          actions.push({
            id: "confirm",
            label: "Confirm Instance",
            variant: "primary",
          });
        } else if (!state.provisioningStartedAt) {
          actions.push({
            id: "startProvisioning",
            label: "Start Provisioning",
            variant: "primary",
          });
        }
        break;
      case "PROVISIONING":
        actions.push({
          id: "completeProvisioning",
          label: "Complete Provisioning",
          variant: "success",
        });
        actions.push({
          id: "failProvisioning",
          label: "Report Failure",
          variant: "danger",
          needsReason: true,
        });
        break;
      case "ACTIVE":
        actions.push({
          id: "suspendNonPayment",
          label: "Suspend (Non-Payment)",
          variant: "warning",
        });
        actions.push({
          id: "suspendMaintenance",
          label: "Suspend (Maintenance)",
          variant: "warning",
        });
        actions.push({
          id: "suspendOther",
          label: "Suspend (Other)",
          variant: "warning",
          needsReason: true,
        });
        actions.push({
          id: "terminate",
          label: "Terminate",
          variant: "danger",
          needsReason: true,
        });
        break;
      case "SUSPENDED":
        if (state.suspensionType === "NON_PAYMENT") {
          actions.push({
            id: "resumePayment",
            label: "Resume (Payment Received)",
            variant: "success",
          });
        } else if (state.suspensionType === "MAINTENANCE") {
          actions.push({
            id: "resumeMaintenance",
            label: "Resume (Maintenance Complete)",
            variant: "success",
          });
        } else {
          actions.push({
            id: "resumePayment",
            label: "Resume",
            variant: "success",
          });
        }
        actions.push({
          id: "terminate",
          label: "Terminate",
          variant: "danger",
          needsReason: true,
        });
        break;
    }

    // If draft but confirmed and provisioning completed, allow activation
    if (
      state.status === "DRAFT" &&
      state.provisioningCompletedAt &&
      !state.activatedAt
    ) {
      actions.push({
        id: "activate",
        label: "Activate Instance",
        variant: "success",
      });
    }

    return actions;
  };

  const actions = getAvailableActions();

  if (state.status === "TERMINATED" || actions.length === 0) {
    return null;
  }

  return (
    <div className="ri-panel">
      <div className="ri-panel__header">
        <h3 className="ri-panel__title">Lifecycle Actions</h3>
      </div>

      <div className="ri-actions__grid">
        {actions.map((action) => (
          <button
            key={action.id}
            type="button"
            className={`ri-btn ri-btn--${action.variant}`}
            onClick={() =>
              action.needsReason
                ? setModalAction(action.id)
                : handleAction(action.id)
            }
          >
            {action.label}
          </button>
        ))}
      </div>

      {/* Modal for actions requiring reason */}
      {modalAction && (
        <div className="ri-modal-overlay" onClick={() => setModalAction(null)}>
          <div className="ri-modal" onClick={(e) => e.stopPropagation()}>
            <h4 className="ri-modal__title">
              {modalAction === "terminate"
                ? "Terminate Instance"
                : modalAction === "failProvisioning"
                  ? "Report Provisioning Failure"
                  : "Suspend Instance"}
            </h4>
            <p className="ri-modal__message">Please provide a reason:</p>
            <textarea
              className="ri-input ri-input--textarea"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Enter reason..."
              rows={3}
            />
            <div className="ri-modal__actions">
              <button
                type="button"
                className="ri-btn ri-btn--ghost"
                onClick={() => setModalAction(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className={`ri-btn ri-btn--${modalAction === "terminate" || modalAction === "failProvisioning" ? "danger" : "warning"}`}
                onClick={() => handleAction(modalAction)}
                disabled={!reason}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================
// Suspension Details Panel Component
// ============================================================

function SuspensionDetailsPanel({
  document,
}: {
  document: ResourceInstanceDocument;
}) {
  const state = document.state.global;

  const formatSuspensionType = (type: SuspensionType | null | undefined) => {
    if (!type) return "Unknown";
    const labels: Record<SuspensionType, string> = {
      NON_PAYMENT: "Non-Payment",
      MAINTENANCE: "Maintenance",
      OTHER: "Other",
    };
    return labels[type] || type;
  };

  return (
    <div className="ri-panel ri-panel--warning">
      <div className="ri-panel__header">
        <h3 className="ri-panel__title">Suspension Details</h3>
      </div>

      <div className="ri-suspension">
        <div className="ri-suspension__item">
          <span className="ri-suspension__label">Type</span>
          <span className="ri-suspension__value">
            {formatSuspensionType(state.suspensionType)}
          </span>
        </div>
        {state.suspensionReason && (
          <div className="ri-suspension__item">
            <span className="ri-suspension__label">Reason</span>
            <span className="ri-suspension__value">
              {state.suspensionReason}
            </span>
          </div>
        )}
        {state.suspensionDetails && (
          <div className="ri-suspension__item">
            <span className="ri-suspension__label">Details</span>
            <span className="ri-suspension__value">
              {state.suspensionDetails}
            </span>
          </div>
        )}
        {state.suspendedAt && (
          <div className="ri-suspension__item">
            <span className="ri-suspension__label">Suspended At</span>
            <span className="ri-suspension__value">
              {formatDate(state.suspendedAt)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================
// Lifecycle Timeline Component
// ============================================================

function LifecycleTimeline({
  document,
}: {
  document: ResourceInstanceDocument;
}) {
  const state = document.state.global;

  const events: Array<{
    label: string;
    date: string | null | undefined;
    variant: string;
  }> = [];

  if (state.confirmedAt) {
    events.push({
      label: "Confirmed",
      date: state.confirmedAt,
      variant: "normal",
    });
  }
  if (state.provisioningStartedAt) {
    events.push({
      label: "Provisioning Started",
      date: state.provisioningStartedAt,
      variant: "normal",
    });
  }
  if (state.provisioningCompletedAt) {
    events.push({
      label: "Provisioning Completed",
      date: state.provisioningCompletedAt,
      variant: "success",
    });
  }
  if (state.provisioningFailureReason) {
    events.push({
      label: `Provisioning Failed: ${state.provisioningFailureReason}`,
      date: null,
      variant: "danger",
    });
  }
  if (state.activatedAt) {
    events.push({
      label: "Activated",
      date: state.activatedAt,
      variant: "success",
    });
  }
  if (state.suspendedAt) {
    events.push({
      label: `Suspended (${state.suspensionType || "Unknown"})`,
      date: state.suspendedAt,
      variant: "warning",
    });
  }
  if (state.resumedAt) {
    events.push({
      label: "Resumed",
      date: state.resumedAt,
      variant: "success",
    });
  }
  if (state.terminatedAt) {
    events.push({
      label: "Terminated",
      date: state.terminatedAt,
      variant: "danger",
    });
  }

  return (
    <div className="ri-panel ri-panel--compact">
      <div className="ri-panel__header">
        <h3 className="ri-panel__title">Lifecycle Timeline</h3>
      </div>

      {events.length === 0 ? (
        <div className="ri-empty ri-empty--sm">
          <p className="ri-empty__text">No lifecycle events yet</p>
        </div>
      ) : (
        <div className="ri-timeline">
          {events.map((event, index) => (
            <div
              key={index}
              className={`ri-timeline__event ri-timeline__event--${event.variant}`}
            >
              <div className="ri-timeline__dot" />
              {index < events.length - 1 && (
                <div className="ri-timeline__line" />
              )}
              <div className="ri-timeline__content">
                <span className="ri-timeline__label">{event.label}</span>
                {event.date && (
                  <span className="ri-timeline__date">
                    {formatDate(event.date)}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================================
// Utility Functions
// ============================================================

function formatDate(date: string | null | undefined) {
  if (!date) return "—";
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// ============================================================
// Editor Styles
// ============================================================

const editorStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

  .ri-editor {
    --ri-font-sans: 'Inter', system-ui, sans-serif;
    --ri-font-mono: 'SF Mono', 'Monaco', 'Inconsolata', monospace;

    /* Colors */
    --ri-slate-50: #f8fafc;
    --ri-slate-100: #f1f5f9;
    --ri-slate-200: #e2e8f0;
    --ri-slate-300: #cbd5e1;
    --ri-slate-400: #94a3b8;
    --ri-slate-500: #64748b;
    --ri-slate-600: #475569;
    --ri-slate-700: #334155;
    --ri-slate-800: #1e293b;
    --ri-slate-900: #0f172a;

    --ri-emerald-50: #ecfdf5;
    --ri-emerald-100: #d1fae5;
    --ri-emerald-500: #10b981;
    --ri-emerald-600: #059669;
    --ri-emerald-700: #047857;

    --ri-amber-50: #fffbeb;
    --ri-amber-100: #fef3c7;
    --ri-amber-500: #f59e0b;
    --ri-amber-600: #d97706;
    --ri-amber-700: #b45309;

    --ri-rose-50: #fff1f2;
    --ri-rose-100: #ffe4e6;
    --ri-rose-500: #f43f5e;
    --ri-rose-600: #e11d48;
    --ri-rose-700: #be123c;

    --ri-sky-50: #f0f9ff;
    --ri-sky-100: #e0f2fe;
    --ri-sky-500: #0ea5e9;
    --ri-sky-600: #0284c7;

    /* Spacing */
    --ri-radius-sm: 6px;
    --ri-radius-md: 8px;
    --ri-radius-lg: 12px;

    /* Shadows */
    --ri-shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
    --ri-shadow-md: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1);
    --ri-shadow-lg: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1);

    /* Transitions */
    --ri-transition-fast: 150ms ease;
    --ri-transition-base: 200ms ease;

    font-family: var(--ri-font-sans);
    background: var(--ri-slate-50);
    min-height: 100%;
    overflow-y: auto;
  }

  .ri-editor__container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 24px 32px 48px;
  }

  .ri-editor__header {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 16px;
    margin-bottom: 24px;
  }

  .ri-editor__grid {
    display: grid;
    grid-template-columns: 1fr 380px;
    gap: 24px;
    margin-top: 24px;
  }

  @media (max-width: 1024px) {
    .ri-editor__grid {
      grid-template-columns: 1fr;
    }
  }

  .ri-editor__main {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .ri-editor__sidebar {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  /* Empty State */
  .ri-empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    text-align: center;
    padding: 48px;
  }

  .ri-empty-state__icon {
    width: 64px;
    height: 64px;
    color: var(--ri-slate-300);
    margin-bottom: 16px;
  }

  .ri-empty-state__icon svg {
    width: 100%;
    height: 100%;
  }

  .ri-empty-state__title {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--ri-slate-700);
    margin: 0 0 8px;
  }

  .ri-empty-state__subtitle {
    font-size: 0.875rem;
    color: var(--ri-slate-500);
    margin: 0;
  }

  /* Mode Toggle */
  .ri-mode-toggle {
    display: inline-flex;
    background: var(--ri-slate-100);
    border-radius: var(--ri-radius-lg);
    padding: 4px;
    gap: 4px;
  }

  .ri-mode-toggle__btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    font-family: var(--ri-font-sans);
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--ri-slate-600);
    background: transparent;
    border: none;
    border-radius: var(--ri-radius-md);
    cursor: pointer;
    transition: all var(--ri-transition-fast);
  }

  .ri-mode-toggle__btn:hover {
    color: var(--ri-slate-800);
  }

  .ri-mode-toggle__btn--active {
    background: white;
    color: var(--ri-slate-900);
    box-shadow: var(--ri-shadow-sm);
  }

  .ri-mode-toggle__icon {
    width: 18px;
    height: 18px;
  }

  /* Header */
  .ri-header {
    background: white;
    border-radius: var(--ri-radius-lg);
    padding: 24px;
    box-shadow: var(--ri-shadow-sm);
    border: 1px solid var(--ri-slate-200);
  }

  .ri-header__main {
    margin-bottom: 0;
  }

  .ri-header__title-row {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 16px;
  }

  .ri-header__info {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .ri-header__thumbnail {
    width: 48px;
    height: 48px;
    border-radius: var(--ri-radius-md);
    object-fit: cover;
  }

  .ri-header__title {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--ri-slate-900);
    margin: 0;
  }

  .ri-header__subtitle {
    font-size: 0.875rem;
    color: var(--ri-slate-500);
    margin: 4px 0 0;
  }

  .ri-header__actions {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .ri-header__meta {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
  }

  .ri-header__meta-item {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .ri-header__meta-label {
    font-size: 0.75rem;
    font-weight: 500;
    color: var(--ri-slate-500);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .ri-header__meta-value {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--ri-slate-800);
  }

  .ri-header__meta-value--mono {
    font-family: var(--ri-font-mono);
    font-size: 0.8125rem;
  }

  .ri-header__meta-value--link {
    color: var(--ri-sky-600);
    text-decoration: none;
  }

  .ri-header__meta-value--link:hover {
    text-decoration: underline;
  }

  /* Badges */
  .ri-badge {
    display: inline-flex;
    align-items: center;
    padding: 4px 10px;
    font-size: 0.75rem;
    font-weight: 600;
    border-radius: 100px;
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }

  .ri-badge--emerald {
    background: var(--ri-emerald-100);
    color: var(--ri-emerald-700);
  }

  .ri-badge--amber {
    background: var(--ri-amber-100);
    color: var(--ri-amber-700);
  }

  .ri-badge--rose {
    background: var(--ri-rose-100);
    color: var(--ri-rose-700);
  }

  .ri-badge--sky {
    background: var(--ri-sky-100);
    color: var(--ri-sky-600);
  }

  .ri-badge--slate {
    background: var(--ri-slate-100);
    color: var(--ri-slate-600);
  }

  .ri-badge--clickable {
    cursor: pointer;
    gap: 4px;
    border: none;
    font-family: var(--ri-font-sans);
    transition: all var(--ri-transition-fast);
  }

  .ri-badge--clickable:hover {
    filter: brightness(0.95);
  }

  .ri-badge__chevron {
    margin-left: 2px;
  }

  /* Status Selector */
  .ri-status-selector {
    position: relative;
  }

  .ri-status-selector__backdrop {
    position: fixed;
    inset: 0;
    z-index: 99;
  }

  .ri-status-selector__dropdown {
    position: absolute;
    top: calc(100% + 4px);
    right: 0;
    background: white;
    border-radius: var(--ri-radius-md);
    box-shadow: var(--ri-shadow-lg);
    border: 1px solid var(--ri-slate-200);
    padding: 4px;
    z-index: 100;
    min-width: 160px;
  }

  .ri-status-selector__option {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    padding: 8px 12px;
    font-family: var(--ri-font-sans);
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--ri-slate-700);
    background: transparent;
    border: none;
    border-radius: var(--ri-radius-sm);
    cursor: pointer;
    text-align: left;
    transition: background var(--ri-transition-fast);
  }

  .ri-status-selector__option:hover {
    background: var(--ri-slate-100);
  }

  .ri-status-selector__option--active {
    background: var(--ri-slate-100);
    color: var(--ri-slate-900);
  }

  .ri-status-selector__dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .ri-status-selector__dot--draft {
    background: var(--ri-slate-400);
  }

  .ri-status-selector__dot--provisioning {
    background: var(--ri-sky-500);
  }

  .ri-status-selector__dot--active {
    background: var(--ri-emerald-500);
  }

  .ri-status-selector__dot--suspended {
    background: var(--ri-amber-500);
  }

  .ri-status-selector__dot--terminated {
    background: var(--ri-rose-500);
  }

  /* Panel */
  .ri-panel {
    background: white;
    border-radius: var(--ri-radius-lg);
    padding: 24px;
    box-shadow: var(--ri-shadow-sm);
    border: 1px solid var(--ri-slate-200);
  }

  .ri-panel--compact {
    padding: 20px;
  }

  .ri-panel--warning {
    border-color: var(--ri-amber-500);
    background: var(--ri-amber-50);
  }

  .ri-panel__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .ri-panel__title {
    font-size: 1rem;
    font-weight: 600;
    color: var(--ri-slate-900);
    margin: 0;
  }

  /* Empty State within panel */
  .ri-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 32px;
    text-align: center;
  }

  .ri-empty--sm {
    padding: 16px;
  }

  .ri-empty__icon {
    width: 48px;
    height: 48px;
    color: var(--ri-slate-300);
    margin-bottom: 12px;
  }

  .ri-empty__icon svg {
    width: 100%;
    height: 100%;
  }

  .ri-empty__text {
    font-size: 0.875rem;
    color: var(--ri-slate-500);
    margin: 0;
  }

  /* Buttons */
  .ri-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 10px 16px;
    font-family: var(--ri-font-sans);
    font-size: 0.875rem;
    font-weight: 500;
    border-radius: var(--ri-radius-md);
    border: none;
    cursor: pointer;
    transition: all var(--ri-transition-fast);
  }

  .ri-btn--sm {
    padding: 6px 12px;
    font-size: 0.8125rem;
  }

  .ri-btn--xs {
    padding: 4px 8px;
    font-size: 0.75rem;
  }

  .ri-btn--primary {
    background: var(--ri-sky-600);
    color: white;
  }

  .ri-btn--primary:hover {
    background: var(--ri-sky-500);
  }

  .ri-btn--success {
    background: var(--ri-emerald-600);
    color: white;
  }

  .ri-btn--success:hover {
    background: var(--ri-emerald-500);
  }

  .ri-btn--warning {
    background: var(--ri-amber-500);
    color: white;
  }

  .ri-btn--warning:hover {
    background: var(--ri-amber-600);
  }

  .ri-btn--danger {
    background: var(--ri-rose-600);
    color: white;
  }

  .ri-btn--danger:hover {
    background: var(--ri-rose-500);
  }

  .ri-btn--ghost {
    background: transparent;
    color: var(--ri-slate-600);
  }

  .ri-btn--ghost:hover {
    background: var(--ri-slate-100);
    color: var(--ri-slate-800);
  }

  .ri-btn--ghost.ri-btn--danger {
    background: transparent;
    color: var(--ri-rose-600);
  }

  .ri-btn--ghost.ri-btn--danger:hover {
    background: var(--ri-rose-50);
  }

  .ri-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Input */
  .ri-input {
    width: 100%;
    padding: 10px 12px;
    font-family: var(--ri-font-sans);
    font-size: 0.875rem;
    color: var(--ri-slate-800);
    background: white;
    border: 1px solid var(--ri-slate-300);
    border-radius: var(--ri-radius-md);
    transition: border-color var(--ri-transition-fast);
  }

  .ri-input:focus {
    outline: none;
    border-color: var(--ri-sky-500);
  }

  .ri-input--sm {
    padding: 6px 10px;
    font-size: 0.8125rem;
  }

  .ri-input--title {
    font-size: 1.25rem;
    font-weight: 600;
    padding: 8px 12px;
  }

  .ri-input--textarea {
    resize: vertical;
    min-height: 60px;
  }

  /* Configuration */
  .ri-config-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .ri-config-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    background: var(--ri-slate-50);
    border-radius: var(--ri-radius-md);
    border: 1px solid var(--ri-slate-200);
  }

  .ri-config-item__info {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .ri-config-item__label {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--ri-slate-800);
  }

  .ri-config-item__key {
    font-size: 0.75rem;
    font-family: var(--ri-font-mono);
    color: var(--ri-slate-500);
  }

  .ri-config-item__value-row {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .ri-config-item__value {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--ri-emerald-600);
  }

  .ri-config-item__actions {
    display: flex;
    gap: 4px;
    opacity: 0;
    transition: opacity var(--ri-transition-fast);
  }

  .ri-config-item:hover .ri-config-item__actions {
    opacity: 1;
  }

  .ri-config-item__edit {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .ri-facet-form {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 16px;
    background: var(--ri-slate-50);
    border-radius: var(--ri-radius-md);
    margin-bottom: 16px;
  }

  .ri-facet-form__actions {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
  }

  /* Actions Grid */
  .ri-actions__grid {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }

  /* Profile */
  .ri-profile {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .ri-profile__item {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .ri-profile__label {
    font-size: 0.75rem;
    font-weight: 500;
    color: var(--ri-slate-500);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .ri-profile__value {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--ri-slate-800);
  }

  .ri-profile__value--mono {
    font-family: var(--ri-font-mono);
    font-size: 0.8125rem;
  }

  .ri-profile__value--capitalize {
    text-transform: capitalize;
  }

  /* Suspension */
  .ri-suspension {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .ri-suspension__item {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .ri-suspension__label {
    font-size: 0.75rem;
    font-weight: 500;
    color: var(--ri-amber-700);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .ri-suspension__value {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--ri-slate-800);
  }

  /* Timeline */
  .ri-timeline {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .ri-timeline__event {
    display: flex;
    gap: 12px;
    position: relative;
    padding-bottom: 16px;
  }

  .ri-timeline__event:last-child {
    padding-bottom: 0;
  }

  .ri-timeline__dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: var(--ri-slate-400);
    flex-shrink: 0;
    margin-top: 4px;
  }

  .ri-timeline__event--success .ri-timeline__dot {
    background: var(--ri-emerald-500);
  }

  .ri-timeline__event--warning .ri-timeline__dot {
    background: var(--ri-amber-500);
  }

  .ri-timeline__event--danger .ri-timeline__dot {
    background: var(--ri-rose-500);
  }

  .ri-timeline__line {
    position: absolute;
    left: 5px;
    top: 16px;
    width: 2px;
    height: calc(100% - 12px);
    background: var(--ri-slate-200);
  }

  .ri-timeline__content {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .ri-timeline__label {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--ri-slate-800);
  }

  .ri-timeline__date {
    font-size: 0.75rem;
    color: var(--ri-slate-500);
  }

  /* Modal */
  .ri-modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  .ri-modal {
    background: white;
    border-radius: var(--ri-radius-lg);
    padding: 24px;
    width: 100%;
    max-width: 400px;
    box-shadow: var(--ri-shadow-lg);
  }

  .ri-modal__title {
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--ri-slate-900);
    margin: 0 0 8px;
  }

  .ri-modal__message {
    font-size: 0.875rem;
    color: var(--ri-slate-600);
    margin: 0 0 16px;
  }

  .ri-modal__actions {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    margin-top: 20px;
  }

  /* Profile Selector */
  .ri-profile-selector {
    margin-bottom: 16px;
    padding: 12px;
    background: var(--ri-slate-50);
    border-radius: var(--ri-radius-md);
    border: 1px solid var(--ri-slate-200);
  }

  .ri-profile-selector__loading,
  .ri-profile-selector__empty {
    font-size: 0.8125rem;
    color: var(--ri-slate-500);
    text-align: center;
    margin: 0;
    padding: 8px 0;
  }

  .ri-profile-selector__list {
    display: flex;
    flex-direction: column;
    gap: 4px;
    max-height: 240px;
    overflow-y: auto;
  }

  .ri-profile-selector__item {
    display: flex;
    flex-direction: column;
    gap: 2px;
    width: 100%;
    padding: 8px 12px;
    font-family: var(--ri-font-sans);
    background: transparent;
    border: 1px solid transparent;
    border-radius: var(--ri-radius-sm);
    cursor: pointer;
    text-align: left;
    transition: all var(--ri-transition-fast);
  }

  .ri-profile-selector__item:hover {
    background: white;
    border-color: var(--ri-slate-200);
  }

  .ri-profile-selector__item--active {
    background: white;
    border-color: var(--ri-sky-500);
  }

  .ri-profile-selector__name {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--ri-slate-800);
  }

  .ri-profile-selector__phid {
    font-size: 0.6875rem;
    font-family: var(--ri-font-mono);
    color: var(--ri-slate-400);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;
