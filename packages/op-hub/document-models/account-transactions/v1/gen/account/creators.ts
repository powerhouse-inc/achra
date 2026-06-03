/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { createAction } from "document-model";
import { SetAccountInputSchema } from "../schema/zod.js";
import type { SetAccountInput } from "../types.js";
import type { SetAccountAction } from "./actions.js";

export const setAccount = (input: SetAccountInput) =>
  createAction<SetAccountAction>(
    "SET_ACCOUNT",
    { ...input },
    undefined,
    SetAccountInputSchema,
    "global",
  );
