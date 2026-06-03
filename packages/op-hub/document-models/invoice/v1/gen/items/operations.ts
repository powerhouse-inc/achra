/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { type SignalDispatch } from "document-model";
import type { InvoiceGlobalState } from "../types.js";
import type {
  AddLineItemAction,
  DeleteLineItemAction,
  EditLineItemAction,
  SetInvoiceTagAction,
  SetLineItemTagAction,
} from "./actions.js";

export interface InvoiceItemsOperations {
  addLineItemOperation: (
    state: InvoiceGlobalState,
    action: AddLineItemAction,
    dispatch?: SignalDispatch,
  ) => void;
  deleteLineItemOperation: (
    state: InvoiceGlobalState,
    action: DeleteLineItemAction,
    dispatch?: SignalDispatch,
  ) => void;
  editLineItemOperation: (
    state: InvoiceGlobalState,
    action: EditLineItemAction,
    dispatch?: SignalDispatch,
  ) => void;
  setInvoiceTagOperation: (
    state: InvoiceGlobalState,
    action: SetInvoiceTagAction,
    dispatch?: SignalDispatch,
  ) => void;
  setLineItemTagOperation: (
    state: InvoiceGlobalState,
    action: SetLineItemTagAction,
    dispatch?: SignalDispatch,
  ) => void;
}
