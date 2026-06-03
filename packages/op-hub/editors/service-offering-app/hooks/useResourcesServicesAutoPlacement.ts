import { useEffect, useMemo } from "react";
import {
  isFolderNodeKind,
  isFileNodeKind,
  addFolder,
  useSelectedDrive,
  dispatchActions,
} from "@powerhousedao/reactor-browser";
import { deleteNode, moveNode } from "@powerhousedao/shared/document-drive";
import type {
  FolderNode,
  FileNode,
  Node,
} from "@powerhousedao/shared/document-drive";

const SERVICES_AND_OFFERINGS_FOLDER_NAME = "Services And Offerings";
const PRODUCTS_FOLDER_NAME = "Products";
const SERVICE_OFFERINGS_FOLDER_NAME = "Service Offerings";

// Old folder names that might exist from previous structure (for migration)
const OLD_RESOURCE_TEMPLATES_FOLDER_NAME = "Resource Templates";

// Module-level tracking to prevent duplicate folder creation across all hook instances
const globalCreationState = {
  createdServicesAndOfferingsFolderForDrives: new Set<string>(),
  createdProductsFolderForDrives: new Set<string>(),
  createdServiceOfferingsFolderForDrives: new Set<string>(),
  processedDocs: new Map<string, Set<string>>(), // driveId -> Set of doc IDs processed
  migratedOldFolders: new Set<string>(), // driveId where migration has been completed
};

interface UseResourcesServicesAutoPlacementResult {
  /** The parent "Services And Offerings" folder node, or null if it doesn't exist yet */
  servicesAndOfferingsFolder: FolderNode | null;
  /** The Products folder node (inside Services And Offerings), or null if it doesn't exist yet */
  resourceTemplatesFolder: FolderNode | null;
  /** The Service Offerings folder node (inside Services And Offerings), or null if it doesn't exist yet */
  serviceOfferingsFolder: FolderNode | null;
  /** Set of all node IDs within the Products folder tree */
  resourceTemplatesNodeIds: Set<string>;
  /** Set of all node IDs within the Service Offerings folder tree */
  serviceOfferingsNodeIds: Set<string>;
  /** All resource template documents within the Products folder */
  resourceTemplateDocuments: FileNode[];
  /** All service offering documents within the Service Offerings folder */
  serviceOfferingDocuments: FileNode[];
}

/**
 * Hook that handles automatic creation of "Services And Offerings" parent folder
 * with "Products" and "Service Offerings" subfolders, and migrates existing documents
 * from old folder structure.
 *
 * Folder structure:
 * - Services And Offerings (parent folder)
 *   - Products (for powerhouse/resource-template docs)
 *   - Service Offerings (for powerhouse/service-offering docs)
 *
 * This hook:
 * 1. Creates the folder structure if it doesn't exist
 * 2. Migrates existing documents from old folders to new structure
 * 3. Deletes old folders after migration
 * 4. Provides access to documents within each folder
 */
export function useResourcesServicesAutoPlacement(): UseResourcesServicesAutoPlacementResult {
  const [driveDocument] = useSelectedDrive();
  const driveId = driveDocument?.header.id;

  // Initialize module-level tracking sets for this drive if needed
  if (driveId && !globalCreationState.processedDocs.has(driveId)) {
    globalCreationState.processedDocs.set(driveId, new Set());
  }

  // Find the "Services And Offerings" parent folder in the drive (at root level)
  const servicesAndOfferingsFolder = useMemo(() => {
    if (!driveDocument) return null;
    const nodes = driveDocument.state.global.nodes;
    return (
      nodes.find(
        (node: Node): node is FolderNode =>
          isFolderNodeKind(node) &&
          node.name === SERVICES_AND_OFFERINGS_FOLDER_NAME &&
          !node.parentFolder, // Must be at root level
      ) ?? null
    );
  }, [driveDocument]);

  // Find the "Products" folder (must be inside Services And Offerings folder)
  const resourceTemplatesFolder = useMemo(() => {
    if (!driveDocument || !servicesAndOfferingsFolder) return null;
    const nodes = driveDocument.state.global.nodes;
    return (
      nodes.find(
        (node: Node): node is FolderNode =>
          isFolderNodeKind(node) &&
          node.name === PRODUCTS_FOLDER_NAME &&
          node.parentFolder === servicesAndOfferingsFolder.id,
      ) ?? null
    );
  }, [driveDocument, servicesAndOfferingsFolder]);

  // Find the "Service Offerings" folder (must be inside Services And Offerings folder)
  const serviceOfferingsFolder = useMemo(() => {
    if (!driveDocument || !servicesAndOfferingsFolder) return null;
    const nodes = driveDocument.state.global.nodes;
    return (
      nodes.find(
        (node: Node): node is FolderNode =>
          isFolderNodeKind(node) &&
          node.name === SERVICE_OFFERINGS_FOLDER_NAME &&
          node.parentFolder === servicesAndOfferingsFolder.id,
      ) ?? null
    );
  }, [driveDocument, servicesAndOfferingsFolder]);

  // Find old folders that might exist from previous structure (at root level)
  const oldResourceTemplatesFolder = useMemo(() => {
    if (!driveDocument) return null;
    const nodes = driveDocument.state.global.nodes;
    return (
      nodes.find(
        (node: Node): node is FolderNode =>
          isFolderNodeKind(node) &&
          (node.name === OLD_RESOURCE_TEMPLATES_FOLDER_NAME ||
            node.name === PRODUCTS_FOLDER_NAME) &&
          !node.parentFolder, // At root level (old structure)
      ) ?? null
    );
  }, [driveDocument]);

  const oldServiceOfferingsFolder = useMemo(() => {
    if (!driveDocument) return null;
    const nodes = driveDocument.state.global.nodes;
    return (
      nodes.find(
        (node: Node): node is FolderNode =>
          isFolderNodeKind(node) &&
          node.name === SERVICE_OFFERINGS_FOLDER_NAME &&
          !node.parentFolder, // At root level (old structure)
      ) ?? null
    );
  }, [driveDocument]);

  // Build a set of all node IDs within the Products folder tree
  const resourceTemplatesNodeIds = useMemo(() => {
    const nodeIds = new Set<string>();
    if (!resourceTemplatesFolder || !driveDocument) return nodeIds;

    const allNodes = driveDocument.state.global.nodes;

    const collectNodeIds = (parentId: string) => {
      nodeIds.add(parentId);
      for (const node of allNodes) {
        if (isFolderNodeKind(node) && node.parentFolder === parentId) {
          collectNodeIds(node.id);
        } else if (
          isFileNodeKind(node) &&
          node.parentFolder === parentId &&
          node.documentType === "powerhouse/resource-template"
        ) {
          nodeIds.add(node.id);
        }
      }
    };

    collectNodeIds(resourceTemplatesFolder.id);
    return nodeIds;
  }, [resourceTemplatesFolder, driveDocument]);

  // Build a set of all node IDs within the Service Offerings folder tree
  const serviceOfferingsNodeIds = useMemo(() => {
    const nodeIds = new Set<string>();
    if (!serviceOfferingsFolder || !driveDocument) return nodeIds;

    const allNodes = driveDocument.state.global.nodes;

    const collectNodeIds = (parentId: string) => {
      nodeIds.add(parentId);
      for (const node of allNodes) {
        if (isFolderNodeKind(node) && node.parentFolder === parentId) {
          collectNodeIds(node.id);
        } else if (
          isFileNodeKind(node) &&
          node.parentFolder === parentId &&
          node.documentType === "powerhouse/service-offering"
        ) {
          nodeIds.add(node.id);
        }
      }
    };

    collectNodeIds(serviceOfferingsFolder.id);
    return nodeIds;
  }, [serviceOfferingsFolder, driveDocument]);

  // Get resource template documents within the Products folder
  const resourceTemplateDocuments = useMemo(() => {
    if (!driveDocument) return [];

    return driveDocument.state.global.nodes.filter(
      (node): node is FileNode =>
        isFileNodeKind(node) &&
        node.documentType === "powerhouse/resource-template" &&
        resourceTemplatesNodeIds.has(node.id),
    );
  }, [driveDocument, resourceTemplatesNodeIds]);

  // Get service offering documents within the Service Offerings folder
  const serviceOfferingDocuments = useMemo(() => {
    if (!driveDocument) return [];

    return driveDocument.state.global.nodes.filter(
      (node): node is FileNode =>
        isFileNodeKind(node) &&
        node.documentType === "powerhouse/service-offering" &&
        serviceOfferingsNodeIds.has(node.id),
    );
  }, [driveDocument, serviceOfferingsNodeIds]);

  // Step 1: Create "Services And Offerings" parent folder if it doesn't exist
  useEffect(() => {
    if (!driveId || servicesAndOfferingsFolder) return;
    if (
      globalCreationState.createdServicesAndOfferingsFolderForDrives.has(
        driveId,
      )
    )
      return;

    globalCreationState.createdServicesAndOfferingsFolderForDrives.add(driveId);
    void addFolder(driveId, SERVICES_AND_OFFERINGS_FOLDER_NAME);
  }, [driveId, servicesAndOfferingsFolder]);

  // Step 2: Create "Products" subfolder if it doesn't exist (after parent exists)
  useEffect(() => {
    if (!driveId || !servicesAndOfferingsFolder || resourceTemplatesFolder)
      return;
    if (globalCreationState.createdProductsFolderForDrives.has(driveId)) return;

    globalCreationState.createdProductsFolderForDrives.add(driveId);
    void addFolder(
      driveId,
      PRODUCTS_FOLDER_NAME,
      servicesAndOfferingsFolder.id,
    );
  }, [driveId, servicesAndOfferingsFolder, resourceTemplatesFolder]);

  // Step 3: Create "Service Offerings" subfolder if it doesn't exist (after parent exists)
  useEffect(() => {
    if (!driveId || !servicesAndOfferingsFolder || serviceOfferingsFolder)
      return;
    if (globalCreationState.createdServiceOfferingsFolderForDrives.has(driveId))
      return;

    globalCreationState.createdServiceOfferingsFolderForDrives.add(driveId);
    void addFolder(
      driveId,
      SERVICE_OFFERINGS_FOLDER_NAME,
      servicesAndOfferingsFolder.id,
    );
  }, [driveId, servicesAndOfferingsFolder, serviceOfferingsFolder]);

  // Step 4: Migrate documents from old folders to new structure and delete old folders
  useEffect(() => {
    if (
      !driveId ||
      !driveDocument ||
      !resourceTemplatesFolder ||
      !serviceOfferingsFolder
    )
      return;
    if (globalCreationState.migratedOldFolders.has(driveId)) return;

    const allNodes = driveDocument.state.global.nodes;
    const processedDocs = globalCreationState.processedDocs.get(driveId);
    if (!processedDocs) return;

    // Find all resource template documents that are NOT in the correct folder
    const resourceTemplatesToMigrate = allNodes.filter(
      (node): node is FileNode =>
        isFileNodeKind(node) &&
        node.documentType === "powerhouse/resource-template" &&
        !resourceTemplatesNodeIds.has(node.id) &&
        !processedDocs.has(node.id),
    );

    // Find all service offering documents that are NOT in the correct folder
    const serviceOfferingsToMigrate = allNodes.filter(
      (node): node is FileNode =>
        isFileNodeKind(node) &&
        node.documentType === "powerhouse/service-offering" &&
        !serviceOfferingsNodeIds.has(node.id) &&
        !processedDocs.has(node.id),
    );

    // Move resource templates to Products folder
    for (const fileNode of resourceTemplatesToMigrate) {
      processedDocs.add(fileNode.id);
      dispatchActions(
        moveNode({
          srcFolder: fileNode.id,
          targetParentFolder: resourceTemplatesFolder.id,
        }),
        driveId,
      ).catch((error: unknown) => {
        console.error(`Failed to migrate resource template:`, error);
        processedDocs.delete(fileNode.id);
      });
    }

    // Move service offerings to Service Offerings folder
    for (const fileNode of serviceOfferingsToMigrate) {
      processedDocs.add(fileNode.id);
      dispatchActions(
        moveNode({
          srcFolder: fileNode.id,
          targetParentFolder: serviceOfferingsFolder.id,
        }),
        driveId,
      ).catch((error: unknown) => {
        console.error(`Failed to migrate service offering:`, error);
        processedDocs.delete(fileNode.id);
      });
    }

    // Delete old folders if they exist and are empty (after migration)
    const checkAndDeleteOldFolders = () => {
      // Check if old resource templates folder is empty and delete it
      if (oldResourceTemplatesFolder) {
        const childrenInOldResourceTemplates = allNodes.filter(
          (node) =>
            (isFolderNodeKind(node) || isFileNodeKind(node)) &&
            node.parentFolder === oldResourceTemplatesFolder.id,
        );

        if (childrenInOldResourceTemplates.length === 0) {
          dispatchActions(
            deleteNode({ id: oldResourceTemplatesFolder.id }),
            driveId,
          ).catch((error: unknown) => {
            console.error(
              `Failed to delete old Resource Templates folder:`,
              error,
            );
          });
        }
      }

      // Check if old service offerings folder is empty and delete it
      if (oldServiceOfferingsFolder) {
        const childrenInOldServiceOfferings = allNodes.filter(
          (node) =>
            (isFolderNodeKind(node) || isFileNodeKind(node)) &&
            node.parentFolder === oldServiceOfferingsFolder.id,
        );

        if (childrenInOldServiceOfferings.length === 0) {
          dispatchActions(
            deleteNode({ id: oldServiceOfferingsFolder.id }),
            driveId,
          ).catch((error: unknown) => {
            console.error(
              `Failed to delete old Service Offerings folder:`,
              error,
            );
          });
        }
      }

      globalCreationState.migratedOldFolders.add(driveId);
    };

    // Delay deletion to allow migrations to complete
    if (
      resourceTemplatesToMigrate.length === 0 &&
      serviceOfferingsToMigrate.length === 0
    ) {
      checkAndDeleteOldFolders();
    } else {
      setTimeout(checkAndDeleteOldFolders, 1000);
    }
  }, [
    driveId,
    driveDocument,
    resourceTemplatesFolder,
    serviceOfferingsFolder,
    resourceTemplatesNodeIds,
    serviceOfferingsNodeIds,
    oldResourceTemplatesFolder,
    oldServiceOfferingsFolder,
  ]);

  return {
    servicesAndOfferingsFolder,
    resourceTemplatesFolder,
    serviceOfferingsFolder,
    resourceTemplatesNodeIds,
    serviceOfferingsNodeIds,
    resourceTemplateDocuments,
    serviceOfferingDocuments,
  };
}
