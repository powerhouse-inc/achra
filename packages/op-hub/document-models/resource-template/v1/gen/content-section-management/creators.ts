/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { createAction } from "document-model";
import {
  AddContentSectionInputSchema,
  DeleteContentSectionInputSchema,
  ReorderContentSectionsInputSchema,
  UpdateContentSectionInputSchema,
} from "../schema/zod.js";
import type {
  AddContentSectionInput,
  DeleteContentSectionInput,
  ReorderContentSectionsInput,
  UpdateContentSectionInput,
} from "../types.js";
import type {
  AddContentSectionAction,
  DeleteContentSectionAction,
  ReorderContentSectionsAction,
  UpdateContentSectionAction,
} from "./actions.js";

export const addContentSection = (input: AddContentSectionInput) =>
  createAction<AddContentSectionAction>(
    "ADD_CONTENT_SECTION",
    { ...input },
    undefined,
    AddContentSectionInputSchema,
    "global",
  );

export const updateContentSection = (input: UpdateContentSectionInput) =>
  createAction<UpdateContentSectionAction>(
    "UPDATE_CONTENT_SECTION",
    { ...input },
    undefined,
    UpdateContentSectionInputSchema,
    "global",
  );

export const deleteContentSection = (input: DeleteContentSectionInput) =>
  createAction<DeleteContentSectionAction>(
    "DELETE_CONTENT_SECTION",
    { ...input },
    undefined,
    DeleteContentSectionInputSchema,
    "global",
  );

export const reorderContentSections = (input: ReorderContentSectionsInput) =>
  createAction<ReorderContentSectionsAction>(
    "REORDER_CONTENT_SECTIONS",
    { ...input },
    undefined,
    ReorderContentSectionsInputSchema,
    "global",
  );
