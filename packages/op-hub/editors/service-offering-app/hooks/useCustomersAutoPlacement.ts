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
import { isDocumentSynced } from "../../shared/document-sync.js";

const CUSTOMERS_FOLDER_NAME = "Customers";

// Module-level tracking to prevent duplicate folder creation across all hook instances
const globalCreationState = {
  createdCustomersFolderForDrives: new Set<string>(),
  processedDocs: new Map<string, Set<string>>(), // driveId -> Set of doc IDs processed
};

interface UseCustomersAutoPlacementResult {
  /** The Customers folder node, or null if it doesn't exist yet */
  customersFolder: FolderNode | null;
  /** Set of all node IDs within the Customers folder tree */
  customersFolderNodeIds: Set<string>;
  /** All resource instance documents within the Customers folder */
  resourceInstanceDocuments: unknown[];
  /** All subscription instance documents within the Customers folder */
  subscriptionInstanceDocuments: unknown[];
}

/**
 * Hook that handles automatic placement of service subscription documents into the
 * "Customers" folder.
 *
 * This hook:
 * 1. Creates the "Customers" folder if it doesn't exist
 * 2. Monitors for resource-instance and subscription-instance documents dropped anywhere in the drive
 * 3. Automatically moves them into the "Customers" folder
 *
 * Use this hook in any component that needs the auto-placement behavior.
 */
export function useCustomersAutoPlacement(): UseCustomersAutoPlacementResult {
  const [driveDocument] = useSelectedDrive();
  const documentsInDrive = useDocumentsInSelectedDrive();
  const driveId = driveDocument?.header.id;

  // Initialize module-level tracking sets for this drive if needed
  if (driveId && !globalCreationState.processedDocs.has(driveId)) {
    globalCreationState.processedDocs.set(driveId, new Set());
  }

  // Find the "Customers" folder in the drive
  const customersFolder = useMemo(() => {
    if (!driveDocument) return null;
    const nodes = driveDocument.state.global.nodes;
    return (
      nodes.find(
        (node: Node): node is FolderNode =>
          isFolderNodeKind(node) && node.name === CUSTOMERS_FOLDER_NAME,
      ) ?? null
    );
  }, [driveDocument]);

  // Build a set of all node IDs within the Customers folder tree
  const customersFolderNodeIds = useMemo(() => {
    const nodeIds = new Set<string>();
    if (!customersFolder || !driveDocument) return nodeIds;

    const allNodes = driveDocument.state.global.nodes;

    // Recursively collect folder IDs and service subscription file IDs within the folder
    const collectNodeIds = (parentId: string) => {
      nodeIds.add(parentId);
      for (const node of allNodes) {
        if (isFolderNodeKind(node) && node.parentFolder === parentId) {
          collectNodeIds(node.id);
        } else if (
          isFileNodeKind(node) &&
          node.parentFolder === parentId &&
          (node.documentType === "powerhouse/resource-instance" ||
            node.documentType === "powerhouse/subscription-instance")
        ) {
          // Only include resource-instance and subscription-instance documents
          nodeIds.add(node.id);
        }
      }
    };

    collectNodeIds(customersFolder.id);
    return nodeIds;
  }, [customersFolder, driveDocument]);

  // Filter resource instance documents that are inside the Customers folder
  const resourceInstanceDocuments = useMemo(() => {
    if (!documentsInDrive || !driveDocument) return [];

    // Get file nodes for resource instances in the Customers folder
    const resourceInstanceFileNodes = driveDocument.state.global.nodes.filter(
      (node): node is FileNode =>
        isFileNodeKind(node) &&
        node.documentType === "powerhouse/resource-instance" &&
        customersFolderNodeIds.has(node.id),
    );

    // Map file node IDs to their documents
    const fileNodeIds = new Set(resourceInstanceFileNodes.map((n) => n.id));

    return documentsInDrive.filter(
      (doc) =>
        doc.header.documentType === "powerhouse/resource-instance" &&
        fileNodeIds.has(doc.header.id),
    );
  }, [documentsInDrive, driveDocument, customersFolderNodeIds]);

  // Filter subscription instance documents that are inside the Customers folder
  const subscriptionInstanceDocuments = useMemo(() => {
    if (!documentsInDrive || !driveDocument) return [];

    // Get file nodes for subscription instances in the Customers folder
    const subscriptionInstanceFileNodes =
      driveDocument.state.global.nodes.filter(
        (node): node is FileNode =>
          isFileNodeKind(node) &&
          node.documentType === "powerhouse/subscription-instance" &&
          customersFolderNodeIds.has(node.id),
      );

    // Map file node IDs to their documents
    const fileNodeIds = new Set(subscriptionInstanceFileNodes.map((n) => n.id));

    return documentsInDrive.filter(
      (doc) =>
        doc.header.documentType === "powerhouse/subscription-instance" &&
        fileNodeIds.has(doc.header.id),
    );
  }, [documentsInDrive, driveDocument, customersFolderNodeIds]);

  // Create folder if it doesn't exist
  useEffect(() => {
    if (!driveId || customersFolder) return;
    if (globalCreationState.createdCustomersFolderForDrives.has(driveId))
      return;

    globalCreationState.createdCustomersFolderForDrives.add(driveId);
    void addFolder(driveId, CUSTOMERS_FOLDER_NAME);
  }, [driveId, customersFolder]);

  // Auto-place service subscription documents into the folder
  // This monitors ALL resource-instance and subscription-instance documents in the drive
  useEffect(() => {
    if (!driveId || !customersFolder || !documentsInDrive) return;

    const allNodes = driveDocument?.state.global.nodes ?? [];
    const processedDocs = globalCreationState.processedDocs.get(driveId);
    if (!processedDocs) return;

    // Find ALL resource-instance and subscription-instance file nodes that are NOT inside the Customers folder tree
    // These need to be moved into the folder
    const customerDocsOutsideFolder = allNodes.filter(
      (node): node is FileNode =>
        isFileNodeKind(node) &&
        (node.documentType === "powerhouse/resource-instance" ||
          node.documentType === "powerhouse/subscription-instance") &&
        !customersFolderNodeIds.has(node.id),
    );

    // Process each service subscription document
    for (const fileNode of customerDocsOutsideFolder) {
      // Skip if already processed
      if (processedDocs.has(fileNode.id)) continue;

      // Check if the document is synced before attempting the move
      // If not synced yet, skip it — the effect will re-run when documentsInDrive updates
      const doc = documentsInDrive?.find((d) => d.header.id === fileNode.id);
      if (doc && !isDocumentSynced(doc)) {
        // Document exists but hasn't finished syncing — skip for now
        continue;
      }

      // Mark as processed immediately to prevent duplicate processing
      processedDocs.add(fileNode.id);

      // Move the document to the Customers folder root
      dispatchActions(
        moveNode({
          srcFolder: fileNode.id,
          targetParentFolder: customersFolder.id,
        }),
        driveId,
      ).catch((error: unknown) => {
        const msg = error instanceof Error ? error.message : String(error);
        if (msg.includes("source document not found")) {
          // Document not yet synced — will retry on next render cycle
          console.debug(
            `[CustomersAutoPlacement] Document ${fileNode.id} not synced yet, will retry`,
          );
        } else {
          console.error(
            `[CustomersAutoPlacement] Failed to move document:`,
            error,
          );
        }
        // Remove from processed so it can be retried
        processedDocs.delete(fileNode.id);
      });
    }
  }, [
    driveId,
    driveDocument,
    customersFolder,
    documentsInDrive,
    customersFolderNodeIds,
  ]);

  return {
    customersFolder,
    customersFolderNodeIds,
    resourceInstanceDocuments,
    subscriptionInstanceDocuments,
  };
}
