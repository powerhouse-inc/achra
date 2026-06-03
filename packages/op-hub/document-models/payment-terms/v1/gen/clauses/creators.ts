/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { createAction } from "document-model";
import {
  AddBonusClauseInputSchema,
  AddPenaltyClauseInputSchema,
  DeleteBonusClauseInputSchema,
  DeletePenaltyClauseInputSchema,
  UpdateBonusClauseInputSchema,
  UpdatePenaltyClauseInputSchema,
} from "../schema/zod.js";
import type {
  AddBonusClauseInput,
  AddPenaltyClauseInput,
  DeleteBonusClauseInput,
  DeletePenaltyClauseInput,
  UpdateBonusClauseInput,
  UpdatePenaltyClauseInput,
} from "../types.js";
import type {
  AddBonusClauseAction,
  AddPenaltyClauseAction,
  DeleteBonusClauseAction,
  DeletePenaltyClauseAction,
  UpdateBonusClauseAction,
  UpdatePenaltyClauseAction,
} from "./actions.js";

export const addBonusClause = (input: AddBonusClauseInput) =>
  createAction<AddBonusClauseAction>(
    "ADD_BONUS_CLAUSE",
    { ...input },
    undefined,
    AddBonusClauseInputSchema,
    "global",
  );

export const updateBonusClause = (input: UpdateBonusClauseInput) =>
  createAction<UpdateBonusClauseAction>(
    "UPDATE_BONUS_CLAUSE",
    { ...input },
    undefined,
    UpdateBonusClauseInputSchema,
    "global",
  );

export const deleteBonusClause = (input: DeleteBonusClauseInput) =>
  createAction<DeleteBonusClauseAction>(
    "DELETE_BONUS_CLAUSE",
    { ...input },
    undefined,
    DeleteBonusClauseInputSchema,
    "global",
  );

export const addPenaltyClause = (input: AddPenaltyClauseInput) =>
  createAction<AddPenaltyClauseAction>(
    "ADD_PENALTY_CLAUSE",
    { ...input },
    undefined,
    AddPenaltyClauseInputSchema,
    "global",
  );

export const updatePenaltyClause = (input: UpdatePenaltyClauseInput) =>
  createAction<UpdatePenaltyClauseAction>(
    "UPDATE_PENALTY_CLAUSE",
    { ...input },
    undefined,
    UpdatePenaltyClauseInputSchema,
    "global",
  );

export const deletePenaltyClause = (input: DeletePenaltyClauseInput) =>
  createAction<DeletePenaltyClauseAction>(
    "DELETE_PENALTY_CLAUSE",
    { ...input },
    undefined,
    DeletePenaltyClauseInputSchema,
    "global",
  );
