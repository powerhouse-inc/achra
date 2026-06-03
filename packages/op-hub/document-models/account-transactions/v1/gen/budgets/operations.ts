/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { type SignalDispatch } from "document-model";
import type { AccountTransactionsGlobalState } from "../types.js";
import type {
  AddBudgetAction,
  DeleteBudgetAction,
  UpdateBudgetAction,
} from "./actions.js";

export interface AccountTransactionsBudgetsOperations {
  addBudgetOperation: (
    state: AccountTransactionsGlobalState,
    action: AddBudgetAction,
    dispatch?: SignalDispatch,
  ) => void;
  updateBudgetOperation: (
    state: AccountTransactionsGlobalState,
    action: UpdateBudgetAction,
    dispatch?: SignalDispatch,
  ) => void;
  deleteBudgetOperation: (
    state: AccountTransactionsGlobalState,
    action: DeleteBudgetAction,
    dispatch?: SignalDispatch,
  ) => void;
}
