/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { type SignalDispatch } from "document-model";
import type { ResourceTemplateGlobalState } from "../types.js";
import type {
  AddContentSectionAction,
  DeleteContentSectionAction,
  ReorderContentSectionsAction,
  UpdateContentSectionAction,
} from "./actions.js";

export interface ResourceTemplateContentSectionManagementOperations {
  addContentSectionOperation: (
    state: ResourceTemplateGlobalState,
    action: AddContentSectionAction,
    dispatch?: SignalDispatch,
  ) => void;
  updateContentSectionOperation: (
    state: ResourceTemplateGlobalState,
    action: UpdateContentSectionAction,
    dispatch?: SignalDispatch,
  ) => void;
  deleteContentSectionOperation: (
    state: ResourceTemplateGlobalState,
    action: DeleteContentSectionAction,
    dispatch?: SignalDispatch,
  ) => void;
  reorderContentSectionsOperation: (
    state: ResourceTemplateGlobalState,
    action: ReorderContentSectionsAction,
    dispatch?: SignalDispatch,
  ) => void;
}
