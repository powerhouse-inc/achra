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
import { Plus } from "lucide-react";
import { useSubscriptionsFolder } from "../hooks/useSubscriptionsFolder.js";

/**
 * Simple inline input for creating new folders.
 */
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
      className="text-foreground bg-transparent border-b border-input outline-none px-1 py-0.5 text-sm min-w-[100px]"
      placeholder="New Folder"
    />
  );
}

/**
 * Custom breadcrumbs component that treats "Subscriptions" folder as the root.
 * Only shows path from "Subscriptions" folder onwards.
 * Includes folder creation functionality.
 */
function SubscriptionsBreadcrumbs({ rootFolderId }: { rootFolderId: string }) {
  const selectedNodePath = useSelectedNodePath();
  const selectedDriveId = useSelectedDriveId();
  const { isAllowedToCreateDocuments } = useUserPermissions();
  const [isCreating, setIsCreating] = useState(false);

  // Find the index of the root folder in the path
  const rootIndex = selectedNodePath.findIndex(
    (node) => node.id === rootFolderId,
  );

  // Get the path starting from (and including) the root folder
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
        if (node) {
          setSelectedNode(node);
        }
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
    <div className="flex h-9 flex-row items-center gap-2 text-muted-foreground border-b border-border pb-3">
      {visiblePath.map((node) => (
        <Fragment key={node.id}>
          <div
            className="transition-colors last-of-type:text-foreground hover:text-foreground cursor-pointer"
            onClick={() => setSelectedNode(node.id)}
            role="button"
          >
            {node.name}
          </div>
          <span>/</span>
        </Fragment>
      ))}
      {isAllowedToCreateDocuments &&
        (isCreating ? (
          <FolderNameInput onSubmit={handleSubmit} onCancel={handleCancel} />
        ) : (
          <button
            type="button"
            className="ml-1 flex items-center justify-center gap-2 rounded-md bg-muted px-2 py-1.5 transition-colors hover:bg-accent hover:text-accent-foreground"
            onClick={handleAddNew}
          >
            <Plus size={14} />
            Add new
          </button>
        ))}
    </div>
  );
}

export function SubscriptionsOverview() {
  const hasNavigatedToFolder = useRef(false);
  const selectedNodePath = useSelectedNodePath();
  const nodesInCurrentFolder = useNodesInSelectedDriveOrFolder();

  // Use the shared subscriptions hook - this handles:
  // 1. Creating the "Subscriptions" folder if it doesn't exist
  // 2. Moving resource-instance and subscription-instance documents dropped anywhere into the proper folder
  const { subscriptionsFolder } = useSubscriptionsFolder();

  // Navigate to the folder when it exists (only once on mount)
  useEffect(() => {
    if (subscriptionsFolder && !hasNavigatedToFolder.current) {
      hasNavigatedToFolder.current = true;
      setSelectedNode(subscriptionsFolder.id);
    }
  }, [subscriptionsFolder]);

  // Check if we're currently within the Subscriptions folder tree
  const isWithinSubscriptions =
    subscriptionsFolder &&
    selectedNodePath.some((node) => node.id === subscriptionsFolder.id);

  // If user navigated outside Subscriptions folder, bring them back
  useEffect(() => {
    if (
      subscriptionsFolder &&
      !isWithinSubscriptions &&
      hasNavigatedToFolder.current
    ) {
      setSelectedNode(subscriptionsFolder.id);
    }
  }, [subscriptionsFolder, isWithinSubscriptions]);

  // Show loading state while folder is being created
  if (!subscriptionsFolder) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-muted-foreground">
          Setting up Subscriptions folder...
        </div>
      </div>
    );
  }

  // Get folder and file nodes from current selection
  const folderNodes = nodesInCurrentFolder.filter((n) => isFolderNodeKind(n));
  const fileNodes = nodesInCurrentFolder.filter((n) => isFileNodeKind(n));
  const hasFolders = folderNodes.length > 0;
  const hasFiles = fileNodes.length > 0;
  const isEmpty = !hasFolders && !hasFiles;

  return (
    <div>
      <div className="text-2xl font-bold text-center mb-4">Subscriptions</div>
      <div className="space-y-6 px-6">
        {/* Create Document Buttons */}
        <div className="flex gap-2 justify-center pb-4 border-b border-border">
          <button
            type="button"
            onClick={() =>
              showCreateDocumentModal("powerhouse/resource-instance")
            }
            className="flex items-center gap-1.5 px-3 py-1.5 bg-muted text-foreground rounded-md hover:bg-accent transition-colors text-xs border border-border"
          >
            <Plus size={14} />
            New Resource Instance
          </button>
          <button
            type="button"
            onClick={() =>
              showCreateDocumentModal("powerhouse/subscription-instance")
            }
            className="flex items-center gap-1.5 px-3 py-1.5 bg-muted text-foreground rounded-md hover:bg-accent transition-colors text-xs border border-border"
          >
            <Plus size={14} />
            New Subscription Instance
          </button>
        </div>

        <SubscriptionsBreadcrumbs rootFolderId={subscriptionsFolder.id} />

        {hasFolders && (
          <div>
            <h3 className="mb-2 text-sm font-bold text-muted-foreground">
              Folders
            </h3>
            <div className="flex flex-wrap gap-4">
              {folderNodes.map((folderNode) => (
                <FolderItem key={folderNode.id} folderNode={folderNode} />
              ))}
            </div>
          </div>
        )}

        {hasFiles && (
          <div>
            <h3 className="mb-2 text-sm font-semibold text-muted-foreground">
              Documents
            </h3>
            <div className="flex flex-wrap gap-4">
              {fileNodes.map((fileNode) => (
                <FileItem key={fileNode.id} fileNode={fileNode} />
              ))}
            </div>
          </div>
        )}

        {isEmpty && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="text-muted-foreground mb-2">
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
            <p className="text-muted-foreground text-sm">
              No subscriptions yet. Add documents to this folder to get started.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
