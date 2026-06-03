import { useState, useCallback, useRef, useMemo, useEffect } from "react";
import type { DocumentModelModule } from "document-model";
import {
  isFileNodeKind,
  useDocumentModelModules,
  type FileUploadProgress,
  useDocumentsInSelectedDrive,
  useSelectedDrive,
  useOnDropFile,
  dispatchActions,
  addDocument,
  setSelectedNode,
} from "@powerhousedao/reactor-browser";
import type { PHBaseState, PHDocument } from "document-model";
import type { FileNode } from "@powerhousedao/shared/document-drive";
import { moveNode } from "@powerhousedao/shared/document-drive";
import { cbToast } from "../cbToast.js";
import { InvoiceTable } from "./InvoiceTable.js";

interface InvoiceTableContainerProps {
  /** The ID of the payments folder to filter invoices by */
  folderId: string;
  /** The month name (e.g., "January 2026") for checking existing reports */
  monthName?: string;
  /** The sibling Reporting folder ID where expense reports should be created */
  reportingFolderId?: string;
  /** Content rendered above the InvoiceTable but inside the drop zone */
  children?: React.ReactNode;
}

/**
 * Container that renders the InvoiceTable.
 * Uses useNodesInSelectedDriveOrFolder pattern to avoid freeze issues.
 */
export function InvoiceTableContainer({
  folderId,
  monthName,
  reportingFolderId,
  children,
}: InvoiceTableContainerProps) {
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const pendingFilesRef = useRef<Set<File>>(new Set());

  // Track file names that were dropped into THIS specific folder view
  // Using state (not ref) so changes trigger re-renders and useEffect runs
  const [droppedFileNames, setDroppedFileNames] = useState<Map<string, string>>(
    () => new Map(),
  );

  const documentModelModules = useDocumentModelModules();
  const [driveDocument] = useSelectedDrive();
  const allDocuments = useDocumentsInSelectedDrive();

  // Filter file nodes to only those in the specific payments folder
  // Access drive nodes directly (same approach as HeaderStats)
  const fileNodes = useMemo(() => {
    if (!driveDocument) return [];
    const nodes = driveDocument.state.global.nodes;
    const fileNodesInFolder = nodes.filter(
      (n) => isFileNodeKind(n) && n.parentFolder === folderId,
    ) as FileNode[];
    return fileNodesInFolder;
  }, [driveDocument, folderId]);

  // Get the drop file handler
  const onDropFile = useOnDropFile();

  // Handle file drop
  const driveId = driveDocument?.header.id;

  // Watch for files that we explicitly dropped and move them if needed
  // This handles the case where conflict resolution creates files at root
  useEffect(() => {
    if (!driveDocument || !driveId || !folderId) return;
    if (droppedFileNames.size === 0) return;

    const nodes = driveDocument.state.global.nodes;

    // Check each file name we're tracking
    for (const [fileName, targetFolderId] of droppedFileNames.entries()) {
      // Only process if this is the target folder for this file
      if (targetFolderId !== folderId) continue;

      // Find the file by name that's not in the correct folder
      // Also match files with similar names (e.g., "freshInvoice (1)" matches "freshInvoice")
      const fileNode = nodes.find((n) => {
        if (!isFileNodeKind(n)) return false;
        const fn = n;
        // Only match invoice documents
        if (fn.documentType !== "powerhouse/invoice") return false;
        // Check if file is not in the target folder (at root or elsewhere)
        if (fn.parentFolder === targetFolderId) return false;
        // Match exact name or name with conflict suffix like "(1)"
        const nameMatches =
          fn.name === fileName || fn.name.startsWith(fileName + " (");
        return nameMatches;
      }) as FileNode | undefined;

      if (fileNode) {
        // Remove from tracking since we found it
        setDroppedFileNames((prev) => {
          const next = new Map(prev);
          next.delete(fileName);
          return next;
        });

        // Move the file to the correct folder
        dispatchActions(
          moveNode({
            srcFolder: fileNode.id,
            targetParentFolder: targetFolderId,
          }),
          driveId,
        ).catch((error) => {
          console.error("[InvoiceTableContainer] Move failed:", error);
        });
      }
    }
  }, [driveDocument, driveId, folderId, droppedFileNames]);

  const handleDrop = useCallback(
    async (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();

      const files = Array.from(event.dataTransfer.files);
      if (files.length === 0) return;

      if (!onDropFile || !driveId) return;

      // Filter to only accept .phd files (Powerhouse document archives)
      const phdFiles = files.filter((file) => file.name.endsWith(".phd"));
      const rejectedFiles = files.filter((file) => !file.name.endsWith(".phd"));

      // Show error for rejected files
      if (rejectedFiles.length > 0) {
        const rejectedNames = rejectedFiles.map((f) => f.name).join(", ");
        cbToast(
          `Only .phd files (Powerhouse documents) can be dropped here. Rejected: ${rejectedNames}`,
          { type: "error" },
        );
      }

      if (phdFiles.length === 0) return;

      // Track all files being processed
      const fileBaseNames: string[] = [];
      phdFiles.forEach((file) => {
        pendingFilesRef.current.add(file);
        const fileBaseName = file.name.replace(/\.phd$/, "");
        fileBaseNames.push(fileBaseName);
      });

      // Update state to track file names -> target folder
      // This triggers useEffect to check for misplaced files
      setDroppedFileNames((prev) => {
        const next = new Map(prev);
        fileBaseNames.forEach((name) => next.set(name, folderId));
        return next;
      });

      // Process all files - React state updates automatically via hooks
      const filePromises = phdFiles.map(async (file) => {
        const fileBaseName = file.name.replace(/\.phd$/, "");
        try {
          const fileNode = await onDropFile(
            file,
            (progress: FileUploadProgress) => {
              if (
                progress.stage === "complete" ||
                progress.stage === "failed"
              ) {
                pendingFilesRef.current.delete(file);
              }
            },
          );

          // Move the uploaded file to the correct folder
          if (fileNode && folderId) {
            try {
              await dispatchActions(
                moveNode({
                  srcFolder: fileNode.id,
                  targetParentFolder: folderId,
                }),
                driveId,
              );
              // Successfully moved, remove from tracking
              setDroppedFileNames((prev) => {
                const next = new Map(prev);
                next.delete(fileBaseName);
                return next;
              });
            } catch (moveError) {
              console.error("[InvoiceTableContainer] Move failed:", moveError);
              // Keep in tracking so useEffect can retry
            }
          }
          // If fileNode is null (conflict resolution), keep in tracking so useEffect can handle it
        } catch (error) {
          console.error("Error dropping file:", error);
          pendingFilesRef.current.delete(file);
          // Keep in tracking - conflict resolution might still create the file
        }
      });

      await Promise.allSettled(filePromises);
    },
    [onDropFile, driveId, folderId],
  );

  // Don't stopPropagation on dragOver/dragEnter — these must bubble to
  // DocumentDropZone so it can show the full-screen overlay.
  // Only handleDrop uses stopPropagation to prevent DocumentDropZone
  // from also processing the files.
  const handleDragOver = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = "copy";
    },
    [],
  );

  const handleDragEnter = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
    },
    [],
  );

  // Handler for status filter changes
  const handleStatusChange = useCallback((value: string | string[]) => {
    setSelectedStatuses(Array.isArray(value) ? value : [value]);
  }, []);

  // Handler for row selection
  const handleRowSelection = useCallback(
    (rowId: string, checked: boolean, _rowStatus: string) => {
      setSelected((prev) => ({
        ...prev,
        [rowId]: checked,
      }));
    },
    [],
  );

  // Stub for getDocDispatcher - requires documents to work properly
  const getDocDispatcher = useCallback(
    (_id: string): [PHDocument, (action: unknown) => Promise<void>] | null => {
      return null;
    },
    [],
  );

  // Handle document model selection - create invoice directly in the payments folder
  const onSelectDocumentModel = useCallback(
    async (documentModel: DocumentModelModule, name: string) => {
      if (!driveId) {
        cbToast("No drive selected", { type: "error" });
        return;
      }

      try {
        // Create a new invoice document directly in the payments folder
        const createdNode = await addDocument(
          driveId,
          name,
          documentModel.documentModel?.global?.id,
          folderId, // Create directly in the payments folder
          undefined,
          undefined,
          "powerhouse-invoice-editor",
        );

        if (createdNode?.id) {
          // Small delay to allow the drive state to sync before selecting the node
          // This prevents the Sidebar from trying to find a node that doesn't exist yet
          setTimeout(() => {
            setSelectedNode(createdNode.id);
          }, 100);
          cbToast("Invoice created successfully", { type: "success" });
        } else {
          cbToast("Failed to create invoice", { type: "error" });
        }
      } catch (error) {
        console.error("Error creating invoice:", error);
        cbToast("Failed to create invoice", { type: "error" });
      }
    },
    [driveId, folderId],
  );

  // Determine if CSV export should be enabled based on selected rows
  const canExportSelectedRows = useCallback(() => {
    const allowedStatuses = [
      "ACCEPTED",
      "AWAITINGPAYMENT",
      "PAYMENTSCHEDULED",
      "PAYMENTSENT",
      "PAYMENTRECEIVED",
      "PAYMENTCLOSED",
    ];

    // Get all selected row IDs
    const selectedRowIds = Object.keys(selected).filter((id) => selected[id]);

    if (selectedRowIds.length === 0) return false;

    // Check if all selected rows have allowed statuses
    const selectedRows =
      allDocuments?.filter((doc) => selectedRowIds.includes(doc.header.id)) ||
      [];
    return selectedRows.every((row: PHDocument) =>
      allowedStatuses.includes(
        (row.state as PHBaseState & { global: { status: string } }).global
          .status,
      ),
    );
  }, [selected, allDocuments]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
    >
      {children}
      <InvoiceTable
        files={fileNodes}
        selected={selected}
        setSelected={setSelected}
        filteredDocumentModels={documentModelModules || []}
        onSelectDocumentModel={onSelectDocumentModel}
        getDocDispatcher={getDocDispatcher}
        selectedStatuses={selectedStatuses}
        onStatusChange={handleStatusChange}
        onRowSelection={handleRowSelection}
        canExportSelectedRows={canExportSelectedRows}
        monthName={monthName}
        reportingFolderId={reportingFolderId}
      />
    </div>
  );
}
