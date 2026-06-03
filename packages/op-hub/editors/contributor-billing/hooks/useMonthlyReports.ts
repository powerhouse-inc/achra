import { useMemo } from "react";
import {
  useDocumentsInSelectedDrive,
  useSelectedDrive,
  isFileNodeKind,
} from "@powerhousedao/reactor-browser";
import type { PHDocument } from "document-model";
import {
  useBillingFolderStructure,
  type MonthFolderInfo,
} from "./useBillingFolderStructure.js";

export type ReportStatus = "DRAFT" | "REVIEW" | "FINAL" | "NONE";

export interface ReportDocument {
  id: string;
  name: string;
  documentType: "powerhouse/expense-report" | "powerhouse/snapshot-report";
  status: ReportStatus;
  lastModified: string;
}

export interface MonthReportSet {
  /** Display name like "January 2026" */
  monthName: string;
  /** Code format like "01-2026" */
  monthCode: string;
  /** The snapshot report for this month, if any */
  snapshotReport: ReportDocument | null;
  /** All expense reports for this month */
  expenseReports: ReportDocument[];
  /** Overall status (worst of all reports: NONE < DRAFT < REVIEW < FINAL) */
  overallStatus: ReportStatus;
  /** Total number of reports */
  reportCount: number;
  /** The reporting folder ID for this month */
  reportingFolderId: string | null;
  /** The month folder info */
  folderInfo: MonthFolderInfo;
  /** The snapshot report's transaction period start date (startDate), if any */
  snapshotStartDate: string | null;
  /** The snapshot report's transaction period end date (endDate), if any */
  snapshotEndDate: string | null;
}

export interface UseMonthlyReportsResult {
  /** All months with their reports, sorted by date descending */
  monthReportSets: MonthReportSet[];
  /** Whether the data is still loading */
  isLoading: boolean;
}

/**
 * Format month name like "January 2026" to "01-2026"
 */
function formatMonthCode(monthName: string): string {
  const date = new Date(monthName + " 1");
  if (isNaN(date.getTime())) return monthName;
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${month}-${year}`;
}

/**
 * Parse a date from month name ("January 2026") for sorting
 */
function parseMonthDate(monthName: string): Date {
  return new Date(monthName + " 1");
}

/**
 * Extract status from document state
 */
function extractStatus(doc: PHDocument): ReportStatus {
  const state = doc.state as { global?: { status?: string } } | undefined;
  const status = state?.global?.status?.toUpperCase() || "DRAFT";

  switch (status) {
    case "FINAL":
    case "APPROVED":
    case "COMPLETED":
      return "FINAL";
    case "REVIEW":
    case "IN_REVIEW":
    case "SUBMITTED":
      return "REVIEW";
    case "DRAFT":
    default:
      return "DRAFT";
  }
}

/**
 * Calculate overall status from multiple reports
 * Priority: NONE (no reports) < DRAFT < REVIEW < FINAL
 * If any report is DRAFT, overall is DRAFT. If any is REVIEW, overall is REVIEW.
 * Only FINAL if all reports are FINAL.
 */
function calculateOverallStatus(reports: ReportDocument[]): ReportStatus {
  if (reports.length === 0) return "NONE";

  let hasDraft = false;
  let hasReview = false;

  for (const report of reports) {
    if (report.status === "DRAFT") hasDraft = true;
    if (report.status === "REVIEW") hasReview = true;
  }

  if (hasDraft) return "DRAFT";
  if (hasReview) return "REVIEW";
  return "FINAL";
}

/**
 * Convert Document to ReportDocument
 */
function toReportDocument(
  doc: PHDocument,
  docType: "powerhouse/expense-report" | "powerhouse/snapshot-report",
): ReportDocument {
  return {
    id: doc.header.id,
    name: doc.header.name || "Untitled Report",
    documentType: docType,
    status: extractStatus(doc),
    lastModified: doc.header.lastModifiedAtUtcIso || new Date().toISOString(),
  };
}

/**
 * Hook that aggregates reports by month and provides status information.
 *
 * This hook:
 * 1. Gets all month folders from the billing structure
 * 2. For each month, finds matching expense and snapshot reports by name
 * 3. Calculates overall status for each month
 * 4. Returns sorted list (most recent first)
 */
export function useMonthlyReports(): UseMonthlyReportsResult {
  const documentsInDrive = useDocumentsInSelectedDrive();
  const [selectedDrive] = useSelectedDrive();
  const { monthFolders } = useBillingFolderStructure();

  const monthReportSets = useMemo(() => {
    if (!documentsInDrive) return [];

    const sets: MonthReportSet[] = [];

    // Build a map of document ID to parent folder ID
    const documentParentMap = new Map<string, string | null>();
    const allNodes = selectedDrive?.state.global.nodes || [];
    for (const node of allNodes) {
      if (isFileNodeKind(node)) {
        documentParentMap.set(node.id, node.parentFolder);
      }
    }

    // Get all expense and snapshot reports
    const allExpenseReports = documentsInDrive.filter(
      (doc) => doc.header.documentType === "powerhouse/expense-report",
    );
    const allSnapshotReports = documentsInDrive.filter(
      (doc) => doc.header.documentType === "powerhouse/snapshot-report",
    );

    // Process each month folder
    for (const [monthName, folderInfo] of monthFolders.entries()) {
      const monthCode = formatMonthCode(monthName);
      const monthLower = monthName.toLowerCase();
      const reportingFolderId = folderInfo.reportingFolder?.id;

      // Normalize name for matching: replace hyphens/underscores with spaces
      const normalizeForMatch = (s: string) =>
        s.toLowerCase().replace(/[-_]/g, " ");
      const monthNormalized = normalizeForMatch(monthName);

      // Find expense reports in this Reporting folder OR matching this month by name
      const expenseReports: ReportDocument[] = allExpenseReports
        .filter((doc) => {
          // First check if document is in this Reporting folder
          if (reportingFolderId) {
            const docParentFolder = documentParentMap.get(doc.header.id);
            if (docParentFolder === reportingFolderId) {
              return true; // Document is in the folder, include it
            }
          }

          // Otherwise, check if name matches the month (for backwards compatibility)
          // Normalizes hyphens/underscores to spaces so "July-2025" matches "July 2025"
          const docName = doc.header.name || "";
          const docNameNormalized = normalizeForMatch(docName);
          return (
            docNameNormalized.includes(monthNormalized) ||
            docName.includes(monthCode)
          );
        })
        .map((doc) => toReportDocument(doc, "powerhouse/expense-report"));

      // Find snapshot report in this Reporting folder OR matching this month by name
      const snapshotDoc = allSnapshotReports.find((doc) => {
        // First check if document is in this Reporting folder
        if (reportingFolderId) {
          const docParentFolder = documentParentMap.get(doc.header.id);
          if (docParentFolder === reportingFolderId) {
            return true; // Document is in the folder, include it
          }
        }

        // Otherwise, check if name matches the month (for backwards compatibility)
        const docName = doc.header.name || "";
        const docNameNormalized = normalizeForMatch(docName);
        return (
          docNameNormalized.includes(monthNormalized) ||
          docName.includes(monthCode)
        );
      });
      const snapshotReport = snapshotDoc
        ? toReportDocument(snapshotDoc, "powerhouse/snapshot-report")
        : null;

      // Extract snapshot transaction period dates from document state
      const snapshotState = snapshotDoc?.state as
        | {
            global?: {
              startDate?: string | null;
              endDate?: string | null;
            };
          }
        | undefined;

      // Combine all reports for status calculation
      const allReports: ReportDocument[] = [...expenseReports];
      if (snapshotReport) allReports.push(snapshotReport);

      sets.push({
        monthName,
        monthCode,
        snapshotReport,
        expenseReports,
        overallStatus: calculateOverallStatus(allReports),
        reportCount: allReports.length,
        reportingFolderId: folderInfo.reportingFolder?.id || null,
        folderInfo,
        snapshotStartDate: snapshotState?.global?.startDate || null,
        snapshotEndDate: snapshotState?.global?.endDate || null,
      });
    }

    // Sort by date descending (most recent first)
    sets.sort((a, b) => {
      const dateA = parseMonthDate(a.monthName);
      const dateB = parseMonthDate(b.monthName);
      return dateB.getTime() - dateA.getTime();
    });

    return sets;
  }, [documentsInDrive, monthFolders, selectedDrive]);

  const isLoading = documentsInDrive === null;

  return {
    monthReportSets,
    isLoading,
  };
}
