/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import type { Action } from "document-model";
import type {
  InitializeSubscriptionInvoiceInput,
  MarkSubscriptionInvoiceIssuedInput,
  MarkSubscriptionInvoicePaidInput,
  SetSubscriptionInvoiceNotesInput,
  SetSubscriptionInvoiceStripeIdInput,
  VoidSubscriptionInvoiceInput,
} from "../types.js";

export type InitializeSubscriptionInvoiceAction = Action & {
  type: "INITIALIZE_SUBSCRIPTION_INVOICE";
  input: InitializeSubscriptionInvoiceInput;
};
export type MarkSubscriptionInvoiceIssuedAction = Action & {
  type: "MARK_SUBSCRIPTION_INVOICE_ISSUED";
  input: MarkSubscriptionInvoiceIssuedInput;
};
export type MarkSubscriptionInvoicePaidAction = Action & {
  type: "MARK_SUBSCRIPTION_INVOICE_PAID";
  input: MarkSubscriptionInvoicePaidInput;
};
export type VoidSubscriptionInvoiceAction = Action & {
  type: "VOID_SUBSCRIPTION_INVOICE";
  input: VoidSubscriptionInvoiceInput;
};
export type SetSubscriptionInvoiceStripeIdAction = Action & {
  type: "SET_SUBSCRIPTION_INVOICE_STRIPE_ID";
  input: SetSubscriptionInvoiceStripeIdInput;
};
export type SetSubscriptionInvoiceNotesAction = Action & {
  type: "SET_SUBSCRIPTION_INVOICE_NOTES";
  input: SetSubscriptionInvoiceNotesInput;
};

export type SubscriptionInvoiceInvoiceAction =
  | InitializeSubscriptionInvoiceAction
  | MarkSubscriptionInvoiceIssuedAction
  | MarkSubscriptionInvoicePaidAction
  | VoidSubscriptionInvoiceAction
  | SetSubscriptionInvoiceStripeIdAction
  | SetSubscriptionInvoiceNotesAction;
