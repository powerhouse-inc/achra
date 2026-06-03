/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { createAction } from "document-model";
import {
  AddContextDocumentInputSchema,
  RemoveContextDocumentInputSchema,
} from "../schema/zod.js";
import type {
  AddContextDocumentInput,
  RemoveContextDocumentInput,
} from "../types.js";
import type {
  AddContextDocumentAction,
  RemoveContextDocumentAction,
} from "./actions.js";

export const addContextDocument = (input: AddContextDocumentInput) =>
  createAction<AddContextDocumentAction>(
    "ADD_CONTEXT_DOCUMENT",
    { ...input },
    undefined,
    AddContextDocumentInputSchema,
    "global",
  );

export const removeContextDocument = (input: RemoveContextDocumentInput) =>
  createAction<RemoveContextDocumentAction>(
    "REMOVE_CONTEXT_DOCUMENT",
    { ...input },
    undefined,
    RemoveContextDocumentInputSchema,
    "global",
  );
