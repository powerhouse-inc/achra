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
} from "@powerhousedao/reactor-browser";
import { useEffect, useRef, useState, Fragment } from "react";
import { Plus } from "lucide-react";
import { ExpenseReportsStats } from "./ExpenseReportsStats.js";
import { useExpenseReportAutoPlacement } from "../hooks/useExpenseReportAutoPlacement.js";

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
      className="text-gray-800 bg-transparent border-b border-gray-400 outline-none px-1 py-0.5 text-sm min-w-[100px]"
      placeholder="New Folder"
    />
  );
}

/**
 * Custom breadcrumbs component that treats "Expense Reports" folder as the root.
 * Only shows path from "Expense Reports" folder onwards.
 * Includes folder creation functionality.
 */
function ExpenseReportsBreadcrumbs({ rootFolderId }: { rootFolderId: string }) {
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
      {isAllowedToCreateDocuments &&
        (isCreating ? (
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
        ))}
    </div>
  );
}

export function ExpenseReports() {
  const hasNavigatedToFolder = useRef(false);
  const selectedNodePath = useSelectedNodePath();
  const nodesInCurrentFolder = useNodesInSelectedDriveOrFolder();

  // Use the shared auto-placement hook - this handles:
  // 1. Creating the "Expense Reports" folder if it doesn't exist
  // 2. Moving expense reports dropped anywhere into the proper folder
  // 3. Organizing expense reports into year-based subfolders
  const { expenseReportsFolder, expenseReportDocuments } =
    useExpenseReportAutoPlacement();

  // Navigate to the folder when it exists (only once on mount)
  useEffect(() => {
    if (expenseReportsFolder && !hasNavigatedToFolder.current) {
      hasNavigatedToFolder.current = true;
      setSelectedNode(expenseReportsFolder.id);
    }
  }, [expenseReportsFolder]);

  // Check if we're currently within the Expense Reports folder tree
  const isWithinExpenseReports =
    expenseReportsFolder &&
    selectedNodePath.some((node) => node.id === expenseReportsFolder.id);

  // If user navigated outside Expense Reports folder, bring them back
  useEffect(() => {
    if (
      expenseReportsFolder &&
      !isWithinExpenseReports &&
      hasNavigatedToFolder.current
    ) {
      setSelectedNode(expenseReportsFolder.id);
    }
  }, [expenseReportsFolder, isWithinExpenseReports]);

  // Show loading state while folder is being created
  if (!expenseReportsFolder) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">
          Setting up Expense Reports folder...
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

  const hasExpenseReports = expenseReportDocuments.length > 0;

  return (
    <div>
      <div className="text-2xl font-bold text-center mb-4">Expense Reports</div>
      <div className="space-y-6 px-6">
        {/* Stats section - only shown when there are expense reports */}
        {hasExpenseReports && (
          <ExpenseReportsStats
            expenseReportDocuments={expenseReportDocuments}
          />
        )}

        <ExpenseReportsBreadcrumbs rootFolderId={expenseReportsFolder.id} />

        {hasFolders && (
          <div>
            <h3 className="mb-2 text-sm font-bold text-gray-600">Folders</h3>
            <div className="flex flex-wrap gap-4">
              {folderNodes.map((folderNode) => (
                <FolderItem key={folderNode.id} folderNode={folderNode} />
              ))}
            </div>
          </div>
        )}

        {hasFiles && (
          <div>
            <h3 className="mb-2 text-sm font-semibold text-gray-600">
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
            <div className="text-gray-400 mb-2">
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
            <p className="text-gray-500 text-sm">
              No expense reports yet. Add documents to this folder to get
              started.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
