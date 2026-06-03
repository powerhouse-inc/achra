import { useEffect, useMemo } from "react";
import {
  isFileNodeKind,
  isFolderNodeKind,
  useSelectedDrive,
  useDocumentsInSelectedDrive,
  dispatchActions,
} from "@powerhousedao/reactor-browser";
import { moveNode } from "@powerhousedao/shared/document-drive";
import type { FileNode, Node } from "@powerhousedao/shared/document-drive";
import type { ExpenseReportDocument } from "../../../document-models/expense-report/v1/gen/types.js";
import type { InvoiceDocument } from "../../../document-models/invoice/v1/gen/types.js";
import type { SnapshotReportDocument } from "../../../document-models/snapshot-report/v1/gen/types.js";
import type { BillingStatementDocument } from "../../../document-models/billing-statement/v1/gen/types.js";
import { useBillingFolderStructure } from "./useBillingFolderStructure.js";
import { cbToast } from "../components/cbToast.js";

// Module-level tracking to prevent duplicate processing
const globalProcessingState = {
  processedDocs: new Map<string, Set<string>>(), // driveId -> Set of doc IDs processed
};

interface UseDocumentAutoPlacementResult {
  /** Whether auto-placement is active */
  isActive: boolean;
}

/**
 * Hook that handles automatic placement of uploaded documents in the Contributor Billing drive.
 *
 * For Expense Reports:
 * - Places them in the appropriate Reporting folder based on periodStart
 * - Creates month folder structure if needed
 *
 * For Accounts:
 * - Keeps them at root level (no folder placement needed)
 * - The Accounts document is a single document, not multiple files
 */
export function useDocumentAutoPlacement(): UseDocumentAutoPlacementResult {
  const [driveDocument] = useSelectedDrive();
  const documentsInDrive = useDocumentsInSelectedDrive();
  const {
    reportingFolderIds,
    paymentsFolderIds,
    monthFolders,
    billingFolder,
    createMonthFolder,
  } = useBillingFolderStructure();
  const driveId = driveDocument?.header.id;

  // Initialize module-level tracking for this drive
  if (driveId && !globalProcessingState.processedDocs.has(driveId)) {
    globalProcessingState.processedDocs.set(driveId, new Set());
  }

  // Helper function to get month name from periodStart date
  // Uses UTC to avoid timezone issues - extracts year and month directly from ISO string
  const getMonthNameFromPeriod = (
    periodStart: string | null | undefined,
  ): string | null => {
    if (!periodStart) return null;
    try {
      // Parse the ISO date string and extract UTC components
      // ISO format: "2025-07-01T00:00:00.000Z" or "2025-07-01"
      const date = new Date(periodStart);
      if (isNaN(date.getTime())) return null;

      // Use UTC methods to get year and month, avoiding timezone conversion
      const year = date.getUTCFullYear();
      const month = date.getUTCMonth(); // 0-11

      // Format as "Month Year" (e.g., "July 2025")
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      return `${monthNames[month]} ${year}`;
    } catch {
      return null;
    }
  };

  // Auto-place expense reports into appropriate Reporting folders based on periodStart.
  // Creates month folder structure if needed. The report will also be found by the UI
  // via name matching (useMonthlyReports) even if the move fails, so we don't retry
  // moves to avoid spamming errors when the local reactor can't rebuild the document.
  useEffect(() => {
    if (!driveId || !driveDocument || !documentsInDrive) return;

    const allNodes = driveDocument.state.global.nodes;
    const processedDocs = globalProcessingState.processedDocs.get(driveId);
    if (!processedDocs) return;

    const expenseReportNodesToProcess = allNodes.filter(
      (node): node is FileNode =>
        isFileNodeKind(node) &&
        node.documentType === "powerhouse/expense-report" &&
        !reportingFolderIds.has(node.parentFolder || ""),
    );

    for (const fileNode of expenseReportNodesToProcess) {
      if (processedDocs.has(fileNode.id)) continue;

      const doc = documentsInDrive.find(
        (d): d is ExpenseReportDocument =>
          d.header.documentType === "powerhouse/expense-report" &&
          d.header.id === fileNode.id,
      );

      if (!doc) continue;

      const periodStart = doc.state.global.periodStart;
      const monthName = getMonthNameFromPeriod(periodStart);

      processedDocs.add(fileNode.id);

      if (monthName) {
        const monthInfo = monthFolders.get(monthName);
        const reportingFolder = monthInfo?.reportingFolder;

        if (reportingFolder) {
          // Attempt move once — don't retry on failure since name matching handles display
          dispatchActions(
            moveNode({
              srcFolder: fileNode.id,
              targetParentFolder: reportingFolder.id,
            }),
            driveId,
          )
            .then(() => {
              cbToast(
                `Expense report "${fileNode.name}" placed in ${monthName} > Reporting`,
                { type: "success" },
              );
            })
            .catch((error: unknown) => {
              console.warn(
                `[DocumentAutoPlacement] Could not move expense report to folder (will be found by name match):`,
                error instanceof Error ? error.message : error,
              );
            });
        } else if (billingFolder && driveId) {
          // Create month folder, then allow one move attempt on next effect run
          createMonthFolder(monthName)
            .then(() => {
              processedDocs.delete(fileNode.id);
            })
            .catch(() => {
              // Folder creation failed — report stays at root, found by name match
            });
        }
        // else: billingFolder not ready — don't unmark, effect re-runs when billingFolder changes
      } else {
        cbToast(
          `Expense report "${fileNode.name}" has no report period — could not auto-categorize.`,
          { type: "warning" },
        );
      }
    }
  }, [
    driveId,
    driveDocument,
    documentsInDrive,
    reportingFolderIds,
    monthFolders,
    billingFolder,
    createMonthFolder,
  ]);

  // Auto-place invoices into appropriate Payments folders based on dateIssued
  useEffect(() => {
    if (!driveId || !driveDocument || !documentsInDrive) return;

    const allNodes = driveDocument.state.global.nodes;
    const processedDocs = globalProcessingState.processedDocs.get(driveId);
    if (!processedDocs) return;

    // Find invoice file nodes that are NOT already in a Payments folder
    const invoiceNodesToProcess = allNodes.filter(
      (node): node is FileNode =>
        isFileNodeKind(node) &&
        node.documentType === "powerhouse/invoice" &&
        !paymentsFolderIds.has(node.parentFolder || ""),
    );

    for (const fileNode of invoiceNodesToProcess) {
      if (processedDocs.has(fileNode.id)) continue;

      const doc = documentsInDrive.find(
        (d): d is InvoiceDocument =>
          d.header.documentType === "powerhouse/invoice" &&
          d.header.id === fileNode.id,
      );

      if (!doc) continue;

      const dateIssued = doc.state.global.dateIssued;
      const monthName = getMonthNameFromPeriod(dateIssued);

      processedDocs.add(fileNode.id);

      if (monthName) {
        const monthInfo = monthFolders.get(monthName);
        const paymentsFolder = monthInfo?.paymentsFolder;

        if (paymentsFolder) {
          console.log(
            `[DocumentAutoPlacement] Moving invoice ${fileNode.id} ("${fileNode.name}") to Payments folder for ${monthName}`,
          );

          dispatchActions(
            moveNode({
              srcFolder: fileNode.id,
              targetParentFolder: paymentsFolder.id,
            }),
            driveId,
          )
            .then(() => {
              cbToast(
                `Invoice "${fileNode.name}" placed in ${monthName} > Payments`,
                { type: "success" },
              );
            })
            .catch((error: unknown) => {
              console.warn(
                `[DocumentAutoPlacement] Could not move invoice to folder:`,
                error instanceof Error ? error.message : error,
              );
            });
        } else if (billingFolder && driveId) {
          createMonthFolder(monthName)
            .then(() => {
              processedDocs.delete(fileNode.id);
            })
            .catch(() => {
              // Folder creation failed
            });
        }
      } else {
        console.warn(
          `[DocumentAutoPlacement] Invoice ${fileNode.id} ("${fileNode.name}") has no dateIssued, leaving at root`,
        );
        cbToast(
          `Invoice "${fileNode.name}" has no issue date — could not auto-categorize. It remains at the drive root.`,
          { type: "warning" },
        );
      }
    }
  }, [
    driveId,
    driveDocument,
    documentsInDrive,
    paymentsFolderIds,
    monthFolders,
    billingFolder,
    createMonthFolder,
  ]);

  // Auto-place snapshot reports into appropriate Reporting folders based on reportPeriodStart
  useEffect(() => {
    if (!driveId || !driveDocument || !documentsInDrive) return;

    const allNodes = driveDocument.state.global.nodes;
    const processedDocs = globalProcessingState.processedDocs.get(driveId);
    if (!processedDocs) return;

    const snapshotNodesToProcess = allNodes.filter(
      (node): node is FileNode =>
        isFileNodeKind(node) &&
        node.documentType === "powerhouse/snapshot-report" &&
        !reportingFolderIds.has(node.parentFolder || ""),
    );

    for (const fileNode of snapshotNodesToProcess) {
      if (processedDocs.has(fileNode.id)) continue;

      const doc = documentsInDrive.find(
        (d): d is SnapshotReportDocument =>
          d.header.documentType === "powerhouse/snapshot-report" &&
          d.header.id === fileNode.id,
      );

      if (!doc) continue;

      const reportPeriodStart = doc.state.global.reportPeriodStart;
      const monthName = getMonthNameFromPeriod(reportPeriodStart);

      processedDocs.add(fileNode.id);

      if (monthName) {
        const monthInfo = monthFolders.get(monthName);
        const reportingFolder = monthInfo?.reportingFolder;

        if (reportingFolder) {
          dispatchActions(
            moveNode({
              srcFolder: fileNode.id,
              targetParentFolder: reportingFolder.id,
            }),
            driveId,
          )
            .then(() => {
              cbToast(
                `Snapshot report "${fileNode.name}" placed in ${monthName} > Reporting`,
                { type: "success" },
              );
            })
            .catch((error: unknown) => {
              console.warn(
                `[DocumentAutoPlacement] Could not move snapshot report to folder (will be found by name match):`,
                error instanceof Error ? error.message : error,
              );
            });
        } else if (billingFolder && driveId) {
          createMonthFolder(monthName)
            .then(() => {
              processedDocs.delete(fileNode.id);
            })
            .catch(() => {
              // Folder creation failed — report stays at root, found by name match
            });
        }
      } else {
        cbToast(
          `Snapshot report "${fileNode.name}" has no report period — could not auto-categorize.`,
          { type: "warning" },
        );
      }
    }
  }, [
    driveId,
    driveDocument,
    documentsInDrive,
    reportingFolderIds,
    monthFolders,
    billingFolder,
    createMonthFolder,
  ]);

  // Auto-place billing statements into appropriate Payments folders based on dateIssued
  useEffect(() => {
    if (!driveId || !driveDocument || !documentsInDrive) return;

    const allNodes = driveDocument.state.global.nodes;
    const processedDocs = globalProcessingState.processedDocs.get(driveId);
    if (!processedDocs) return;

    const billingStatementNodesToProcess = allNodes.filter(
      (node): node is FileNode =>
        isFileNodeKind(node) &&
        node.documentType === "powerhouse/billing-statement" &&
        !paymentsFolderIds.has(node.parentFolder || ""),
    );

    for (const fileNode of billingStatementNodesToProcess) {
      if (processedDocs.has(fileNode.id)) continue;

      const doc = documentsInDrive.find(
        (d): d is BillingStatementDocument =>
          d.header.documentType === "powerhouse/billing-statement" &&
          d.header.id === fileNode.id,
      );

      if (!doc) continue;

      const dateIssued = doc.state.global.dateIssued;
      const monthName = getMonthNameFromPeriod(dateIssued);

      processedDocs.add(fileNode.id);

      if (monthName) {
        const monthInfo = monthFolders.get(monthName);
        const paymentsFolder = monthInfo?.paymentsFolder;

        if (paymentsFolder) {
          dispatchActions(
            moveNode({
              srcFolder: fileNode.id,
              targetParentFolder: paymentsFolder.id,
            }),
            driveId,
          )
            .then(() => {
              cbToast(
                `Billing statement "${fileNode.name}" placed in ${monthName} > Payments`,
                { type: "success" },
              );
            })
            .catch((error: unknown) => {
              console.warn(
                `[DocumentAutoPlacement] Could not move billing statement to folder:`,
                error instanceof Error ? error.message : error,
              );
            });
        } else if (billingFolder && driveId) {
          createMonthFolder(monthName)
            .then(() => {
              processedDocs.delete(fileNode.id);
            })
            .catch(() => {
              // Folder creation failed
            });
        }
      } else {
        cbToast(
          `Billing statement "${fileNode.name}" has no issue date — could not auto-categorize.`,
          { type: "warning" },
        );
      }
    }
  }, [
    driveId,
    driveDocument,
    documentsInDrive,
    paymentsFolderIds,
    monthFolders,
    billingFolder,
    createMonthFolder,
  ]);

  return {
    isActive: !!driveId,
  };
}
