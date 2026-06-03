import type { EditorProps } from "document-model";
import { Component, useState, type ReactNode } from "react";
import { FolderTree, type CustomView } from "./FolderTree.js";
import { ResourcesServices } from "./ResourcesServices.js";
import { Customers } from "./customers.js";
import { useCustomersAutoPlacement } from "../hooks/useCustomersAutoPlacement.js";
import { setSelectedDrive } from "@powerhousedao/reactor-browser";
import { X } from "lucide-react";

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
            <div className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              Loading document…
            </div>
            <code className="text-[10px] text-gray-300 dark:text-gray-600">
              {docId}
            </code>
          </div>
        </div>
      );
    }

    return (
      <div className="flex h-64 items-center justify-center">
        <div className="max-w-sm text-center">
          <div className="mb-2 text-sm text-gray-600 dark:text-gray-300">
            This document could not be loaded
          </div>
          <div className="mb-3 text-xs text-gray-400 dark:text-gray-500">
            There may be an issue with this document&apos;s data. Use the
            document ID below to investigate further.
          </div>
          {docId ? (
            <code className="mb-4 block rounded bg-gray-50 px-3 py-2 text-xs text-gray-500 select-all border border-gray-200 dark:bg-slate-700 dark:text-gray-300 dark:border-slate-600">
              {docId}
            </code>
          ) : (
            <div className="mb-4 text-xs text-gray-400 dark:text-gray-500">
              {this.state.error.message}
            </div>
          )}
          <button
            type="button"
            onClick={() => this.setState({ error: null, retryCount: 0 })}
            className="rounded-md bg-gray-100 px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-200 dark:bg-slate-700 dark:text-gray-200 dark:hover:bg-slate-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }
}

/**
 * Main drive explorer for the Service Offering App.
 * Layout: left sidebar + right content (custom view, document editor, or
 * default drive contents).
 */
export function DriveExplorer({ children }: EditorProps) {
  const showDocumentEditor = !!children;
  const [customView, setCustomView] = useState<CustomView>(null);

  // Auto-placement hook — must run regardless of which view is active so docs
  // synced from the server land in the right folder.
  useCustomersAutoPlacement();

  const renderContent = () => {
    if (showDocumentEditor) {
      return <DocumentEditorBoundary>{children}</DocumentEditorBoundary>;
    }
    if (customView === "customers") {
      return <Customers />;
    }
    if (customView === "resources-services") {
      return <ResourcesServices />;
    }
    return <Customers />;
  };

  return (
    <div className="ph-drive-explorer-shell flex h-full w-full overflow-hidden">
      <FolderTree onCustomViewChange={setCustomView} />
      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        {/* Close button — only in custom views, not the document editor */}
        {!showDocumentEditor && (
          <div className="flex shrink-0 justify-end px-3 pt-2">
            <button
              type="button"
              aria-label="Close drive"
              title="Close drive"
              onClick={() => setSelectedDrive(undefined)}
              className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-500 shadow-sm hover:bg-gray-100 hover:text-gray-800 dark:border-slate-600 dark:bg-slate-800 dark:text-gray-400 dark:hover:bg-slate-700 dark:hover:text-gray-100"
            >
              <X size={18} />
            </button>
          </div>
        )}
        <div className="min-h-0 min-w-0 flex-1 overflow-y-auto p-4 pt-2">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
