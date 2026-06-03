import { useMemo, useCallback, useEffect } from "react";
import {
  isFolderNodeKind,
  isFileNodeKind,
  addFolder,
  useSelectedDrive,
  useDocumentsInSelectedDrive,
  useNodeActions,
} from "@powerhousedao/reactor-browser";
import type {
  FolderNode,
  FileNode,
  Node,
} from "@powerhousedao/shared/document-drive";

const SUBSCRIPTIONS_FOLDER_NAME = "Subscriptions";

// Module-level tracking to prevent duplicate folder creation
const globalCreationState = {
  createdSubscriptionsFolderForDrives: new Set<string>(),
  processedDocs: new Map<string, Set<string>>(),
};

export interface UseSubscriptionsFolderResult {
  /** The Subscriptions folder node, or null if it doesn't exist yet */
  subscriptionsFolder: FolderNode | null;
  /** Set of all node IDs within the Subscriptions folder tree */
  subscriptionsFolderNodeIds: Set<string>;
  /** All resource instance documents */
  resourceInstanceDocuments: any[];
  /** All subscription instance documents */
  subscriptionInstanceDocuments: any[];
  /** Create the Subscriptions folder if it doesn't exist */
  createSubscriptionsFolder: () => Promise<void>;
}

/**
 * Hook that manages the Subscriptions folder in the Contributor Billing drive.
 *
 * This hook:
 * 1. Finds or creates the "Subscriptions" folder at the root level
 * 2. Auto-places resource-instance and subscription-instance documents into it
 * 3. Provides folder info and document lists
 */
export function useSubscriptionsFolder(): UseSubscriptionsFolderResult {
  const [driveDocument] = useSelectedDrive();
  const documentsInDrive = useDocumentsInSelectedDrive();
  const { onMoveNode } = useNodeActions();
  const driveId = driveDocument?.header.id;

  // Initialize module-level tracking sets for this drive if needed
  if (driveId && !globalCreationState.processedDocs.has(driveId)) {
    globalCreationState.processedDocs.set(driveId, new Set());
  }

  // Find the "Subscriptions" folder
  const subscriptionsFolder = useMemo(() => {
    if (!driveDocument) return null;
    const nodes = driveDocument.state.global.nodes;
    return (
      nodes.find(
        (node: Node): node is FolderNode =>
          isFolderNodeKind(node) &&
          node.name === SUBSCRIPTIONS_FOLDER_NAME &&
          !node.parentFolder, // Root level only
      ) ?? null
    );
  }, [driveDocument]);

  // Build a set of all node IDs within the Subscriptions folder tree
  const subscriptionsFolderNodeIds = useMemo(() => {
    const nodeIds = new Set<string>();
    if (!subscriptionsFolder || !driveDocument) return nodeIds;

    const allNodes = driveDocument.state.global.nodes;

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
          nodeIds.add(node.id);
        }
      }
    };

    collectNodeIds(subscriptionsFolder.id);
    return nodeIds;
  }, [subscriptionsFolder, driveDocument]);

  // Filter resource instance documents
  const resourceInstanceDocuments = useMemo(() => {
    if (!documentsInDrive || !driveDocument) return [];

    const resourceInstanceFileNodes = driveDocument.state.global.nodes.filter(
      (node): node is FileNode =>
        isFileNodeKind(node) &&
        node.documentType === "powerhouse/resource-instance" &&
        subscriptionsFolderNodeIds.has(node.id),
    );

    const fileNodeIds = new Set(resourceInstanceFileNodes.map((n) => n.id));

    return documentsInDrive.filter(
      (doc) =>
        doc.header.documentType === "powerhouse/resource-instance" &&
        fileNodeIds.has(doc.header.id),
    );
  }, [documentsInDrive, driveDocument, subscriptionsFolderNodeIds]);

  // Filter subscription instance documents
  const subscriptionInstanceDocuments = useMemo(() => {
    if (!documentsInDrive || !driveDocument) return [];

    const subscriptionInstanceFileNodes =
      driveDocument.state.global.nodes.filter(
        (node): node is FileNode =>
          isFileNodeKind(node) &&
          node.documentType === "powerhouse/subscription-instance" &&
          subscriptionsFolderNodeIds.has(node.id),
      );

    const fileNodeIds = new Set(subscriptionInstanceFileNodes.map((n) => n.id));

    return documentsInDrive.filter(
      (doc) =>
        doc.header.documentType === "powerhouse/subscription-instance" &&
        fileNodeIds.has(doc.header.id),
    );
  }, [documentsInDrive, driveDocument, subscriptionsFolderNodeIds]);

  // Create the Subscriptions folder if it doesn't exist
  const createSubscriptionsFolder = useCallback(async () => {
    if (!driveId || subscriptionsFolder) return;
    if (globalCreationState.createdSubscriptionsFolderForDrives.has(driveId))
      return;

    globalCreationState.createdSubscriptionsFolderForDrives.add(driveId);
    await addFolder(driveId, SUBSCRIPTIONS_FOLDER_NAME);
  }, [driveId, subscriptionsFolder]);

  // Auto-create folder on mount
  useEffect(() => {
    void createSubscriptionsFolder();
  }, [createSubscriptionsFolder]);

  // Auto-place subscription documents into the folder
  useEffect(() => {
    if (!driveId || !subscriptionsFolder || !documentsInDrive) return;

    const allNodes = driveDocument?.state.global.nodes ?? [];
    const processedDocs = globalCreationState.processedDocs.get(driveId);
    if (!processedDocs) return;

    // Find documents that need to be moved
    const subscriptionNodesOutsideFolder = allNodes.filter(
      (node): node is FileNode =>
        isFileNodeKind(node) &&
        (node.documentType === "powerhouse/resource-instance" ||
          node.documentType === "powerhouse/subscription-instance") &&
        !subscriptionsFolderNodeIds.has(node.id),
    );

    // Move each document
    for (const fileNode of subscriptionNodesOutsideFolder) {
      if (processedDocs.has(fileNode.id)) continue;

      processedDocs.add(fileNode.id);

      onMoveNode(fileNode, subscriptionsFolder).catch((error: unknown) => {
        console.error(
          `Failed to move subscription document to Subscriptions folder:`,
          error,
        );
        processedDocs.delete(fileNode.id);
      });
    }
  }, [
    driveId,
    driveDocument,
    subscriptionsFolder,
    documentsInDrive,
    subscriptionsFolderNodeIds,
    onMoveNode,
  ]);

  return {
    subscriptionsFolder,
    subscriptionsFolderNodeIds,
    resourceInstanceDocuments,
    subscriptionInstanceDocuments,
    createSubscriptionsFolder,
  };
}
