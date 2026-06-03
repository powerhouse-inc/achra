import { useState, useMemo, useEffect } from "react";
import { setName } from "document-model";
import { useSelectedExpenseReportDocument } from "../../document-models/expense-report/v1/hooks.js";
import {
  actions,
  type ExpenseReportStatus,
} from "document-models/expense-report";
import { Icon, Button, Select } from "@powerhousedao/document-engineering";
import {
  DatePickerField,
  Form,
} from "@powerhousedao/document-engineering/scalars";
import { WalletsTable } from "./components/WalletsTable.js";
import { AggregatedExpensesTable } from "./components/AggregatedExpensesTable.js";
import { AddBillingStatementModal } from "./components/AddBillingStatementModal.js";
import { ExpenseReportPDF } from "./components/ExpenseReportPDF.js";
import { pdf } from "@react-pdf/renderer";
import { DocumentToolbar } from "@powerhousedao/design-system/connect";
import {
  setSelectedNode,
  useParentFolderForSelectedNode,
  useSelectedDrive,
  isFolderNodeKind,
} from "@powerhousedao/reactor-browser";
import type { FolderNode } from "@powerhousedao/shared/document-drive";
import { useSyncWallet } from "./hooks/useSyncWallet.js";
import { RefreshCw } from "lucide-react";
import { SetOwner } from "./components/SetOwner.js";

// Helper function to generate month options from January 2025 to current month
function generateMonthOptions() {
  const options: Array<{ label: string; value: string }> = [];
  const startDate = new Date(2025, 0, 1); // January 2025
  const currentDate = new Date();

  const date = new Date(startDate);

  while (date <= currentDate) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const monthName = date.toLocaleDateString("en-US", { month: "long" });
    const label = `${monthName} ${year}`;

    // Value format: YYYY-MM (e.g., "2025-01")
    const value = `${year}-${String(month + 1).padStart(2, "0")}`;

    options.push({ label, value });

    // Move to next month
    date.setMonth(date.getMonth() + 1);
  }

  // Reverse to show most recent first
  return options.reverse();
}

// Helper function to get start and end dates for a given month
function getMonthDateRange(yearMonth: string) {
  const [year, month] = yearMonth.split("-").map(Number);

  // First day of month at 00:00:00 UTC
  const periodStart = new Date(
    Date.UTC(year, month - 1, 1, 0, 0, 0, 0),
  ).toISOString();

  // Last day of month at 23:59:59.999 UTC
  // Get the last day by using day 0 of the next month
  const lastDay = new Date(Date.UTC(year, month, 0)).getUTCDate();
  const periodEnd = new Date(
    Date.UTC(year, month - 1, lastDay, 23, 59, 59, 999),
  ).toISOString();

  return { periodStart, periodEnd };
}

export default function Editor() {
  const [document, dispatch] = useSelectedExpenseReportDocument();
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSyncingAll, setIsSyncingAll] = useState(false);

  // Guard for undefined document or dispatch
  if (!document || !dispatch) {
    return <div>Loading...</div>;
  }

  const { wallets, groups, ownerId } = document.state.global;
  const { syncWallet } = useSyncWallet();

  // Derive current period from document state
  const periodStart = document.state.global.periodStart || "";
  const periodEnd = document.state.global.periodEnd || "";

  // Derive snapshot period from document state (for transaction filtering)
  // Support both old field names (snapshotStart/snapshotEnd) and new ones (startDate/endDate)
  const globalState = document.state.global as Record<string, unknown>;
  const startDate =
    (document.state.global.startDate as string) ||
    (globalState.snapshotStart as string) ||
    "";
  const endDate =
    (document.state.global.endDate as string) ||
    (globalState.snapshotEnd as string) ||
    "";

  // Local state for the selected period (before confirmation)
  const [selectedPeriod, setSelectedPeriod] = useState<string>(() => {
    if (periodStart) {
      // Use UTC methods to avoid timezone issues
      const date = new Date(periodStart);
      return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}`;
    }
    // Default to current month
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  });

  // Track if the selected period differs from the saved period
  const savedPeriod = useMemo(() => {
    if (periodStart) {
      // Use UTC methods to avoid timezone issues
      const date = new Date(periodStart);
      return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}`;
    }
    return "";
  }, [periodStart]);

  // Track if we're in editing mode
  const [isEditingPeriod, setIsEditingPeriod] = useState(!savedPeriod);

  const isPeriodChanged = selectedPeriod !== savedPeriod;

  // Update selected period when document period changes externally
  useEffect(() => {
    if (savedPeriod && savedPeriod !== selectedPeriod) {
      setSelectedPeriod(savedPeriod);
    }
  }, [savedPeriod]);

  // Handle period dropdown change (doesn't save yet)
  const handlePeriodChange = (value: string) => {
    setSelectedPeriod(value);
  };

  // Handle period confirmation (saves to document)
  const handleConfirmPeriod = () => {
    const { periodStart, periodEnd } = getMonthDateRange(selectedPeriod);

    // Get the formatted month label (e.g., "January 2025") - timezone agnostic
    const [year, month] = selectedPeriod.split("-").map(Number);
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
    const monthLabel = `${monthNames[month - 1]} ${year}`;

    // Dispatch period dates
    dispatch(actions.setPeriodStart({ periodStart }));
    dispatch(actions.setPeriodEnd({ periodEnd }));

    // Auto-set document name based on reporting period
    dispatch(setName(`${monthLabel} - Expense Report`));

    // Exit editing mode
    setIsEditingPeriod(false);
  };

  // Handle snapshot period date changes
  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateValue = e.target.value;
    if (!dateValue) return;

    const dateString = dateValue.split("T")[0];
    if (!dateString) return;

    const date = new Date(dateString + "T00:00:00.000Z");
    if (isNaN(date.getTime())) return;

    dispatch(actions.setPeriod({ startDate: date.toISOString() }));
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateValue = e.target.value;
    if (!dateValue) return;

    const dateString = dateValue.split("T")[0];
    if (!dateString) return;

    const endOfDay = new Date(dateString + "T23:59:59.999Z");
    if (isNaN(endOfDay.getTime())) return;

    dispatch(actions.setPeriod({ endDate: endOfDay.toISOString() }));
  };

  // Generate month options
  const monthOptions = useMemo(() => generateMonthOptions(), []);

  // Get the formatted display label for the current period
  const periodDisplayLabel = useMemo(() => {
    if (!periodStart) return selectedPeriod;
    const date = new Date(periodStart);
    const monthName = date.toLocaleDateString("en-US", {
      month: "long",
      timeZone: "UTC",
    });
    const year = date.getUTCFullYear();
    return `${monthName} ${year}`;
  }, [periodStart, selectedPeriod]);

  // Handle wallet selection for adding billing statements
  const handleAddBillingStatement = (walletAddress: string) => {
    setSelectedWallet(walletAddress);
    setIsModalOpen(true);
  };

  // Handle closing modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedWallet(null);
  };

  // Handle sync all wallets
  const handleSyncAllWallets = () => {
    // Use snapshot period for transaction filtering if available, otherwise fall back to reporting period
    const filterStart = startDate || periodStart;
    const filterEnd = endDate || periodEnd;

    if (!filterStart || !filterEnd) {
      alert(
        "Please set the Snapshot Period dates (or Reporting Period) before syncing wallet transactions.",
      );
      return;
    }

    setIsSyncingAll(true);

    // Sync all wallets that have either billing statements or transactions
    wallets.forEach((wallet) => {
      if (
        wallet.wallet &&
        ((wallet.billingStatements && wallet.billingStatements.length > 0) ||
          wallet.accountTransactionsDocumentId)
      ) {
        syncWallet(
          wallet.wallet,
          (wallet.lineItems || []).filter(
            (item): item is NonNullable<typeof item> => item != null,
          ),
          (wallet.billingStatements || []).filter(
            (id): id is NonNullable<typeof id> => id != null,
          ),
          groups,
          wallets,
          wallet.accountTransactionsDocumentId,
          filterStart,
          filterEnd,
          dispatch,
        );
      }
    });

    setIsSyncingAll(false);
  };

  // Handle PDF export
  const handleExportPDF = async () => {
    try {
      const blob = await pdf(
        <ExpenseReportPDF
          periodStart={startDate || periodStart}
          periodEnd={endDate || periodEnd}
          wallets={wallets}
          groups={groups}
        />,
      ).toBlob();

      // Create download link
      const url = URL.createObjectURL(blob);
      const link = window.document.createElement("a");
      link.href = url;

      // Generate filename with period
      const filename = periodStart
        ? `expense-report-${new Date(periodStart).toISOString().split("T")[0]}.pdf`
        : "expense-report.pdf";

      link.download = filename;
      link.click();

      // Cleanup
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  // Format period title for the breakdown section
  const breakdownTitle = useMemo(() => {
    if (!periodStart) return "Breakdown";

    const date = new Date(periodStart);
    const month = date.toLocaleDateString("en-US", { month: "short" });
    const year = date.getFullYear();

    return `${month} ${year} Breakdown`;
  }, [periodStart]);

  // Calculate the date to open the date picker to (last selected date or current date)
  // This ensures the date picker opens on the last selected month instead of always current month
  const openToDate = useMemo(() => {
    // Prefer startDate, then endDate, then current date
    const dateToUse = startDate || endDate;
    if (dateToUse) {
      const date = new Date(dateToUse);
      // Return date in YYYY-MM-DD format for the date picker
      return date.toISOString().split("T")[0];
    }
    // Default to current date
    return new Date().toISOString().split("T")[0];
  }, [startDate, endDate]);

  // Get the parent folder node for the currently selected node (this is the Reporting folder)
  const parentFolder = useParentFolderForSelectedNode();
  const [driveDocument] = useSelectedDrive();

  // Find the sibling "Payments" folder dynamically
  // Structure: Month Folder -> Reporting (where expense report lives) | Payments (sibling)
  // We find the expense report's file node, get its parent (Reporting), then find the sibling Payments folder
  const paymentsFolderId = useMemo(() => {
    if (!driveDocument || !document) return null;

    const nodes = driveDocument.state.global.nodes;
    const expenseReportId = document.header.id;

    // Find the expense report's file node in the drive
    const expenseReportFileNode = nodes.find(
      (node) => node.id === expenseReportId,
    );

    if (!expenseReportFileNode) return null;

    // Get the Reporting folder (parent of expense report)
    const reportingFolderId = expenseReportFileNode.parentFolder;
    if (!reportingFolderId) return null;

    // Find the Reporting folder node to get its parent (month folder)
    const reportingFolder = nodes.find(
      (node): node is FolderNode =>
        isFolderNodeKind(node) && node.id === reportingFolderId,
    );

    if (!reportingFolder) return null;

    // Get the month folder (parent of Reporting)
    const monthFolderId = reportingFolder.parentFolder;
    if (!monthFolderId) return null;

    // Find the "Payments" sibling folder under the same month folder
    const paymentsFolder = nodes.find(
      (node): node is FolderNode =>
        isFolderNodeKind(node) &&
        node.parentFolder === monthFolderId &&
        node.name === "Payments",
    );

    return paymentsFolder?.id ?? null;
  }, [driveDocument, document]);

  // Set the selected node to the parent folder node (close the editor)
  function handleClose() {
    setSelectedNode(parentFolder?.id);
  }

  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      <DocumentToolbar document={document} />
      <div className="ph-default-styles flex flex-col flex-1 min-h-0 w-full bg-gray-50 dark:bg-gray-900">
        {/* Main Content */}
        <div className="flex-1 overflow-auto px-3 sm:px-4 lg:px-6 py-4">
          <div className="w-full max-w-none space-y-4 lg:space-y-6">
            {/* Header Section */}
            <section className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="px-4 sm:px-6 py-4 sm:py-6">
                {/* Top row: Title and Export button */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                    Expense Report
                  </h1>
                  <Button
                    variant="ghost"
                    onClick={handleExportPDF}
                    className="flex items-center gap-2 shrink-0"
                  >
                    <Icon name="ExportPdf" size={18} />
                    <span>Export to PDF</span>
                  </Button>
                </div>
                {/* Row 1: Reporting Period, Status, Owner */}
                <div className="flex flex-wrap items-center gap-x-8 gap-y-3 mb-4">
                  {/* Reporting Period */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Reporting Period:
                    </span>
                    {isEditingPeriod ? (
                      <div className="flex items-center gap-2">
                        <Select
                          options={monthOptions}
                          value={selectedPeriod}
                          onChange={(value) =>
                            handlePeriodChange(value as string)
                          }
                          className="min-w-[180px]"
                        />
                        {isPeriodChanged && (
                          <Button
                            variant="default"
                            onClick={handleConfirmPeriod}
                            className="text-sm"
                          >
                            Set Period
                          </Button>
                        )}
                      </div>
                    ) : (
                      <span className="text-lg font-bold text-gray-900 dark:text-white">
                        {periodDisplayLabel}
                      </span>
                    )}
                  </div>
                  {/* Status */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Status:
                    </span>
                    <Select
                      options={[
                        { label: "Draft", value: "DRAFT" },
                        { label: "Review", value: "REVIEW" },
                        { label: "Final", value: "FINAL" },
                      ]}
                      value={document.state.global.status}
                      onChange={(value) =>
                        dispatch(
                          actions.setStatus({
                            status: value as ExpenseReportStatus,
                          }),
                        )
                      }
                      className="min-w-[140px]"
                    />
                  </div>
                  {/* Owner */}
                  <SetOwner
                    ownerId={ownerId}
                    periodStart={periodStart}
                    dispatch={dispatch}
                  />
                </div>

                {/* Transaction Period - exact same structure as Snapshot Report editor */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Transaction Period
                  </label>
                  <div className="flex gap-2 items-center">
                    <div className="relative isolate">
                      <Form
                        key={`startDate-${openToDate}`}
                        defaultValues={{
                          input: startDate
                            ? startDate.split("T")[0]
                            : openToDate,
                        }}
                        onSubmit={() => {}}
                        resetOnSuccessfulSubmit={false}
                      >
                        <DatePickerField
                          name="startDate"
                          value={startDate ? startDate.split("T")[0] : ""}
                          onChange={handleStartDateChange}
                          dateFormat="YYYY-MM-DD"
                          className="flex-1"
                        />
                      </Form>
                    </div>
                    <span className="self-center">to</span>
                    <div className="relative isolate">
                      <Form
                        key={`endDate-${openToDate}`}
                        defaultValues={{
                          input: endDate ? endDate.split("T")[0] : openToDate,
                        }}
                        onSubmit={() => {}}
                        resetOnSuccessfulSubmit={false}
                      >
                        <DatePickerField
                          name="endDate"
                          value={endDate ? endDate.split("T")[0] : ""}
                          onChange={handleEndDateChange}
                          dateFormat="YYYY-MM-DD"
                          className="flex-1"
                        />
                      </Form>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Wallets Section */}
            <section className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                  Wallets
                </h2>
                <Button
                  variant="ghost"
                  onClick={handleSyncAllWallets}
                  disabled={isSyncingAll}
                  className="flex items-center gap-2"
                >
                  <RefreshCw
                    size={16}
                    className={isSyncingAll ? "animate-spin" : ""}
                  />
                  <span className="hidden sm:inline">
                    {isSyncingAll ? "Syncing..." : "Sync All"}
                  </span>
                </Button>
              </div>
              <div className="p-3 sm:p-4 lg:p-6 overflow-x-auto">
                <WalletsTable
                  wallets={wallets}
                  groups={groups}
                  onAddBillingStatement={handleAddBillingStatement}
                  periodStart={periodStart}
                  periodEnd={periodEnd}
                  dispatch={dispatch}
                />
              </div>
            </section>

            {/* Aggregated Expenses Section */}
            {wallets.length > 0 && (
              <section className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                    {breakdownTitle}
                  </h2>
                </div>
                <div className="p-3 sm:p-4 lg:p-6 overflow-x-auto">
                  <AggregatedExpensesTable
                    wallets={wallets}
                    groups={groups}
                    periodStart={periodStart}
                    periodEnd={periodEnd}
                    dispatch={dispatch}
                  />
                </div>
              </section>
            )}
          </div>
        </div>

        {/* Add Billing Statement Modal */}
        {isModalOpen && selectedWallet && (
          <AddBillingStatementModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            walletAddress={selectedWallet}
            dispatch={dispatch}
            groups={groups}
            paymentsFolderId={paymentsFolderId}
          />
        )}
      </div>
    </div>
  );
}
