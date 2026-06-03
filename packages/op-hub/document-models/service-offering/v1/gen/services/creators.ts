/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { createAction } from "document-model";
import {
  AddServiceInputSchema,
  DeleteServiceInputSchema,
  UpdateServiceInputSchema,
} from "../schema/zod.js";
import type {
  AddServiceInput,
  DeleteServiceInput,
  UpdateServiceInput,
} from "../types.js";
import type {
  AddServiceAction,
  DeleteServiceAction,
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
