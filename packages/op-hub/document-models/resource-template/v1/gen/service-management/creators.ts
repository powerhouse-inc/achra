/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { createAction } from "document-model";
import {
  AddFacetBindingInputSchema,
  AddServiceInputSchema,
  DeleteServiceInputSchema,
  RemoveFacetBindingInputSchema,
  UpdateServiceInputSchema,
} from "../schema/zod.js";
import type {
  AddFacetBindingInput,
  AddServiceInput,
  DeleteServiceInput,
  RemoveFacetBindingInput,
  UpdateServiceInput,
} from "../types.js";
import type {
  AddFacetBindingAction,
  AddServiceAction,
  DeleteServiceAction,
  RemoveFacetBindingAction,
  UpdateServiceAction,
} from "./actions.js";

export const addService = (input: AddServiceInput) =>
  createAction<AddServiceAction>(
    "ADD_SERVICE",
    { ...input },
    undefined,
    AddServiceInputSchema,
    "global",
  );

export const updateService = (input: UpdateServiceInput) =>
  createAction<UpdateServiceAction>(
    "UPDATE_SERVICE",
    { ...input },
    undefined,
    UpdateServiceInputSchema,
    "global",
  );

export const deleteService = (input: DeleteServiceInput) =>
  createAction<DeleteServiceAction>(
    "DELETE_SERVICE",
    { ...input },
    undefined,
    DeleteServiceInputSchema,
    "global",
  );

export const addFacetBinding = (input: AddFacetBindingInput) =>
  createAction<AddFacetBindingAction>(
    "ADD_FACET_BINDING",
    { ...input },
    undefined,
    AddFacetBindingInputSchema,
    "global",
  );

export const removeFacetBinding = (input: RemoveFacetBindingInput) =>
  createAction<RemoveFacetBindingAction>(
    "REMOVE_FACET_BINDING",
    { ...input },
    undefined,
    RemoveFacetBindingInputSchema,
    "global",
  );
