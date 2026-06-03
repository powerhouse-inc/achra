import { useMemo, useState } from "react";
import {
  addDocument,
  dispatchActions,
  setSelectedNode,
  useSelectedDrive,
  useDocumentsInSelectedDrive,
} from "@powerhousedao/reactor-browser";
import type { PHDocument, DocumentModelModule } from "document-model";
import {
  deleteNode,
  type FileNode,
} from "@powerhousedao/shared/document-drive";
import { actions as invoiceActions } from "document-models/invoice";
import type { InvoiceTag } from "../../../../document-models/invoice/v1/gen/types.js";
import { actions as billingStatementActions } from "document-models/billing-statement";
import {
  setPeriodStart,
  setPeriodEnd,
} from "../../../../document-models/expense-report/v1/gen/creators.js";
import { mapTags } from "../../../billing-statement/lineItemTags/tagMapping.js";
import { exportInvoicesToXeroCSV } from "../../../../scripts/contributor-billing/createXeroCsv.js";
import { exportExpenseReportCSV } from "../../../../scripts/contributor-billing/createExpenseReportCsv.js";
import { cbToast } from "../cbToast.js";
import { EmptyState } from "../EmptyState.js";
import { HeaderControls } from "./HeaderControls.js";
import { InvoiceTableSection } from "./InvoiceTableSection.js";
import { InvoiceTableRow, type InvoiceRowData } from "./InvoiceTableRow.js";
import { NotificationDialog } from "./NotificationDialog.js";

// Helper type for invoice line item tag (partial version for state access)
interface LineItemTagPartial {
  dimension?: string;
  value?: string;
  label?: string | null;
}

// Helper type for invoice document state access
interface InvoiceGlobalState {
  status?: string;
  issuer?: { name?: string };
  invoiceNo?: string;
  dateIssued?: string;
  dateDue?: string;
  currency?: string;
  totalPriceTaxIncl?: number;
  exported?: { timestamp?: string; exportedLineItems?: unknown[] };
  notes?: string;
  lineItems?: Array<{
    id: string;
    description?: string;
    quantity?: number;
    totalPriceTaxIncl?: number;
    unitPriceTaxIncl?: number;
    lineItemTag?: LineItemTagPartial[];
  }>;
}

// Helper to convert partial tags to InvoiceTag array
const toInvoiceTags = (
  tags: LineItemTagPartial[] | undefined,
): InvoiceTag[] => {
  if (!tags) return [];
  return tags
    .filter(
      (tag): tag is LineItemTagPartial & { dimension: string; value: string } =>
        typeof tag.dimension === "string" && typeof tag.value === "string",
    )
    .map((tag) => ({
      dimension: tag.dimension,
      value: tag.value,
      label: tag.label ?? null,
    }));
};

interface BillingStatementGlobalState {
  contributor?: string;
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

// Status options for filter
export const statusOptions = [
  { label: "Draft", value: "DRAFT" },
  { label: "Issued", value: "ISSUED" },
  { label: "Accepted", value: "ACCEPTED" },
  { label: "Payment Scheduled", value: "PAYMENTSCHEDULED" },
  { label: "Payment Sent", value: "PAYMENTSENT" },
  { label: "Payment Issue", value: "PAYMENTISSUE" },
  { label: "Payment Closed", value: "PAYMENTCLOSED" },
  { label: "Rejected", value: "REJECTED" },
  { label: "Other", value: "OTHER" },
];

// Status color mappings
const statusColors: Record<string, string> = {
  DRAFT: "bg-blue-100 text-blue-600",
  ISSUED: "bg-blue-100 text-blue-600",
  ACCEPTED: "bg-green-100 text-green-600",
  PAYMENTSCHEDULED: "bg-green-100 text-green-600",
  PAYMENTSENT: "bg-green-100 text-green-600",
  PAYMENTISSUE: "bg-yellow-100 text-yellow-600",
  PAYMENTCLOSED: "bg-red-100 text-red-600",
  REJECTED: "bg-red-100 text-red-600",
  OTHER: "bg-blue-100 text-blue-600",
};

interface InvoiceTableProps {
  files: FileNode[];
  selected: Record<string, boolean>;
  setSelected: (
    selected:
      | Record<string, boolean>
      | ((prev: Record<string, boolean>) => Record<string, boolean>),
  ) => void;
  filteredDocumentModels: DocumentModelModule[];
  onSelectDocumentModel: (model: DocumentModelModule, name: string) => void;
  getDocDispatcher: (
    id: string,
  ) => [PHDocument, (action: unknown) => Promise<void>] | null;
  selectedStatuses: string[];
  onStatusChange: (value: string | string[]) => void;
  onRowSelection: (rowId: string, checked: boolean, rowStatus: string) => void;
  canExportSelectedRows: () => boolean;
  /** The month name (e.g., "January 2026") for checking existing reports */
  monthName?: string;
  /** The sibling Reporting folder ID where expense reports should be created */
  reportingFolderId?: string;
}

// Table header component
const TableHeader = ({
  showIssuer = true,
  showBillingStatement = false,
}: {
  showIssuer?: boolean;
  showBillingStatement?: boolean;
}) => (
  <thead>
    <tr className="bg-gray-50 font-medium text-gray-500 text-xs">
      <th className="px-2 py-2 w-8 rounded-tl-sm" />
      <th className="px-2 py-2 text-center">
        {showIssuer ? "Issuer" : "Invoice"}
      </th>
      <th className="px-2 py-2 text-center">Invoice No.</th>
      <th className="px-2 py-2 text-center">Issue Date</th>
      <th className="px-2 py-2 text-center">Due Date</th>
      <th className="px-2 py-2 text-center">Currency</th>
      <th className="px-2 py-2 text-center">Amount</th>
      {showBillingStatement && (
        <th className="px-2 py-2 text-center">Billing Statement</th>
      )}
      <th className="px-2 py-2 rounded-tr-sm text-center">Exported</th>
    </tr>
  </thead>
);

export const InvoiceTable = ({
  files,
  selected,
  setSelected,
  filteredDocumentModels,
  onSelectDocumentModel,
  selectedStatuses,
  onStatusChange,
  onRowSelection,
  canExportSelectedRows,
  monthName,
  reportingFolderId,
}: InvoiceTableProps) => {
  const [selectedDrive] = useSelectedDrive();

  // Notification state
  const [notification, setNotification] = useState<{
    show: boolean;
    type: "success" | "error";
    title: string;
    message?: string;
    details?: string[];
  }>({
    show: false,
    type: "success",
    title: "",
  });

  // Get documents directly from the hook - this will automatically update when documents change
  const documentsInDrive = useDocumentsInSelectedDrive() || [];

  // Get all expense reports for the current month (matches both old "January 2026" and new "01-2026" formats)
  const expenseReportsForMonth = useMemo(() => {
    if (!monthName || !documentsInDrive) return [];
    const monthCode = formatMonthCode(monthName);
    const monthLower = monthName.toLowerCase();
    return documentsInDrive.filter(
      (doc) =>
        doc.header.documentType === "powerhouse/expense-report" &&
        (doc.header.name?.includes(monthCode) ||
          doc.header.name?.toLowerCase().includes(monthLower)),
    );
  }, [documentsInDrive, monthName]);

  // Build a set of file IDs from the files prop for quick lookup
  const fileIds = useMemo(() => {
    return new Set(files.map((f) => f.id));
  }, [files]);

  // Build a map of document IDs to documents for quick lookup
  const documentsById = useMemo(() => {
    const map = new Map<string, PHDocument>();
    for (const doc of documentsInDrive) {
      map.set(doc.header.id, doc);
    }
    return map;
  }, [documentsInDrive]);

  // Filter documents to only those in the current folder (matching the files prop)
  const allDocuments = useMemo(() => {
    const filtered = documentsInDrive.filter((doc) =>
      fileIds.has(doc.header.id),
    );
    return filtered;
  }, [documentsInDrive, fileIds]);

  // Find files that are in the folder but don't have document content loaded yet
  // These are "loading" files that need to show a placeholder
  const loadingFileIds = useMemo(() => {
    return files
      .filter(
        (f) =>
          f.documentType === "powerhouse/invoice" && !documentsById.has(f.id),
      )
      .map((f) => f.id);
  }, [files, documentsById]);

  // Helper function to map invoice document to InvoiceRowData
  const mapInvoiceToRowData = (doc: PHDocument): InvoiceRowData => {
    const state = doc.state as unknown as { global: InvoiceGlobalState };
    return {
      id: doc.header.id,
      issuer: state.global?.issuer?.name || "Unknown",
      status: state.global?.status || "",
      invoiceNo: state.global?.invoiceNo || "",
      issueDate: state.global?.dateIssued || "",
      dueDate: state.global?.dateDue || "",
      currency: state.global?.currency || "",
      amount: state.global?.totalPriceTaxIncl?.toString() || "",
      exported: state.global?.exported,
    };
  };

  // Memoize billing doc states - updates automatically when allDocuments changes
  const billingDocStates = useMemo(() => {
    return allDocuments
      .filter(
        (doc) => doc.header.documentType === "powerhouse/billing-statement",
      )
      .map((doc) => {
        const state = doc.state as unknown as {
          global: BillingStatementGlobalState;
        };
        return {
          id: doc.header.id,
          contributor: state.global?.contributor || "",
        };
      });
  }, [allDocuments]);

  // Memoize filtered invoice lists - they'll automatically update when allDocuments changes
  const draft = useMemo(() => {
    return allDocuments
      .filter((doc) => {
        if (doc.header.documentType !== "powerhouse/invoice") return false;
        const state = doc.state as unknown as { global: InvoiceGlobalState };
        return state.global?.status === "DRAFT";
      })
      .map(mapInvoiceToRowData);
  }, [allDocuments]);

  const issued = useMemo(() => {
    return allDocuments
      .filter((doc) => {
        if (doc.header.documentType !== "powerhouse/invoice") return false;
        const state = doc.state as unknown as { global: InvoiceGlobalState };
        return state.global?.status === "ISSUED";
      })
      .map(mapInvoiceToRowData);
  }, [allDocuments]);

  const accepted = useMemo(() => {
    return allDocuments
      .filter((doc) => {
        if (doc.header.documentType !== "powerhouse/invoice") return false;
        const state = doc.state as unknown as { global: InvoiceGlobalState };
        return state.global?.status === "ACCEPTED";
      })
      .map(mapInvoiceToRowData);
  }, [allDocuments]);

  const paymentScheduled = useMemo(() => {
    return allDocuments
      .filter((doc) => {
        if (doc.header.documentType !== "powerhouse/invoice") return false;
        const state = doc.state as unknown as { global: InvoiceGlobalState };
        return state.global?.status === "PAYMENTSCHEDULED";
      })
      .map(mapInvoiceToRowData);
  }, [allDocuments]);

  const paymentSent = useMemo(() => {
    return allDocuments
      .filter((doc) => {
        if (doc.header.documentType !== "powerhouse/invoice") return false;
        const state = doc.state as unknown as { global: InvoiceGlobalState };
        return state.global?.status === "PAYMENTSENT";
      })
      .map(mapInvoiceToRowData);
  }, [allDocuments]);

  const paymentIssue = useMemo(() => {
    return allDocuments
      .filter((doc) => {
        if (doc.header.documentType !== "powerhouse/invoice") return false;
        const state = doc.state as unknown as { global: InvoiceGlobalState };
        return state.global?.status === "PAYMENTISSUE";
      })
      .map(mapInvoiceToRowData);
  }, [allDocuments]);

  const paymentClosed = useMemo(() => {
    return allDocuments
      .filter((doc) => {
        if (doc.header.documentType !== "powerhouse/invoice") return false;
        const state = doc.state as unknown as { global: InvoiceGlobalState };
        return state.global?.status === "PAYMENTCLOSED";
      })
      .map(mapInvoiceToRowData);
  }, [allDocuments]);

  const rejected = useMemo(() => {
    return allDocuments
      .filter((doc) => {
        if (doc.header.documentType !== "powerhouse/invoice") return false;
        const state = doc.state as unknown as { global: InvoiceGlobalState };
        return state.global?.status === "REJECTED";
      })
      .map(mapInvoiceToRowData);
  }, [allDocuments]);

  const otherInvoices = useMemo(() => {
    const knownStatuses = [
      "DRAFT",
      "ISSUED",
      "ACCEPTED",
      "PAYMENTSCHEDULED",
      "PAYMENTSENT",
      "PAYMENTISSUE",
      "PAYMENTCLOSED",
      "REJECTED",
    ];
    return allDocuments
      .filter((doc) => {
        if (doc.header.documentType !== "powerhouse/invoice") return false;
        const state = doc.state as unknown as { global: InvoiceGlobalState };
        return !knownStatuses.includes(state.global?.status || "");
      })
      .map((doc) => {
        const state = doc.state as unknown as { global: InvoiceGlobalState };
        return {
          id: doc.header.id,
          issuer: state.global?.issuer?.name || "Unknown",
          status: state.global?.status || "OTHER",
          invoiceNo: state.global?.invoiceNo || "",
          issueDate: state.global?.dateIssued || "",
          dueDate: state.global?.dateDue || "",
          currency: state.global?.currency || "",
          amount: state.global?.totalPriceTaxIncl?.toString() || "",
          exported: state.global?.exported,
        };
      });
  }, [allDocuments]);

  // Check if section should be shown based on filter
  const shouldShowSection = (status: string) =>
    selectedStatuses.length === 0 || selectedStatuses.includes(status);

  // Create billing statement from invoice - simple async function like old code
  const handleCreateBillingStatement = async (id: string) => {
    const invoiceFile = files.find((file) => file.id === id);
    const invoiceDoc = allDocuments.find((doc) => doc.header.id === id);

    if (!invoiceDoc) {
      console.error("Invoice not found");
      return;
    }

    const invoiceState = (
      invoiceDoc.state as unknown as { global: InvoiceGlobalState }
    ).global;

    // Get the target folder (same as invoice's folder)
    const targetFolder = invoiceFile?.parentFolder;

    try {
      // Create billing statement directly in the target folder (avoids race condition with move)
      const createdNode = await addDocument(
        selectedDrive?.header.id || "",
        `bill-${invoiceFile?.name || id}`,
        "powerhouse/billing-statement",
        targetFolder ?? undefined, // Create directly in the payments folder
        undefined,
        undefined,
        "powerhouse-billing-statement-editor",
      );

      if (!createdNode?.id) {
        console.error("Failed to create billing statement");
        return;
      }

      // Prepare billing statement data
      const billingStatementData = {
        dateIssued: invoiceState.dateIssued?.trim()
          ? new Date(invoiceState.dateIssued).toISOString()
          : null,
        dateDue: invoiceState.dateDue?.trim()
          ? new Date(invoiceState.dateDue).toISOString()
          : null,
        currency: invoiceState.currency || "",
        notes: invoiceState.notes || "",
      };

      // Dispatch initial setup actions
      await dispatchActions(
        [
          billingStatementActions.editContributor({ contributor: id }),
          billingStatementActions.editBillingStatement(billingStatementData),
        ],
        createdNode.id,
      );

      // Add line items
      const lineItems = invoiceState.lineItems || [];
      const lineItemActions = lineItems.map((lineItem) =>
        billingStatementActions.addLineItem({
          id: lineItem.id,
          description: lineItem.description || "",
          quantity: lineItem.quantity ?? 1,
          totalPriceCash: lineItem.totalPriceTaxIncl || 0,
          totalPricePwt: 0,
          unit: "UNIT",
          unitPriceCash: lineItem.unitPriceTaxIncl || 0,
          unitPricePwt: 0,
        }),
      );

      if (lineItemActions.length > 0) {
        await dispatchActions(lineItemActions, createdNode.id);
      }

      // Add tags
      type TagAction = ReturnType<
        typeof billingStatementActions.editLineItemTag
      >;
      const tagActions: TagAction[] = [];
      for (const lineItem of lineItems) {
        const invoiceTags = toInvoiceTags(lineItem.lineItemTag);
        const lineItemTags = mapTags(invoiceTags);
        for (const tag of lineItemTags) {
          if (tag) {
            tagActions.push(
              billingStatementActions.editLineItemTag({
                lineItemId: lineItem.id,
                dimension: tag.dimension,
                value: tag.value,
                label: tag.label,
              }),
            );
          }
        }
      }

      if (tagActions.length > 0) {
        await dispatchActions(tagActions, createdNode.id);
      }

      setNotification({
        show: true,
        type: "success",
        title: "Billing Statement Created",
        message: `Successfully created billing statement for ${invoiceFile?.name || id}`,
      });
    } catch (error) {
      console.error("Error creating billing statement:", error);
      setNotification({
        show: true,
        type: "error",
        title: "Creation Failed",
        message: "Failed to create billing statement. Please try again.",
      });
    }
  };

  // Get selected invoices for export - memoized to update when selected or allDocuments changes
  const selectedInvoiceIds = Object.keys(selected).filter((id) => selected[id]);
  const selectedInvoices = useMemo(() => {
    return selectedInvoiceIds
      .map((id) => allDocuments.find((doc) => doc.header.id === id))
      .filter((inv): inv is PHDocument => inv !== undefined);
  }, [selectedInvoiceIds, allDocuments]);

  // CSV Export handler - simple async function
  const handleCSVExport = async (baseCurrency: string) => {
    try {
      const exportedData = await exportInvoicesToXeroCSV(
        selectedInvoices,
        baseCurrency,
      );

      // Update exported status on invoices
      for (const invoice of selectedInvoices) {
        const exportedInvoiceData =
          exportedData[invoice.header.id as keyof typeof exportedData];

        await dispatchActions(
          [
            invoiceActions.setExportedData({
              timestamp: exportedInvoiceData.timestamp,
              exportedLineItems: exportedInvoiceData.exportedLineItems,
            }),
          ],
          invoice.header.id,
        );
      }
      setSelected({});
      setNotification({
        show: true,
        type: "success",
        title: "Export Successful",
        message: `Successfully exported ${selectedInvoices.length} invoice${selectedInvoices.length !== 1 ? "s" : ""} to CSV`,
      });
    } catch (error: unknown) {
      console.error("Error exporting invoices:", error);
      const err = error as { missingExpenseTagInvoices?: string[] };
      const missingExpenseTagInvoices = err.missingExpenseTagInvoices || [];
      const missingList = missingExpenseTagInvoices.map(
        (invoiceId: string) =>
          files.find((file) => file.id === invoiceId)?.name || invoiceId,
      );

      setNotification({
        show: true,
        type: "error",
        title: "Export Failed",
        message: "Invoice Line Item Tags need to be set before exporting.",
        details: missingList,
      });
    }
  };

  // Expense Report Export handler - simple async function
  const handleExpenseReportExport = async (baseCurrency: string) => {
    try {
      await exportExpenseReportCSV(selectedInvoices, baseCurrency);
      // Clear selection
      const updatedSelected = { ...selected };
      Object.keys(updatedSelected).forEach((id) => {
        updatedSelected[id] = false;
      });
      setSelected(updatedSelected);
      setNotification({
        show: true,
        type: "success",
        title: "Expense Report Exported",
        message: `Successfully exported expense report with ${selectedInvoices.length} invoice${selectedInvoices.length !== 1 ? "s" : ""}`,
      });
    } catch (error: unknown) {
      console.error("Error exporting expense report:", error);
      const err = error as { missingTagInvoices?: string[] };
      const missingTagInvoices = err.missingTagInvoices || [];
      const missingList = missingTagInvoices.map(
        (invoiceId: string) =>
          files.find((file) => file.id === invoiceId)?.name || invoiceId,
      );

      setNotification({
        show: true,
        type: "error",
        title: "Export Failed",
        message: "Invoice Line Item Tags need to be set before exporting.",
        details: missingList,
      });
    }
  };

  // Delete selected documents from the drive
  const handleDeleteSelected = async (ids: string[]) => {
    const driveId = selectedDrive?.header.id;
    if (!driveId) return;

    let successCount = 0;
    let failCount = 0;

    for (const id of ids) {
      try {
        await dispatchActions(deleteNode({ id }), driveId);
        successCount++;
      } catch (error) {
        console.error(`Failed to delete document ${id}:`, error);
        failCount++;
      }
    }

    if (failCount === 0) {
      cbToast(
        `${successCount} document${successCount !== 1 ? "s" : ""} deleted`,
        { type: "success" },
      );
    } else if (successCount === 0) {
      cbToast(
        `Failed to delete ${failCount} document${failCount !== 1 ? "s" : ""}`,
        {
          type: "error",
        },
      );
    } else {
      cbToast(`${successCount} deleted, ${failCount} failed`, {
        type: "warning",
      });
    }
  };

  // Check for integrations document - simple computed value
  const integrationsDoc = files.find(
    (file) => file.documentType === "powerhouse/integrations",
  );

  // Create integrations document - simple async function
  const createIntegrationsDocument = async () => {
    const integrationsModel = filteredDocumentModels.find(
      (model) => model.documentModel?.global?.id === "powerhouse/integrations",
    );

    if (integrationsModel) {
      const createdNode = await addDocument(
        selectedDrive?.header.id || "",
        "integration-settings",
        "powerhouse/integrations",
        undefined,
        undefined,
        undefined,
        "integrations-editor",
      );

      if (createdNode?.id) {
        setSelectedNode(createdNode.id);
      }
    }
  };

  // Check for expense report document in the Reporting folder (not Payments folder)
  // We need to look at documentsInDrive and check if any expense report is in the reportingFolderId
  const expenseReportDoc = useMemo(() => {
    if (!reportingFolderId || !selectedDrive) return undefined;

    // Get all nodes from the drive to check parent folders
    const nodes = selectedDrive.state.global.nodes;

    // Find expense report documents that are in the reporting folder
    for (const doc of documentsInDrive) {
      if (doc.header.documentType === "powerhouse/expense-report") {
        // Find the file node to check its parent folder
        const fileNode = nodes.find((n) => n.id === doc.header.id);
        if (
          fileNode &&
          "parentFolder" in fileNode &&
          fileNode.parentFolder === reportingFolderId
        ) {
          // Return the file node (for consistency with the rest of the code)
          return fileNode as FileNode;
        }
      }
    }
    return undefined;
  }, [documentsInDrive, reportingFolderId, selectedDrive]);

  // Check if billing statements exist - memoized to update when allDocuments changes
  const hasBillingStatements = useMemo(() => {
    return allDocuments.some(
      (doc) => doc.header.documentType === "powerhouse/billing-statement",
    );
  }, [allDocuments]);

  // Create a new expense report
  const handleCreateExpenseReport = async () => {
    const expenseReportModel = filteredDocumentModels.find(
      (model) =>
        model.documentModel?.global?.id === "powerhouse/expense-report",
    );

    if (expenseReportModel && monthName) {
      const monthCode = formatMonthCode(monthName);
      const reportNumber = expenseReportsForMonth.length + 1;
      const reportName = `${monthCode} Expense Report ${reportNumber}`;

      const createdNode = await addDocument(
        selectedDrive?.header.id || "",
        reportName,
        "powerhouse/expense-report",
        reportingFolderId, // Create in the Reporting folder (sibling of Payments)
        undefined,
        undefined,
        "powerhouse-expense-report-editor",
      );

      if (createdNode?.id) {
        // Set the Reporting Period to the month - parse "December 2025" format
        const monthDate = new Date(monthName + " 1");
        if (!isNaN(monthDate.getTime())) {
          // Start date: first day of the month at midnight UTC
          const periodStartDate = new Date(
            Date.UTC(monthDate.getFullYear(), monthDate.getMonth(), 1),
          );
          // End date: last day of the month at 23:59:59.999 UTC
          const periodEndDate = new Date(
            Date.UTC(
              monthDate.getFullYear(),
              monthDate.getMonth() + 1,
              0,
              23,
              59,
              59,
              999,
            ),
          );

          // Set Reporting Period only (Transaction Period is set by user)
          await dispatchActions(
            [
              setPeriodStart({ periodStart: periodStartDate.toISOString() }),
              setPeriodEnd({ periodEnd: periodEndDate.toISOString() }),
            ],
            createdNode.id,
          );
        }

        setSelectedNode(createdNode.id);
      }
    }
  };

  // Get invoices and billing statements for batch actions - memoized to update when allDocuments changes
  const invoicesDocs = useMemo(() => {
    return allDocuments.filter((doc) => {
      if (doc.header.documentType !== "powerhouse/invoice") return false;
      const state = doc.state as unknown as { global: InvoiceGlobalState };
      return state.global?.status !== "DRAFT";
    });
  }, [allDocuments]);

  const billingStatementDocs = useMemo(() => {
    return allDocuments.filter(
      (doc) => doc.header.documentType === "powerhouse/billing-statement",
    );
  }, [allDocuments]);

  // Render section with table
  const renderSection = (
    status: string,
    title: string,
    data: InvoiceRowData[],
    options?: {
      showIssuer?: boolean;
      showBillingStatement?: boolean;
      showCreateButton?: boolean;
    },
  ) => {
    if (!shouldShowSection(status)) return null;

    const {
      showIssuer = true,
      showBillingStatement = false,
      showCreateButton = false,
    } = options || {};

    return (
      <InvoiceTableSection
        title={title}
        count={data.length}
        color={statusColors[status] || statusColors.OTHER}
        onSelectDocumentModel={
          showCreateButton ? onSelectDocumentModel : undefined
        }
        filteredDocumentModels={
          showCreateButton ? filteredDocumentModels : undefined
        }
      >
        <table className="w-full text-sm rounded-sm border-separate border-spacing-0 border border-gray-300 overflow-hidden">
          <TableHeader
            showIssuer={showIssuer}
            showBillingStatement={showBillingStatement}
          />
          <tbody>
            {data.map((row) => (
              <InvoiceTableRow
                key={row.id}
                files={files}
                row={row}
                isSelected={!!selected[row.id]}
                onSelect={(checked) =>
                  onRowSelection(row.id, checked, row.status)
                }
                onCreateBillingStatement={handleCreateBillingStatement}
                billingDocStates={billingDocStates}
                showIssuerColumn={showIssuer}
                showBillingStatementColumn={showBillingStatement}
              />
            ))}
          </tbody>
        </table>
      </InvoiceTableSection>
    );
  };

  return (
    <>
      <NotificationDialog
        show={notification.show}
        type={notification.type}
        title={notification.title}
        message={notification.message}
        details={notification.details}
        onClose={() => setNotification({ ...notification, show: false })}
      />
      <div className="contributor-billing-table w-full h-full bg-white rounded-lg p-4 border border-gray-200 shadow-sm mt-4 overflow-x-auto">
        <HeaderControls
          statusOptions={statusOptions}
          selectedStatuses={selectedStatuses}
          onStatusChange={onStatusChange}
          onExport={handleCSVExport}
          onExpenseReportExport={handleExpenseReportExport}
          createIntegrationsDocument={createIntegrationsDocument}
          integrationsDoc={integrationsDoc}
          hasBillingStatements={hasBillingStatements}
          expenseReportDoc={expenseReportDoc}
          onCreateOrOpenExpenseReport={handleCreateExpenseReport}
          selected={selected}
          handleCreateBillingStatement={handleCreateBillingStatement}
          setSelected={setSelected}
          invoices={invoicesDocs}
          billingStatements={billingStatementDocs}
          canExportSelectedRows={canExportSelectedRows}
          onDeleteSelected={handleDeleteSelected}
        />

        {/* Status Sections */}
        {renderSection("DRAFT", "Draft", draft, {
          showIssuer: false,
          showCreateButton: true,
        })}
        {renderSection("ISSUED", "Issued", issued, {
          showBillingStatement: true,
        })}
        {renderSection("ACCEPTED", "Accepted", accepted, {
          showBillingStatement: true,
        })}
        {renderSection(
          "PAYMENTSCHEDULED",
          "Payment Scheduled",
          paymentScheduled,
          {
            showBillingStatement: true,
          },
        )}
        {renderSection("PAYMENTSENT", "Payment Sent", paymentSent, {
          showBillingStatement: true,
        })}
        {renderSection("PAYMENTISSUE", "Payment Issue", paymentIssue, {
          showBillingStatement: true,
        })}
        {renderSection("PAYMENTCLOSED", "Payment Closed", paymentClosed)}
        {renderSection("REJECTED", "Rejected", rejected)}
        {renderSection("OTHER", "Other", otherInvoices)}

        {files.length === 0 && loadingFileIds.length === 0 && (
          <EmptyState
            title="No invoices yet"
            description="Create a new invoice using the Draft section above, or drop an invoice file here"
          />
        )}

        {/* Loading section for files that haven't loaded yet */}
        {loadingFileIds.length > 0 && (
          <InvoiceTableSection
            title="Loading"
            count={loadingFileIds.length}
            color="bg-gray-100 text-gray-600"
          >
            <table className="w-full text-sm rounded-sm border-separate border-spacing-0 border border-gray-300 overflow-hidden">
              <thead>
                <tr className="bg-gray-50 font-medium text-gray-500 text-xs">
                  <th className="px-2 py-2 w-8 rounded-tl-sm" />
                  <th className="px-2 py-2 text-center">Invoice</th>
                  <th className="px-2 py-2 text-center">Invoice No.</th>
                  <th className="px-2 py-2 text-center">Issue Date</th>
                  <th className="px-2 py-2 text-center">Due Date</th>
                  <th className="px-2 py-2 text-center">Currency</th>
                  <th className="px-2 py-2 text-center">Amount</th>
                  <th className="px-2 py-2 rounded-tr-sm text-center">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {loadingFileIds.map((id) => {
                  const file = files.find((f) => f.id === id);
                  return (
                    <tr
                      key={id}
                      className="border-t border-gray-200 animate-pulse"
                    >
                      <td className="px-2 py-2" />
                      <td className="px-2 py-2 text-center text-gray-400">
                        {file?.name || "Loading..."}
                      </td>
                      <td className="px-2 py-2 text-center">
                        <div className="h-4 bg-gray-200 rounded w-16 mx-auto" />
                      </td>
                      <td className="px-2 py-2 text-center">
                        <div className="h-4 bg-gray-200 rounded w-20 mx-auto" />
                      </td>
                      <td className="px-2 py-2 text-center">
                        <div className="h-4 bg-gray-200 rounded w-20 mx-auto" />
                      </td>
                      <td className="px-2 py-2 text-center">
                        <div className="h-4 bg-gray-200 rounded w-12 mx-auto" />
                      </td>
                      <td className="px-2 py-2 text-center">
                        <div className="h-4 bg-gray-200 rounded w-16 mx-auto" />
                      </td>
                      <td className="px-2 py-2 text-center">
                        <span className="text-xs text-gray-400">
                          Loading...
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </InvoiceTableSection>
        )}
      </div>
    </>
  );
};
