/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { createAction } from "document-model";
import {
  RemoveEndingBalanceInputSchema,
  RemoveStartingBalanceInputSchema,
  SetEndingBalanceInputSchema,
  SetStartingBalanceInputSchema,
} from "../schema/zod.js";
import type {
  RemoveEndingBalanceInput,
  RemoveStartingBalanceInput,
  SetEndingBalanceInput,
  SetStartingBalanceInput,
} from "../types.js";
import type {
  RemoveEndingBalanceAction,
  RemoveStartingBalanceAction,
  SetEndingBalanceAction,
  SetStartingBalanceAction,
} from "./actions.js";

export const setStartingBalance = (input: SetStartingBalanceInput) =>
  createAction<SetStartingBalanceAction>(
    "SET_STARTING_BALANCE",
    { ...input },
    undefined,
    SetStartingBalanceInputSchema,
    "global",
  );

export const setEndingBalance = (input: SetEndingBalanceInput) =>
  createAction<SetEndingBalanceAction>(
    "SET_ENDING_BALANCE",
    { ...input },
    undefined,
    SetEndingBalanceInputSchema,
    "global",
  );

export const removeStartingBalance = (input: RemoveStartingBalanceInput) =>
  createAction<RemoveStartingBalanceAction>(
    "REMOVE_STARTING_BALANCE",
    { ...input },
    undefined,
    RemoveStartingBalanceInputSchema,
    "global",
  );

export const removeEndingBalance = (input: RemoveEndingBalanceInput) =>
  createAction<RemoveEndingBalanceAction>(
    "REMOVE_ENDING_BALANCE",
    { ...input },
    undefined,
    RemoveEndingBalanceInputSchema,
    "global",
  );
