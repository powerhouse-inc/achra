import type { InvoiceTransitionsOperations } from "document-models/invoice/v1";
import type { Status } from "../../gen/schema/types.js";

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

const permittedTransitions: Record<Status, string[]> = {
  DRAFT: ["CANCELLED", "ISSUED"],
  CANCELLED: ["DRAFT"],
  ISSUED: ["REJECTED", "ACCEPTED"],
  REJECTED: ["ISSUED"],
  ACCEPTED: ["PAYMENTSCHEDULED", "PAYMENTCLOSED"],
  PAYMENTSCHEDULED: ["PAYMENTSENT", "PAYMENTISSUE", "PAYMENTCLOSED"],
  PAYMENTSENT: ["PAYMENTISSUE", "PAYMENTRECEIVED"],
  PAYMENTISSUE: ["ACCEPTED", "PAYMENTCLOSED"],
  PAYMENTRECEIVED: ["PAYMENTISSUE"],
  PAYMENTCLOSED: ["ACCEPTED"],
};

export const invoiceTransitionsOperations: InvoiceTransitionsOperations = {
  cancelOperation(state) {
    if (permittedTransitions[state.status].includes("CANCELLED")) {
      state.status = "CANCELLED";
    } else {
      throw new Error(`Invalid transition from ${state.status} to CANCELLED`);
    }
  },
  issueOperation(state, action) {
    if (!action.input.invoiceNo || !action.input.dateIssued) {
      throw new Error("Invoice number and date issued are required");
    }
    const wallet = state.issuer?.paymentRouting?.wallet;
    const stablecoins = ["USDS", "DAI", "USDC"];
    const isStablecoin = stablecoins.includes(state.currency.toUpperCase());
    if (
      isStablecoin &&
      (!wallet?.address || (!wallet.chainName && !wallet.chainId))
    ) {
      throw new Error(
        "Issuer wallet address and chain must be set before issuing an invoice",
      );
    }
    if (permittedTransitions[state.status].includes("ISSUED")) {
      state.status = "ISSUED";
      state.invoiceNo = action.input.invoiceNo;
      // Convert date string to datetime format to match Zod schema requirements
      state.dateIssued =
        ensureDatetimeFormat(action.input.dateIssued) ||
        action.input.dateIssued;
    } else {
      throw new Error(`Invalid transition from ${state.status} to ISSUED`);
    }
  },
  resetOperation(state) {
    if (permittedTransitions[state.status].includes("DRAFT")) {
      state.status = "DRAFT";
    } else {
      throw new Error(`Invalid transition from ${state.status} to DRAFT`);
    }
  },
  rejectOperation(state, action) {
    if (!action.input.id || !action.input.reason) {
      throw new Error("Reason, ID and final are required");
    }
    if (permittedTransitions[state.status].includes("REJECTED")) {
      state.status = "REJECTED";
      const rejection = {
        id: action.input.id,
        reason: action.input.reason,
        final: action.input.final,
      };
      state.rejections.push(rejection);
    } else {
      throw new Error(`Invalid transition from ${state.status} to REJECTED`);
    }
  },
  acceptOperation(state, action) {
    if (!action.input.payAfter) {
      throw new Error("Pay after is required");
    }
    if (permittedTransitions[state.status].includes("ACCEPTED")) {
      state.status = "ACCEPTED";
      state.payAfter = action.input.payAfter;
    } else {
      throw new Error(`Invalid transition from ${state.status} to ACCEPTED`);
    }
  },
  reinstateOperation(state) {
    const finalRejection = state.rejections.find(
      (rejection) => rejection.final === true,
    );
    if (finalRejection) {
      throw new Error("Cannot reinstate an invoice that has been rejected");
    }
    if (permittedTransitions[state.status].includes("ISSUED")) {
      state.status = "ISSUED";
    } else {
      throw new Error(`Invalid transition from ${state.status} to ISSUED`);
    }
  },
  schedulePaymentOperation(state, action) {
    if (!action.input.id || !action.input.processorRef) {
      throw new Error("ID and processorRef are required");
    }
    if (permittedTransitions[state.status].includes("PAYMENTSCHEDULED")) {
      state.status = "PAYMENTSCHEDULED";
      state.payments.push({
        id: action.input.id,
        processorRef: action.input.processorRef,
        paymentDate: action.input.paymentDate,
        txnRef: "",
        confirmed: false,
        issue: "",
        amount: 0,
      });
    } else {
      throw new Error(
        `Invalid transition from ${state.status} to PAYMENTSCHEDULED`,
      );
    }
  },
  reapprovePaymentOperation(state) {
    if (permittedTransitions[state.status].includes("ACCEPTED")) {
      state.status = "ACCEPTED";
    } else {
      throw new Error(`Invalid transition from ${state.status} to ACCEPTED`);
    }
  },
  registerPaymentTxOperation(state, action) {
    if (permittedTransitions[state.status].includes("PAYMENTSENT")) {
      state.status = "PAYMENTSENT";
      const payment = state.payments.find(
        (payment) => payment.id === action.input.id,
      );
      if (!payment) throw new Error("Payment not found");
      payment.txnRef = action.input.txRef;
      payment.paymentDate = action.input.timestamp;
    } else {
      throw new Error(`Invalid transition from ${state.status} to PAYMENTSENT`);
    }
  },
  reportPaymentIssueOperation(state, action) {
    if (!action.input.id || !action.input.issue) {
      throw new Error("ID and issue are required");
    }
    if (permittedTransitions[state.status].includes("PAYMENTISSUE")) {
      state.status = "PAYMENTISSUE";
      const payment = state.payments.find(
        (payment) => payment.id === action.input.id,
      );
      if (!payment) throw new Error("Payment not found");
      payment.issue = action.input.issue;
    } else {
      throw new Error(
        `Invalid transition from ${state.status} to PAYMENTISSUE`,
      );
    }
  },
  confirmPaymentOperation(state, action) {
    if (!action.input.id || !action.input.amount) {
      throw new Error("ID and amount are required");
    }
    if (permittedTransitions[state.status].includes("PAYMENTRECEIVED")) {
      state.status = "PAYMENTRECEIVED";
      const payment = state.payments.find(
        (payment) => payment.id === action.input.id,
      );
      if (!payment) throw new Error("Payment not found");
      payment.confirmed = true;
      payment.amount = action.input.amount;
    } else {
      throw new Error(
        `Invalid transition from ${state.status} to PAYMENTRECEIVED`,
      );
    }
  },
  closePaymentOperation(state, action) {
    if (!action.input.closureReason) {
      throw new Error("Closure reason is required");
    }
    if (permittedTransitions[state.status].includes("PAYMENTCLOSED")) {
      state.status = "PAYMENTCLOSED";
      state.closureReason = action.input.closureReason;
    } else {
      throw new Error(
        `Invalid transition from ${state.status} to PAYMENTCLOSED`,
      );
    }
  },
};
