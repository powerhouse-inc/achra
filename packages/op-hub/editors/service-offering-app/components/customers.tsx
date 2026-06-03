import { FileItem } from "@powerhousedao/design-system/connect";
import { FolderItem } from "@powerhousedao/design-system/connect";
import {
  isFolderNodeKind,
  isFileNodeKind,
  addFolder,
  setSelectedNode,
  useSelectedNodePath,
  useNodesInSelectedDriveOrFolder,
  useSelectedDriveId,
  useUserPermissions,
  showCreateDocumentModal,
} from "@powerhousedao/reactor-browser";
import { useEffect, useRef, useState, Fragment } from "react";
import type { FolderNode } from "@powerhousedao/shared/document-drive";
import { Plus } from "lucide-react";
import { useCustomersAutoPlacement } from "../hooks/useCustomersAutoPlacement.js";
import { SubscriptionsDashboard } from "./subscriptions-dashboard/index.js";
import { DashboardHeader } from "./subscriptions-dashboard/DashboardHeader.js";

// ---------- Folder browser sub-components (unchanged from original) ----------

function FolderNameInput({
  onSubmit,
  onCancel,
}: {
  onSubmit: (name: string) => void;
  onCancel: () => void;
}) {
  const [value, setValue] = useState("New Folder");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    inputRef.current?.select();
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (value.trim()) {
        onSubmit(value.trim());
      }
    } else if (e.key === "Escape") {
      onCancel();
    }
  };

  return (
    <input
      ref={inputRef}
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={handleKeyDown}
      onBlur={() => {
        if (value.trim()) {
          onSubmit(value.trim());
        } else {
          onCancel();
        }
      }}
      className="text-gray-800 bg-transparent border-b border-gray-400 outline-none px-1 py-0.5 text-sm min-w-[100px] dark:text-gray-100 dark:border-slate-500"
      placeholder="New Folder"
    />
  );
}

function CustomersBreadcrumbs({ rootFolderId }: { rootFolderId: string }) {
  const selectedNodePath = useSelectedNodePath();
  const selectedDriveId = useSelectedDriveId();
  const { isAllowedToCreateDocuments } = useUserPermissions();
  const [isCreating, setIsCreating] = useState(false);

  const rootIndex = selectedNodePath.findIndex(
    (node) => node.id === rootFolderId,
  );

  const visiblePath =
    rootIndex >= 0 ? selectedNodePath.slice(rootIndex) : selectedNodePath;

  const handleAddNew = () => {
    setIsCreating(true);
  };

  const handleSubmit = (name: string) => {
    if (!isAllowedToCreateDocuments || !selectedDriveId) return;

    const parentFolderId = selectedNodePath.at(-1)?.id;
    addFolder(selectedDriveId, name, parentFolderId)
      .then((node) => {
        setSelectedNode(node);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsCreating(false);
      });
  };

  const handleCancel = () => {
    setIsCreating(false);
  };

  return (
    <div className="flex h-9 flex-row items-center gap-2 text-gray-500 border-b border-gray-200 pb-3 dark:text-gray-400 dark:border-slate-700">
      {visiblePath.map((node) => (
        <Fragment key={node.id}>
          <div
            className="transition-colors last-of-type:text-gray-400 hover:text-gray-400 cursor-pointer dark:last-of-type:text-gray-100 dark:hover:text-gray-100"
            onClick={() => setSelectedNode(node.id)}
            role="button"
          >
            {node.name}
          </div>
          <span>/</span>
        </Fragment>
      ))}
      {isAllowedToCreateDocuments ? (
        isCreating ? (
          <FolderNameInput onSubmit={handleSubmit} onCancel={handleCancel} />
        ) : (
          <button
            type="button"
            className="ml-1 flex items-center justify-center gap-2 rounded-md bg-gray-50 px-2 py-1.5 transition-colors hover:bg-gray-200 hover:text-gray-400 dark:bg-slate-700 dark:hover:bg-slate-600 dark:hover:text-gray-100"
            onClick={handleAddNew}
          >
            <Plus size={14} />
            Add new
          </button>
        )
      ) : null}
    </div>
  );
}

// ---------- Folder browser view ----------

function CustomersFolderBrowser({
  customersFolder,
  onBackToDashboard,
}: {
  customersFolder: FolderNode;
  onBackToDashboard: () => void;
}) {
  const hasNavigatedToFolder = useRef(false);
  const selectedNodePath = useSelectedNodePath();
  const nodesInCurrentFolder = useNodesInSelectedDriveOrFolder();

  useEffect(() => {
    if (customersFolder && !hasNavigatedToFolder.current) {
      hasNavigatedToFolder.current = true;
      setSelectedNode(customersFolder.id);
    }
  }, [customersFolder]);

  const isWithinCustomers = selectedNodePath.some(
    (node) => node.id === customersFolder.id,
  );

  useEffect(() => {
    if (!isWithinCustomers && hasNavigatedToFolder.current) {
      setSelectedNode(customersFolder.id);
    }
  }, [customersFolder, isWithinCustomers]);

  const folderNodes = nodesInCurrentFolder.filter((n) => isFolderNodeKind(n));
  const fileNodes = nodesInCurrentFolder.filter((n) => isFileNodeKind(n));
  const hasFolders = folderNodes.length > 0;
  const hasFiles = fileNodes.length > 0;
  const isEmpty = !hasFolders && !hasFiles;

  return (
    <div className="dark:text-gray-100">
      <DashboardHeader
        title="Customers"
        subtitle="Browse and manage subscription documents"
        onBackToDashboard={onBackToDashboard}
        showBack
      />
      <div className="space-y-6 px-2">
        <div className="flex gap-2 justify-center pb-4 border-b border-gray-200 dark:border-slate-700">
          <button
            type="button"
            onClick={() =>
              showCreateDocumentModal("powerhouse/resource-instance")
            }
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition-colors text-xs border border-gray-300 dark:bg-slate-700 dark:text-gray-200 dark:hover:bg-slate-600 dark:border-slate-400"
          >
            <Plus size={14} />
            New Resource Instance
          </button>
          <button
            type="button"
            onClick={() =>
              showCreateDocumentModal("powerhouse/subscription-instance")
            }
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition-colors text-xs border border-gray-300 dark:bg-slate-700 dark:text-gray-200 dark:hover:bg-slate-600 dark:border-slate-400"
          >
            <Plus size={14} />
            New Subscription Instance
          </button>
        </div>

        <CustomersBreadcrumbs rootFolderId={customersFolder.id} />

        {hasFolders ? (
          <div>
            <h3 className="mb-2 text-sm font-bold text-gray-600 dark:text-gray-300">
              Folders
            </h3>
            <div className="flex flex-wrap gap-4">
              {folderNodes.map((folderNode) => (
                <FolderItem key={folderNode.id} folderNode={folderNode} />
              ))}
            </div>
          </div>
        ) : null}

        {hasFiles ? (
          <div>
            <h3 className="mb-2 text-sm font-semibold text-gray-600 dark:text-gray-300">
              Documents
            </h3>
            <div className="flex flex-wrap gap-4">
              {fileNodes.map((fileNode) => (
                <FileItem key={fileNode.id} fileNode={fileNode} />
              ))}
            </div>
          </div>
        ) : null}

        {isEmpty ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="text-gray-400 mb-2 dark:text-gray-500">
              <svg
                className="w-16 h-16 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <p className="text-gray-500 text-sm dark:text-gray-400">
              No customers yet. Add documents to this folder to get started.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

// ---------- Main component ----------

export function Customers() {
  const [showFolderBrowser, setShowFolderBrowser] = useState(false);
  const { customersFolder } = useCustomersAutoPlacement();

  if (!customersFolder) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500 dark:text-gray-400">
          Setting up Customers folder...
        </div>
      </div>
    );
  }

  return showFolderBrowser ? (
    <CustomersFolderBrowser
      customersFolder={customersFolder}
      onBackToDashboard={() => setShowFolderBrowser(false)}
    />
  ) : (
    <SubscriptionsDashboard onBrowseFiles={() => setShowFolderBrowser(true)} />
  );
}
