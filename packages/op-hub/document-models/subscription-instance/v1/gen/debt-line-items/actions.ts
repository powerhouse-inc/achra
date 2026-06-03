/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import type { Action } from "document-model";
import type {
  ApplyCreditInput,
  ConfirmLineItemPaymentInput,
  MarkLineItemInvoicedInput,
  ReportPaymentInput,
} from "../types.js";

export type MarkLineItemInvoicedAction = Action & {
  type: "MARK_LINE_ITEM_INVOICED";
  input: MarkLineItemInvoicedInput;
};
export type ConfirmLineItemPaymentAction = Action & {
  type: "CONFIRM_LINE_ITEM_PAYMENT";
  input: ConfirmLineItemPaymentInput;
};
export type ReportPaymentAction = Action & {
  type: "REPORT_PAYMENT";
  input: ReportPaymentInput;
};
export type ApplyCreditAction = Action & {
  type: "APPLY_CREDIT";
  input: ApplyCreditInput;
};

export type SubscriptionInstanceDebtLineItemsAction =
  | MarkLineItemInvoicedAction
  | ConfirmLineItemPaymentAction
  | ReportPaymentAction
  | ApplyCreditAction;
