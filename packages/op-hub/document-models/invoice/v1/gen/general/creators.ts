/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { createAction } from "document-model";
import {
  AddPaymentInputSchema,
  EditInvoiceInputSchema,
  EditPaymentDataInputSchema,
  EditStatusInputSchema,
  SetExportedDataInputSchema,
} from "../schema/zod.js";
import type {
  AddPaymentInput,
  EditInvoiceInput,
  EditPaymentDataInput,
  EditStatusInput,
  SetExportedDataInput,
} from "../types.js";
import type {
  AddPaymentAction,
  EditInvoiceAction,
  EditPaymentDataAction,
  EditStatusAction,
  SetExportedDataAction,
} from "./actions.js";

export const editInvoice = (input: EditInvoiceInput) =>
  createAction<EditInvoiceAction>(
    "EDIT_INVOICE",
    { ...input },
    undefined,
    EditInvoiceInputSchema,
    "global",
  );

export const addPayment = (input: AddPaymentInput) =>
  createAction<AddPaymentAction>(
    "ADD_PAYMENT",
    { ...input },
    undefined,
    AddPaymentInputSchema,
    "global",
  );

export const editPaymentData = (input: EditPaymentDataInput) =>
  createAction<EditPaymentDataAction>(
    "EDIT_PAYMENT_DATA",
    { ...input },
    undefined,
    EditPaymentDataInputSchema,
    "global",
  );

export const editStatus = (input: EditStatusInput) =>
  createAction<EditStatusAction>(
    "EDIT_STATUS",
    { ...input },
    undefined,
    EditStatusInputSchema,
    "global",
  );

export const setExportedData = (input: SetExportedDataInput) =>
  createAction<SetExportedDataAction>(
    "SET_EXPORTED_DATA",
    { ...input },
    undefined,
    SetExportedDataInputSchema,
    "global",
  );
