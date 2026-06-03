/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { type SignalDispatch } from "document-model";
import type { SubscriptionInvoiceGlobalState } from "../types.js";
import type {
  InitializeSubscriptionInvoiceAction,
  MarkSubscriptionInvoiceIssuedAction,
  MarkSubscriptionInvoicePaidAction,
  SetSubscriptionInvoiceNotesAction,
  SetSubscriptionInvoiceStripeIdAction,
  VoidSubscriptionInvoiceAction,
} from "./actions.js";

export interface SubscriptionInvoiceInvoiceOperations {
  initializeSubscriptionInvoiceOperation: (
    state: SubscriptionInvoiceGlobalState,
    action: InitializeSubscriptionInvoiceAction,
    dispatch?: SignalDispatch,
  ) => void;
  markSubscriptionInvoiceIssuedOperation: (
    state: SubscriptionInvoiceGlobalState,
    action: MarkSubscriptionInvoiceIssuedAction,
    dispatch?: SignalDispatch,
  ) => void;
  markSubscriptionInvoicePaidOperation: (
    state: SubscriptionInvoiceGlobalState,
    action: MarkSubscriptionInvoicePaidAction,
    dispatch?: SignalDispatch,
  ) => void;
  voidSubscriptionInvoiceOperation: (
    state: SubscriptionInvoiceGlobalState,
    action: VoidSubscriptionInvoiceAction,
    dispatch?: SignalDispatch,
  ) => void;
  setSubscriptionInvoiceStripeIdOperation: (
    state: SubscriptionInvoiceGlobalState,
    action: SetSubscriptionInvoiceStripeIdAction,
    dispatch?: SignalDispatch,
  ) => void;
  setSubscriptionInvoiceNotesOperation: (
    state: SubscriptionInvoiceGlobalState,
    action: SetSubscriptionInvoiceNotesAction,
    dispatch?: SignalDispatch,
  ) => void;
}
