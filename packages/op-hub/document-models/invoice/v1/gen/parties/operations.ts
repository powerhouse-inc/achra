/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { type SignalDispatch } from "document-model";
import type { InvoiceGlobalState } from "../types.js";
import type {
  EditIssuerAction,
  EditIssuerBankAction,
  EditIssuerWalletAction,
  EditPayerAction,
  EditPayerBankAction,
  EditPayerWalletAction,
} from "./actions.js";

export interface InvoicePartiesOperations {
  editIssuerBankOperation: (
    state: InvoiceGlobalState,
    action: EditIssuerBankAction,
    dispatch?: SignalDispatch,
  ) => void;
  editIssuerOperation: (
    state: InvoiceGlobalState,
    action: EditIssuerAction,
    dispatch?: SignalDispatch,
  ) => void;
  editIssuerWalletOperation: (
    state: InvoiceGlobalState,
    action: EditIssuerWalletAction,
    dispatch?: SignalDispatch,
  ) => void;
  editPayerBankOperation: (
    state: InvoiceGlobalState,
    action: EditPayerBankAction,
    dispatch?: SignalDispatch,
  ) => void;
  editPayerOperation: (
    state: InvoiceGlobalState,
    action: EditPayerAction,
    dispatch?: SignalDispatch,
  ) => void;
  editPayerWalletOperation: (
    state: InvoiceGlobalState,
    action: EditPayerWalletAction,
    dispatch?: SignalDispatch,
  ) => void;
}
