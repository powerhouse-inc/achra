import { useState } from "react";
import { Select } from "@powerhousedao/document-engineering/ui";
import type { FileNode } from "@powerhousedao/shared/document-drive";
import { cbToast } from "../cbToast.js";
import { ConfirmationModal } from "./ConfirmationModal.js";

const currencyOptions = [
  { label: "CHF", value: "CHF" },
  { label: "USD", value: "USD" },
  { label: "EUR", value: "EUR" },
  { label: "GBP", value: "GBP" },
  { label: "JPY", value: "JPY" },
];

export interface StatusOption {
  label: string;
  value: string;
}

// Re-export FileNode type for use in other components
export type { FileNode };

interface HeaderControlsProps {
  statusOptions?: StatusOption[];
  selectedStatuses?: string[];
  onStatusChange?: (value: string | string[]) => void;
  onSearchChange?: (value: string) => void;
  onExport?: (baseCurrency: string) => void;
  onExpenseReportExport?: (baseCurrency: string) => void;
  createIntegrationsDocument?: () => void;
  integrationsDoc?: FileNode;
  canExport?: boolean;
  hasBillingStatements?: boolean;
  expenseReportDoc?: FileNode;
  onCreateOrOpenExpenseReport?: () => void;
  selected?: Record<string, boolean>;
  handleCreateBillingStatement: (id: string) => Promise<void>;
  setSelected: (selected: Record<string, boolean>) => void;
  invoices?: Array<{ header: { id: string; name: string } }>;
  billingStatements?: Array<{ header: { id: string; name: string } }>;
  canExportSelectedRows: () => boolean;
  onDeleteSelected?: (ids: string[]) => Promise<void>;
}

export const HeaderControls = ({
  statusOptions = [],
  selectedStatuses = [],
  onStatusChange,
  onSearchChange,
  onExport,
  onExpenseReportExport,
  hasBillingStatements = false,
  onCreateOrOpenExpenseReport,
  selected = {},
  handleCreateBillingStatement,
  setSelected,
  invoices = [],
  billingStatements = [],
  canExportSelectedRows,
  onDeleteSelected,
}: HeaderControlsProps) => {
  const batchOptions = [
    { label: "Generate Bill Statements", value: "generate-bills" },
    {
      label: "Export CSV Expense Report",
      value: "export-csv-expense-report",
    },
    { label: "Delete Selected", value: "delete-selected" },
  ];

  const [showCurrencyModal, setShowCurrencyModal] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("CHF");
  const [showExpenseReportCurrencyModal, setShowExpenseReportCurrencyModal] =
    useState(false);
  const [selectedExpenseReportCurrency, setSelectedExpenseReportCurrency] =
    useState("CHF");
  const [selectedBatchAction, setSelectedBatchAction] = useState<
    string | undefined
  >(undefined);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [deleteIds, setDeleteIds] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Simple batch action handler - matches working old code pattern
  const handleBatchAction = async (action: string) => {
    if (action === "export-csv-expense-report") {
      setShowExpenseReportCurrencyModal(true);
      return;
    }

    if (action === "delete-selected") {
      const selectedIds = Object.keys(selected).filter((id) => selected[id]);

      if (selectedIds.length === 0) {
        cbToast("No documents selected", { type: "warning" });
        setTimeout(() => setSelectedBatchAction(undefined), 0);
        return;
      }

      setDeleteIds(selectedIds);
      setShowDeleteConfirmModal(true);
      return;
    }

    if (action === "generate-bills") {
      const selectedIds = Object.keys(selected).filter((id) => selected[id]);

      if (selectedIds.length === 0) {
        cbToast("No invoices selected", { type: "warning" });
        setTimeout(() => setSelectedBatchAction(undefined), 0);
        return;
      }

      // Check for existing billing statements
      const existingBills: string[] = [];
      const invoicesToProcess: string[] = [];

      selectedIds.forEach((id) => {
        const invoice = invoices.find((doc) => doc.header.id === id);
        if (invoice) {
          const invoiceName = invoice.header.name || "";
          const expectedBillName = `bill-${invoiceName}`;
          const existingBill = billingStatements.find(
            (bill) => bill.header.name === expectedBillName,
          );
          if (existingBill) {
            existingBills.push(invoiceName);
          } else {
            invoicesToProcess.push(id);
          }
        }
      });

      // Notify user if bills already exist
      if (existingBills.length > 0) {
        const updatedSelected = { ...selected };
        selectedIds.forEach((id) => {
          updatedSelected[id] = false;
        });
        setSelected(updatedSelected);
        const billNames = existingBills.join(", ");
        cbToast(`Billing statements already exist for: ${billNames}`, {
          type: "warning",
        });
        setTimeout(() => setSelectedBatchAction(undefined), 0);
      }

      if (
        selectedIds.length > 0 &&
        invoicesToProcess.length === 0 &&
        existingBills.length === 0
      ) {
        const updatedSelected = { ...selected };
        selectedIds.forEach((id) => {
          updatedSelected[id] = false;
        });
        setSelected(updatedSelected);
        cbToast("Invoice not ready, change status to ISSUED", {
          type: "warning",
        });
        setTimeout(() => setSelectedBatchAction(undefined), 0);
        return;
      }

      // Process invoices sequentially
      if (invoicesToProcess.length > 0) {
        setIsProcessing(true);
        for (const id of invoicesToProcess) {
          await handleCreateBillingStatement(id);
        }
        setIsProcessing(false);
      }

      // Update selection
      const updatedSelected = { ...selected };
      invoicesToProcess.forEach((id) => {
        updatedSelected[id] = false;
      });
      setSelected(updatedSelected);

      setTimeout(() => setSelectedBatchAction(undefined), 100);
    }
  };

  // Use the function to determine if export should be enabled based on selected rows
  const canExport = canExportSelectedRows ? canExportSelectedRows() : false;

  // const handleSettingsClick = () => {
  //   if (!integrationsDoc) {
  //     createIntegrationsDocument?.();
  //   } else {
  //     setSelectedNode(integrationsDoc.id);
  //   }
  // };

  return (
    <div className="contributor-billing-controls flex flex-col gap-4 mb-4">
      <div className="flex justify-between items-center flex-wrap gap-2">
        {/* Left side: Filters */}
        <div className="flex gap-2 items-center">
          <div className="w-[180px]">
            <Select
              options={statusOptions}
              onChange={onStatusChange}
              placeholder="Status"
              selectionIcon="checkmark"
              multiple={true}
              value={selectedStatuses}
            />
          </div>
          <input
            type="text"
            className="border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Search"
            onChange={(e) => onSearchChange?.(e.target.value)}
          />
        </div>

        {/* Right side: Actions */}
        <div className="flex gap-2 items-center">
          <button
            type="button"
            className={`bg-white border border-gray-300 rounded px-3 py-1.5 text-sm font-medium transition-colors ${
              hasBillingStatements
                ? "hover:bg-gray-50"
                : "opacity-50 cursor-not-allowed"
            }`}
            onClick={onCreateOrOpenExpenseReport}
            disabled={!hasBillingStatements}
          >
            + Expense Report
          </button>
          <button
            type="button"
            className={`bg-white border border-gray-300 rounded px-3 py-1.5 text-sm font-medium transition-colors ${
              canExport ? "hover:bg-gray-50" : "opacity-50 cursor-not-allowed"
            }`}
            onClick={() => {
              setShowCurrencyModal(true);
            }}
            disabled={!canExport}
          >
            Export to CSV
          </button>
          <div className="w-[180px]">
            <Select
              contentClassName="w-[240px]"
              options={batchOptions}
              value={selectedBatchAction}
              onChange={(value) => {
                setSelectedBatchAction(value as string);
                void handleBatchAction(value as string);
              }}
              placeholder="Batch Action"
              disabled={isProcessing}
            />
          </div>
          {/* TO BE Implemented later */}
          {/* <button
            type="button"
            className="p-1.5 rounded hover:bg-gray-100 transition-colors"
            onClick={handleSettingsClick}
            title="Settings"
          >
            <Icon name="Settings" className="w-5 h-5 text-gray-600" />
          </button> */}
        </div>
      </div>

      {/* CSV Export Currency Modal */}
      <ConfirmationModal
        open={showCurrencyModal}
        onCancel={() => setShowCurrencyModal(false)}
        onContinue={() => {
          setShowCurrencyModal(false);
          onExport?.(selectedCurrency);
        }}
        header="Select Base Currency"
        continueLabel="Export"
        cancelLabel="Cancel"
      >
        <p className="text-red-600 text-sm mb-3 font-medium">
          Warning: the chosen currency should match the base currency of the
          accounting system.
        </p>
        <div className="w-[200px]">
          <Select
            options={currencyOptions}
            onChange={(value) => setSelectedCurrency(value as string)}
            placeholder="Select Base Currency"
            value={selectedCurrency}
          />
        </div>
      </ConfirmationModal>

      {/* Expense Report Currency Modal */}
      <ConfirmationModal
        open={showExpenseReportCurrencyModal}
        onCancel={() => setShowExpenseReportCurrencyModal(false)}
        onContinue={() => {
          setShowExpenseReportCurrencyModal(false);
          onExpenseReportExport?.(selectedExpenseReportCurrency);
        }}
        header="Select Base Currency"
        continueLabel="Export"
        cancelLabel="Cancel"
      >
        <p className="text-red-600 text-sm mb-3 font-medium">
          Warning: the chosen currency should match the base currency of the
          accounting system.
        </p>
        <div className="w-[200px]">
          <Select
            options={currencyOptions}
            onChange={(value) =>
              setSelectedExpenseReportCurrency(value as string)
            }
            placeholder="Select Base Currency"
            value={selectedExpenseReportCurrency}
          />
        </div>
      </ConfirmationModal>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        open={showDeleteConfirmModal}
        onCancel={() => {
          setShowDeleteConfirmModal(false);
          setDeleteIds([]);
          setTimeout(() => setSelectedBatchAction(undefined), 0);
        }}
        onContinue={async () => {
          setShowDeleteConfirmModal(false);
          setIsProcessing(true);
          try {
            await onDeleteSelected?.(deleteIds);
            // Clear selection for deleted docs
            const updatedSelected = { ...selected };
            deleteIds.forEach((id) => {
              delete updatedSelected[id];
            });
            setSelected(updatedSelected);
          } finally {
            setDeleteIds([]);
            setIsProcessing(false);
            setTimeout(() => setSelectedBatchAction(undefined), 100);
          }
        }}
        header="Delete Selected Documents"
        continueLabel="Delete"
        cancelLabel="Cancel"
      >
        <p className="text-red-600 text-sm mb-3 font-medium">
          This will permanently delete {deleteIds.length} selected document
          {deleteIds.length !== 1 ? "s" : ""} from the drive. This action cannot
          be undone.
        </p>
      </ConfirmationModal>
    </div>
  );
};
