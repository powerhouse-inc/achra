import { FileItem } from "@powerhousedao/design-system/connect";
import { FolderItem } from "@powerhousedao/design-system/connect";
import {
  isFolderNodeKind,
  isFileNodeKind,
  setSelectedNode,
  useSelectedNodePath,
  useNodesInSelectedDriveOrFolder,
  useUserPermissions,
  showCreateDocumentModal,
  useDocumentsInSelectedDrive,
  useGetDocument,
  dispatchActions,
} from "@powerhousedao/reactor-browser";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { Plus, FileText, Package } from "lucide-react";
import { useResourcesServicesAutoPlacement } from "../hooks/useResourcesServicesAutoPlacement.js";
import { actions as resourceTemplateActions } from "document-models/resource-template";
import { isBuilderProfileDocument } from "document-models/builder-profile";

const SERVICES_AND_OFFERINGS_FOLDER_NAME = "Services And Offerings";
const RESOURCE_TEMPLATES_FOLDER_NAME = "Products";
const SERVICE_OFFERINGS_FOLDER_NAME = "Service Offerings";

/**
 * Component for the Resources & Services custom view.
 * Shows folder structure: Services And Offerings > Products / Service Offerings.
 * Users can create powerhouse/resource-template docs in Products
 * and powerhouse/service-offering docs in Service Offerings.
 */
export function ResourcesServices() {
  const hasNavigatedToFolder = useRef(false);
  const selectedNodePath = useSelectedNodePath();
  const nodesInCurrentFolder = useNodesInSelectedDriveOrFolder();
  const { isAllowedToCreateDocuments } = useUserPermissions();

  // Use the shared auto-placement hook - this handles:
  // 1. Creating the "Services And Offerings" parent folder if it doesn't exist
  // 2. Creating the "Products" subfolder if it doesn't exist
  // 3. Creating the "Service Offerings" subfolder if it doesn't exist
  // 4. Migrating existing documents from old folder structure
  const {
    servicesAndOfferingsFolder,
    resourceTemplatesFolder,
    serviceOfferingsFolder,
    resourceTemplateDocuments,
    serviceOfferingDocuments,
  } = useResourcesServicesAutoPlacement();

  // Determine which folder we're currently in (if any)
  const currentFolderId = selectedNodePath.at(-1)?.id;
  const isInResourceTemplates = currentFolderId === resourceTemplatesFolder?.id;
  const isInServiceOfferings = currentFolderId === serviceOfferingsFolder?.id;
  const isInRootView = !isInResourceTemplates && !isInServiceOfferings;

  // Navigate to root view initially (deselect any node) — unless the view
  // was entered already pointing at one of its own folders (e.g. clicking
  // "Products" in the sidebar selects that folder and mounts this view;
  // clearing the selection here would undo that navigation).
  useEffect(() => {
    if (
      servicesAndOfferingsFolder &&
      resourceTemplatesFolder &&
      serviceOfferingsFolder &&
      !hasNavigatedToFolder.current
    ) {
      hasNavigatedToFolder.current = true;
      const selectionInThisView = selectedNodePath.some(
        (node) => node.id === servicesAndOfferingsFolder.id,
      );
      if (!selectionInThisView) {
        // Don't select any node so we show the root view with both folders
        setSelectedNode("");
      }
    }
  }, [
    servicesAndOfferingsFolder,
    resourceTemplatesFolder,
    serviceOfferingsFolder,
    selectedNodePath,
  ]);

  // Find the BuilderProfile id from the same drive — used as the
  // operatorId when stamping a newly-created ResourceTemplate doc.
  const docsInDrive = useDocumentsInSelectedDrive();
  const builderProfileId = useMemo(
    () => docsInDrive?.find((d) => isBuilderProfileDocument(d))?.header.id,
    [docsInDrive],
  );

  // Capture imperative getters once. These read from the reactor client
  // directly (not React state), so the closure keeps working after this
  // component unmounts — which is exactly what happens when Connect
  // auto-navigates to the new doc after the create modal confirms.
  const getDocument = useGetDocument();
  const builderProfileIdRef = useRef(builderProfileId);
  builderProfileIdRef.current = builderProfileId;

  // Opens Connect's styled create-document modal, then watches the
  // GLOBAL selectedNodeId (which Connect updates the moment it creates
  // and navigates to the new doc). Because we poll via getGlobal +
  // getDocument — both unmount-safe — the dispatch survives the
  // navigation that tears this component down.
  const handleCreateResourceTemplate = useCallback(
    async (folderId: string) => {
      setSelectedNode(folderId);
      setTimeout(() => {
        showCreateDocumentModal("powerhouse/resource-template");
      }, 100);

      const newDocId = await new Promise<string | null>((resolve) => {
        const startedAt = Date.now();
        const tick = async () => {
          // window.ph is the global state bag used internally by the
          // reactor-browser package — it's updated synchronously by
          // setSelectedNode and survives this component's unmount.
          const ph = (window as { ph?: { selectedNodeId?: string } }).ph;
          const currentSelected = ph?.selectedNodeId;
          if (currentSelected && currentSelected !== folderId) {
            try {
              const doc = await getDocument(currentSelected);
              if (doc.header.documentType === "powerhouse/resource-template") {
                resolve(currentSelected);
                return;
              }
            } catch {
              // Doc not yet loaded — keep polling.
            }
          }
          if (Date.now() - startedAt > 60_000) {
            resolve(null);
            return;
          }
          setTimeout(() => void tick(), 250);
        };
        void tick();
      });

      if (!newDocId) return; // user cancelled or it timed out

      const operatorId = builderProfileIdRef.current;
      if (!operatorId) {
        console.warn(
          "[ResourcesServices] no BuilderProfile in drive — skipping SET_OPERATOR for",
          newDocId,
        );
        return;
      }

      try {
        await dispatchActions(
          resourceTemplateActions.setOperator({
            operatorId,
            lastModified: new Date().toISOString(),
          }),
          newDocId,
        );
      } catch (err: unknown) {
        console.error(
          "[ResourcesServices] SET_OPERATOR failed on",
          newDocId,
          err,
        );
      }
    },
    [getDocument],
  );

  // Show loading state while folders are being created
  if (
    !servicesAndOfferingsFolder ||
    !resourceTemplatesFolder ||
    !serviceOfferingsFolder
  ) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-muted-foreground">
          Setting up {SERVICES_AND_OFFERINGS_FOLDER_NAME} folders...
        </div>
      </div>
    );
  }

  // Handler for creating new documents
  const handleCreateDocument = (documentType: string, folderId: string) => {
    setSelectedNode(folderId);
    // Small delay to ensure the folder is selected before showing modal
    setTimeout(() => {
      showCreateDocumentModal(documentType);
    }, 100);
  };

  // Get folder and file nodes from current selection
  const folderNodes = nodesInCurrentFolder.filter((n) => isFolderNodeKind(n));
  const fileNodes = nodesInCurrentFolder.filter((n) => isFileNodeKind(n));

  // Render the root view with both folder cards
  if (isInRootView) {
    return (
      <div className="text-foreground">
        <div className="text-2xl font-bold text-center mb-6">
          {SERVICES_AND_OFFERINGS_FOLDER_NAME}
        </div>
        <div className="space-y-6 px-6">
          <p className="text-muted-foreground text-center mb-8">
            Manage your products and service offerings. Click on a folder to
            view or create documents.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Resource Templates Card */}
            <div
              className="bg-card border border-border rounded-lg p-6 shadow-sm hover:border-status-progress hover:shadow-md transition-all cursor-pointer"
              onClick={() => setSelectedNode(resourceTemplatesFolder.id)}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-status-progress/15 rounded-lg">
                  <FileText className="w-6 h-6 text-status-progress" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {RESOURCE_TEMPLATES_FOLDER_NAME}
                </h3>
              </div>
              <p className="text-muted-foreground text-sm mb-4">
                Define products that can be used across service offerings.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {resourceTemplateDocuments.length} product
                  {resourceTemplateDocuments.length !== 1 ? "s" : ""}
                </span>
                {isAllowedToCreateDocuments && (
                  <button
                    type="button"
                    className="flex items-center gap-1 text-sm bg-primary text-primary-foreground px-3 py-1 rounded-md hover:bg-primary/90 shadow-sm transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      void handleCreateResourceTemplate(
                        resourceTemplatesFolder.id,
                      );
                    }}
                  >
                    <Plus size={14} />
                    Add new
                  </button>
                )}
              </div>
            </div>

            {/* Service Offerings Card */}
            <div
              className="bg-card border border-border rounded-lg p-6 shadow-sm hover:border-primary hover:shadow-md transition-all cursor-pointer"
              onClick={() => setSelectedNode(serviceOfferingsFolder.id)}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Package className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {SERVICE_OFFERINGS_FOLDER_NAME}
                </h3>
              </div>
              <p className="text-muted-foreground text-sm mb-4">
                Create and manage service offerings with pricing tiers and
                options.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {serviceOfferingDocuments.length} offering
                  {serviceOfferingDocuments.length !== 1 ? "s" : ""}
                </span>
                {isAllowedToCreateDocuments && (
                  <button
                    type="button"
                    className="flex items-center gap-1 text-sm bg-primary text-primary-foreground px-3 py-1 rounded-md hover:bg-primary/90 shadow-sm transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCreateDocument(
                        "powerhouse/service-offering",
                        serviceOfferingsFolder.id,
                      );
                    }}
                  >
                    <Plus size={14} />
                    Add new
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render folder contents view (Resource Templates or Service Offerings)
  const currentFolderName = isInResourceTemplates
    ? RESOURCE_TEMPLATES_FOLDER_NAME
    : SERVICE_OFFERINGS_FOLDER_NAME;
  const documentType = isInResourceTemplates
    ? "powerhouse/resource-template"
    : "powerhouse/service-offering";

  const hasFolders = folderNodes.length > 0;
  const hasFiles = fileNodes.length > 0;
  const isEmpty = !hasFolders && !hasFiles;

  return (
    <div className="text-foreground">
      <div className="text-2xl font-bold text-center mb-4">
        {currentFolderName}
      </div>
      <div className="space-y-6 px-6">
        {/* Breadcrumbs */}
        <div className="flex h-9 flex-row items-center gap-2 text-muted-foreground border-b border-border pb-3">
          <div
            className="transition-colors hover:text-foreground cursor-pointer"
            onClick={() => setSelectedNode("")}
            role="button"
          >
            {SERVICES_AND_OFFERINGS_FOLDER_NAME}
          </div>
          <span>/</span>
          <div className="text-foreground">{currentFolderName}</div>
          <span>/</span>
          {isAllowedToCreateDocuments && (
            <button
              type="button"
              className="ml-1 flex items-center justify-center gap-2 rounded-md bg-muted text-foreground px-2 py-1.5 transition-colors hover:bg-accent hover:text-accent-foreground"
              onClick={() => {
                if (isInResourceTemplates) {
                  void handleCreateResourceTemplate(resourceTemplatesFolder.id);
                } else {
                  showCreateDocumentModal(documentType);
                }
              }}
            >
              <Plus size={14} />
              Add new
            </button>
          )}
        </div>

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
              {isInResourceTemplates ? (
                <FileText className="w-16 h-16 mx-auto" />
              ) : (
                <Package className="w-16 h-16 mx-auto" />
              )}
            </div>
            <p className="text-muted-foreground text-sm">
              No {currentFolderName.toLowerCase()} yet.
              {isAllowedToCreateDocuments && (
                <>
                  {" "}
                  Click "Add new" to create your first{" "}
                  {isInResourceTemplates ? "product" : "service offering"}.
                </>
              )}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
