/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { type SignalDispatch } from "document-model";
import type { InvoiceGlobalState } from "../types.js";
import type {
  AddPaymentAction,
  EditInvoiceAction,
  EditPaymentDataAction,
  EditStatusAction,
  SetExportedDataAction,
} from "./actions.js";

export interface InvoiceGeneralOperations {
  editInvoiceOperation: (
    state: InvoiceGlobalState,
    action: EditInvoiceAction,
    dispatch?: SignalDispatch,
  ) => void;
  addPaymentOperation: (
    state: InvoiceGlobalState,
    action: AddPaymentAction,
    dispatch?: SignalDispatch,
  ) => void;
  editPaymentDataOperation: (
    state: InvoiceGlobalState,
    action: EditPaymentDataAction,
    dispatch?: SignalDispatch,
  ) => void;
  editStatusOperation: (
    state: InvoiceGlobalState,
    action: EditStatusAction,
    dispatch?: SignalDispatch,
  ) => void;
  setExportedDataOperation: (
    state: InvoiceGlobalState,
    action: SetExportedDataAction,
    dispatch?: SignalDispatch,
  ) => void;
}
