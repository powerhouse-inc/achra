/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { createAction } from "document-model";
import { EditLineItemTagInputSchema } from "../schema/zod.js";
import type { EditLineItemTagInput } from "../types.js";
import type { EditLineItemTagAction } from "./actions.js";

export const editLineItemTag = (input: EditLineItemTagInput) =>
  createAction<EditLineItemTagAction>(
    "EDIT_LINE_ITEM_TAG",
    { ...input },
    undefined,
    EditLineItemTagInputSchema,
    "global",
  );
