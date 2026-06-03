import { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "@powerhousedao/document-engineering";

import {
  setSelectedNode,
  useSelectedDrive,
  useSelectedFolder,
  useUserPermissions,
  useDocumentsInSelectedDrive,
  useFileNodesInSelectedDrive,
  useNodeActions,
  useSelectedDocumentSafe,
  showDeleteNodeModal,
  addDocument,
  dispatchActions,
} from "@powerhousedao/reactor-browser";
import { CreateDocumentModal } from "@powerhousedao/design-system/connect";
import type { EditorProps } from "document-model";
import { isValidName } from "@powerhousedao/shared/document-drive";
import { type DocumentModelModule, type PHDocument } from "document-model";
import { WorkstreamIcon } from "./icons/WorkstreamIcon.js";
import type { NetworkProfileDocument } from "document-models/network-profile";
import { actions as workstreamActions } from "document-models/workstream";
import { actions as networkProfileActions } from "document-models/network-profile";
import { FolderTree } from "./FolderTree.js";

/**
 * Main drive explorer component with sidebar navigation and content area.
 * Layout: Left sidebar (folder tree) + Right content area (files/folders + document editor)
 */
export function DriveExplorer(props: EditorProps) {
  const { children } = props;
  const { isAllowedToCreateDocuments } = useUserPermissions();

  // === DOCUMENT EDITOR STATE ===
  const [activeSidebarNodeId, setActiveSidebarNodeId] =
    useState<string>("workstreams");
  const [openModal, setOpenModal] = useState(false);
  const [selectedRootNode, setSelectedRootNode] =
    useState<string>("workstreams");
  const [modalDocumentType, setModalDocumentType] = useState<string>(
    "powerhouse/workstream",
  );
  const [profileNameInput, setProfileNameInput] = useState("");
  const [isCreatingProfile, setIsCreatingProfile] = useState(false);
  const selectedDocumentModel = useRef<DocumentModelModule | null>(null);

  // === STATE MANAGEMENT HOOKS ===
  // Core state hooks for drive navigation
  const [selectedDrive] = useSelectedDrive(); // Currently selected drive
  const selectedFolder = useSelectedFolder(); // Currently selected folder
  const allDocuments = useDocumentsInSelectedDrive();
  const fileChildren = useFileNodesInSelectedDrive();
  const { onRenameNode } = useNodeActions();

  // Listen to global selected document state (for external editors like Scope of Work)
  const [globalSelectedDocument] = useSelectedDocumentSafe();

  const networkAdminDocuments = allDocuments?.filter(
    (doc: PHDocument) =>
      doc.header.documentType === "powerhouse/network-profile" ||
      doc.header.documentType === "powerhouse/workstream" ||
      doc.header.documentType === "powerhouse/scopeofwork" ||
      doc.header.documentType === "powerhouse/rfp" ||
      doc.header.documentType === "payment-terms",
  );

  //check if network profile doc is created, set isNetworkProfileCreated to true
  const isNetworkProfileCreated =
    networkAdminDocuments?.some(
      (doc: PHDocument) =>
        doc.header.documentType === "powerhouse/network-profile",
    ) || false;

  // Sync global selected document with local activeDocumentId
  useEffect(() => {
    if (globalSelectedDocument?.header?.id) {
      // Also update the sidebar node ID to match
      setActiveSidebarNodeId(`editor-${globalSelectedDocument.header.id}`);
    }
  }, [globalSelectedDocument]);

  // Check if current active document is a Scope of Work (should show in full view)
  const isScopeOfWorkFullView =
    globalSelectedDocument?.header.documentType === "powerhouse/scopeofwork";

  // === EVENT HANDLERS ===

  // Display function that switches views based on active node ID
  const displayActiveNode = (activeNodeId: string) => {
    // Determine the type of node and extract the actual ID
    let nodeType = "unknown";
    let actualId = activeNodeId;

    if (activeNodeId === "workstreams") {
      nodeType = "workstreams";
    } else if (activeNodeId === "network-information") {
      nodeType = "workstreams";
    } else if (activeNodeId.startsWith("editor-")) {
      nodeType = "file";
      actualId = activeNodeId.replace("editor-", "");
    }

    const networkProfileDoc = networkAdminDocuments?.find(
      (doc) => doc.header.documentType === "powerhouse/network-profile",
    ) as NetworkProfileDocument | undefined;

    switch (nodeType) {
      case "workstreams":
        return (
          <div className="w-full h-full p-6 overflow-auto">
            <div className="max-w-7xl mx-auto">
              <div className="space-y-6 flex flex-col items-center justify-center mb-10">
                <h1 className="text-2xl font-bold">
                  Welcome to the Network Admin
                </h1>
                {/* Card to display the network profile */}
                {isNetworkProfileCreated && (
                  <div className="bg-white rounded-lg shadow-md border border-gray-300 p-4 max-w-lg mx-auto text-sm">
                    <div className="flex items-start justify-between gap-4">
                      {networkProfileDoc?.state.global.logo ? (
                        <img
                          src={networkProfileDoc?.state.global.logo}
                          alt="Network Profile Logo"
                          className="mb-4 max-w-32 max-h-32 sm:max-w-48 sm:max-h-48 md:max-w-64 md:max-h-64 w-auto h-auto object-contain flex-shrink-0"
                        />
                      ) : (
                        <div></div>
                      )}
                      <div className="flex flex-wrap gap-2 justify-end flex-shrink-0">
                        {networkProfileDoc?.state.global.category.map(
                          (category) => (
                            <span
                              key={category}
                              className={`inline-flex items-center justify-center rounded-md w-fit whitespace-nowrap shrink-0 border-2 px-2 py-0 text-sm font-extrabold ${
                                category.toLowerCase() === "oss"
                                  ? "bg-purple-600/30 text-purple-600 border-purple-600/70"
                                  : category.toLowerCase() === "defi"
                                    ? "bg-blue-600/30 text-blue-600 border-blue-600/70"
                                    : "bg-gray-500/30 text-gray-500 border-gray-500/70"
                              }`}
                            >
                              {category}
                            </span>
                          ),
                        )}
                      </div>
                    </div>
                    <p className="mt-4">
                      {networkProfileDoc?.state.global.description}
                    </p>
                  </div>
                )}
                <div className="flex flex-wrap gap-3 justify-center">
                  <Button
                    color="dark"
                    size="sm"
                    className="cursor-pointer hover:bg-gray-600 hover:text-white"
                    title={"Create Workstream Document"}
                    aria-description={"Create Workstream Document"}
                    onClick={() => {
                      setModalDocumentType("powerhouse/workstream");
                      setOpenModal(true);
                    }}
                  >
                    <span className="flex items-center gap-2">
                      <WorkstreamIcon className="w-7 h-7 text-white" />
                      Create Workstream Document
                    </span>
                  </Button>
                </div>
              </div>

              {/* === DOCUMENTS TABLE === */}
              {networkAdminDocuments && networkAdminDocuments.length > 0 && (
                <div className="w-full">
                  <h3 className="mb-4 text-lg font-medium text-gray-700">
                    Documents
                  </h3>
                  <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
                    <table className="w-full bg-white">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">
                            Name
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">
                            Type
                          </th>

                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {networkAdminDocuments.map((document) => {
                          // Find the corresponding file node for actions
                          const fileNode = fileChildren?.find(
                            (file) => file.id === document.header.id,
                          );

                          return (
                            <tr
                              key={document.header.id}
                              className="hover:bg-gray-50 transition-colors"
                            >
                              <td className="px-2 py-2">
                                <div
                                  className="text-sm font-medium text-gray-900 truncate max-w-xs"
                                  title={fileNode?.name || document.header.name}
                                >
                                  {fileNode?.name || document.header.name}
                                </div>
                              </td>
                              <td className="px-2 py-2">
                                <div
                                  className="text-sm text-gray-500 truncate max-w-xs"
                                  title={document.header.documentType}
                                >
                                  {document.header.documentType}
                                </div>
                              </td>

                              <td className="px-2 py-2">
                                <div className="flex gap-2 flex-wrap">
                                  <button
                                    onClick={() => {
                                      if (fileNode) {
                                        setSelectedNode(fileNode);
                                      }
                                    }}
                                    className="px-3 py-1.5 bg-blue-500 text-white rounded text-xs font-medium hover:bg-blue-600 transition-colors whitespace-nowrap"
                                  >
                                    Open
                                  </button>
                                  <button
                                    onClick={async () => {
                                      if (!fileNode || !fileNode.id) return;
                                      const currentName =
                                        fileNode.name || document.header.name;
                                      const newName = prompt(
                                        "Enter new name:",
                                        currentName,
                                      );
                                      if (
                                        newName &&
                                        newName.trim() &&
                                        newName !== currentName
                                      ) {
                                        try {
                                          await onRenameNode(
                                            newName.trim(),
                                            fileNode,
                                          );
                                        } catch (error) {
                                          console.error(
                                            "Failed to rename document",
                                            error,
                                          );
                                        }
                                      }
                                    }}
                                    className="px-3 py-1.5 bg-yellow-500 text-white rounded text-xs font-medium hover:bg-yellow-600 transition-colors whitespace-nowrap"
                                  >
                                    Edit
                                  </button>
                                  <button
                                    onClick={() => {
                                      if (fileNode && fileNode.id) {
                                        showDeleteNodeModal(fileNode.id);
                                      }
                                    }}
                                    className="px-3 py-1.5 bg-red-500 text-white rounded text-xs font-medium hover:bg-red-600 transition-colors whitespace-nowrap"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      default:
        return <div>Unknown node type: {nodeType}</div>;
    }
  };

  // Handle document creation from modal
  const onCreateDocument = useCallback(
    async (fileName: string) => {
      setOpenModal(false);

      const documentType = modalDocumentType;
      const editorType =
        documentType === "powerhouse/network-profile"
          ? "network-profile-editor"
          : "workstream-editor";

      try {
        const node = await addDocument(
          selectedDrive?.header.id || "",
          fileName,
          documentType,
          undefined,
          undefined,
          undefined,
          editorType,
        );

        if (!node?.id) {
          console.error("Error creating document", fileName);
          return;
        }

        if (documentType === "powerhouse/workstream") {
          const networkProfileDoc = networkAdminDocuments?.find(
            (doc) => doc.header.documentType === "powerhouse/network-profile",
          ) as NetworkProfileDocument | undefined;
          const actionsToDispatch = [
            workstreamActions.editWorkstream({ title: fileName }),
            workstreamActions.editClientInfo({
              clientId: networkProfileDoc?.header.id || "",
              name: networkProfileDoc?.state.global.name || "",
              icon: networkProfileDoc?.state.global.icon || "",
            }),
          ];
          await dispatchActions(actionsToDispatch, node.id);
        }

        selectedDocumentModel.current = null;

        if (documentType === "powerhouse/network-profile") {
          setSelectedRootNode("network-information");
        } else {
          setSelectedRootNode("workstreams");
        }
      } catch (error) {
        console.error("Failed to create document:", error);
      }
    },
    [selectedDrive?.header.id, modalDocumentType, networkAdminDocuments],
  );

  // Handle network profile creation from welcome form
  const handleCreateProfile = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const name = profileNameInput.trim();
      if (!name || isCreatingProfile) return;

      setIsCreatingProfile(true);
      try {
        const node = await addDocument(
          selectedDrive?.header.id || "",
          name,
          "powerhouse/network-profile",
          undefined,
          undefined,
          undefined,
          "network-profile-editor",
        );

        if (!node?.id) {
          console.error("Error creating network profile document");
          return;
        }

        await dispatchActions(
          [networkProfileActions.setProfileName({ name })],
          node.id,
        );

        setProfileNameInput("");
        setSelectedRootNode("network-information");
      } catch (error) {
        console.error("Failed to create network profile:", error);
      } finally {
        setIsCreatingProfile(false);
      }
    },
    [profileNameInput, isCreatingProfile, selectedDrive?.header.id],
  );

  // Create builders document
  const createBuildersDocument = useCallback(async () => {
    try {
      const isCreated = allDocuments?.some(
        (doc) => doc.header.documentType === "powerhouse/builders",
      );
      if (isCreated) {
        return null;
      }
      const node = await addDocument(
        selectedDrive?.header.id || "",
        "Builders",
        "powerhouse/builders",
        undefined,
        undefined,
        undefined,
        "builders-editor",
      );

      if (!node?.id) {
        console.error("Error creating builders document");
        return null;
      }

      return node;
    } catch (error) {
      console.error("Failed to create builders document:", error);
      return null;
    }
  }, [selectedDrive?.header.id, allDocuments]);

  // === RENDER ===

  // If no network profile exists, show the creation form
  if (!isNetworkProfileCreated) {
    const isValid = isValidName(profileNameInput);
    return (
      <div className="flex h-full items-center justify-center px-4 py-12">
        <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-200/50 bg-gradient-to-br from-slate-50 via-purple-50/30 to-indigo-50/40 p-12 shadow-xl shadow-slate-200/50 backdrop-blur-sm">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br from-purple-400/20 to-indigo-400/20 blur-3xl" />
          <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-gradient-to-br from-indigo-300/20 to-purple-300/20 blur-2xl" />

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
              Create your Network Profile
            </h2>

            <p className="mb-8 text-lg leading-relaxed text-slate-600">
              Get started by creating a network profile to manage workstreams,
              builders, and documents.
            </p>

            <form onSubmit={handleCreateProfile} className="mx-auto max-w-md">
              {!isValid && profileNameInput && (
                <div className="mb-2 text-sm text-red-500">
                  Document name must be valid URL characters.
                </div>
              )}
              <input
                type="text"
                value={profileNameInput}
                onChange={(e) => setProfileNameInput(e.target.value)}
                placeholder="Network profile name"
                maxLength={100}
                disabled={isCreatingProfile}
                className="mb-6 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 placeholder-slate-400 shadow-sm outline-none transition-all focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 disabled:opacity-50"
              />

              <button
                type="submit"
                disabled={!isValid || isCreatingProfile}
                className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-purple-500/40 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/50 active:scale-100 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-lg"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <span>
                    {isCreatingProfile
                      ? "Creating..."
                      : "Create Network Profile"}
                  </span>
                  {!isCreatingProfile && (
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
    <div className="h-full">
      {/* === FULL VIEW MODE (for Scope of Work) === */}
      {isScopeOfWorkFullView && props.children ? (
        <div className="h-full w-full">{props.children}</div>
      ) : (
        /* === NORMAL VIEW WITH SIDEBAR === */
        <div className="flex h-full">
          <FolderTree
            activeSidebarNodeId={activeSidebarNodeId}
            setActiveSidebarNodeId={setActiveSidebarNodeId}
            setSelectedRootNode={setSelectedRootNode}
            createBuildersDocument={createBuildersDocument}
          />

          {/* === MAIN CONTENT AREA === */}
          <div className="flex-1 overflow-y-auto">
            <div className="h-full">
              {props.children ||
                displayActiveNode(selectedFolder?.id || selectedRootNode)}
            </div>
          </div>

          {/* === DOCUMENT CREATION MODAL === */}
          <CreateDocumentModal
            onContinue={onCreateDocument}
            onOpenChange={(open) => setOpenModal(open)}
            open={openModal}
          />
        </div>
      )}
    </div>
  );
}
