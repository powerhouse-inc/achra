/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import type { Action } from "document-model";
import type {
  AddBudgetInput,
  DeleteBudgetInput,
  UpdateBudgetInput,
} from "../types.js";

export type AddBudgetAction = Action & {
  type: "ADD_BUDGET";
  input: AddBudgetInput;
};
export type UpdateBudgetAction = Action & {
  type: "UPDATE_BUDGET";
  input: UpdateBudgetInput;
};
export type DeleteBudgetAction = Action & {
  type: "DELETE_BUDGET";
  input: DeleteBudgetInput;
};

export type AccountTransactionsBudgetsAction =
  | AddBudgetAction
  | UpdateBudgetAction
  | DeleteBudgetAction;
