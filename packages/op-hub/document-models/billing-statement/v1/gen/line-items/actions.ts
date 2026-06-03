/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import type { Action } from "document-model";
import type {
  AddLineItemInput,
  DeleteLineItemInput,
  EditLineItemInput,
} from "../types.js";

export type AddLineItemAction = Action & {
  type: "ADD_LINE_ITEM";
  input: AddLineItemInput;
};
export type EditLineItemAction = Action & {
  type: "EDIT_LINE_ITEM";
  input: EditLineItemInput;
};
export type DeleteLineItemAction = Action & {
  type: "DELETE_LINE_ITEM";
  input: DeleteLineItemInput;
};

export type BillingStatementLineItemsAction =
  | AddLineItemAction
  | EditLineItemAction
  | DeleteLineItemAction;
