/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { createAction } from "document-model";
import {
  AddBuilderInputSchema,
  RemoveBuilderInputSchema,
} from "../schema/zod.js";
import type { AddBuilderInput, RemoveBuilderInput } from "../types.js";
import type { AddBuilderAction, RemoveBuilderAction } from "./actions.js";

export const addBuilder = (input: AddBuilderInput) =>
  createAction<AddBuilderAction>(
    "ADD_BUILDER",
    { ...input },
    undefined,
    AddBuilderInputSchema,
    "global",
  );

export const removeBuilder = (input: RemoveBuilderInput) =>
  createAction<RemoveBuilderAction>(
    "REMOVE_BUILDER",
    { ...input },
    undefined,
    RemoveBuilderInputSchema,
    "global",
  );
