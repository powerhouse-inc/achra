/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { createAction } from "document-model";
import {
  AddLineItemInputSchema,
  DeleteLineItemInputSchema,
  EditLineItemInputSchema,
  SetInvoiceTagInputSchema,
  SetLineItemTagInputSchema,
} from "../schema/zod.js";
import type {
  AddLineItemInput,
  DeleteLineItemInput,
  EditLineItemInput,
  SetInvoiceTagInput,
  SetLineItemTagInput,
} from "../types.js";
import type {
  AddLineItemAction,
  DeleteLineItemAction,
  EditLineItemAction,
  SetInvoiceTagAction,
  SetLineItemTagAction,
} from "./actions.js";

export const addLineItem = (input: AddLineItemInput) =>
  createAction<AddLineItemAction>(
    "ADD_LINE_ITEM",
    { ...input },
    undefined,
    AddLineItemInputSchema,
    "global",
  );

export const deleteLineItem = (input: DeleteLineItemInput) =>
  createAction<DeleteLineItemAction>(
    "DELETE_LINE_ITEM",
    { ...input },
    undefined,
    DeleteLineItemInputSchema,
    "global",
  );

export const editLineItem = (input: EditLineItemInput) =>
  createAction<EditLineItemAction>(
    "EDIT_LINE_ITEM",
    { ...input },
    undefined,
    EditLineItemInputSchema,
    "global",
  );

export const setInvoiceTag = (input: SetInvoiceTagInput) =>
  createAction<SetInvoiceTagAction>(
    "SET_INVOICE_TAG",
    { ...input },
    undefined,
    SetInvoiceTagInputSchema,
    "global",
  );

export const setLineItemTag = (input: SetLineItemTagInput) =>
  createAction<SetLineItemTagAction>(
    "SET_LINE_ITEM_TAG",
    { ...input },
    undefined,
    SetLineItemTagInputSchema,
    "global",
  );
