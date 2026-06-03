/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { type SignalDispatch } from "document-model";
import type { AccountTransactionsGlobalState } from "../types.js";
import type {
  AddTransactionAction,
  DeleteTransactionAction,
  UpdateTransactionAction,
  UpdateTransactionPeriodAction,
} from "./actions.js";

export interface AccountTransactionsTransactionsOperations {
  addTransactionOperation: (
    state: AccountTransactionsGlobalState,
    action: AddTransactionAction,
    dispatch?: SignalDispatch,
  ) => void;
  updateTransactionOperation: (
    state: AccountTransactionsGlobalState,
    action: UpdateTransactionAction,
    dispatch?: SignalDispatch,
  ) => void;
  deleteTransactionOperation: (
    state: AccountTransactionsGlobalState,
    action: DeleteTransactionAction,
    dispatch?: SignalDispatch,
  ) => void;
  updateTransactionPeriodOperation: (
    state: AccountTransactionsGlobalState,
    action: UpdateTransactionPeriodAction,
    dispatch?: SignalDispatch,
  ) => void;
}
