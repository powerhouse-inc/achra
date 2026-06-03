/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { type SignalDispatch } from "document-model";
import type { BillingStatementGlobalState } from "../types.js";
import type {
  AddLineItemAction,
  DeleteLineItemAction,
  EditLineItemAction,
} from "./actions.js";

export interface BillingStatementLineItemsOperations {
  addLineItemOperation: (
    state: BillingStatementGlobalState,
    action: AddLineItemAction,
    dispatch?: SignalDispatch,
  ) => void;
  editLineItemOperation: (
    state: BillingStatementGlobalState,
    action: EditLineItemAction,
    dispatch?: SignalDispatch,
  ) => void;
  deleteLineItemOperation: (
    state: BillingStatementGlobalState,
    action: DeleteLineItemAction,
    dispatch?: SignalDispatch,
  ) => void;
}
