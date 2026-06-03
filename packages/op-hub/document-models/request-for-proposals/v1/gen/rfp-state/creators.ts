/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { createAction } from "document-model";
import { EditRfpInputSchema } from "../schema/zod.js";
import type { EditRfpInput } from "../types.js";
import type { EditRfpAction } from "./actions.js";

export const editRfp = (input: EditRfpInput) =>
  createAction<EditRfpAction>(
    "EDIT_RFP",
    { ...input },
    undefined,
    EditRfpInputSchema,
    "global",
  );
