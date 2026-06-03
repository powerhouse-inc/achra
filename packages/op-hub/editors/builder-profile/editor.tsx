import { TextInput, Textarea } from "@powerhousedao/document-engineering";
import { Settings, FileText, Info, X, Building2 } from "lucide-react";
import { DocumentToolbar } from "@powerhousedao/design-system/connect";
import { actions } from "document-models/builder-profile";
import type { SetOpHubMemberInput } from "document-models/builder-profile/v1";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSelectedBuilderProfileDocument } from "document-models/builder-profile";
import {
  setSelectedNode,
  useParentFolderForSelectedNode,
  usePHToast,
} from "@powerhousedao/reactor-browser";
import type {
  BuilderSkill,
  BuilderScope,
  BuilderStatus,
} from "document-models/builder-profile/v1";
import { SkillsSection } from "./components/SkillsSection.js";
import { ScopesSection } from "./components/ScopesSection.js";
import { LinksSection } from "./components/LinksSection.js";
import { ContributorsSection } from "./components/ContributorsSection.js";
import { ProfilePreview } from "./components/ProfilePreview.js";
import { ImageUrlInput } from "./components/ImageUrlInput.js";
import { MarkdownEditor } from "./components/markdown-editor.js";
const operatorIconUrl = new URL("./assets/operator-icon.png", import.meta.url)
  .href;

const STATUS_OPTIONS: {
  value: BuilderStatus;
  label: string;
  color: string;
}[] = [
  { value: "ACTIVE", label: "Active", color: "bg-emerald-500" },
  { value: "INACTIVE", label: "Inactive", color: "bg-slate-400" },
  { value: "ON_HOLD", label: "On Hold", color: "bg-amber-500" },
  { value: "COMPLETED", label: "Completed", color: "bg-sky-500" },
  { value: "ARCHIVED", label: "Archived", color: "bg-slate-300" },
];

const DESCRIPTION_MAX_LENGTH = 350;

export default function Editor() {
  const [doc, dispatch] = useSelectedBuilderProfileDocument();
  const state = doc?.state.global;
  const toast = usePHToast();

  const parentFolder = useParentFolderForSelectedNode();

  function handleClose() {
    setSelectedNode(parentFolder?.id);
  }

  const idGeneratedRef = useRef(false);
  const [descriptionValue, setDescriptionValue] = useState(
    state?.description || "",
  );
  const [showRoleDialog, setShowRoleDialog] = useState(false);
  const [pendingRoleChange, setPendingRoleChange] = useState<boolean | null>(
    null,
  );

  // Sync description state when document changes
  useEffect(() => {
    setDescriptionValue(state?.description || "");
  }, [state?.description]);

  // Auto-generate ID if not present (only once)
  useEffect(() => {
    if (!state?.id && !idGeneratedRef.current && dispatch) {
      idGeneratedRef.current = true;
      dispatch(
        actions.updateProfile({
          id: doc.header.id,
        }),
      );
    }
  }, [state?.id, dispatch, doc?.header.id]);

  // Generate slug from name
  const generateSlug = useCallback((name: string) => {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
  }, []);

  // Handle basic profile field changes
  const handleFieldChange = useCallback(
    (field: string, value: string | null) => {
      if (!dispatch) {
        toast?.(`Failed to update ${field} - no dispatch function`, {
          type: "error",
        });
        return;
      }

      if (field === "name" && value && value.trim()) {
        const slug = generateSlug(value);
        dispatch(actions.updateProfile({ name: value, slug }));
      } else {
        dispatch(actions.updateProfile({ [field]: value }));
      }
    },
    [dispatch, generateSlug],
  );

  // Handle status change
  const handleStatusChange = useCallback(
    (status: BuilderStatus) => {
      if (!dispatch) return;
      dispatch(actions.updateProfile({ status }));
    },
    [dispatch],
  );

  // Skill handlers
  const handleAddSkill = useCallback(
    (skill: BuilderSkill) => {
      if (!dispatch) return;
      dispatch(actions.addSkill({ skill }));
    },
    [dispatch],
  );

  const handleRemoveSkill = useCallback(
    (skill: BuilderSkill) => {
      if (!dispatch) return;
      dispatch(actions.removeSkill({ skill }));
    },
    [dispatch],
  );

  // Scope handlers
  const handleAddScope = useCallback(
    (scope: BuilderScope) => {
      if (!dispatch) return;
      dispatch(actions.addScope({ scope }));
    },
    [dispatch],
  );

  const handleRemoveScope = useCallback(
    (scope: BuilderScope) => {
      if (!dispatch) return;
      dispatch(actions.removeScope({ scope }));
    },
    [dispatch],
  );

  // Link handlers
  const handleAddLink = useCallback(
    (link: { id: string; url: string; label?: string }) => {
      if (!dispatch) return;
      dispatch(
        actions.addLink({ id: link.id, url: link.url, label: link.label }),
      );
    },
    [dispatch],
  );

  const handleEditLink = useCallback(
    (link: { id: string; url: string; label?: string }) => {
      if (!dispatch) return;
      dispatch(
        actions.editLink({ id: link.id, url: link.url, label: link.label }),
      );
    },
    [dispatch],
  );

  const handleRemoveLink = useCallback(
    (id: string) => {
      if (!dispatch) return;
      dispatch(actions.removeLink({ id }));
    },
    [dispatch],
  );

  // Contributor handlers
  const handleAddContributor = useCallback(
    (contributorPHID: string) => {
      if (!dispatch) return;
      dispatch(actions.addContributor({ contributorPHID }));
    },
    [dispatch],
  );

  const handleRemoveContributor = useCallback(
    (contributorPHID: string) => {
      if (!dispatch) return;
      dispatch(actions.removeContributor({ contributorPHID }));
    },
    [dispatch],
  );

  // Operator handler - shows confirmation dialog
  const handleSetOperator = useCallback(
    (isOperator: boolean) => {
      if (!dispatch) return;
      // If trying to change role, show confirmation dialog
      if (state?.isOperator !== isOperator) {
        setPendingRoleChange(isOperator);
        setShowRoleDialog(true);
      }
    },
    [dispatch, state?.isOperator],
  );

  // Operational Hub Member handler
  const handleSetOpHubMember = useCallback(
    (input: SetOpHubMemberInput) => {
      if (!dispatch) return;
      dispatch(actions.setOpHubMember(input));
    },
    [dispatch],
  );

  // Confirm role change after dialog
  const confirmRoleChange = useCallback(() => {
    if (!dispatch || pendingRoleChange === null) return;
    dispatch(actions.setOperator({ isOperator: pendingRoleChange }));
    setShowRoleDialog(false);
    setPendingRoleChange(null);
    toast?.(
      `Switched to ${pendingRoleChange ? "Operator" : "Builder"} profile`,
      { type: "success" },
    );
  }, [dispatch, pendingRoleChange]);

  // Cancel role change
  const cancelRoleChange = useCallback(() => {
    setShowRoleDialog(false);
    setPendingRoleChange(null);
  }, []);

  // Dynamic role label based on isOperator flag
  const roleLabel = state?.isOperator ? "Operator" : "Builder";

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <style>
        {`
          .builder-editor input, .builder-editor textarea, .builder-editor select {
            font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          }
          .builder-editor .section-card {
            background: white;
            border: 1px solid rgba(0, 0, 0, 0.06);
            border-radius: 16px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04), 0 4px 12px rgba(0, 0, 0, 0.02);
            transition: box-shadow 0.2s ease, transform 0.2s ease;
          }
          .builder-editor .section-card:hover {
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06), 0 8px 24px rgba(0, 0, 0, 0.04);
          }
          .builder-editor .field-label {
            font-size: 0.8125rem;
            font-weight: 600;
            color: #374151;
            letter-spacing: -0.01em;
            margin-bottom: 0.5rem;
            display: block;
          }
          .builder-editor .field-hint {
            font-size: 0.75rem;
            color: #9CA3AF;
            margin-top: 0.375rem;
            letter-spacing: -0.01em;
          }
          .builder-editor .meta-value {
            font-family: 'SF Mono', 'Monaco', 'Inconsolata', monospace;
            font-size: 0.8125rem;
            color: #6B7280;
            background: #F9FAFB;
            padding: 0.5rem 0.75rem;
            border-radius: 8px;
            border: 1px solid #E5E7EB;
          }
          .builder-editor .status-select {
            appearance: none;
            background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
            background-position: right 0.75rem center;
            background-repeat: no-repeat;
            background-size: 1.25em 1.25em;
            padding-right: 2.5rem;
          }
          .builder-editor .role-toggle {
            display: flex;
            background: linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%);
            border-radius: 12px;
            padding: 3px;
            gap: 3px;
            border: 1px solid rgba(0, 0, 0, 0.06);
            box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.04);
          }
          .builder-editor .role-toggle button {
            display: flex;
            align-items: center;
            gap: 6px;
            padding: 0.5rem 0.875rem;
            font-size: 0.8125rem;
            font-weight: 500;
            border-radius: 9px;
            border: none;
            cursor: pointer;
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
            color: #64748B;
            background: transparent;
            white-space: nowrap;
          }
          .builder-editor .role-toggle button .role-icon {
            font-size: 0.875rem;
            transition: transform 0.2s ease;
          }
          .builder-editor .role-toggle button:hover:not(.active) {
            color: #475569;
            background: rgba(255, 255, 255, 0.6);
          }
          .builder-editor .role-toggle button.active {
            color: white;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.08);
          }
          .builder-editor .role-toggle button.active.builder {
            background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
          }
          .builder-editor .role-toggle button.active.operator {
            background: linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%);
          }
          .builder-editor .role-toggle button.active .role-icon {
            transform: scale(1.1);
          }
          .role-dialog-overlay {
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.6);
            backdrop-filter: blur(4px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            animation: fadeIn 0.2s ease-out;
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .role-dialog {
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            max-width: 700px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            animation: slideUp 0.3s ease-out;
          }
          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .role-dialog-header {
            padding: 2rem 2rem 1.5rem 2rem;
            border-bottom: 1px solid #E5E7EB;
          }
          .role-dialog-content {
            padding: 2rem;
          }
          .role-comparison {
            display: grid;
            gap: 1rem;
            margin-top: 1rem;
          }
          .role-card {
            padding: 1.5rem;
            border: 2px solid #E5E7EB;
            border-radius: 12px;
            background: #F9FAFB;
            transition: all 0.2s ease;
          }
          .role-card.highlight {
            border-color: #3B82F6;
            background: #EFF6FF;
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
          }
          .role-card-header {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            margin-bottom: 0.75rem;
          }
          .role-icon-large {
            font-size: 1.5rem;
          }
          .role-features {
            list-style: none;
            padding: 0;
            margin: 1rem 0 0 0;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
          }
          .role-features li {
            font-size: 0.875rem;
            color: #475569;
            padding-left: 0;
          }
          .role-dialog-actions {
            padding: 1.5rem 2rem 2rem 2rem;
            display: flex;
            gap: 1rem;
            justify-content: flex-end;
            border-top: 1px solid #E5E7EB;
          }
          .dialog-button {
            padding: 0.75rem 1.5rem;
            border-radius: 10px;
            font-weight: 600;
            font-size: 0.9375rem;
            cursor: pointer;
            transition: all 0.2s ease;
            border: none;
          }
          .dialog-button-cancel {
            background: #F3F4F6;
            color: #374151;
          }
          .dialog-button-cancel:hover {
            background: #E5E7EB;
          }
          .dialog-button-confirm {
            background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
            color: white;
            box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
          }
          .dialog-button-confirm:hover {
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
            transform: translateY(-1px);
          }
        `}
      </style>

      <DocumentToolbar />

      <div className="builder-editor p-6 max-w-4xl mx-auto space-y-6 pb-12">
        {/* Header with Role Toggle */}
        <div className="section-card p-8">
          <div className="flex items-start justify-between gap-6">
            <div>
              <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">
                {roleLabel} Team Profile
              </h1>
              <p className="text-slate-500 mt-1 text-sm">
                Configure your {roleLabel.toLowerCase()} team identity and
                capabilities
              </p>
            </div>

            {/* Role Toggle */}
            {/* <div className="flex flex-col items-end gap-1.5">
              <div className="role-toggle">
                <button
                  type="button"
                  onClick={() => handleSetOperator(false)}
                  className={!state?.isOperator ? "active builder" : ""}
                >
                  <span className="role-icon">🔨</span>
                  Builder
                </button>
                <button
                  type="button"
                  onClick={() => handleSetOperator(true)}
                  className={state?.isOperator ? "active operator" : ""}
                >
                  <img
                    src={operatorIconUrl}
                    alt=""
                    className="role-icon"
                    style={{
                      width: 19,
                      height: 19,
                      filter: state?.isOperator ? "invert(1)" : "none",
                    }}
                  />
                  Operator
                </button>
              </div>
              <p className="text-xs text-slate-400 text-right max-w-[180px]">
                {state?.isOperator ? "Sells & buys services" : "Buys services"}
              </p>
            </div> */}
          </div>
        </div>

        {/* Profile Preview */}
        {state && <ProfilePreview state={state} />}

        {/* Identity Section */}
        <div className="section-card p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
              <Info size={18} className="text-indigo-600" />
            </span>
            Identity
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Builder/Operator Name */}
            <div>
              <label className="field-label">{roleLabel} Name</label>
              <TextInput
                className="w-full"
                defaultValue={state?.name || ""}
                onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                  if (e.target.value !== state?.name) {
                    handleFieldChange("name", e.target.value);
                  }
                }}
                placeholder="Enter your name or team name"
              />
            </div>

            {/* Code */}
            <div>
              <label className="field-label">Code</label>
              <TextInput
                className="w-full"
                defaultValue={state?.code || ""}
                onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                  if (e.target.value !== state?.code) {
                    handleFieldChange("code", e.target.value);
                  }
                }}
                placeholder="Short identifier"
              />
              <p className="field-hint">Unique code for quick reference</p>
            </div>

            {/* Slug - Full width */}
            <div className="md:col-span-2">
              <label className="field-label">Profile Slug</label>
              <TextInput
                className="w-full"
                value={state?.slug || ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleFieldChange("slug", e.target.value);
                }}
                placeholder="your-profile-slug"
              />
              <p className="field-hint">
                Auto-generated from name. Lowercase, hyphens only.
              </p>
            </div>

            {/* Profile Icon */}
            <div className="md:col-span-2">
              <ImageUrlInput
                label="Profile Image"
                value={state?.icon || ""}
                onChange={(value) => handleFieldChange("icon", value)}
                placeholder="https://example.com/avatar.jpg"
              />
            </div>

            {/* Operational Hub Member */}
            <div className="md:col-span-2 border-t border-slate-100 pt-6 mt-2">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-8 h-8 rounded-lg bg-violet-50 flex items-center justify-center">
                  <Building2 size={18} className="text-violet-600" />
                </span>
                <label className="field-label mb-0">
                  Operational Hub Member
                </label>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-slate-500 mb-1.5 block">
                    Name
                  </label>
                  <TextInput
                    className="w-full"
                    defaultValue={state?.operationalHubMember?.name || ""}
                    onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                      if (
                        e.target.value !== state?.operationalHubMember?.name
                      ) {
                        handleSetOpHubMember({ name: e.target.value || null });
                      }
                    }}
                    placeholder="Enter hub name"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-500 mb-1.5 block">
                    PHID
                  </label>
                  <TextInput
                    className="w-full"
                    defaultValue={state?.operationalHubMember?.phid || ""}
                    onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                      if (
                        e.target.value !== state?.operationalHubMember?.phid
                      ) {
                        handleSetOpHubMember({ phid: e.target.value || null });
                      }
                    }}
                    placeholder="Enter hub PHID"
                  />
                </div>
              </div>
              <p className="field-hint mt-2">
                Link this profile to an operational hub member
              </p>
            </div>
          </div>
        </div>

        {/* Status & Type Section */}
        <div className="section-card p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
              <Settings size={18} className="text-amber-600" />
            </span>
            Status & Type
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Status */}
            <div>
              <label className="field-label">Current Status</label>
              <select
                className="status-select w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                value={state?.status || ""}
                onChange={(e) => {
                  if (e.target.value) {
                    handleStatusChange(e.target.value as BuilderStatus);
                  }
                }}
              >
                <option value="" disabled>
                  Select status...
                </option>
                {STATUS_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="section-card p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
              <FileText size={18} className="text-emerald-600" />
            </span>
            Description & About
          </h3>

          <div className="space-y-6">
            {/* Short Description */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="field-label mb-0">Short Description</label>
                <span
                  className={`text-xs font-medium ${
                    descriptionValue.length > DESCRIPTION_MAX_LENGTH
                      ? "text-red-500"
                      : descriptionValue.length > DESCRIPTION_MAX_LENGTH * 0.9
                        ? "text-amber-500"
                        : "text-slate-400"
                  }`}
                >
                  {descriptionValue.length}/{DESCRIPTION_MAX_LENGTH}
                </span>
              </div>
              <Textarea
                className={`w-full ${
                  descriptionValue.length > DESCRIPTION_MAX_LENGTH
                    ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                    : ""
                }`}
                value={descriptionValue}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                  setDescriptionValue(e.target.value);
                }}
                onBlur={(e: React.FocusEvent<HTMLTextAreaElement>) => {
                  if (e.target.value !== state?.description) {
                    if (e.target.value.length > DESCRIPTION_MAX_LENGTH) {
                      toast?.(
                        `Description exceeds ${DESCRIPTION_MAX_LENGTH} character limit`,
                        { type: "error" },
                      );
                      return;
                    }
                    handleFieldChange("description", e.target.value);
                  }
                }}
                placeholder={`A brief summary of your ${roleLabel.toLowerCase()} profile`}
                rows={3}
                maxLength={DESCRIPTION_MAX_LENGTH + 50}
              />
              {descriptionValue.length > DESCRIPTION_MAX_LENGTH && (
                <p className="text-xs text-red-500 mt-1">
                  Description exceeds {DESCRIPTION_MAX_LENGTH} character limit.
                  Please shorten it to save.
                </p>
              )}
              <p className="field-hint">
                A short, plain-text description shown in previews and listings
              </p>
            </div>

            {/* About (Markdown) */}
            <div>
              <MarkdownEditor
                label="About"
                height={350}
                value={state?.about || ""}
                onChange={() => {}}
                onBlur={(value: string) => handleFieldChange("about", value)}
              />
              <p className="field-hint">
                A detailed description with markdown formatting to showcase your
                capabilities
              </p>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <SkillsSection
          skills={state?.skills || []}
          onAddSkill={handleAddSkill}
          onRemoveSkill={handleRemoveSkill}
        />

        {/* Scopes Section */}
        <ScopesSection
          scopes={state?.scopes || []}
          onAddScope={handleAddScope}
          onRemoveScope={handleRemoveScope}
        />

        {/* Links Section */}
        <LinksSection
          links={state?.links || []}
          onAddLink={handleAddLink}
          onEditLink={handleEditLink}
          onRemoveLink={handleRemoveLink}
        />

        {/* Contributors Section */}
        <ContributorsSection
          currentProfileId={doc.header.id}
          contributors={state.contributors}
          onAddContributor={handleAddContributor}
          onRemoveContributor={handleRemoveContributor}
        />

        {/* Role Change Confirmation Dialog */}
        {showRoleDialog && (
          <div className="role-dialog-overlay">
            <div className="role-dialog">
              <div className="role-dialog-header relative">
                <h3 className="text-xl font-semibold text-slate-900 pr-8">
                  Switch to {pendingRoleChange ? "Operator" : "Builder"}?
                </h3>
                <button
                  type="button"
                  onClick={cancelRoleChange}
                  className="absolute top-0 right-0 p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                  aria-label="Close dialog"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="role-dialog-content">
                <p className="text-slate-600 mb-4">
                  Before switching, make sure you understand the difference
                  between these roles:
                </p>

                <div className="role-comparison">
                  <div
                    className={`role-card ${!pendingRoleChange ? "highlight" : ""}`}
                  >
                    <div className="role-card-header">
                      <span className="role-icon-large">🔨</span>
                      <h4 className="text-lg font-semibold text-slate-900">
                        Builder
                      </h4>
                    </div>
                    <p className="text-sm text-slate-600 mb-3">
                      Connect gives you the tools to run your builder operations
                      effectively. Manage your team members, edit your profile,
                      find work to complete and purchase supporting services.
                    </p>
                    <ul className="role-features">
                      <li>✓ Sign up to services</li>
                      <li>✓ Purchase services from Operators</li>
                      <li>✓ Manage service subscriptions</li>
                    </ul>
                  </div>

                  <div
                    className={`role-card ${pendingRoleChange ? "highlight" : ""}`}
                  >
                    <div className="role-card-header">
                      <img
                        src={operatorIconUrl}
                        alt=""
                        style={{ width: 24, height: 24 }}
                      />
                      <h4 className="text-lg font-semibold text-slate-900">
                        Operator
                      </h4>
                    </div>
                    <ul className="role-features">
                      <li>
                        ✓ Everything that a builder team can do PLUS, you have
                        services to sell to other builders and operators.
                      </li>
                      <li>✓ Create and offer services</li>
                      <li>✓ Sign up to other services</li>
                      <li>✓ Both sell and buy services</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="role-dialog-actions">
                <button
                  type="button"
                  onClick={cancelRoleChange}
                  className="dialog-button dialog-button-cancel"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={confirmRoleChange}
                  className="dialog-button dialog-button-confirm"
                >
                  Continue as {pendingRoleChange ? "Operator" : "Builder"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
