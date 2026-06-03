/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { type SignalDispatch } from "document-model";
import type { InvoiceGlobalState } from "../types.js";
import type {
  AcceptAction,
  CancelAction,
  ClosePaymentAction,
  ConfirmPaymentAction,
  IssueAction,
  ReapprovePaymentAction,
  RegisterPaymentTxAction,
  ReinstateAction,
  RejectAction,
  ReportPaymentIssueAction,
  ResetAction,
  SchedulePaymentAction,
} from "./actions.js";

export interface InvoiceTransitionsOperations {
  acceptOperation: (
    state: InvoiceGlobalState,
    action: AcceptAction,
    dispatch?: SignalDispatch,
  ) => void;
  cancelOperation: (
    state: InvoiceGlobalState,
    action: CancelAction,
    dispatch?: SignalDispatch,
  ) => void;
  closePaymentOperation: (
    state: InvoiceGlobalState,
    action: ClosePaymentAction,
    dispatch?: SignalDispatch,
  ) => void;
  confirmPaymentOperation: (
    state: InvoiceGlobalState,
    action: ConfirmPaymentAction,
    dispatch?: SignalDispatch,
  ) => void;
  issueOperation: (
    state: InvoiceGlobalState,
    action: IssueAction,
    dispatch?: SignalDispatch,
  ) => void;
  reapprovePaymentOperation: (
    state: InvoiceGlobalState,
    action: ReapprovePaymentAction,
    dispatch?: SignalDispatch,
  ) => void;
  registerPaymentTxOperation: (
    state: InvoiceGlobalState,
    action: RegisterPaymentTxAction,
    dispatch?: SignalDispatch,
  ) => void;
  reinstateOperation: (
    state: InvoiceGlobalState,
    action: ReinstateAction,
    dispatch?: SignalDispatch,
  ) => void;
  rejectOperation: (
    state: InvoiceGlobalState,
    action: RejectAction,
    dispatch?: SignalDispatch,
  ) => void;
  reportPaymentIssueOperation: (
    state: InvoiceGlobalState,
    action: ReportPaymentIssueAction,
    dispatch?: SignalDispatch,
  ) => void;
  resetOperation: (
    state: InvoiceGlobalState,
    action: ResetAction,
    dispatch?: SignalDispatch,
  ) => void;
  schedulePaymentOperation: (
    state: InvoiceGlobalState,
    action: SchedulePaymentAction,
    dispatch?: SignalDispatch,
  ) => void;
}
