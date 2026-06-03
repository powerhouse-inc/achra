/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { type SignalDispatch } from "document-model";
import type { ResourceInstanceGlobalState } from "../types.js";
import type {
  ApplyConfigurationChangesAction,
  RemoveInstanceFacetAction,
  SetInstanceFacetAction,
  UpdateInstanceFacetAction,
} from "./actions.js";

export interface ResourceInstanceConfigurationManagementOperations {
  setInstanceFacetOperation: (
    state: ResourceInstanceGlobalState,
    action: SetInstanceFacetAction,
    dispatch?: SignalDispatch,
  ) => void;
  removeInstanceFacetOperation: (
    state: ResourceInstanceGlobalState,
    action: RemoveInstanceFacetAction,
    dispatch?: SignalDispatch,
  ) => void;
  updateInstanceFacetOperation: (
    state: ResourceInstanceGlobalState,
    action: UpdateInstanceFacetAction,
    dispatch?: SignalDispatch,
  ) => void;
  applyConfigurationChangesOperation: (
    state: ResourceInstanceGlobalState,
    action: ApplyConfigurationChangesAction,
    dispatch?: SignalDispatch,
  ) => void;
}
