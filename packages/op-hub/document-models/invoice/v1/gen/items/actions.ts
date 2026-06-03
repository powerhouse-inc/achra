/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import type { Action } from "document-model";
import type {
  AddLineItemInput,
  DeleteLineItemInput,
  EditLineItemInput,
  SetInvoiceTagInput,
  SetLineItemTagInput,
} from "../types.js";

export type AddLineItemAction = Action & {
  type: "ADD_LINE_ITEM";
  input: AddLineItemInput;
};
export type DeleteLineItemAction = Action & {
  type: "DELETE_LINE_ITEM";
  input: DeleteLineItemInput;
};
export type EditLineItemAction = Action & {
  type: "EDIT_LINE_ITEM";
  input: EditLineItemInput;
};
export type SetInvoiceTagAction = Action & {
  type: "SET_INVOICE_TAG";
  input: SetInvoiceTagInput;
};
export type SetLineItemTagAction = Action & {
  type: "SET_LINE_ITEM_TAG";
  input: SetLineItemTagInput;
};

export type InvoiceItemsAction =
  | AddLineItemAction
  | DeleteLineItemAction
  | EditLineItemAction
  | SetInvoiceTagAction
  | SetLineItemTagAction;
