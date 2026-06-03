/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { type SignalDispatch } from "document-model";
import type { ResourceTemplateGlobalState } from "../types.js";
import type {
  AddFacetBindingAction,
  AddServiceAction,
  DeleteServiceAction,
  RemoveFacetBindingAction,
  UpdateServiceAction,
} from "./actions.js";

export interface ResourceTemplateServiceManagementOperations {
  addServiceOperation: (
    state: ResourceTemplateGlobalState,
    action: AddServiceAction,
    dispatch?: SignalDispatch,
  ) => void;
  updateServiceOperation: (
    state: ResourceTemplateGlobalState,
    action: UpdateServiceAction,
    dispatch?: SignalDispatch,
  ) => void;
  deleteServiceOperation: (
    state: ResourceTemplateGlobalState,
    action: DeleteServiceAction,
    dispatch?: SignalDispatch,
  ) => void;
  addFacetBindingOperation: (
    state: ResourceTemplateGlobalState,
    action: AddFacetBindingAction,
    dispatch?: SignalDispatch,
  ) => void;
  removeFacetBindingOperation: (
    state: ResourceTemplateGlobalState,
    action: RemoveFacetBindingAction,
    dispatch?: SignalDispatch,
  ) => void;
}
