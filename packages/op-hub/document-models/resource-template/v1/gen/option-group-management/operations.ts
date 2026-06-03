/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { type SignalDispatch } from "document-model";
import type { ResourceTemplateGlobalState } from "../types.js";
import type {
  AddFaqAction,
  AddOptionGroupAction,
  DeleteFaqAction,
  DeleteOptionGroupAction,
  ReorderFaqsAction,
  UpdateFaqAction,
  UpdateOptionGroupAction,
} from "./actions.js";

export interface ResourceTemplateOptionGroupManagementOperations {
  addOptionGroupOperation: (
    state: ResourceTemplateGlobalState,
    action: AddOptionGroupAction,
    dispatch?: SignalDispatch,
  ) => void;
  updateOptionGroupOperation: (
    state: ResourceTemplateGlobalState,
    action: UpdateOptionGroupAction,
    dispatch?: SignalDispatch,
  ) => void;
  deleteOptionGroupOperation: (
    state: ResourceTemplateGlobalState,
    action: DeleteOptionGroupAction,
    dispatch?: SignalDispatch,
  ) => void;
  addFaqOperation: (
    state: ResourceTemplateGlobalState,
    action: AddFaqAction,
    dispatch?: SignalDispatch,
  ) => void;
  updateFaqOperation: (
    state: ResourceTemplateGlobalState,
    action: UpdateFaqAction,
    dispatch?: SignalDispatch,
  ) => void;
  deleteFaqOperation: (
    state: ResourceTemplateGlobalState,
    action: DeleteFaqAction,
    dispatch?: SignalDispatch,
  ) => void;
  reorderFaqsOperation: (
    state: ResourceTemplateGlobalState,
    action: ReorderFaqsAction,
    dispatch?: SignalDispatch,
  ) => void;
}
