/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { type SignalDispatch } from "document-model";
import type { AccountTransactionsGlobalState } from "../types.js";
import type { SetAccountAction } from "./actions.js";

export interface AccountTransactionsAccountOperations {
  setAccountOperation: (
    state: AccountTransactionsGlobalState,
    action: SetAccountAction,
    dispatch?: SignalDispatch,
  ) => void;
}
