/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { createAction } from "document-model";
import {
  AddFaqInputSchema,
  AddOptionGroupInputSchema,
  DeleteFaqInputSchema,
  DeleteOptionGroupInputSchema,
  ReorderFaqsInputSchema,
  UpdateFaqInputSchema,
  UpdateOptionGroupInputSchema,
} from "../schema/zod.js";
import type {
  AddFaqInput,
  AddOptionGroupInput,
  DeleteFaqInput,
  DeleteOptionGroupInput,
  ReorderFaqsInput,
  UpdateFaqInput,
  UpdateOptionGroupInput,
} from "../types.js";
import type {
  AddFaqAction,
  AddOptionGroupAction,
  DeleteFaqAction,
  DeleteOptionGroupAction,
  ReorderFaqsAction,
  UpdateFaqAction,
  UpdateOptionGroupAction,
} from "./actions.js";

export const addOptionGroup = (input: AddOptionGroupInput) =>
  createAction<AddOptionGroupAction>(
    "ADD_OPTION_GROUP",
    { ...input },
    undefined,
    AddOptionGroupInputSchema,
    "global",
  );

export const updateOptionGroup = (input: UpdateOptionGroupInput) =>
  createAction<UpdateOptionGroupAction>(
    "UPDATE_OPTION_GROUP",
    { ...input },
    undefined,
    UpdateOptionGroupInputSchema,
    "global",
  );

export const deleteOptionGroup = (input: DeleteOptionGroupInput) =>
  createAction<DeleteOptionGroupAction>(
    "DELETE_OPTION_GROUP",
    { ...input },
    undefined,
    DeleteOptionGroupInputSchema,
    "global",
  );

export const addFaq = (input: AddFaqInput) =>
  createAction<AddFaqAction>(
    "ADD_FAQ",
    { ...input },
    undefined,
    AddFaqInputSchema,
    "global",
  );

export const updateFaq = (input: UpdateFaqInput) =>
  createAction<UpdateFaqAction>(
    "UPDATE_FAQ",
    { ...input },
    undefined,
    UpdateFaqInputSchema,
    "global",
  );

export const deleteFaq = (input: DeleteFaqInput) =>
  createAction<DeleteFaqAction>(
    "DELETE_FAQ",
    { ...input },
    undefined,
    DeleteFaqInputSchema,
    "global",
  );

export const reorderFaqs = (input: ReorderFaqsInput) =>
  createAction<ReorderFaqsAction>(
    "REORDER_FAQS",
    { ...input },
    undefined,
    ReorderFaqsInputSchema,
    "global",
  );
