import type { EditorProps } from "document-model";
import { setName } from "document-model";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import {
  useDocumentsInSelectedDrive,
  useSelectedDrive,
  addDocument,
  dispatchActions,
  setSelectedNode,
} from "@powerhousedao/reactor-browser";
import { isValidName } from "@powerhousedao/shared/document-drive";
import { setOperationalHubName } from "../../../document-models/operational-hub-profile/v1/gen/configuration/creators.js";
import { ToastRenderer } from "./ToastRenderer.js";
import { DriveContents } from "./DriveContents.js";
import { FolderTree, type SelectedFolderInfo } from "./FolderTree.js";
import { FolderTreeErrorBoundary } from "./FolderTreeErrorBoundary.js";
import { DocumentDropZone } from "./DocumentDropZone.js";

/**
 * Main drive explorer component for Contributor Billing.
 * Displays an operational hub with invoice management and billing statement generation.
 */
export function DriveExplorer({ children }: EditorProps) {
  // if a document is selected then its editor will be passed as children
  const showDocumentEditor = !!children;
  const documentsInSelectedDrive = useDocumentsInSelectedDrive();
  const [selectedDrive] = useSelectedDrive();
  const [hubName, setHubName] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  // Check if operational hub profile document exists
  const hasHubProfile = useMemo(() => {
    if (!documentsInSelectedDrive) return false;
    return documentsInSelectedDrive.some(
      (doc) => doc.header.documentType === "powerhouse/operational-hub-profile",
    );
  }, [documentsInSelectedDrive]);

  const handleCreateHubProfile = useCallback(async () => {
    const trimmedName = hubName.trim();
    const driveId = selectedDrive?.header.id;

    if (!trimmedName || !driveId || isCreating) return;

    setIsCreating(true);

    try {
      const createdNode = await addDocument(
        driveId,
        trimmedName,
        "powerhouse/operational-hub-profile",
        undefined,
        undefined,
        undefined,
        "operational-hub-profile-editor",
      );

      if (!createdNode?.id) {
        console.error("Failed to create operational hub profile document");
        return;
      }

      // Set the hub name in the document state
      await dispatchActions(
        setOperationalHubName({ name: trimmedName }),
        createdNode.id,
      );

      // Set the document name to match
      await dispatchActions(setName(trimmedName), createdNode.id);

      // Deselect so the main drive view renders instead of the document editor
      setSelectedNode("");
    } catch (error) {
      console.error("Error creating operational hub profile:", error);
    } finally {
      setIsCreating(false);
    }
  }, [hubName, selectedDrive?.header.id, isCreating]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (isValidName(hubName) && !isCreating) {
        void handleCreateHubProfile();
      }
    },
    [hubName, isCreating, handleCreateHubProfile],
  );

  // Track which folder is selected for content routing
  const [selectedFolder, setSelectedFolder] =
    useState<SelectedFolderInfo | null>(null);

  // Track active node in sidebar for visual selection sync
  // Empty string means no selection (home page)
  const [activeNodeId, setActiveNodeId] = useState<string>("");

  // Remember the last folder before opening a document so we can restore it when closing
  const lastFolderRef = useRef<SelectedFolderInfo | null>(null);
  const prevShowDocumentEditorRef = useRef(showDocumentEditor);

  useEffect(() => {
    const wasShowingDocument = prevShowDocumentEditorRef.current;
    const isShowingDocument = showDocumentEditor;

    if (isShowingDocument && !wasShowingDocument) {
      // Transitioning TO document editor - save current folder
      lastFolderRef.current = selectedFolder;
    } else if (!isShowingDocument && wasShowingDocument) {
      // Transitioning FROM document editor - restore last folder
      if (lastFolderRef.current) {
        setSelectedFolder(lastFolderRef.current);
        if (lastFolderRef.current.folderId) {
          setActiveNodeId(lastFolderRef.current.folderId);
        }
      }
    }

    prevShowDocumentEditorRef.current = isShowingDocument;
  }, [showDocumentEditor]);

  const handleFolderSelect = (folderInfo: SelectedFolderInfo | null) => {
    setSelectedFolder(folderInfo);
    // Only update sidebar selection when explicitly selecting a folder with a valid ID
    // When folderInfo is null (opening a document), let the sidebar keep its current selection
    // When folderId is empty (e.g., billing folder doesn't exist yet), don't update sidebar
    if (folderInfo && folderInfo.folderId) {
      setActiveNodeId(folderInfo.folderId);
    }
  };

  // If no hub profile exists, show the creation form
  if (!hasHubProfile) {
    const isValid = isValidName(hubName);

    return (
      <div className="flex h-full items-center justify-center px-4 py-12">
        <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-200/50 bg-gradient-to-br from-slate-50 via-purple-50/30 to-indigo-50/40 p-12 shadow-xl shadow-slate-200/50 backdrop-blur-sm">
          {/* Decorative background elements */}
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br from-purple-400/20 to-indigo-400/20 blur-3xl" />
          <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-gradient-to-br from-indigo-300/20 to-purple-300/20 blur-2xl" />

          {/* Content */}
          <div className="relative z-10 text-center">
            <div className="mb-6 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 p-3 shadow-lg shadow-purple-500/30">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>

            <h2 className="mb-4 text-3xl font-bold tracking-tight text-slate-900">
              Create your Operational Hub
            </h2>

            <p className="mb-8 text-lg leading-relaxed text-slate-600">
              Get started by creating your operational hub to manage accounts,
              billing, and financial reporting.
            </p>

            <form onSubmit={handleSubmit} className="mx-auto max-w-md">
              {!isValid && hubName && (
                <div className="mb-2 text-sm text-red-500">
                  Document name must be valid URL characters.
                </div>
              )}
              <input
                type="text"
                value={hubName}
                onChange={(e) => setHubName(e.target.value)}
                placeholder="Operational Hub name"
                maxLength={100}
                disabled={isCreating}
                className="mb-6 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 placeholder-slate-400 shadow-sm outline-none transition-all focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 disabled:opacity-50"
              />

              <button
                type="submit"
                disabled={!isValid || isCreating}
                className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-purple-500/40 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/50 active:scale-100 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-lg"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <span>
                    {isCreating ? "Creating..." : "Create Operational Hub"}
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
                <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-indigo-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full overflow-hidden">
      {/* Sidebar - resizable, managed by Sidebar component */}
      <FolderTreeErrorBoundary>
        <FolderTree
          onFolderSelect={handleFolderSelect}
          activeNodeId={activeNodeId}
          onActiveNodeIdChange={setActiveNodeId}
        />
      </FolderTreeErrorBoundary>

      <ToastRenderer />

      {/* Main content area - takes remaining space, scrollable */}
      <DocumentDropZone className="flex-1 min-w-0 h-full overflow-x-hidden overflow-y-auto">
        {/* Conditional rendering: Document editor or folder content */}
        {showDocumentEditor ? (
          /* Document editor view */
          <div className="min-h-full">{children}</div>
        ) : (
          /* Folder content view */
          <DriveContents
            selectedFolder={selectedFolder}
            onFolderSelect={handleFolderSelect}
            onActiveNodeIdChange={setActiveNodeId}
          />
        )}
      </DocumentDropZone>
    </div>
  );
}
