/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { createAction } from "document-model";
import {
  AddBudgetInputSchema,
  DeleteBudgetInputSchema,
  UpdateBudgetInputSchema,
} from "../schema/zod.js";
import type {
  AddBudgetInput,
  DeleteBudgetInput,
  UpdateBudgetInput,
} from "../types.js";
import type {
  AddBudgetAction,
  DeleteBudgetAction,
  UpdateBudgetAction,
} from "./actions.js";

export const addBudget = (input: AddBudgetInput) =>
  createAction<AddBudgetAction>(
    "ADD_BUDGET",
    { ...input },
    undefined,
    AddBudgetInputSchema,
    "global",
  );

export const updateBudget = (input: UpdateBudgetInput) =>
  createAction<UpdateBudgetAction>(
    "UPDATE_BUDGET",
    { ...input },
    undefined,
    UpdateBudgetInputSchema,
    "global",
  );

export const deleteBudget = (input: DeleteBudgetInput) =>
  createAction<DeleteBudgetAction>(
    "DELETE_BUDGET",
    { ...input },
    undefined,
    DeleteBudgetInputSchema,
    "global",
  );
