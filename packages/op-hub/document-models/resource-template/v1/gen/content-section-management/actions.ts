/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import type { Action } from "document-model";
import type {
  AddContentSectionInput,
  DeleteContentSectionInput,
  ReorderContentSectionsInput,
  UpdateContentSectionInput,
} from "../types.js";

export type AddContentSectionAction = Action & {
  type: "ADD_CONTENT_SECTION";
  input: AddContentSectionInput;
};
export type UpdateContentSectionAction = Action & {
  type: "UPDATE_CONTENT_SECTION";
  input: UpdateContentSectionInput;
};
export type DeleteContentSectionAction = Action & {
  type: "DELETE_CONTENT_SECTION";
  input: DeleteContentSectionInput;
};
export type ReorderContentSectionsAction = Action & {
  type: "REORDER_CONTENT_SECTIONS";
  input: ReorderContentSectionsInput;
};

export type ResourceTemplateContentSectionManagementAction =
  | AddContentSectionAction
  | UpdateContentSectionAction
  | DeleteContentSectionAction
  | ReorderContentSectionsAction;
