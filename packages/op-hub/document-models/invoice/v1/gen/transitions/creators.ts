/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { createAction } from "document-model";
import {
  AcceptInputSchema,
  CancelInputSchema,
  ClosePaymentInputSchema,
  ConfirmPaymentInputSchema,
  IssueInputSchema,
  ReapprovePaymentInputSchema,
  RegisterPaymentTxInputSchema,
  ReinstateInputSchema,
  RejectInputSchema,
  ReportPaymentIssueInputSchema,
  ResetInputSchema,
  SchedulePaymentInputSchema,
} from "../schema/zod.js";
import type {
  AcceptInput,
  CancelInput,
  ClosePaymentInput,
  ConfirmPaymentInput,
  IssueInput,
  ReapprovePaymentInput,
  RegisterPaymentTxInput,
  ReinstateInput,
  RejectInput,
  ReportPaymentIssueInput,
  ResetInput,
  SchedulePaymentInput,
} from "../types.js";
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

export const accept = (input: AcceptInput) =>
  createAction<AcceptAction>(
    "ACCEPT",
    { ...input },
    undefined,
    AcceptInputSchema,
    "global",
  );

export const cancel = (input: CancelInput) =>
  createAction<CancelAction>(
    "CANCEL",
    { ...input },
    undefined,
    CancelInputSchema,
    "global",
  );

export const closePayment = (input: ClosePaymentInput) =>
  createAction<ClosePaymentAction>(
    "CLOSE_PAYMENT",
    { ...input },
    undefined,
    ClosePaymentInputSchema,
    "global",
  );

export const confirmPayment = (input: ConfirmPaymentInput) =>
  createAction<ConfirmPaymentAction>(
    "CONFIRM_PAYMENT",
    { ...input },
    undefined,
    ConfirmPaymentInputSchema,
    "global",
  );

export const issue = (input: IssueInput) =>
  createAction<IssueAction>(
    "ISSUE",
    { ...input },
    undefined,
    IssueInputSchema,
    "global",
  );

export const reapprovePayment = (input: ReapprovePaymentInput) =>
  createAction<ReapprovePaymentAction>(
    "REAPPROVE_PAYMENT",
    { ...input },
    undefined,
    ReapprovePaymentInputSchema,
    "global",
  );

export const registerPaymentTx = (input: RegisterPaymentTxInput) =>
  createAction<RegisterPaymentTxAction>(
    "REGISTER_PAYMENT_TX",
    { ...input },
    undefined,
    RegisterPaymentTxInputSchema,
    "global",
  );

export const reinstate = (input: ReinstateInput) =>
  createAction<ReinstateAction>(
    "REINSTATE",
    { ...input },
    undefined,
    ReinstateInputSchema,
    "global",
  );

export const reject = (input: RejectInput) =>
  createAction<RejectAction>(
    "REJECT",
    { ...input },
    undefined,
    RejectInputSchema,
    "global",
  );

export const reportPaymentIssue = (input: ReportPaymentIssueInput) =>
  createAction<ReportPaymentIssueAction>(
    "REPORT_PAYMENT_ISSUE",
    { ...input },
    undefined,
    ReportPaymentIssueInputSchema,
    "global",
  );

export const reset = (input: ResetInput) =>
  createAction<ResetAction>(
    "RESET",
    { ...input },
    undefined,
    ResetInputSchema,
    "global",
  );

export const schedulePayment = (input: SchedulePaymentInput) =>
  createAction<SchedulePaymentAction>(
    "SCHEDULE_PAYMENT",
    { ...input },
    undefined,
    SchedulePaymentInputSchema,
    "global",
  );
