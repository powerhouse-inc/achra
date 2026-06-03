import { FileItem } from "@powerhousedao/design-system/connect";
import type { FileNode } from "@powerhousedao/shared/document-drive";

export interface InvoiceRowData {
  id: string;
  issuer?: string;
  status: string;
  invoiceNo?: string;
  issueDate?: string;
  dueDate?: string;
  currency?: string;
  amount?: string;
  exported?: {
    timestamp?: string;
    exportedLineItems?: unknown[];
  };
}

export interface BillingDocState {
  id: string;
  contributor: string;
}

interface InvoiceTableRowProps {
  files?: FileNode[];
  row: InvoiceRowData;
  isSelected: boolean;
  onSelect: (checked: boolean) => void;
  onCreateBillingStatement?: (id: string) => void;
  billingDocStates?: BillingDocState[];
  showIssuerColumn?: boolean;
  showBillingStatementColumn?: boolean;
}

const formatTimestamp = (timestamp: string): string => {
  const date = new Date(timestamp);
  const day = date.getDate().toString().padStart(2, "0");
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${day}-${month}-${year} ${hours}:${minutes}`;
};

const formatAmount = (amount: string | number | undefined): string => {
  if (amount === undefined) return "0.00";
  const numAmount = typeof amount === "string" ? parseFloat(amount) : amount;
  if (isNaN(numAmount)) return "0.00";
  return numAmount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

/** Format a date string without timezone conversion */
const formatDateUTC = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, { timeZone: "UTC" });
};

export const InvoiceTableRow = ({
  files,
  row,
  isSelected,
  onSelect,
  onCreateBillingStatement,
  billingDocStates,
  showIssuerColumn = true,
  showBillingStatementColumn = false,
}: InvoiceTableRowProps) => {
  // Simple computed values like old working code
  const billingDoc = billingDocStates?.find(
    (doc) => doc.contributor === row.id,
  );
  const billingFile = files?.find((file) => file.id === billingDoc?.id);
  const invoiceFile = files?.find((file) => file.id === row.id);
  const hasExportedData =
    row.exported != null && Boolean(row.exported.timestamp?.trim());

  // Check if button should be shown
  const allowedStatuses = [
    "ISSUED",
    "ACCEPTED",
    "PAYMENTSCHEDULED",
    "PAYMENTRECEIVED",
    "PAYMENTSENT",
  ];
  const canShowBillingStatementButton =
    showBillingStatementColumn &&
    allowedStatuses.includes(row.status) &&
    !billingFile;

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      {/* Checkbox */}
      <td className="px-2 py-2">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={(e) => onSelect(e.target.checked)}
          className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
        />
      </td>

      {/* Invoice/Issuer Column */}
      <td className="py-1 px-2">
        {showIssuerColumn ? (
          invoiceFile ? (
            <FileItem fileNode={invoiceFile} className="h-10" />
          ) : (
            <span className="text-gray-500">{row.issuer || "Unknown"}</span>
          )
        ) : invoiceFile ? (
          <FileItem fileNode={invoiceFile} className="h-10" />
        ) : (
          <span className="text-gray-400">-</span>
        )}
      </td>

      {/* Invoice No */}
      <td className="px-2 py-2 text-center text-sm text-gray-700">
        {row.invoiceNo || "-"}
      </td>

      {/* Issue Date */}
      <td className="px-2 py-2 text-center text-sm text-gray-700">
        {row.issueDate ? formatDateUTC(row.issueDate) : "-"}
      </td>

      {/* Due Date */}
      <td className="px-2 py-2 text-center text-sm text-gray-700">
        {row.dueDate ? formatDateUTC(row.dueDate) : "-"}
      </td>

      {/* Currency */}
      <td className="px-2 py-2 text-center text-sm text-gray-700">
        {row.currency || "-"}
      </td>

      {/* Amount */}
      <td className="px-2 py-2 text-center text-sm font-medium text-gray-800">
        {formatAmount(row.amount)}
      </td>

      {/* Billing Statement Column (conditional) */}
      {showBillingStatementColumn && (
        <td className="px-2 py-2 text-center">
          {canShowBillingStatementButton ? (
            <button
              type="button"
              className="bg-white border border-gray-300 rounded px-3 py-1 text-xs font-medium hover:bg-gray-50 transition-colors"
              onClick={() => onCreateBillingStatement?.(row.id)}
            >
              Generate Billing Statement
            </button>
          ) : billingFile ? (
            <FileItem fileNode={billingFile} className="h-10" />
          ) : null}
        </td>
      )}

      {/* Exported Status */}
      <td className="px-2 py-2 text-center">
        {hasExportedData ? (
          <div className="flex flex-col items-center">
            <span className="text-green-600 text-sm font-medium">Yes</span>
            <span className="text-green-600 text-xs">
              {formatTimestamp(row.exported!.timestamp!)}
            </span>
          </div>
        ) : (
          <span className="text-red-500 text-sm">No</span>
        )}
      </td>
    </tr>
  );
};
