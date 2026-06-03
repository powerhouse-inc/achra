/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { createAction } from "document-model";
import {
  ApplyCreditInputSchema,
  ConfirmLineItemPaymentInputSchema,
  MarkLineItemInvoicedInputSchema,
  ReportPaymentInputSchema,
} from "../schema/zod.js";
import type {
  ApplyCreditInput,
  ConfirmLineItemPaymentInput,
  MarkLineItemInvoicedInput,
  ReportPaymentInput,
} from "../types.js";
import type {
  ApplyCreditAction,
  ConfirmLineItemPaymentAction,
  MarkLineItemInvoicedAction,
  ReportPaymentAction,
} from "./actions.js";

export const markLineItemInvoiced = (input: MarkLineItemInvoicedInput) =>
  createAction<MarkLineItemInvoicedAction>(
    "MARK_LINE_ITEM_INVOICED",
    { ...input },
    undefined,
    MarkLineItemInvoicedInputSchema,
    "global",
  );

export const confirmLineItemPayment = (input: ConfirmLineItemPaymentInput) =>
  createAction<ConfirmLineItemPaymentAction>(
    "CONFIRM_LINE_ITEM_PAYMENT",
    { ...input },
    undefined,
    ConfirmLineItemPaymentInputSchema,
    "global",
  );

export const reportPayment = (input: ReportPaymentInput) =>
  createAction<ReportPaymentAction>(
    "REPORT_PAYMENT",
    { ...input },
    undefined,
    ReportPaymentInputSchema,
    "global",
  );

export const applyCredit = (input: ApplyCreditInput) =>
  createAction<ApplyCreditAction>(
    "APPLY_CREDIT",
    { ...input },
    undefined,
    ApplyCreditInputSchema,
    "global",
  );
