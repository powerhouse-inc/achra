/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { type SignalDispatch } from "document-model";
import type { AccountsGlobalState } from "../types.js";
import type {
  AddAccountAction,
  DeleteAccountAction,
  UpdateAccountAction,
  UpdateKycStatusAction,
} from "./actions.js";

export interface AccountsAccountsOperations {
  addAccountOperation: (
    state: AccountsGlobalState,
    action: AddAccountAction,
    dispatch?: SignalDispatch,
  ) => void;
  updateAccountOperation: (
    state: AccountsGlobalState,
    action: UpdateAccountAction,
    dispatch?: SignalDispatch,
  ) => void;
  deleteAccountOperation: (
    state: AccountsGlobalState,
    action: DeleteAccountAction,
    dispatch?: SignalDispatch,
  ) => void;
  updateKycStatusOperation: (
    state: AccountsGlobalState,
    action: UpdateKycStatusAction,
    dispatch?: SignalDispatch,
  ) => void;
}
