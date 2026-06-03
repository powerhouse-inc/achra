import { FileText, Camera, Calendar } from "lucide-react";
import { useMemo } from "react";
import {
  useDocumentsInSelectedDrive,
  setSelectedNode,
} from "@powerhousedao/reactor-browser";
import {
  useBillingFolderStructure,
  formatMonthName,
} from "../hooks/useBillingFolderStructure.js";
import type { SelectedFolderInfo } from "./FolderTree.js";

interface MonthlyReportingProps {
  onFolderSelect?: (folderInfo: SelectedFolderInfo | null) => void;
  /** Show all months or just current/prior */
  showAllMonths?: boolean;
}

/**
 * Get color classes for report status badge
 */
function getStatusColors(status: string | null): {
  bg: string;
  text: string;
} {
  const statusLower = status?.toLowerCase() || "draft";

  switch (statusLower) {
    case "final":
    case "approved":
    case "completed":
      return { bg: "bg-green-100", text: "text-green-700" };
    case "submitted":
    case "review":
    case "in_review":
      return { bg: "bg-blue-100", text: "text-blue-700" };
    case "rejected":
    case "cancelled":
      return { bg: "bg-red-100", text: "text-red-700" };
    case "draft":
    default:
      return { bg: "bg-amber-100", text: "text-amber-700" };
  }
}

type ReportInfo = {
  exists: boolean;
  status: string | null;
  colors: { bg: string; text: string };
};

/**
 * Reusable Monthly Reporting component
 * Shows expense and snapshot report status for each month
 */
export function MonthlyReporting({
  onFolderSelect,
  showAllMonths = false,
}: MonthlyReportingProps) {
  const documentsInDrive = useDocumentsInSelectedDrive();
  const { monthFolders } = useBillingFolderStructure();

  // Get current and prior month names
  const { currentMonth, priorMonth } = useMemo(() => {
    const now = new Date();
    const current = formatMonthName(now);
    const prior = formatMonthName(
      new Date(now.getFullYear(), now.getMonth() - 1, 1),
    );
    return { currentMonth: current, priorMonth: prior };
  }, []);

  // Get report info for a specific month
  const getReportInfo = (month: string, type: string): ReportInfo => {
    const emptyColors = { bg: "bg-gray-100", text: "text-gray-500" };
    const emptyReport: ReportInfo = {
      exists: false,
      status: null,
      colors: emptyColors,
    };

    if (!documentsInDrive) return emptyReport;

    const doc = documentsInDrive.find(
      (d) =>
        d.header.documentType === type &&
        d.header.name?.toLowerCase().includes(month.toLowerCase()),
    );
    if (!doc) return emptyReport;

    const status =
      (doc.state as { global?: { status?: string } })?.global?.status ||
      "Draft";
    return { exists: true, status, colors: getStatusColors(status) };
  };

  // Get months to display
  const monthsToDisplay = useMemo(() => {
    if (showAllMonths) {
      // Show all months sorted by date (most recent first)
      return Array.from(monthFolders.keys()).sort((a, b) => {
        const dateA = new Date(a);
        const dateB = new Date(b);
        return dateB.getTime() - dateA.getTime();
      });
    }
    // Just show current and prior month
    return [currentMonth, priorMonth];
  }, [showAllMonths, monthFolders, currentMonth, priorMonth]);

  const handleOpenMonth = (monthName: string) => {
    const monthInfo = monthFolders.get(monthName);
    if (monthInfo?.reportingFolder) {
      setSelectedNode(monthInfo.reportingFolder.id);
      onFolderSelect?.({
        folderId: monthInfo.reportingFolder.id,
        folderType: "reporting",
        monthName,
      });
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2 bg-purple-100 rounded-lg">
          <Calendar className="w-5 h-5 text-purple-600" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Monthly Reporting
          </h2>
          <p className="text-sm text-gray-600">
            Track expense and snapshot reports for each period
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {monthsToDisplay.map((monthName) => {
          const expenseReport = getReportInfo(
            monthName,
            "powerhouse/expense-report",
          );
          const snapshotReport = getReportInfo(
            monthName,
            "powerhouse/snapshot-report",
          );
          const monthExists = monthFolders.has(monthName);

          return (
            <div
              key={monthName}
              className="border border-gray-100 rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-gray-900">{monthName}</h3>
                {monthExists ? (
                  <button
                    onClick={() => handleOpenMonth(monthName)}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Open Reporting
                  </button>
                ) : (
                  <span className="text-xs text-gray-400">
                    Month not created
                  </span>
                )}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div
                  className={`flex items-center gap-2 p-2 rounded ${expenseReport.exists ? "bg-blue-50" : "bg-gray-50"}`}
                >
                  <FileText
                    className={`w-4 h-4 ${expenseReport.exists ? "text-blue-600" : "text-gray-400"}`}
                  />
                  <span
                    className={`text-sm ${expenseReport.exists ? "text-blue-700" : "text-gray-500"}`}
                  >
                    Expense Report
                  </span>
                  {expenseReport.exists && (
                    <span
                      className={`text-xs font-medium px-1.5 py-0.5 rounded ml-auto ${expenseReport.colors.bg} ${expenseReport.colors.text}`}
                    >
                      {expenseReport.status}
                    </span>
                  )}
                </div>
                <div
                  className={`flex items-center gap-2 p-2 rounded ${snapshotReport.exists ? "bg-purple-50" : "bg-gray-50"}`}
                >
                  <Camera
                    className={`w-4 h-4 ${snapshotReport.exists ? "text-purple-600" : "text-gray-400"}`}
                  />
                  <span
                    className={`text-sm ${snapshotReport.exists ? "text-purple-700" : "text-gray-500"}`}
                  >
                    Snapshot Report
                  </span>
                  {snapshotReport.exists && (
                    <span
                      className={`text-xs font-medium px-1.5 py-0.5 rounded ml-auto ${snapshotReport.colors.bg} ${snapshotReport.colors.text}`}
                    >
                      {snapshotReport.status}
                    </span>
                  )}
                </div>
              </div>
              {!expenseReport.exists && !snapshotReport.exists && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded">
                    Reports pending for {monthName}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
