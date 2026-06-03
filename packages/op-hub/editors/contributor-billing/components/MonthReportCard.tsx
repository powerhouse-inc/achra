import { useState, useCallback } from "react";
import {
  Calendar,
  ChevronDown,
  ChevronRight,
  Camera,
  CreditCard,
  FileText,
  ArrowRight,
  Plus,
  Info,
  Trash2,
} from "lucide-react";
import { setSelectedNode } from "@powerhousedao/reactor-browser";
import type {
  MonthReportSet,
  ReportDocument,
  ReportStatus,
} from "../hooks/useMonthlyReports.js";
import { ConfirmationModal } from "./InvoiceTable/ConfirmationModal.js";

export interface MonthPaymentStats {
  totalInvoices: number;
  pendingCount: number;
  paidCount: number;
}

interface MonthReportCardProps {
  reportSet: MonthReportSet;
  defaultExpanded?: boolean;
  onCreateExpenseReport?: (monthName: string, folderId: string) => void;
  onCreateSnapshotReport?: (monthName: string, folderId: string) => void;
  onDeleteReport?: (reportId: string, reportName: string) => Promise<void>;
  onDeleteMonth?: (monthName: string) => Promise<void>;
  onViewPayments?: (monthName: string) => void;
  paymentStats?: MonthPaymentStats;
  /** Suggested start date based on previous month's snapshot period end + 1 day */
  suggestedStartDate?: Date;
}

/**
 * Get color classes for status badges
 */
function getStatusColors(status: ReportStatus): { bg: string; text: string } {
  switch (status) {
    case "FINAL":
      return { bg: "bg-green-100", text: "text-green-700" };
    case "REVIEW":
      return { bg: "bg-blue-100", text: "text-blue-700" };
    case "DRAFT":
      return { bg: "bg-amber-100", text: "text-amber-700" };
    case "NONE":
    default:
      return { bg: "bg-gray-100", text: "text-gray-500" };
  }
}

/**
 * Get display text for status
 */
function getStatusLabel(status: ReportStatus): string {
  switch (status) {
    case "FINAL":
      return "Final";
    case "REVIEW":
      return "Review";
    case "DRAFT":
      return "Draft";
    case "NONE":
    default:
      return "None";
  }
}

/**
 * Individual report row component
 */
function ReportRow({
  report,
  isSnapshot = false,
  onDelete,
}: {
  report: ReportDocument;
  isSnapshot?: boolean;
  onDelete?: (reportId: string, reportName: string) => void;
}) {
  const colors = getStatusColors(report.status);

  const handleClick = useCallback(() => {
    setSelectedNode(report.id);
  }, [report.id]);

  const handleDelete = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onDelete?.(report.id, report.name);
    },
    [onDelete, report.id, report.name],
  );

  return (
    <div className="flex items-center border-b border-gray-100 last:border-b-0">
      <button
        onClick={handleClick}
        className="flex-1 flex items-center justify-between p-3 hover:bg-gray-50 cursor-pointer transition-colors min-w-0"
      >
        <div className="flex items-center gap-3 min-w-0">
          {isSnapshot ? (
            <Camera className="w-4 h-4 text-purple-500 flex-shrink-0" />
          ) : (
            <FileText className="w-4 h-4 text-blue-500 flex-shrink-0" />
          )}
          <span className="text-sm text-gray-900 truncate">{report.name}</span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span
            className={`px-2 py-0.5 text-xs font-medium rounded-full ${colors.bg} ${colors.text}`}
          >
            {getStatusLabel(report.status)}
          </span>
          <ArrowRight className="w-4 h-4 text-gray-400" />
        </div>
      </button>
      {onDelete && (
        <button
          onClick={handleDelete}
          className="p-3 text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
          title="Delete report"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

/**
 * Collapsible month card showing all reports for a month
 */
/**
 * Format a date as "Mon DD" (e.g., "Dec 24")
 */
function formatShortDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

/**
 * Check if a date is the first day of the month parsed from monthName
 */
function isFirstOfMonth(date: Date, monthName: string): boolean {
  const monthDate = new Date(monthName + " 1");
  if (isNaN(monthDate.getTime())) return false;
  return (
    date.getUTCFullYear() === monthDate.getFullYear() &&
    date.getUTCMonth() === monthDate.getMonth() &&
    date.getUTCDate() === 1
  );
}

export function MonthReportCard({
  reportSet,
  defaultExpanded = false,
  onCreateExpenseReport,
  onCreateSnapshotReport,
  onDeleteReport,
  onDeleteMonth,
  onViewPayments,
  paymentStats,
  suggestedStartDate,
}: MonthReportCardProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [deleteTarget, setDeleteTarget] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteMonthConfirm, setShowDeleteMonthConfirm] = useState(false);
  const [isDeletingMonth, setIsDeletingMonth] = useState(false);
  const overallColors = getStatusColors(reportSet.overallStatus);

  const toggleExpanded = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  const handleDeleteRequest = useCallback(
    (reportId: string, reportName: string) => {
      setDeleteTarget({ id: reportId, name: reportName });
    },
    [],
  );

  const handleConfirmDelete = useCallback(async () => {
    if (!deleteTarget || !onDeleteReport) return;
    setIsDeleting(true);
    try {
      await onDeleteReport(deleteTarget.id, deleteTarget.name);
    } finally {
      setIsDeleting(false);
      setDeleteTarget(null);
    }
  }, [deleteTarget, onDeleteReport]);

  const handleCreateExpenseReport = useCallback(() => {
    if (onCreateExpenseReport && reportSet.reportingFolderId) {
      onCreateExpenseReport(reportSet.monthName, reportSet.reportingFolderId);
    }
  }, [onCreateExpenseReport, reportSet.monthName, reportSet.reportingFolderId]);

  const handleCreateSnapshotReport = useCallback(() => {
    if (onCreateSnapshotReport && reportSet.reportingFolderId) {
      onCreateSnapshotReport(reportSet.monthName, reportSet.reportingFolderId);
    }
  }, [
    onCreateSnapshotReport,
    reportSet.monthName,
    reportSet.reportingFolderId,
  ]);

  const handleViewPayments = useCallback(() => {
    onViewPayments?.(reportSet.monthName);
  }, [onViewPayments, reportSet.monthName]);

  const handleDeleteMonth = useCallback(async () => {
    if (!onDeleteMonth) return;
    setIsDeletingMonth(true);
    try {
      await onDeleteMonth(reportSet.monthName);
    } finally {
      setIsDeletingMonth(false);
      setShowDeleteMonthConfirm(false);
    }
  }, [onDeleteMonth, reportSet.monthName]);

  const reportCountText =
    reportSet.reportCount === 1
      ? "1 Report"
      : `${reportSet.reportCount} Reports`;

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Header - Clickable to expand/collapse */}
      <div className="flex items-center">
        <button
          onClick={toggleExpanded}
          className="flex-1 flex items-center justify-between p-4 hover:bg-gray-50 transition-colors text-left"
        >
          <div className="flex items-center gap-3">
            {isExpanded ? (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronRight className="w-5 h-5 text-gray-400" />
            )}
            <Calendar className="w-5 h-5 text-gray-600" />
            <span className="font-medium text-gray-900">
              {reportSet.monthName}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">{reportCountText}</span>
            {reportSet.reportCount > 0 && (
              <span
                className={`px-2 py-0.5 text-xs font-medium rounded-full ${overallColors.bg} ${overallColors.text}`}
              >
                {getStatusLabel(reportSet.overallStatus)}
              </span>
            )}
          </div>
        </button>
        {onDeleteMonth && (
          <button
            onClick={() => setShowDeleteMonthConfirm(true)}
            className="p-4 text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
            title={`Delete ${reportSet.monthName}`}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Expanded content */}
      {isExpanded && (
        <div className="border-t border-gray-200">
          {/* Payments row */}
          {onViewPayments && (
            <button
              onClick={handleViewPayments}
              className="w-full flex items-center justify-between p-3 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-100"
            >
              <div className="flex items-center gap-3 min-w-0">
                <CreditCard className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span className="text-sm font-medium text-gray-900">
                  Payments
                </span>
                {paymentStats && paymentStats.totalInvoices > 0 && (
                  <span className="text-xs text-gray-500">
                    {paymentStats.totalInvoices} invoice
                    {paymentStats.totalInvoices !== 1 ? "s" : ""}
                    {paymentStats.pendingCount > 0 && (
                      <span className="text-amber-600">
                        {" "}
                        · {paymentStats.pendingCount} pending
                      </span>
                    )}
                    {paymentStats.paidCount > 0 && (
                      <span className="text-green-600">
                        {" "}
                        · {paymentStats.paidCount} paid
                      </span>
                    )}
                  </span>
                )}
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
            </button>
          )}

          {/* Snapshot report */}
          {reportSet.snapshotReport && (
            <ReportRow
              report={reportSet.snapshotReport}
              isSnapshot
              onDelete={onDeleteReport ? handleDeleteRequest : undefined}
            />
          )}

          {/* Expense reports */}
          {reportSet.expenseReports.map((report) => (
            <ReportRow
              key={report.id}
              report={report}
              onDelete={onDeleteReport ? handleDeleteRequest : undefined}
            />
          ))}

          {/* Empty state */}
          {reportSet.reportCount === 0 && (
            <div className="p-4 text-center text-sm text-gray-500">
              No reports created yet
            </div>
          )}

          {/* Add report buttons */}
          {(onCreateExpenseReport || onCreateSnapshotReport) &&
            reportSet.reportingFolderId && (
              <div className="p-3 border-t border-gray-100 bg-gray-50">
                <div className="flex items-center gap-3">
                  {onCreateSnapshotReport && !reportSet.snapshotReport && (
                    <button
                      onClick={handleCreateSnapshotReport}
                      className="flex items-center gap-2 text-sm text-purple-600 hover:text-purple-700 font-medium transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      Add Snapshot Report
                    </button>
                  )}
                  {onCreateExpenseReport && (
                    <button
                      onClick={handleCreateExpenseReport}
                      className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      Add Expense Report
                    </button>
                  )}
                </div>
                {onCreateSnapshotReport &&
                  !reportSet.snapshotReport &&
                  suggestedStartDate &&
                  !isFirstOfMonth(suggestedStartDate, reportSet.monthName) && (
                    <div className="flex items-center gap-1.5 mt-2 text-xs text-indigo-600">
                      <Info className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>
                        Transaction period will start{" "}
                        {formatShortDate(suggestedStartDate)} (day after
                        previous snapshot period ends)
                      </span>
                    </div>
                  )}
              </div>
            )}
        </div>
      )}

      {/* Delete report confirmation modal */}
      <ConfirmationModal
        open={!!deleteTarget}
        header="Delete Report"
        onCancel={() => setDeleteTarget(null)}
        onContinue={() => void handleConfirmDelete()}
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

      {/* Delete month confirmation modal */}
      <ConfirmationModal
        open={showDeleteMonthConfirm}
        header={`Delete ${reportSet.monthName}`}
        onCancel={() => setShowDeleteMonthConfirm(false)}
        onContinue={() => void handleDeleteMonth()}
        cancelLabel="Cancel"
        continueLabel={isDeletingMonth ? "Deleting..." : "Delete Month"}
        continueDisabled={isDeletingMonth}
      >
        <p className="text-red-600 text-sm mb-2 font-medium">
          This will permanently delete the {reportSet.monthName} folder and all
          its contents including reports, invoices, and billing statements.
        </p>
        {reportSet.reportCount > 0 && (
          <p className="text-gray-700 text-sm">
            {reportSet.reportCount} report
            {reportSet.reportCount !== 1 ? "s" : ""} will be deleted.
          </p>
        )}
      </ConfirmationModal>
    </div>
  );
}
