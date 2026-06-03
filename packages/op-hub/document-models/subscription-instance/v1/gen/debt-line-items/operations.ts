/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { type SignalDispatch } from "document-model";
import type { SubscriptionInstanceGlobalState } from "../types.js";
import type {
  ApplyCreditAction,
  ConfirmLineItemPaymentAction,
  MarkLineItemInvoicedAction,
  ReportPaymentAction,
} from "./actions.js";

export interface SubscriptionInstanceDebtLineItemsOperations {
  markLineItemInvoicedOperation: (
    state: SubscriptionInstanceGlobalState,
    action: MarkLineItemInvoicedAction,
    dispatch?: SignalDispatch,
  ) => void;
  confirmLineItemPaymentOperation: (
    state: SubscriptionInstanceGlobalState,
    action: ConfirmLineItemPaymentAction,
    dispatch?: SignalDispatch,
  ) => void;
  reportPaymentOperation: (
    state: SubscriptionInstanceGlobalState,
    action: ReportPaymentAction,
    dispatch?: SignalDispatch,
  ) => void;
  applyCreditOperation: (
    state: SubscriptionInstanceGlobalState,
    action: ApplyCreditAction,
    dispatch?: SignalDispatch,
  ) => void;
}
