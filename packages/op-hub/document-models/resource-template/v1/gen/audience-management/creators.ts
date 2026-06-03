/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { createAction } from "document-model";
import {
  AddTargetAudienceInputSchema,
  RemoveTargetAudienceInputSchema,
} from "../schema/zod.js";
import type {
  AddTargetAudienceInput,
  RemoveTargetAudienceInput,
} from "../types.js";
import type {
  AddTargetAudienceAction,
  RemoveTargetAudienceAction,
} from "./actions.js";

export const addTargetAudience = (input: AddTargetAudienceInput) =>
  createAction<AddTargetAudienceAction>(
    "ADD_TARGET_AUDIENCE",
    { ...input },
    undefined,
    AddTargetAudienceInputSchema,
    "global",
  );

export const removeTargetAudience = (input: RemoveTargetAudienceInput) =>
  createAction<RemoveTargetAudienceAction>(
    "REMOVE_TARGET_AUDIENCE",
    { ...input },
    undefined,
    RemoveTargetAudienceInputSchema,
    "global",
  );
