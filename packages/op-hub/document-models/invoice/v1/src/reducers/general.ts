import type { InvoiceGeneralOperations } from "document-models/invoice/v1";

/**
 * Converts a date string to ISO datetime format if it's not already in that format
 * Handles both date-only (YYYY-MM-DD) and datetime (YYYY-MM-DDTHH:mm:ss.sssZ) strings
 */
function ensureDatetimeFormat(
  dateStr: string | null | undefined,
): string | null {
  if (!dateStr || dateStr.trim() === "") return null;
  // If it's already a datetime string, return as is
  if (dateStr.includes("T")) return dateStr;
  // Convert date-only to datetime at midnight UTC
  return `${dateStr}T00:00:00.000Z`;
}

export const invoiceGeneralOperations: InvoiceGeneralOperations = {
  editInvoiceOperation(state, action) {
    const newState = { ...state };

    newState.currency = action.input.currency ?? state.currency;
    // Convert date strings to datetime format to match Zod schema requirements
    newState.dateDue =
      action.input.dateDue !== undefined
        ? ensureDatetimeFormat(action.input.dateDue)
        : state.dateDue;
    newState.dateIssued =
      action.input.dateIssued !== undefined
        ? ensureDatetimeFormat(action.input.dateIssued)
        : state.dateIssued;
    newState.dateDelivered =
      action.input.dateDelivered !== undefined
        ? ensureDatetimeFormat(action.input.dateDelivered)
        : state.dateDelivered;
    newState.invoiceNo = action.input.invoiceNo ?? state.invoiceNo;
    newState.notes = action.input.notes ?? state.notes;

    Object.assign(state, newState);
  },
  editStatusOperation(state, action) {
    if (
      state.status === "DRAFT" &&
      action.input.status !== "DRAFT" &&
      action.input.status !== "CANCELLED"
    ) {
      const wallet = state.issuer?.paymentRouting?.wallet;
      if (!wallet?.address || (!wallet.chainName && !wallet.chainId)) {
        throw new Error(
          "Issuer wallet address and chain must be set before moving out of DRAFT",
        );
      }
    }
    state.status = action.input.status;
  },
  editPaymentDataOperation(state, action) {
    const payment = state.payments.find(
      (payment) => payment.id === action.input.id,
    );
    if (payment) {
      payment.processorRef = action.input.processorRef ?? payment.processorRef;
      payment.paymentDate = action.input.paymentDate ?? payment.paymentDate;
      payment.txnRef = action.input.txnRef ?? payment.txnRef;
      payment.confirmed = action.input.confirmed ?? payment.confirmed;
      payment.issue = action.input.issue ?? payment.issue;
    }
  },
  addPaymentOperation(state, action) {
    const payment = {
      id: action.input.id,
      processorRef: action.input.processorRef ?? "",
      paymentDate: ensureDatetimeFormat(action.input.paymentDate) ?? null,
      txnRef: action.input.txnRef ?? "",
      confirmed: action.input.confirmed ?? false,
      issue: action.input.issue ?? "",
      amount: 0,
    };
    state.payments.push(payment);
  },
  setExportedDataOperation(state, action) {
    const exportedData = {
      timestamp: action.input.timestamp,
      exportedLineItems: action.input.exportedLineItems,
    };
    state.exported = exportedData;
  },
};
