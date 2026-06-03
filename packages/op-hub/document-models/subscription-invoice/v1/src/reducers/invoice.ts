import type { SubscriptionInvoiceInvoiceOperations } from "document-models/subscription-invoice/v1";
import {
  SubscriptionInvoiceAlreadyInitializedError,
  SubscriptionInvoiceAlreadyVoidError,
  SubscriptionInvoiceNotDraftError,
  SubscriptionInvoiceNotIssuedError,
  SubscriptionInvoicePaidInvalidAmountError,
} from "../../gen/invoice/error.js";

export const subscriptionInvoiceInvoiceOperations: SubscriptionInvoiceInvoiceOperations =
  {
    initializeSubscriptionInvoiceOperation(state, action) {
      if (state.lineItems.length > 0 || state.invoiceNumber) {
        throw new SubscriptionInvoiceAlreadyInitializedError(
          "Invoice has already been initialized",
        );
      }
      state.invoiceNumber = action.input.invoiceNumber || null;
      state.dueDate = action.input.dueDate || null;
      state.customerId = action.input.customerId || null;
      state.customerName = action.input.customerName || null;
      state.customerEmail = action.input.customerEmail || null;
      state.sourceSubscriptionId = action.input.sourceSubscriptionId || null;
      state.sourceSubscriptionName =
        action.input.sourceSubscriptionName || null;
      state.cycleStart = action.input.cycleStart || null;
      state.cycleEnd = action.input.cycleEnd || null;
      state.billingCycle = action.input.billingCycle || null;
      state.currency = action.input.currency || null;
      state.subtotal = action.input.subtotal;
      state.creditApplied = action.input.creditApplied;
      state.totalDue = action.input.totalDue;
      state.totalPaid = action.input.totalPaid;
      state.notes = action.input.notes || null;
      state.lineItems = action.input.lineItems.map((li) => ({
        id: li.id,
        sliceId: li.sliceId,
        origin: li.origin,
        description: li.description,
        sourceName: li.sourceName || null,
        chargedAt: li.chargedAt,
        debitAmount: li.debitAmount,
        settledAmount: li.settledAmount,
        creditApplied: li.creditApplied,
        amountDue: li.amountDue,
        currency: li.currency,
      }));
    },

    markSubscriptionInvoiceIssuedOperation(state, action) {
      if (state.status !== "DRAFT") {
        throw new SubscriptionInvoiceNotDraftError(
          `Cannot issue invoice in status ${state.status}; expected DRAFT`,
        );
      }
      state.status = "ISSUED";
      state.issuedAt = action.input.issuedAt;
    },

    markSubscriptionInvoicePaidOperation(state, action) {
      if (state.status !== "ISSUED") {
        throw new SubscriptionInvoiceNotIssuedError(
          `Cannot mark paid in status ${state.status}; expected ISSUED`,
        );
      }
      if (action.input.paidAmount <= 0) {
        throw new SubscriptionInvoicePaidInvalidAmountError(
          "Paid amount must be greater than zero",
        );
      }
      state.status = "PAID";
      state.totalPaid = action.input.paidAmount;
    },

    voidSubscriptionInvoiceOperation(state, action) {
      if (state.status === "VOID") {
        throw new SubscriptionInvoiceAlreadyVoidError(
          "Invoice is already VOID",
        );
      }
      state.status = "VOID";
      if (action.input.reason) {
        const prefix = state.notes ? state.notes + "\n\n" : "";
        state.notes = `${prefix}[VOID at ${action.input.voidedAt}] ${action.input.reason}`;
      }
    },

    setSubscriptionInvoiceStripeIdOperation(state, action) {
      state.stripeInvoiceId = action.input.stripeInvoiceId;
    },

    setSubscriptionInvoiceNotesOperation(state, action) {
      state.notes = action.input.notes || null;
    },
  };
