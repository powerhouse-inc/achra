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
import type { SnapshotReportDocument } from "../../../document-models/snapshot-report/v1/gen/types.js";
import { isDocumentSynced } from "../../shared/document-sync.js";

const SNAPSHOT_REPORTS_FOLDER_NAME = "Snapshot Reports";

// Module-level tracking to prevent duplicate folder creation across all hook instances
// This is necessary because the hook may be used in multiple components simultaneously
const globalCreationState = {
  createdSnapshotReportsFolderForDrives: new Set<string>(),
  creatingYearFolders: new Map<string, Set<string>>(), // driveId -> Set of years being created
  processedDocs: new Map<string, Set<string>>(), // driveId -> Set of doc IDs processed
};

interface UseSnapshotReportAutoPlacementResult {
  /** The Snapshot Reports folder node, or null if it doesn't exist yet */
  snapshotReportsFolder: FolderNode | null;
  /** Set of all node IDs within the Snapshot Reports folder tree */
  snapshotReportsFolderNodeIds: Set<string>;
  /** All snapshot report documents within the Snapshot Reports folder */
  snapshotReportDocuments: SnapshotReportDocument[];
}

/**
 * Hook that handles automatic placement of snapshot report documents into the
 * "Snapshot Reports" folder, organized by year based on startDate.
 *
 * This hook:
 * 1. Creates the "Snapshot Reports" folder if it doesn't exist
 * 2. Monitors for snapshot report documents dropped anywhere in the drive
 * 3. Automatically moves them into year-based subfolders under "Snapshot Reports"
 *
 * Use this hook in any component that needs the auto-placement behavior,
 * regardless of the current view (main overview, snapshot reports view, etc.)
 */
export function useSnapshotReportAutoPlacement(): UseSnapshotReportAutoPlacementResult {
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

  // Find the "Snapshot Reports" folder in the drive
  const snapshotReportsFolder = useMemo(() => {
    if (!driveDocument) return null;
    const nodes = driveDocument.state.global.nodes;
    return (
      nodes.find(
        (node: Node): node is FolderNode =>
          isFolderNodeKind(node) && node.name === SNAPSHOT_REPORTS_FOLDER_NAME,
      ) ?? null
    );
  }, [driveDocument]);

  // Build a set of all SNAPSHOT REPORT node IDs within the Snapshot Reports folder tree
  // This only includes snapshot-report documents, not other document types
  const snapshotReportsFolderNodeIds = useMemo(() => {
    const nodeIds = new Set<string>();
    if (!snapshotReportsFolder || !driveDocument) return nodeIds;

    const allNodes = driveDocument.state.global.nodes;

    // Recursively collect folder IDs and snapshot report file IDs within the Snapshot Reports folder
    const collectNodeIds = (parentId: string) => {
      nodeIds.add(parentId);
      for (const node of allNodes) {
        if (isFolderNodeKind(node) && node.parentFolder === parentId) {
          collectNodeIds(node.id);
        } else if (
          isFileNodeKind(node) &&
          node.parentFolder === parentId &&
          node.documentType === "powerhouse/snapshot-report"
        ) {
          // Only include snapshot-report documents, not other types
          nodeIds.add(node.id);
        }
      }
    };

    collectNodeIds(snapshotReportsFolder.id);
    return nodeIds;
  }, [snapshotReportsFolder, driveDocument]);

  // Filter snapshot report documents that are inside the Snapshot Reports folder
  const snapshotReportDocuments = useMemo(() => {
    if (!documentsInDrive || !driveDocument) return [];

    // Get file nodes for snapshot reports in the Snapshot Reports folder
    const snapshotReportFileNodes = driveDocument.state.global.nodes.filter(
      (node): node is FileNode =>
        isFileNodeKind(node) &&
        node.documentType === "powerhouse/snapshot-report" &&
        snapshotReportsFolderNodeIds.has(node.id),
    );

    // Map file node IDs to their documents
    const fileNodeIds = new Set(snapshotReportFileNodes.map((n) => n.id));

    return documentsInDrive.filter(
      (doc): doc is SnapshotReportDocument =>
        doc.header.documentType === "powerhouse/snapshot-report" &&
        fileNodeIds.has(doc.header.id),
    );
  }, [documentsInDrive, driveDocument, snapshotReportsFolderNodeIds]);

  // Create folder if it doesn't exist
  useEffect(() => {
    if (!driveId || snapshotReportsFolder) return;
    if (globalCreationState.createdSnapshotReportsFolderForDrives.has(driveId))
      return;

    globalCreationState.createdSnapshotReportsFolderForDrives.add(driveId);
    void addFolder(driveId, SNAPSHOT_REPORTS_FOLDER_NAME);
  }, [driveId, snapshotReportsFolder]);

  // Get year folders that exist directly under the Snapshot Reports folder
  const yearFolders = useMemo(() => {
    if (!driveDocument || !snapshotReportsFolder)
      return new Map<string, FolderNode>();
    const folders = new Map<string, FolderNode>(); // year string -> folder node
    for (const node of driveDocument.state.global.nodes) {
      if (
        isFolderNodeKind(node) &&
        node.parentFolder === snapshotReportsFolder.id &&
        /^\d{4}$/.test(node.name) // folder name is a 4-digit year
      ) {
        folders.set(node.name, node);
      }
    }
    return folders;
  }, [driveDocument, snapshotReportsFolder]);

  // Auto-place snapshot reports into year folders based on startDate
  // This monitors ALL snapshot reports in the drive, not just those in the Snapshot Reports folder
  useEffect(() => {
    if (!driveId || !snapshotReportsFolder || !documentsInDrive) return;

    const allNodes = driveDocument?.state.global.nodes ?? [];
    const processedDocs = globalCreationState.processedDocs.get(driveId);
    const creatingYearFolders =
      globalCreationState.creatingYearFolders.get(driveId);
    if (!processedDocs || !creatingYearFolders) return;

    // Find ALL snapshot report file nodes that are NOT inside the Snapshot Reports folder tree
    // These need to be moved into the proper location
    const snapshotReportNodesOutsideFolder = allNodes.filter(
      (node): node is FileNode =>
        isFileNodeKind(node) &&
        node.documentType === "powerhouse/snapshot-report" &&
        !snapshotReportsFolderNodeIds.has(node.id),
    );

    // Also check for snapshot reports directly in the Snapshot Reports root folder
    // (these need to be moved to year subfolders)
    const snapshotReportNodesInRoot = allNodes.filter(
      (node): node is FileNode =>
        isFileNodeKind(node) &&
        node.documentType === "powerhouse/snapshot-report" &&
        node.parentFolder === snapshotReportsFolder.id,
    );

    // Combine both sets of nodes that need processing
    const nodesToProcess = [
      ...snapshotReportNodesOutsideFolder,
      ...snapshotReportNodesInRoot,
    ];

    // Process each snapshot report
    for (const fileNode of nodesToProcess) {
      // Skip if already processed
      if (processedDocs.has(fileNode.id)) continue;

      // Find the corresponding document to get startDate
      const doc = documentsInDrive.find(
        (d): d is SnapshotReportDocument =>
          d.header.documentType === "powerhouse/snapshot-report" &&
          d.header.id === fileNode.id,
      );

      if (!doc || !isDocumentSynced(doc)) continue;

      const startDate = doc.state.global.startDate;
      if (!startDate) {
        // No period defined - move to root of Snapshot Reports folder
        // (this signals something might be wrong with the document)
        processedDocs.add(fileNode.id);

        // Only move if not already in the Snapshot Reports folder
        if (!snapshotReportsFolderNodeIds.has(fileNode.id)) {
          dispatchActions(
            moveNode({
              srcFolder: fileNode.id,
              targetParentFolder: snapshotReportsFolder.id,
            }),
            driveId,
          ).catch((error: unknown) => {
            console.error(
              `Failed to move snapshot report to Snapshot Reports folder:`,
              error,
            );
            processedDocs.delete(fileNode.id);
          });
        }
        continue;
      }

      // Extract year from startDate
      const year = new Date(startDate).getFullYear().toString();

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
            `Failed to move snapshot report to ${year} folder:`,
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
        addFolder(driveId, year, snapshotReportsFolder.id)
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
              `Failed to create ${year} folder or move snapshot report:`,
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
    snapshotReportsFolder,
    documentsInDrive,
    snapshotReportsFolderNodeIds,
    yearFolders,
  ]);

  return {
    snapshotReportsFolder,
    snapshotReportsFolderNodeIds,
    snapshotReportDocuments,
  };
}
