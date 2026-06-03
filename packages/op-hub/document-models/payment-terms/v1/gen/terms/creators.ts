/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { createAction } from "document-model";
import {
  SetBasicTermsInputSchema,
  SetCostAndMaterialsInputSchema,
  SetEscrowDetailsInputSchema,
  SetEvaluationTermsInputSchema,
  SetRetainerDetailsInputSchema,
  UpdateStatusInputSchema,
} from "../schema/zod.js";
import type {
  SetBasicTermsInput,
  SetCostAndMaterialsInput,
  SetEscrowDetailsInput,
  SetEvaluationTermsInput,
  SetRetainerDetailsInput,
  UpdateStatusInput,
} from "../types.js";
import type {
  SetBasicTermsAction,
  SetCostAndMaterialsAction,
  SetEscrowDetailsAction,
  SetEvaluationTermsAction,
  SetRetainerDetailsAction,
  UpdateStatusAction,
} from "./actions.js";

export const setBasicTerms = (input: SetBasicTermsInput) =>
  createAction<SetBasicTermsAction>(
    "SET_BASIC_TERMS",
    { ...input },
    undefined,
    SetBasicTermsInputSchema,
    "global",
  );

export const updateStatus = (input: UpdateStatusInput) =>
  createAction<UpdateStatusAction>(
    "UPDATE_STATUS",
    { ...input },
    undefined,
    UpdateStatusInputSchema,
    "global",
  );

export const setCostAndMaterials = (input: SetCostAndMaterialsInput) =>
  createAction<SetCostAndMaterialsAction>(
    "SET_COST_AND_MATERIALS",
    { ...input },
    undefined,
    SetCostAndMaterialsInputSchema,
    "global",
  );

export const setEscrowDetails = (input: SetEscrowDetailsInput) =>
  createAction<SetEscrowDetailsAction>(
    "SET_ESCROW_DETAILS",
    { ...input },
    undefined,
    SetEscrowDetailsInputSchema,
    "global",
  );

export const setEvaluationTerms = (input: SetEvaluationTermsInput) =>
  createAction<SetEvaluationTermsAction>(
    "SET_EVALUATION_TERMS",
    { ...input },
    undefined,
    SetEvaluationTermsInputSchema,
    "global",
  );

export const setRetainerDetails = (input: SetRetainerDetailsInput) =>
  createAction<SetRetainerDetailsAction>(
    "SET_RETAINER_DETAILS",
    { ...input },
    undefined,
    SetRetainerDetailsInputSchema,
    "global",
  );
