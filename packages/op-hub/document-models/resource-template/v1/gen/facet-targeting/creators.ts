/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { createAction } from "document-model";
import {
  AddFacetOptionInputSchema,
  RemoveFacetOptionInputSchema,
  RemoveFacetTargetInputSchema,
  SetFacetTargetInputSchema,
} from "../schema/zod.js";
import type {
  AddFacetOptionInput,
  RemoveFacetOptionInput,
  RemoveFacetTargetInput,
  SetFacetTargetInput,
} from "../types.js";
import type {
  AddFacetOptionAction,
  RemoveFacetOptionAction,
  RemoveFacetTargetAction,
  SetFacetTargetAction,
} from "./actions.js";

export const setFacetTarget = (input: SetFacetTargetInput) =>
  createAction<SetFacetTargetAction>(
    "SET_FACET_TARGET",
    { ...input },
    undefined,
    SetFacetTargetInputSchema,
    "global",
  );

export const removeFacetTarget = (input: RemoveFacetTargetInput) =>
  createAction<RemoveFacetTargetAction>(
    "REMOVE_FACET_TARGET",
    { ...input },
    undefined,
    RemoveFacetTargetInputSchema,
    "global",
  );

export const addFacetOption = (input: AddFacetOptionInput) =>
  createAction<AddFacetOptionAction>(
    "ADD_FACET_OPTION",
    { ...input },
    undefined,
    AddFacetOptionInputSchema,
    "global",
  );

export const removeFacetOption = (input: RemoveFacetOptionInput) =>
  createAction<RemoveFacetOptionAction>(
    "REMOVE_FACET_OPTION",
    { ...input },
    undefined,
    RemoveFacetOptionInputSchema,
    "global",
  );
