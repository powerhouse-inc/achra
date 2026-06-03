/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { createAction } from "document-model";
import {
  InitializeSubscriptionInvoiceInputSchema,
  MarkSubscriptionInvoiceIssuedInputSchema,
  MarkSubscriptionInvoicePaidInputSchema,
  SetSubscriptionInvoiceNotesInputSchema,
  SetSubscriptionInvoiceStripeIdInputSchema,
  VoidSubscriptionInvoiceInputSchema,
} from "../schema/zod.js";
import type {
  InitializeSubscriptionInvoiceInput,
  MarkSubscriptionInvoiceIssuedInput,
  MarkSubscriptionInvoicePaidInput,
  SetSubscriptionInvoiceNotesInput,
  SetSubscriptionInvoiceStripeIdInput,
  VoidSubscriptionInvoiceInput,
} from "../types.js";
import type {
  InitializeSubscriptionInvoiceAction,
  MarkSubscriptionInvoiceIssuedAction,
  MarkSubscriptionInvoicePaidAction,
  SetSubscriptionInvoiceNotesAction,
  SetSubscriptionInvoiceStripeIdAction,
  VoidSubscriptionInvoiceAction,
} from "./actions.js";

export const initializeSubscriptionInvoice = (
  input: InitializeSubscriptionInvoiceInput,
) =>
  createAction<InitializeSubscriptionInvoiceAction>(
    "INITIALIZE_SUBSCRIPTION_INVOICE",
    { ...input },
    undefined,
    InitializeSubscriptionInvoiceInputSchema,
    "global",
  );

export const markSubscriptionInvoiceIssued = (
  input: MarkSubscriptionInvoiceIssuedInput,
) =>
  createAction<MarkSubscriptionInvoiceIssuedAction>(
    "MARK_SUBSCRIPTION_INVOICE_ISSUED",
    { ...input },
    undefined,
    MarkSubscriptionInvoiceIssuedInputSchema,
    "global",
  );

export const markSubscriptionInvoicePaid = (
  input: MarkSubscriptionInvoicePaidInput,
) =>
  createAction<MarkSubscriptionInvoicePaidAction>(
    "MARK_SUBSCRIPTION_INVOICE_PAID",
    { ...input },
    undefined,
    MarkSubscriptionInvoicePaidInputSchema,
    "global",
  );

export const voidSubscriptionInvoice = (input: VoidSubscriptionInvoiceInput) =>
  createAction<VoidSubscriptionInvoiceAction>(
    "VOID_SUBSCRIPTION_INVOICE",
    { ...input },
    undefined,
    VoidSubscriptionInvoiceInputSchema,
    "global",
  );

export const setSubscriptionInvoiceStripeId = (
  input: SetSubscriptionInvoiceStripeIdInput,
) =>
  createAction<SetSubscriptionInvoiceStripeIdAction>(
    "SET_SUBSCRIPTION_INVOICE_STRIPE_ID",
    { ...input },
    undefined,
    SetSubscriptionInvoiceStripeIdInputSchema,
    "global",
  );

export const setSubscriptionInvoiceNotes = (
  input: SetSubscriptionInvoiceNotesInput,
) =>
  createAction<SetSubscriptionInvoiceNotesAction>(
    "SET_SUBSCRIPTION_INVOICE_NOTES",
    { ...input },
    undefined,
    SetSubscriptionInvoiceNotesInputSchema,
    "global",
  );
