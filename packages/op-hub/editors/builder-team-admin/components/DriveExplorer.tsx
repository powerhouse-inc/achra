import type { EditorProps } from "document-model";
import { setName } from "document-model";
import { FolderTree, type CustomView } from "./FolderTree.js";
import { DriveContents } from "./DriveContents.js";
import { ContributorsSection } from "./team-members.js";
import {
  useDocumentsInSelectedDrive,
  useSelectedDrive,
  addDocument,
  dispatchActions,
  setSelectedNode,
  setSelectedDrive,
} from "@powerhousedao/reactor-browser";
import { X } from "lucide-react";
import {
  Component,
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { isValidName } from "@powerhousedao/shared/document-drive";
import { ExpenseReports } from "./expense-reports.js";
import { SnapshotReports } from "./snapshot-reports.js";
import { ResourcesServices } from "./ResourcesServices.js";
import { ServiceSubscriptions } from "./service-subscriptions.js";
import { OperationalHubLanding } from "./OperationalHubLanding.js";
import { actions as builderProfileActions } from "document-models/builder-profile";
import { useServiceSubscriptionAutoPlacement } from "../hooks/useServiceSubscriptionAutoPlacement.js";
import { useSnapshotReportAutoPlacement } from "../hooks/useSnapshotReportAutoPlacement.js";

/**
 * Catches "Document not found" errors when the reactor tries to render a
 * document that hasn't synced to the local DB yet. Auto-retries so the rest
 * of the UI (sidebar, dashboard) stays usable.
 */
class DocumentEditorBoundary extends Component<
  { children: ReactNode },
  { error: Error | null; retryCount: number }
> {
  private retryTimer: ReturnType<typeof setTimeout> | null = null;

  state = { error: null as Error | null, retryCount: 0 };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidUpdate() {
    if (this.state.error && this.state.retryCount < 5 && !this.retryTimer) {
      this.retryTimer = setTimeout(() => {
        this.retryTimer = null;
        this.setState((s) => ({
          error: null,
          retryCount: s.retryCount + 1,
        }));
      }, 2000);
    }
  }

  componentWillUnmount() {
    if (this.retryTimer) clearTimeout(this.retryTimer);
  }

  render() {
    if (!this.state.error) return this.props.children;

    const isDocNotFound =
      this.state.error.message.includes("Document not found");

    const docId = isDocNotFound
      ? this.state.error.message.replace("Document not found: ", "")
      : null;

    if (isDocNotFound && this.state.retryCount < 5) {
      return (
        <div className="flex h-64 items-center justify-center">
          <div className="text-center">
            <div className="mb-2 text-sm text-gray-500">Loading document…</div>
            <code className="text-[10px] text-gray-300">{docId}</code>
          </div>
        </div>
      );
    }

    return (
      <div className="flex h-64 items-center justify-center">
        <div className="max-w-sm text-center">
          <div className="mb-2 text-sm text-gray-600">
            This document could not be loaded
          </div>
          <div className="mb-3 text-xs text-gray-400">
            There may be an issue with this document&apos;s data. Use the
            document ID below to investigate further.
          </div>
          {docId ? (
            <code className="mb-4 block rounded bg-gray-50 px-3 py-2 text-xs text-gray-500 select-all border border-gray-200">
              {docId}
            </code>
          ) : (
            <div className="mb-4 text-xs text-gray-400">
              {this.state.error.message}
            </div>
          )}
          <button
            type="button"
            onClick={() => this.setState({ error: null, retryCount: 0 })}
            className="rounded-md bg-gray-100 px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-200"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }
}

function generateCode(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean);

  if (words.length >= 2) {
    // Acronym from first letter of each word, capped at 5
    let code = words.map((w) => w[0]).join("");
    // If only 2 words, pad with second letter of the first word
    if (code.length < 3 && words[0].length > 1) {
      code = words[0][0] + words[0][1] + words[1][0];
    }
    return code.slice(0, 5).toUpperCase();
  }

  // Single word: first, middle, last letter
  const word = words[0];
  const mid = Math.floor(word.length / 2);
  return (word[0] + word[mid] + word[word.length - 1]).toUpperCase();
}

/**
 * Main drive explorer component with sidebar navigation and content area.
 * Layout: Left sidebar (folder tree) + Right content area (files/folders + document editor)
 */
export function DriveExplorer({ children }: EditorProps) {
  // if a document is selected then it's editor will be passed as children
  const showDocumentEditor = !!children;
  const documentsInSelectedDrive = useDocumentsInSelectedDrive();
  const [customView, setCustomView] = useState<CustomView>(null);
  const [profileName, setProfileName] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [selectedDrive] = useSelectedDrive();

  // Auto-placement hooks — must run regardless of which view is active so
  // documents synced from the server get placed into the right folders.
  useServiceSubscriptionAutoPlacement();
  useSnapshotReportAutoPlacement();

  // Check if builder profile document exists
  const hasBuilderProfile = useMemo(() => {
    if (!documentsInSelectedDrive) return false;
    return documentsInSelectedDrive.some(
      (doc) => doc.header.documentType === "powerhouse/builder-profile",
    );
  }, [documentsInSelectedDrive]);

  const handleCreateProfile = useCallback(async () => {
    const trimmedName = profileName.trim();
    const driveId = selectedDrive?.header.id;

    if (!trimmedName || !driveId || isCreating) return;

    setIsCreating(true);

    try {
      const createdNode = await addDocument(
        driveId,
        trimmedName,
        "powerhouse/builder-profile",
      );

      if (!createdNode?.id) {
        console.error("Failed to create builder profile document");
        return;
      }

      // Set the profile name, slug, and code in the document state
      const slug = trimmedName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
      const code = generateCode(trimmedName);
      await dispatchActions(
        builderProfileActions.updateProfile({ name: trimmedName, slug, code }),
        createdNode.id,
      );

      // Set the document name to match
      await dispatchActions(setName(trimmedName), createdNode.id);

      // Deselect so the main drive view renders instead of the document editor
      setSelectedNode("");
    } catch (error) {
      console.error("Error creating builder profile:", error);
    } finally {
      setIsCreating(false);
    }
  }, [profileName, selectedDrive?.header.id, isCreating]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (isValidName(profileName) && !isCreating) {
        void handleCreateProfile();
      }
    },
    [profileName, isCreating, handleCreateProfile],
  );

  // If no builder profile exists, show the creation form
  if (!hasBuilderProfile) {
    const isValid = isValidName(profileName);

    return (
      <div className="flex h-full items-center justify-center px-4 py-12">
        <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-200/50 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 p-12 shadow-xl shadow-slate-200/50 backdrop-blur-sm">
          {/* Decorative background elements */}
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br from-blue-400/20 to-indigo-400/20 blur-3xl" />
          <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-gradient-to-br from-indigo-300/20 to-purple-300/20 blur-2xl" />

          {/* Content */}
          <div className="relative z-10 text-center">
            <div className="mb-6 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 p-3 shadow-lg shadow-blue-500/30">
              <svg
                className="h-8 w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>

            <h2 className="mb-4 text-3xl font-bold tracking-tight text-slate-900">
              Create your Builder Team Profile
            </h2>

            <p className="mb-8 text-lg leading-relaxed text-slate-600">
              Get started by creating your builder profile to manage your team,
              services, and build your presence in the Achra ecosystem.
            </p>

            <form onSubmit={handleSubmit} className="mx-auto max-w-md">
              {!isValid && profileName && (
                <div className="mb-2 text-sm text-red-500">
                  Document name must be valid URL characters.
                </div>
              )}
              <input
                type="text"
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                placeholder="Builder Profile name"
                maxLength={100}
                disabled={isCreating}
                className="mb-6 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 placeholder-slate-400 shadow-sm outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50"
              />

              <button
                type="submit"
                disabled={!isValid || isCreating}
                className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-blue-500/40 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/50 active:scale-100 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-lg"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <span>
                    {isCreating ? "Creating..." : "Create Builder Profile"}
                  </span>
                  {!isCreating && (
                    <svg
                      className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Render the appropriate content based on state
  const renderContent = () => {
    // Document editor takes priority — wrapped in boundary so a failed
    // document load doesn't take down the sidebar / dashboard.
    if (showDocumentEditor) {
      return <DocumentEditorBoundary>{children}</DocumentEditorBoundary>;
    }

    // Custom views
    if (customView === "team-members") {
      return <ContributorsSection />;
    }

    if (customView === "service-subscriptions") {
      return <ServiceSubscriptions />;
    }

    if (customView === "expense-reports") {
      return <ExpenseReports />;
    }

    if (customView === "snapshot-reports") {
      return <SnapshotReports />;
    }

    if (customView === "resources-services") {
      return <ResourcesServices />;
    }

    if (customView === "operational-hub") {
      return <OperationalHubLanding onNavigate={setCustomView} />;
    }

    // Default: folder contents
    return <DriveContents />;
  };

  return (
    <div className="ph-drive-explorer-shell flex h-full w-full overflow-hidden">
      <FolderTree onCustomViewChange={setCustomView} />
      <div
        className={`relative min-h-0 min-w-0 flex-1 overflow-y-auto p-4 ${
          showDocumentEditor ? "" : "pt-12"
        }`}
      >
        {/* Close button — only in custom views, not the document editor. Sits
            in the reserved top strip so it never overlaps view controls.
            Scrolls with content (not sticky). */}
        {!showDocumentEditor && (
          <button
            type="button"
            aria-label="Close drive"
            title="Close drive"
            onClick={() => setSelectedDrive(undefined)}
            className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-500 shadow-sm hover:bg-gray-100 hover:text-gray-800"
          >
            <X size={18} />
          </button>
        )}
        {renderContent()}
      </div>
    </div>
  );
}
