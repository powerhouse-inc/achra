/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import type { Action } from "document-model";
import type { EditLineItemTagInput } from "../types.js";

export type EditLineItemTagAction = Action & {
  type: "EDIT_LINE_ITEM_TAG";
  input: EditLineItemTagInput;
};

export type BillingStatementTagsAction = EditLineItemTagAction;
