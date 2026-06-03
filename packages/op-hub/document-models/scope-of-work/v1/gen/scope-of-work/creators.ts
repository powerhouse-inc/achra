/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { createAction } from "document-model";
import { EditScopeOfWorkInputSchema } from "../schema/zod.js";
import type { EditScopeOfWorkInput } from "../types.js";
import type { EditScopeOfWorkAction } from "./actions.js";

export const editScopeOfWork = (input: EditScopeOfWorkInput) =>
  createAction<EditScopeOfWorkAction>(
    "EDIT_SCOPE_OF_WORK",
    { ...input },
    undefined,
    EditScopeOfWorkInputSchema,
    "global",
  );
