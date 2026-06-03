/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { createAction } from "document-model";
import {
  ApplyConfigurationChangesInputSchema,
  RemoveInstanceFacetInputSchema,
  SetInstanceFacetInputSchema,
  UpdateInstanceFacetInputSchema,
} from "../schema/zod.js";
import type {
  ApplyConfigurationChangesInput,
  RemoveInstanceFacetInput,
  SetInstanceFacetInput,
  UpdateInstanceFacetInput,
} from "../types.js";
import type {
  ApplyConfigurationChangesAction,
  RemoveInstanceFacetAction,
  SetInstanceFacetAction,
  UpdateInstanceFacetAction,
} from "./actions.js";

export const setInstanceFacet = (input: SetInstanceFacetInput) =>
  createAction<SetInstanceFacetAction>(
    "SET_INSTANCE_FACET",
    { ...input },
    undefined,
    SetInstanceFacetInputSchema,
    "global",
  );

export const removeInstanceFacet = (input: RemoveInstanceFacetInput) =>
  createAction<RemoveInstanceFacetAction>(
    "REMOVE_INSTANCE_FACET",
    { ...input },
    undefined,
    RemoveInstanceFacetInputSchema,
    "global",
  );

export const updateInstanceFacet = (input: UpdateInstanceFacetInput) =>
  createAction<UpdateInstanceFacetAction>(
    "UPDATE_INSTANCE_FACET",
    { ...input },
    undefined,
    UpdateInstanceFacetInputSchema,
    "global",
  );

export const applyConfigurationChanges = (
  input: ApplyConfigurationChangesInput,
) =>
  createAction<ApplyConfigurationChangesAction>(
    "APPLY_CONFIGURATION_CHANGES",
    { ...input },
    undefined,
    ApplyConfigurationChangesInputSchema,
    "global",
  );
