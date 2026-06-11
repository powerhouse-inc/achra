import {
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  CreditCard,
  FileText,
} from "lucide-react";
import { useBillingFolderStructure } from "../hooks/useBillingFolderStructure.js";
import {
  useDocumentsInSelectedDrive,
  useSelectedDrive,
  isFileNodeKind,
} from "@powerhousedao/reactor-browser";
import { useMemo, useEffect, useCallback } from "react";
import { MonthlyReportsOverview } from "./MonthlyReportsOverview.js";
import { useMonthlyReports } from "../hooks/useMonthlyReports.js";
import type { SelectedFolderInfo } from "./FolderTree.js";

interface BillingOverviewProps {
  onFolderSelect?: (folderInfo: SelectedFolderInfo | null) => void;
  onActiveNodeIdChange?: (nodeId: string) => void;
}

/**
 * Overview for the Billing folder showing payment stats and monthly reporting
 */
export function BillingOverview({
  onFolderSelect,
  onActiveNodeIdChange,
}: BillingOverviewProps) {
  const {
    billingFolder,
    monthFolders,
    createMonthFolder,
    createBillingFolder,
    paymentsFolderIds,
  } = useBillingFolderStructure();
  const documentsInDrive = useDocumentsInSelectedDrive();
  const [driveDocument] = useSelectedDrive();

  // Calculate payment stats across all months
  const paymentStats = useMemo(() => {
    if (!documentsInDrive || !driveDocument) {
      return {
        totalInvoices: 0,
        totalAmount: 0,
        pendingCount: 0,
        paidCount: 0,
      };
    }

    const nodes = driveDocument.state.global.nodes;

    // Get all invoice file IDs that are in any payments folder
    const invoiceIds = new Set(
      nodes
        .filter(
          (n) =>
            isFileNodeKind(n) &&
            paymentsFolderIds.has(n.parentFolder || "") &&
            n.documentType === "powerhouse/invoice",
        )
        .map((n) => n.id),
    );

    // Filter invoices in payments folders
    const invoices = documentsInDrive.filter(
      (doc) =>
        doc.header.documentType === "powerhouse/invoice" &&
        invoiceIds.has(doc.header.id),
    );

    let totalAmount = 0;
    let pendingCount = 0;
    let paidCount = 0;

    for (const invoice of invoices) {
      const state = invoice.state as {
        global?: { totalPriceTaxIncl?: number; status?: string };
      };
      totalAmount += state.global?.totalPriceTaxIncl || 0;

      const status = state.global?.status?.toUpperCase() || "DRAFT";
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

    return {
      totalInvoices: invoices.length,
      totalAmount,
      pendingCount,
      paidCount,
    };
  }, [documentsInDrive, driveDocument, paymentsFolderIds]);

  const { monthReportSets } = useMonthlyReports();

  // Reporting completeness: count months where both snapshot + expense exist
  const reportingCompleteness = useMemo(() => {
    const total = monthReportSets.length;
    const complete = monthReportSets.filter(
      (rs) => rs.snapshotReport !== null && rs.expenseReports.length > 0,
    ).length;
    return { complete, total };
  }, [monthReportSets]);

  // Action items: missing reports + pending invoices
  const actionItems = useMemo(() => {
    const items: Array<{
      label: string;
      type: "report" | "invoice";
      folderInfo?: SelectedFolderInfo;
    }> = [];

    for (const rs of monthReportSets) {
      if (!rs.snapshotReport) {
        items.push({
          label: `${rs.monthName} — missing snapshot report`,
          type: "report",
          folderInfo: rs.reportingFolderId
            ? {
                folderId: rs.reportingFolderId,
                folderType: "reporting",
                monthName: rs.monthName,
                paymentsFolderId: rs.folderInfo.paymentsFolder?.id,
              }
            : undefined,
        });
      }
      if (rs.expenseReports.length === 0) {
        items.push({
          label: `${rs.monthName} — missing expense report`,
          type: "report",
          folderInfo: rs.reportingFolderId
            ? {
                folderId: rs.reportingFolderId,
                folderType: "reporting",
                monthName: rs.monthName,
                paymentsFolderId: rs.folderInfo.paymentsFolder?.id,
              }
            : undefined,
        });
      }
    }

    if (paymentStats.pendingCount > 0) {
      // Navigate to the newest month's Payments folder
      const newestMonth = monthReportSets[0];
      items.push({
        label: `${paymentStats.pendingCount} invoice${paymentStats.pendingCount === 1 ? "" : "s"} pending payment`,
        type: "invoice",
        folderInfo: newestMonth?.folderInfo.paymentsFolder
          ? {
              folderId: newestMonth.folderInfo.paymentsFolder.id,
              folderType: "payments",
              monthName: newestMonth.monthName,
              reportingFolderId: newestMonth.folderInfo.reportingFolder?.id,
            }
          : undefined,
      });
    }

    return items.slice(0, 4);
  }, [monthReportSets, paymentStats.pendingCount]);

  // Auto-create billing folder if it doesn't exist
  const ensureBillingFolder = useCallback(async () => {
    if (!billingFolder) {
      await createBillingFolder();
    }
  }, [billingFolder, createBillingFolder]);

  // Create billing folder automatically when component mounts
  useEffect(() => {
    void ensureBillingFolder();
  }, [ensureBillingFolder]);

  // Show loading state while billing folder is being created
  if (!billingFolder) {
    return (
      <div>
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">Billing</h1>
          <p className="text-muted-foreground">
            Manage monthly billing, payments, and reports
          </p>
        </div>
        <div className="bg-card rounded-lg border border-border p-8 text-center">
          <div className="animate-pulse">
            <div className="w-12 h-12 bg-muted rounded-full mx-auto mb-4" />
            <div className="h-5 bg-muted rounded w-32 mx-auto mb-2" />
            <div className="h-4 bg-muted rounded w-48 mx-auto" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Billing</h1>
        <p className="text-muted-foreground">
          Manage monthly billing, payments, and reports
        </p>
      </div>

      {/* Payment Stats */}
      <div className="bg-card rounded-xl border border-border p-6 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-primary/15 rounded-lg">
            <CreditCard className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Payment Summary
            </h2>
            <p className="text-sm text-muted-foreground">
              Overview of all invoices across billing months
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-muted rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <FileText className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Total Invoices
              </span>
            </div>
            <p className="text-xl font-bold text-foreground">
              {paymentStats.totalInvoices}
            </p>
          </div>
          <div className="bg-muted rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <CreditCard className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Total Amount
              </span>
            </div>
            <p className="text-xl font-bold text-foreground">
              $
              {paymentStats.totalAmount.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>
          <div className="bg-status-warning/15 rounded-lg p-3">
            <span className="text-sm text-status-warning">Pending</span>
            <p className="text-xl font-bold text-status-warning">
              {paymentStats.pendingCount}
            </p>
          </div>
          <div className="bg-status-success/20 rounded-lg p-3">
            <span className="text-sm text-status-success">Paid</span>
            <p className="text-xl font-bold text-status-success">
              {paymentStats.paidCount}
            </p>
          </div>
          <div
            className={`${reportingCompleteness.total > 0 && reportingCompleteness.complete === reportingCompleteness.total ? "bg-status-success/20" : "bg-status-warning/15"} rounded-lg p-3`}
          >
            <div className="flex items-center gap-2 mb-1">
              {reportingCompleteness.total > 0 &&
              reportingCompleteness.complete === reportingCompleteness.total ? (
                <CheckCircle2 className="w-4 h-4 text-status-success" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-status-warning" />
              )}
              <span
                className={`text-sm ${reportingCompleteness.total > 0 && reportingCompleteness.complete === reportingCompleteness.total ? "text-status-success" : "text-status-warning"}`}
              >
                Reports Complete
              </span>
            </div>
            <p
              className={`text-xl font-bold ${reportingCompleteness.total > 0 && reportingCompleteness.complete === reportingCompleteness.total ? "text-status-success" : "text-status-warning"}`}
            >
              {reportingCompleteness.complete}/{reportingCompleteness.total}
            </p>
          </div>
        </div>
      </div>

      {/* Action Items */}
      {actionItems.length > 0 && (
        <div className="bg-status-warning/15 border border-status-warning/30 rounded-xl p-4 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-4 h-4 text-status-warning" />
            <span className="text-sm font-semibold text-status-warning">
              Needs attention
            </span>
          </div>
          <ul className="space-y-1">
            {actionItems.map((item) => (
              <li key={item.label}>
                {item.folderInfo && onFolderSelect ? (
                  <button
                    type="button"
                    className="w-full flex items-center justify-between text-left text-sm text-foreground hover:bg-status-warning/25 rounded px-2 py-1.5 transition-colors"
                    onClick={() => onFolderSelect(item.folderInfo!)}
                  >
                    <span>• {item.label}</span>
                    <ChevronRight className="w-4 h-4 text-status-warning flex-shrink-0" />
                  </button>
                ) : (
                  <span className="text-sm text-foreground px-2 py-1.5 block">
                    • {item.label}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Monthly Reports Overview */}
      <MonthlyReportsOverview
        onFolderSelect={onFolderSelect}
        monthFolders={monthFolders}
        onCreateMonth={createMonthFolder}
        onActiveNodeIdChange={onActiveNodeIdChange}
      />
    </div>
  );
}
