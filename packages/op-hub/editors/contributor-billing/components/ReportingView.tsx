import {
  useDocumentsInSelectedDrive,
  setSelectedNode,
  addDocument,
  dispatchActions,
  useSelectedDrive,
  isFileNodeKind,
} from "@powerhousedao/reactor-browser";
import { useMemo, useState } from "react";
import { FileText, Camera, Plus, Trash2 } from "lucide-react";
import { setName } from "document-model";
import { moveNode, deleteNode } from "@powerhousedao/shared/document-drive";
import { ConfirmationModal } from "./InvoiceTable/ConfirmationModal.js";
import { actions as expenseReportActions } from "document-models/expense-report";
import { actions as snapshotReportActions } from "document-models/snapshot-report";
import { useMonthlyReports } from "../hooks/useMonthlyReports.js";

interface ReportingViewProps {
  folderId: string;
  monthName?: string;
}

/**
 * Parse a month name like "January 2026" into start and end dates
 */
function parseMonthDates(monthName: string): {
  start: Date;
  end: Date;
} | null {
  const date = new Date(monthName + " 1"); // e.g., "January 2026 1"
  if (isNaN(date.getTime())) return null;

  // Use UTC to avoid timezone offset being baked into .toISOString()
  const start = new Date(Date.UTC(date.getFullYear(), date.getMonth(), 1));
  const end = new Date(
    Date.UTC(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999),
  );
  return { start, end };
}

/**
 * Format month name like "January 2026" to "01-2026"
 */
function formatMonthCode(monthName: string): string {
  const date = new Date(monthName + " 1");
  if (isNaN(date.getTime())) return monthName;
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = date.getUTCFullYear();
  return `${month}-${year}`;
}

/**
 * View for the Reporting folder showing Expense Reports and Snapshot Reports
 */
/**
 * Get the suggested start date for a new snapshot report based on the previous
 * month's snapshot period end date.
 */
function getSuggestedSnapshotStartDate(
  monthName: string,
  monthReportSets: { monthName: string; snapshotEndDate: string | null }[],
): Date | null {
  const monthDates = parseMonthDates(monthName);
  if (!monthDates) return null;

  const currentIndex = monthReportSets.findIndex(
    (s) => s.monthName === monthName,
  );
  if (currentIndex === -1) return null;

  const previousMonth = monthReportSets[currentIndex + 1];
  if (!previousMonth?.snapshotEndDate) return null;

  const previousEnd = new Date(previousMonth.snapshotEndDate);
  if (isNaN(previousEnd.getTime())) return null;

  const suggestedStart = new Date(previousEnd);
  suggestedStart.setUTCDate(suggestedStart.getUTCDate() + 1);
  suggestedStart.setUTCHours(0, 0, 0, 0);

  return suggestedStart;
}

export function ReportingView({ folderId, monthName }: ReportingViewProps) {
  const documentsInDrive = useDocumentsInSelectedDrive();
  const [selectedDrive] = useSelectedDrive();
  const [isCreating, setIsCreating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const { monthReportSets } = useMonthlyReports();

  // Find expense reports and snapshot reports in this Reporting folder
  // Also includes documents that match the month by name (for backwards compatibility)
  const { expenseReports, snapshotReports } = useMemo(() => {
    if (!documentsInDrive || !monthName) {
      return { expenseReports: [], snapshotReports: [] };
    }

    const allNodes = selectedDrive?.state.global.nodes || [];

    // Build a map of document ID to parent folder ID
    const documentParentMap = new Map<string, string | null>();
    for (const node of allNodes) {
      if (isFileNodeKind(node)) {
        documentParentMap.set(node.id, node.parentFolder);
      }
    }

    const monthLower = monthName.toLowerCase();
    const monthCode = formatMonthCode(monthName);

    const expense = documentsInDrive.filter((doc) => {
      if (doc.header.documentType !== "powerhouse/expense-report") return false;

      // Check if document is in this Reporting folder
      const docParentFolder = documentParentMap.get(doc.header.id);
      if (docParentFolder === folderId) {
        return true; // Document is in the folder, show it
      }

      // Otherwise, check if name matches the month (for backwards compatibility)
      const docName = doc.header.name || "";
      return (
        docName.toLowerCase().includes(monthLower) ||
        docName.includes(monthCode)
      );
    });

    const snapshot = documentsInDrive.filter((doc) => {
      if (doc.header.documentType !== "powerhouse/snapshot-report")
        return false;

      // Check if document is in this Reporting folder
      const docParentFolder = documentParentMap.get(doc.header.id);
      if (docParentFolder === folderId) {
        return true; // Document is in the folder, show it
      }

      // Otherwise, check if name matches the month (for backwards compatibility)
      const docName = doc.header.name || "";
      return (
        docName.toLowerCase().includes(monthLower) ||
        docName.includes(monthCode)
      );
    });

    return { expenseReports: expense, snapshotReports: snapshot };
  }, [documentsInDrive, monthName, folderId, selectedDrive]);

  const handleOpenDocument = (docId: string) => {
    setSelectedNode(docId);
  };

  const driveId = selectedDrive?.header.id;

  const handleDeleteReport = async () => {
    if (!driveId || !deleteTarget) return;
    setIsDeleting(true);
    try {
      await dispatchActions(deleteNode({ id: deleteTarget.id }), driveId);
    } catch (error) {
      console.error("Failed to delete report:", error);
    } finally {
      setIsDeleting(false);
      setDeleteTarget(null);
    }
  };

  const handleCreateExpenseReport = async () => {
    if (!driveId || !monthName || isCreating) return;
    setIsCreating(true);

    try {
      const monthCode = formatMonthCode(monthName);
      const reportNumber = expenseReports.length + 1;
      const reportName = `${monthCode} Expense Report ${reportNumber}`;
      const createdNode = await addDocument(
        driveId,
        reportName,
        "powerhouse/expense-report",
        undefined,
        undefined,
        undefined,
        "powerhouse-expense-report-editor",
      );

      if (!createdNode?.id) return;

      // Move to reporting folder
      if (folderId) {
        await dispatchActions(
          moveNode({ srcFolder: createdNode.id, targetParentFolder: folderId }),
          driveId,
        );
      }

      // Set the document name
      await dispatchActions(setName(reportName), createdNode.id);

      // Set period dates based on month
      const dates = parseMonthDates(monthName);
      if (dates) {
        await dispatchActions(
          [
            expenseReportActions.setPeriodStart({
              periodStart: dates.start.toISOString(),
            }),
            expenseReportActions.setPeriodEnd({
              periodEnd: dates.end.toISOString(),
            }),
          ],
          createdNode.id,
        );
      }

      // Open the created report
      setSelectedNode(createdNode.id);
    } finally {
      setIsCreating(false);
    }
  };

  const handleCreateSnapshotReport = async () => {
    if (!driveId || !monthName || isCreating) return;
    setIsCreating(true);

    try {
      const reportName = `${monthName} - Snapshot Report`;
      const createdNode = await addDocument(
        driveId,
        reportName,
        "powerhouse/snapshot-report",
        undefined,
        undefined,
        undefined,
        "powerhouse-snapshot-report-editor",
      );

      if (!createdNode?.id) return;

      // Move to reporting folder
      if (folderId) {
        await dispatchActions(
          moveNode({ srcFolder: createdNode.id, targetParentFolder: folderId }),
          driveId,
        );
      }

      // Set the document name
      await dispatchActions(setName(reportName), createdNode.id);

      // Set reporting period to calendar month boundaries
      const dates = parseMonthDates(monthName);
      if (dates) {
        const suggestedStart = getSuggestedSnapshotStartDate(
          monthName,
          monthReportSets,
        );
        // Transaction filtering start: previous period end + 1 day, or month start
        const txStartDate = suggestedStart || dates.start;

        await dispatchActions(
          [
            snapshotReportActions.setPeriodStart({
              periodStart: dates.start.toISOString(),
            }),
            snapshotReportActions.setPeriodEnd({
              periodEnd: dates.end.toISOString(),
            }),
          ],
          createdNode.id,
        );

        // Set the transaction filtering range (snapshot period) separately
        await dispatchActions(
          snapshotReportActions.setReportConfig({
            startDate: txStartDate.toISOString(),
            endDate: dates.end.toISOString(),
          }),
          createdNode.id,
        );
      }

      // Open the created report
      setSelectedNode(createdNode.id);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Reporting {monthName ? `- ${monthName}` : ""}
        </h1>
        <p className="text-gray-600">
          Manage expense reports and snapshot reports
          {monthName ? ` for ${monthName}` : ""}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Expense Reports Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-900">
                Expense Reports
              </h2>
              {expenseReports.length > 0 && (
                <span className="text-sm text-gray-500">
                  ({expenseReports.length})
                </span>
              )}
            </div>
            <button
              onClick={() => void handleCreateExpenseReport()}
              disabled={isCreating}
              className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="w-4 h-4" />
              {isCreating ? "Creating..." : "New"}
            </button>
          </div>

          {expenseReports.length === 0 ? (
            <p className="text-gray-500 text-sm">No expense reports yet</p>
          ) : (
            <div className="space-y-2">
              {expenseReports.map((doc) => (
                <div
                  key={doc.header.id}
                  className="flex items-center rounded-md border border-gray-100"
                >
                  <button
                    onClick={() => handleOpenDocument(doc.header.id)}
                    className="flex-1 flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-l-md transition-colors min-w-0"
                  >
                    <FileText className="w-4 h-4 text-gray-400" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {doc.header.name || "Untitled"}
                      </p>
                      <p className="text-xs text-gray-500">
                        Modified:{" "}
                        {new Date(
                          doc.header.lastModifiedAtUtcIso || Date.now(),
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  </button>
                  <button
                    onClick={() =>
                      setDeleteTarget({
                        id: doc.header.id,
                        name: doc.header.name || "Untitled",
                      })
                    }
                    className="p-3 text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
                    title="Delete report"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Snapshot Reports Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Camera className="w-5 h-5 text-purple-600" />
              <h2 className="text-lg font-semibold text-gray-900">
                Snapshot Reports
              </h2>
            </div>
            {snapshotReports.length === 0 && (
              <button
                onClick={() => void handleCreateSnapshotReport()}
                disabled={isCreating}
                className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-purple-600 hover:bg-purple-50 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus className="w-4 h-4" />
                {isCreating ? "Creating..." : "New"}
              </button>
            )}
          </div>

          {snapshotReports.length === 0 ? (
            <p className="text-gray-500 text-sm">No snapshot reports yet</p>
          ) : (
            <div className="space-y-2">
              {snapshotReports.map((doc) => (
                <div
                  key={doc.header.id}
                  className="flex items-center rounded-md border border-gray-100"
                >
                  <button
                    onClick={() => handleOpenDocument(doc.header.id)}
                    className="flex-1 flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-l-md transition-colors min-w-0"
                  >
                    <Camera className="w-4 h-4 text-gray-400" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {doc.header.name || "Untitled"}
                      </p>
                      <p className="text-xs text-gray-500">
                        Modified:{" "}
                        {new Date(
                          doc.header.lastModifiedAtUtcIso || Date.now(),
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  </button>
                  <button
                    onClick={() =>
                      setDeleteTarget({
                        id: doc.header.id,
                        name: doc.header.name || "Untitled",
                      })
                    }
                    className="p-3 text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
                    title="Delete report"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Delete confirmation modal */}
      <ConfirmationModal
        open={!!deleteTarget}
        header="Delete Report"
        onCancel={() => setDeleteTarget(null)}
        onContinue={() => void handleDeleteReport()}
        cancelLabel="Cancel"
        continueLabel={isDeleting ? "Deleting..." : "Delete"}
        continueDisabled={isDeleting}
      >
        <p className="text-red-600 text-sm mb-2 font-medium">
          This will permanently delete this report from the drive. This action
          cannot be undone.
        </p>
        {deleteTarget && (
          <p className="text-gray-700 text-sm font-medium">
            {deleteTarget.name}
          </p>
        )}
      </ConfirmationModal>
    </div>
  );
}
