import { useCallback, useState, useMemo, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { BarChart3, Plus, ChevronDown } from "lucide-react";
import type { MonthFolderInfo } from "../hooks/useBillingFolderStructure.js";
import {
  useSelectedDrive,
  useDocumentsInSelectedDrive,
  addDocument,
  dispatchActions,
  setSelectedNode,
  isFileNodeKind,
} from "@powerhousedao/reactor-browser";
import { setName } from "document-model";
import { moveNode, deleteNode } from "@powerhousedao/shared/document-drive";
import {
  useMonthlyReports,
  type MonthReportSet,
} from "../hooks/useMonthlyReports.js";
import { MonthReportCard, type MonthPaymentStats } from "./MonthReportCard.js";
import { actions as expenseReportActions } from "document-models/expense-report";
import { actions as snapshotReportActions } from "document-models/snapshot-report";
import type { SelectedFolderInfo } from "./FolderTree.js";

interface MonthlyReportsOverviewProps {
  onFolderSelect?: (folderInfo: SelectedFolderInfo | null) => void;
  monthFolders?: Map<string, MonthFolderInfo>;
  onCreateMonth?: (monthName: string) => Promise<void>;
  onActiveNodeIdChange?: (nodeId: string) => void;
}

/**
 * Format a date to month name like "January 2026"
 */
function formatMonthName(date: Date): string {
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
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
 * Parse a month name like "January 2026" into start and end dates (UTC)
 */
function parseMonthDates(monthName: string): {
  start: Date;
  end: Date;
} | null {
  const date = new Date(monthName + " 1");
  if (isNaN(date.getTime())) return null;

  // Use UTC to avoid timezone issues
  const start = new Date(Date.UTC(date.getFullYear(), date.getMonth(), 1));
  const end = new Date(
    Date.UTC(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999),
  );
  return { start, end };
}

/**
 * Get the suggested start date for a new snapshot report based on the previous
 * month's snapshot period end date. Returns the day after the previous period
 * ends, or the first day of the month if there's no previous snapshot.
 */
function getSuggestedSnapshotStartDate(
  monthName: string,
  monthReportSets: MonthReportSet[],
): Date | null {
  const monthDates = parseMonthDates(monthName);
  if (!monthDates) return null;

  // Find the current month's index in the sorted (descending) list
  const currentIndex = monthReportSets.findIndex(
    (s) => s.monthName === monthName,
  );
  if (currentIndex === -1) return null;

  // The previous month is the next item in the descending-sorted array
  const previousMonth = monthReportSets[currentIndex + 1];
  if (!previousMonth?.snapshotEndDate) return null;

  const previousEnd = new Date(previousMonth.snapshotEndDate);
  if (isNaN(previousEnd.getTime())) return null;

  // Suggested start = previous period end + 1 day
  const suggestedStart = new Date(previousEnd);
  suggestedStart.setUTCDate(suggestedStart.getUTCDate() + 1);
  suggestedStart.setUTCHours(0, 0, 0, 0);

  return suggestedStart;
}

/**
 * Monthly Reports Overview component for the billing page
 * Shows collapsible month cards with reports and status
 */
export function MonthlyReportsOverview({
  onFolderSelect,
  monthFolders,
  onCreateMonth,
  onActiveNodeIdChange,
}: MonthlyReportsOverviewProps) {
  const { monthReportSets, isLoading } = useMonthlyReports();
  const [selectedDrive] = useSelectedDrive();
  const documentsInDrive = useDocumentsInSelectedDrive();
  const [isCreating, setIsCreating] = useState(false);
  const [isAddingMonth, setIsAddingMonth] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const driveId = selectedDrive?.header.id;

  // Per-month payment stats for the Payments row in each card
  const monthPaymentStatsMap = useMemo(() => {
    const map = new Map<string, MonthPaymentStats>();
    if (!selectedDrive || !documentsInDrive || !monthFolders) return map;

    const nodes = selectedDrive.state.global.nodes;

    for (const [monthName, folderInfo] of monthFolders.entries()) {
      const paymentsFolderId = folderInfo.paymentsFolder?.id;
      if (!paymentsFolderId) continue;

      const invoiceIds = new Set(
        nodes
          .filter(
            (n) =>
              isFileNodeKind(n) &&
              n.parentFolder === paymentsFolderId &&
              n.documentType === "powerhouse/invoice",
          )
          .map((n) => n.id),
      );

      const invoices = documentsInDrive.filter(
        (doc) =>
          doc.header.documentType === "powerhouse/invoice" &&
          invoiceIds.has(doc.header.id),
      );

      let pendingCount = 0;
      let paidCount = 0;
      for (const invoice of invoices) {
        const status = (
          (invoice.state as { global?: { status?: string } }).global?.status ??
          ""
        ).toUpperCase();
        if (
          status === "PAYMENTSENT" ||
          status === "PAYMENTRECEIVED" ||
          status === "PAYMENTCLOSED"
        ) {
          paidCount++;
        } else if (status !== "REJECTED" && status !== "CANCELLED") {
          pendingCount++;
        }
      }

      map.set(monthName, {
        totalInvoices: invoices.length,
        pendingCount,
        paidCount,
      });
    }

    return map;
  }, [selectedDrive, documentsInDrive, monthFolders]);

  const handleViewPayments = useCallback(
    (monthName: string) => {
      if (!onFolderSelect || !monthFolders) return;
      const info = monthFolders.get(monthName);
      if (!info?.paymentsFolder) return;
      onFolderSelect({
        folderId: info.paymentsFolder.id,
        folderType: "payments",
        monthName,
        reportingFolderId: info.reportingFolder?.id,
      });
    },
    [onFolderSelect, monthFolders],
  );

  const buttonRef = useRef<HTMLButtonElement>(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });

  // Update dropdown position when opening
  useEffect(() => {
    if (isDropdownOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + 4,
        left: rect.right - 224, // 224px = w-56 (14rem)
      });
    }
  }, [isDropdownOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Get all months from January 2025 to next month, with exists flag
  const allMonths = useMemo(() => {
    const months: Array<{ name: string; exists: boolean }> = [];
    const today = new Date();
    const endDate = new Date(today.getFullYear(), today.getMonth() + 1, 1);
    const startDate = new Date(2024, 0, 1);

    const currentDate = new Date(endDate);
    while (currentDate >= startDate) {
      const monthName = formatMonthName(currentDate);
      months.push({
        name: monthName,
        exists: monthFolders?.has(monthName) ?? false,
      });
      currentDate.setMonth(currentDate.getMonth() - 1);
    }
    return months;
  }, [monthFolders]);

  const handleCreateMonth = useCallback(
    async (monthName: string) => {
      if (!onCreateMonth || isAddingMonth) return;
      setIsAddingMonth(true);
      try {
        await onCreateMonth(monthName);
        setIsDropdownOpen(false);
      } finally {
        setIsAddingMonth(false);
      }
    },
    [onCreateMonth, isAddingMonth],
  );

  const handleCreateExpenseReport = useCallback(
    async (monthName: string, folderId: string) => {
      if (!driveId || isCreating) return;
      setIsCreating(true);

      try {
        const monthCode = formatMonthCode(monthName);
        // Find existing expense reports for this month to determine number
        const monthSet = monthReportSets.find((s) => s.monthName === monthName);
        const reportNumber = (monthSet?.expenseReports.length || 0) + 1;
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
            moveNode({
              srcFolder: createdNode.id,
              targetParentFolder: folderId,
            }),
            driveId,
          );
        }

        // Set the document name
        await dispatchActions(setName(reportName), createdNode.id);

        // Set Reporting Period based on month (Transaction Period is set by user)
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
        // Update sidebar active node to show the new document as selected
        onActiveNodeIdChange?.(createdNode.id);
      } finally {
        setIsCreating(false);
      }
    },
    [driveId, isCreating, monthReportSets, onActiveNodeIdChange],
  );

  const handleCreateSnapshotReport = useCallback(
    async (monthName: string, folderId: string) => {
      if (!driveId || isCreating) return;
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
            moveNode({
              srcFolder: createdNode.id,
              targetParentFolder: folderId,
            }),
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
        // Update sidebar active node to show the new document as selected
        onActiveNodeIdChange?.(createdNode.id);
      } finally {
        setIsCreating(false);
      }
    },
    [driveId, isCreating, monthReportSets, onActiveNodeIdChange],
  );

  const handleDeleteReport = useCallback(
    async (reportId: string) => {
      if (!driveId) return;
      try {
        await dispatchActions(deleteNode({ id: reportId }), driveId);
      } catch (error) {
        console.error("Failed to delete report:", error);
      }
    },
    [driveId],
  );

  const handleDeleteMonth = useCallback(
    async (monthName: string) => {
      if (!driveId || !monthFolders) return;
      const info = monthFolders.get(monthName);
      if (!info) return;

      try {
        // Delete child nodes first (files in Reporting/Payments, then subfolders, then month folder)
        const allNodes = selectedDrive?.state.global.nodes || [];
        const childNodeIds: string[] = [];

        // Collect files inside Reporting and Payments subfolders
        for (const node of allNodes) {
          if (
            node.parentFolder === info.reportingFolder?.id ||
            node.parentFolder === info.paymentsFolder?.id
          ) {
            childNodeIds.push(node.id);
          }
        }

        // Delete files first
        for (const nodeId of childNodeIds) {
          await dispatchActions(deleteNode({ id: nodeId }), driveId);
        }

        // Delete subfolders
        if (info.reportingFolder) {
          await dispatchActions(
            deleteNode({ id: info.reportingFolder.id }),
            driveId,
          );
        }
        if (info.paymentsFolder) {
          await dispatchActions(
            deleteNode({ id: info.paymentsFolder.id }),
            driveId,
          );
        }

        // Delete the month folder itself
        await dispatchActions(deleteNode({ id: info.folder.id }), driveId);
      } catch (error) {
        console.error(`Failed to delete month folder ${monthName}:`, error);
      }
    },
    [driveId, monthFolders, selectedDrive],
  );

  // Add Month button component (reused across states)
  const addMonthButton = onCreateMonth && (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        disabled={isAddingMonth}
        className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Plus className="w-4 h-4" />
        {isAddingMonth ? "Adding..." : "Add Month"}
        <ChevronDown className="w-3 h-3" />
      </button>

      {isDropdownOpen &&
        createPortal(
          <div
            ref={dropdownRef}
            className="fixed w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-[9999]"
            style={{
              top: dropdownPosition.top,
              left: dropdownPosition.left,
            }}
          >
            <div className="px-3 py-2 text-xs font-medium text-gray-500 border-b border-gray-100">
              Select a month to add
            </div>
            <div className="max-h-72 overflow-y-auto">
              {allMonths.map(({ name, exists }) => (
                <button
                  key={name}
                  onClick={() => void handleCreateMonth(name)}
                  disabled={isAddingMonth || exists}
                  className={`w-full px-3 py-2 text-left text-sm ${
                    exists
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-gray-700 hover:bg-gray-50"
                  } disabled:cursor-not-allowed`}
                >
                  {name}
                  {exists && (
                    <span className="ml-2 text-xs text-gray-400">(exists)</span>
                  )}
                </button>
              ))}
            </div>
          </div>,
          document.body,
        )}
    </div>
  );

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="animate-pulse">
          <div className="flex items-center justify-between gap-3 mb-5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gray-200 rounded-lg" />
              <div>
                <div className="h-5 bg-gray-200 rounded w-36 mb-2" />
                <div className="h-4 bg-gray-100 rounded w-56" />
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="h-16 bg-gray-100 rounded-xl" />
            <div className="h-16 bg-gray-100 rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  if (monthReportSets.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6 overflow-visible">
        <div className="flex items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <BarChart3 className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Monthly Reports
              </h2>
              <p className="text-sm text-gray-600">
                Quick access to expense and snapshot reports
              </p>
            </div>
          </div>
          {addMonthButton}
        </div>
        <p className="text-gray-500 text-sm text-center py-4">
          No months configured yet. Click "Add Month" to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 overflow-visible">
      {/* Header with Add Month button */}
      <div className="flex items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <BarChart3 className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Monthly Reports
            </h2>
            <p className="text-sm text-gray-600">
              Quick access to expense and snapshot reports
            </p>
          </div>
        </div>
        {addMonthButton}
      </div>

      {/* Month cards */}
      <div className="space-y-3">
        {monthReportSets.map((reportSet, index) => (
          <MonthReportCard
            key={reportSet.monthName}
            reportSet={reportSet}
            defaultExpanded={index === 0}
            onCreateExpenseReport={handleCreateExpenseReport}
            onCreateSnapshotReport={handleCreateSnapshotReport}
            onDeleteReport={handleDeleteReport}
            onDeleteMonth={handleDeleteMonth}
            onViewPayments={onFolderSelect ? handleViewPayments : undefined}
            paymentStats={monthPaymentStatsMap.get(reportSet.monthName)}
            suggestedStartDate={
              getSuggestedSnapshotStartDate(
                reportSet.monthName,
                monthReportSets,
              ) || undefined
            }
          />
        ))}
      </div>
    </div>
  );
}
