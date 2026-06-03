/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { createAction } from "document-model";
import {
  AddTransactionInputSchema,
  DeleteTransactionInputSchema,
  UpdateTransactionInputSchema,
  UpdateTransactionPeriodInputSchema,
} from "../schema/zod.js";
import type {
  AddTransactionInput,
  DeleteTransactionInput,
  UpdateTransactionInput,
  UpdateTransactionPeriodInput,
} from "../types.js";
import type {
  AddTransactionAction,
  DeleteTransactionAction,
  UpdateTransactionAction,
  UpdateTransactionPeriodAction,
} from "./actions.js";

export const addTransaction = (input: AddTransactionInput) =>
  createAction<AddTransactionAction>(
    "ADD_TRANSACTION",
    { ...input },
    undefined,
    AddTransactionInputSchema,
    "global",
  );

export const updateTransaction = (input: UpdateTransactionInput) =>
  createAction<UpdateTransactionAction>(
    "UPDATE_TRANSACTION",
    { ...input },
    undefined,
    UpdateTransactionInputSchema,
    "global",
  );

export const deleteTransaction = (input: DeleteTransactionInput) =>
  createAction<DeleteTransactionAction>(
    "DELETE_TRANSACTION",
    { ...input },
    undefined,
    DeleteTransactionInputSchema,
    "global",
  );

export const updateTransactionPeriod = (input: UpdateTransactionPeriodInput) =>
  createAction<UpdateTransactionPeriodAction>(
    "UPDATE_TRANSACTION_PERIOD",
    { ...input },
    undefined,
    UpdateTransactionPeriodInputSchema,
    "global",
  );
