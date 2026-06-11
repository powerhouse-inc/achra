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
      return { bg: "bg-status-success/20", text: "text-status-success" };
    case "submitted":
    case "review":
    case "in_review":
      return { bg: "bg-status-progress/20", text: "text-status-progress" };
    case "rejected":
    case "cancelled":
      return { bg: "bg-destructive/15", text: "text-destructive" };
    case "draft":
    default:
      return { bg: "bg-status-warning/15", text: "text-status-warning" };
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
    const emptyColors = { bg: "bg-muted", text: "text-muted-foreground" };
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
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2 bg-primary/15 rounded-lg">
          <Calendar className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            Monthly Reporting
          </h2>
          <p className="text-sm text-muted-foreground">
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
              className="border border-border rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-foreground">{monthName}</h3>
                {monthExists ? (
                  <button
                    onClick={() => handleOpenMonth(monthName)}
                    className="text-sm text-primary hover:text-primary/80 font-medium"
                  >
                    Open Reporting
                  </button>
                ) : (
                  <span className="text-xs text-muted-foreground">
                    Month not created
                  </span>
                )}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div
                  className={`flex items-center gap-2 p-2 rounded ${expenseReport.exists ? "bg-primary/10" : "bg-muted"}`}
                >
                  <FileText
                    className={`w-4 h-4 ${expenseReport.exists ? "text-primary" : "text-muted-foreground"}`}
                  />
                  <span
                    className={`text-sm ${expenseReport.exists ? "text-primary" : "text-muted-foreground"}`}
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
                  className={`flex items-center gap-2 p-2 rounded ${snapshotReport.exists ? "bg-primary/10" : "bg-muted"}`}
                >
                  <Camera
                    className={`w-4 h-4 ${snapshotReport.exists ? "text-primary" : "text-muted-foreground"}`}
                  />
                  <span
                    className={`text-sm ${snapshotReport.exists ? "text-primary" : "text-muted-foreground"}`}
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
                <div className="mt-3 pt-3 border-t border-border">
                  <span className="text-xs font-medium text-status-warning bg-status-warning/15 px-2 py-1 rounded">
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
