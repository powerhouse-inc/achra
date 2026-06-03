/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { createAction } from "document-model";
import {
  AddTransactionInputSchema,
  RecalculateFlowTypesInputSchema,
  RemoveTransactionInputSchema,
  UpdateTransactionFlowTypeInputSchema,
} from "../schema/zod.js";
import type {
  AddTransactionInput,
  RecalculateFlowTypesInput,
  RemoveTransactionInput,
  UpdateTransactionFlowTypeInput,
} from "../types.js";
import type {
  AddTransactionAction,
  RecalculateFlowTypesAction,
  RemoveTransactionAction,
  UpdateTransactionFlowTypeAction,
} from "./actions.js";

export const addTransaction = (input: AddTransactionInput) =>
  createAction<AddTransactionAction>(
    "ADD_TRANSACTION",
    { ...input },
    undefined,
    AddTransactionInputSchema,
    "global",
  );

export const removeTransaction = (input: RemoveTransactionInput) =>
  createAction<RemoveTransactionAction>(
    "REMOVE_TRANSACTION",
    { ...input },
    undefined,
    RemoveTransactionInputSchema,
    "global",
  );

export const updateTransactionFlowType = (
  input: UpdateTransactionFlowTypeInput,
) =>
  createAction<UpdateTransactionFlowTypeAction>(
    "UPDATE_TRANSACTION_FLOW_TYPE",
    { ...input },
    undefined,
    UpdateTransactionFlowTypeInputSchema,
    "global",
  );

export const recalculateFlowTypes = (input: RecalculateFlowTypesInput) =>
  createAction<RecalculateFlowTypesAction>(
    "RECALCULATE_FLOW_TYPES",
    { ...input },
    undefined,
    RecalculateFlowTypesInputSchema,
    "global",
  );
