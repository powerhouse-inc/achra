import { useEffect, useMemo } from "react";
import {
  isFolderNodeKind,
  isFileNodeKind,
  addFolder,
  useSelectedDrive,
  useDocumentsInSelectedDrive,
  dispatchActions,
} from "@powerhousedao/reactor-browser";
import { moveNode } from "@powerhousedao/shared/document-drive";
import type {
  FolderNode,
  FileNode,
  Node,
} from "@powerhousedao/shared/document-drive";
import type { ExpenseReportDocument } from "../../../document-models/expense-report/v1/gen/types.js";
import { isDocumentSynced } from "../../shared/document-sync.js";

const EXPENSE_REPORTS_FOLDER_NAME = "Expense Reports";

// Module-level tracking to prevent duplicate folder creation across all hook instances
// This is necessary because the hook may be used in multiple components simultaneously
const globalCreationState = {
  createdExpenseReportsFolderForDrives: new Set<string>(),
  creatingYearFolders: new Map<string, Set<string>>(), // driveId -> Set of years being created
  processedDocs: new Map<string, Set<string>>(), // driveId -> Set of doc IDs processed
};

interface UseExpenseReportAutoPlacementResult {
  /** The Expense Reports folder node, or null if it doesn't exist yet */
  expenseReportsFolder: FolderNode | null;
  /** Set of all node IDs within the Expense Reports folder tree */
  expenseReportsFolderNodeIds: Set<string>;
  /** All expense report documents within the Expense Reports folder */
  expenseReportDocuments: ExpenseReportDocument[];
}

/**
 * Hook that handles automatic placement of expense report documents into the
 * "Expense Reports" folder, organized by year based on periodStart.
 *
 * This hook:
 * 1. Creates the "Expense Reports" folder if it doesn't exist
 * 2. Monitors for expense report documents dropped anywhere in the drive
 * 3. Automatically moves them into year-based subfolders under "Expense Reports"
 *
 * Use this hook in any component that needs the auto-placement behavior,
 * regardless of the current view (main overview, expense reports view, etc.)
 */
export function useExpenseReportAutoPlacement(): UseExpenseReportAutoPlacementResult {
  const [driveDocument] = useSelectedDrive();
  const documentsInDrive = useDocumentsInSelectedDrive();
  const driveId = driveDocument?.header.id;

  // Initialize module-level tracking sets for this drive if needed
  if (driveId && !globalCreationState.creatingYearFolders.has(driveId)) {
    globalCreationState.creatingYearFolders.set(driveId, new Set());
  }
  if (driveId && !globalCreationState.processedDocs.has(driveId)) {
    globalCreationState.processedDocs.set(driveId, new Set());
  }

  // Find the "Expense Reports" folder in the drive
  const expenseReportsFolder = useMemo(() => {
    if (!driveDocument) return null;
    const nodes = driveDocument.state.global.nodes;
    return (
      nodes.find(
        (node: Node): node is FolderNode =>
          isFolderNodeKind(node) && node.name === EXPENSE_REPORTS_FOLDER_NAME,
      ) ?? null
    );
  }, [driveDocument]);

  // Build a set of all EXPENSE REPORT node IDs within the Expense Reports folder tree
  // This only includes expense-report documents, not other document types
  const expenseReportsFolderNodeIds = useMemo(() => {
    const nodeIds = new Set<string>();
    if (!expenseReportsFolder || !driveDocument) return nodeIds;

    const allNodes = driveDocument.state.global.nodes;

    // Recursively collect folder IDs and expense report file IDs within the Expense Reports folder
    const collectNodeIds = (parentId: string) => {
      nodeIds.add(parentId);
      for (const node of allNodes) {
        if (isFolderNodeKind(node) && node.parentFolder === parentId) {
          collectNodeIds(node.id);
        } else if (
          isFileNodeKind(node) &&
          node.parentFolder === parentId &&
          node.documentType === "powerhouse/expense-report"
        ) {
          // Only include expense-report documents, not other types
          nodeIds.add(node.id);
        }
      }
    };

    collectNodeIds(expenseReportsFolder.id);
    return nodeIds;
  }, [expenseReportsFolder, driveDocument]);

  // Filter expense report documents that are inside the Expense Reports folder
  const expenseReportDocuments = useMemo(() => {
    if (!documentsInDrive || !driveDocument) return [];

    // Get file nodes for expense reports in the Expense Reports folder
    const expenseReportFileNodes = driveDocument.state.global.nodes.filter(
      (node): node is FileNode =>
        isFileNodeKind(node) &&
        node.documentType === "powerhouse/expense-report" &&
        expenseReportsFolderNodeIds.has(node.id),
    );

    // Map file node IDs to their documents
    const fileNodeIds = new Set(expenseReportFileNodes.map((n) => n.id));

    return documentsInDrive.filter(
      (doc): doc is ExpenseReportDocument =>
        doc.header.documentType === "powerhouse/expense-report" &&
        fileNodeIds.has(doc.header.id),
    );
  }, [documentsInDrive, driveDocument, expenseReportsFolderNodeIds]);

  // Create folder if it doesn't exist
  useEffect(() => {
    if (!driveId || expenseReportsFolder) return;
    if (globalCreationState.createdExpenseReportsFolderForDrives.has(driveId))
      return;

    globalCreationState.createdExpenseReportsFolderForDrives.add(driveId);
    void addFolder(driveId, EXPENSE_REPORTS_FOLDER_NAME);
  }, [driveId, expenseReportsFolder]);

  // Get year folders that exist directly under the Expense Reports folder
  const yearFolders = useMemo(() => {
    if (!driveDocument || !expenseReportsFolder)
      return new Map<string, FolderNode>();
    const folders = new Map<string, FolderNode>(); // year string -> folder node
    for (const node of driveDocument.state.global.nodes) {
      if (
        isFolderNodeKind(node) &&
        node.parentFolder === expenseReportsFolder.id &&
        /^\d{4}$/.test(node.name) // folder name is a 4-digit year
      ) {
        folders.set(node.name, node);
      }
    }
    return folders;
  }, [driveDocument, expenseReportsFolder]);

  // Auto-place expense reports into year folders based on periodStart
  // This monitors ALL expense reports in the drive, not just those in the Expense Reports folder
  useEffect(() => {
    if (!driveId || !expenseReportsFolder || !documentsInDrive) return;

    const allNodes = driveDocument?.state.global.nodes ?? [];
    const processedDocs = globalCreationState.processedDocs.get(driveId);
    const creatingYearFolders =
      globalCreationState.creatingYearFolders.get(driveId);
    if (!processedDocs || !creatingYearFolders) return;

    // Find ALL expense report file nodes that are NOT inside the Expense Reports folder tree
    // These need to be moved into the proper location
    const expenseReportNodesOutsideFolder = allNodes.filter(
      (node): node is FileNode =>
        isFileNodeKind(node) &&
        node.documentType === "powerhouse/expense-report" &&
        !expenseReportsFolderNodeIds.has(node.id),
    );

    // Also check for expense reports directly in the Expense Reports root folder
    // (these need to be moved to year subfolders)
    const expenseReportNodesInRoot = allNodes.filter(
      (node): node is FileNode =>
        isFileNodeKind(node) &&
        node.documentType === "powerhouse/expense-report" &&
        node.parentFolder === expenseReportsFolder.id,
    );

    // Combine both sets of nodes that need processing
    const nodesToProcess = [
      ...expenseReportNodesOutsideFolder,
      ...expenseReportNodesInRoot,
    ];

    // Process each expense report
    for (const fileNode of nodesToProcess) {
      // Skip if already processed
      if (processedDocs.has(fileNode.id)) continue;

      // Find the corresponding document to get periodStart
      const doc = documentsInDrive.find(
        (d): d is ExpenseReportDocument =>
          d.header.documentType === "powerhouse/expense-report" &&
          d.header.id === fileNode.id,
      );

      if (!doc || !isDocumentSynced(doc)) continue;

      const periodStart = doc.state.global.periodStart;
      if (!periodStart) {
        // No period defined - move to root of Expense Reports folder
        // (this signals something might be wrong with the document)
        processedDocs.add(fileNode.id);

        // Only move if not already in the Expense Reports folder
        if (!expenseReportsFolderNodeIds.has(fileNode.id)) {
          dispatchActions(
            moveNode({
              srcFolder: fileNode.id,
              targetParentFolder: expenseReportsFolder.id,
            }),
            driveId,
          ).catch((error: unknown) => {
            console.error(
              `Failed to move expense report to Expense Reports folder:`,
              error,
            );
            processedDocs.delete(fileNode.id);
          });
        }
        continue;
      }

      // Extract year from periodStart
      const year = new Date(periodStart).getFullYear().toString();

      // Mark as processed immediately to prevent duplicate processing
      processedDocs.add(fileNode.id);

      // Check if year folder exists
      const existingYearFolder = yearFolders.get(year);

      if (existingYearFolder) {
        // Year folder exists - move the document there
        dispatchActions(
          moveNode({
            srcFolder: fileNode.id,
            targetParentFolder: existingYearFolder.id,
          }),
          driveId,
        ).catch((error: unknown) => {
          console.error(
            `Failed to move expense report to ${year} folder:`,
            error,
          );
          // Remove from processed so it can be retried
          processedDocs.delete(fileNode.id);
        });
      } else if (creatingYearFolders.has(year)) {
        // Year folder is being created by another document - remove from processed
        // so it can be retried on the next effect run when the folder exists
        processedDocs.delete(fileNode.id);
      } else {
        // Mark this year as being created to prevent race conditions
        creatingYearFolders.add(year);

        // Create year folder first, then move the document
        addFolder(driveId, year, expenseReportsFolder.id)
          .then((newFolder) => {
            if (newFolder) {
              // Move the document to the new year folder
              return dispatchActions(
                moveNode({
                  srcFolder: fileNode.id,
                  targetParentFolder: newFolder.id,
                }),
                driveId,
              );
            }
          })
          .catch((error: unknown) => {
            console.error(
              `Failed to create ${year} folder or move expense report:`,
              error,
            );
            // Remove from processed so it can be retried
            processedDocs.delete(fileNode.id);
          })
          .finally(() => {
            // Clean up the creating flag when done (success or failure)
            creatingYearFolders.delete(year);
          });
      }
    }
  }, [
    driveId,
    driveDocument,
    expenseReportsFolder,
    documentsInDrive,
    expenseReportsFolderNodeIds,
    yearFolders,
  ]);

  return {
    expenseReportsFolder,
    expenseReportsFolderNodeIds,
    expenseReportDocuments,
  };
}
