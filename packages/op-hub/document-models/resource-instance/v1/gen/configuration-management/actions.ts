/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import type { Action } from "document-model";
import type {
  ApplyConfigurationChangesInput,
  RemoveInstanceFacetInput,
  SetInstanceFacetInput,
  UpdateInstanceFacetInput,
} from "../types.js";

export type SetInstanceFacetAction = Action & {
  type: "SET_INSTANCE_FACET";
  input: SetInstanceFacetInput;
};
export type RemoveInstanceFacetAction = Action & {
  type: "REMOVE_INSTANCE_FACET";
  input: RemoveInstanceFacetInput;
};
export type UpdateInstanceFacetAction = Action & {
  type: "UPDATE_INSTANCE_FACET";
  input: UpdateInstanceFacetInput;
};
export type ApplyConfigurationChangesAction = Action & {
  type: "APPLY_CONFIGURATION_CHANGES";
  input: ApplyConfigurationChangesInput;
};

export type ResourceInstanceConfigurationManagementAction =
  | SetInstanceFacetAction
  | RemoveInstanceFacetAction
  | UpdateInstanceFacetAction
  | ApplyConfigurationChangesAction;
