/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import type { Action } from "document-model";
import type {
  AddFacetBindingInput,
  AddServiceInput,
  DeleteServiceInput,
  RemoveFacetBindingInput,
  UpdateServiceInput,
} from "../types.js";

export type AddServiceAction = Action & {
  type: "ADD_SERVICE";
  input: AddServiceInput;
};
export type UpdateServiceAction = Action & {
  type: "UPDATE_SERVICE";
  input: UpdateServiceInput;
};
export type DeleteServiceAction = Action & {
  type: "DELETE_SERVICE";
  input: DeleteServiceInput;
};
export type AddFacetBindingAction = Action & {
  type: "ADD_FACET_BINDING";
  input: AddFacetBindingInput;
};
export type RemoveFacetBindingAction = Action & {
  type: "REMOVE_FACET_BINDING";
  input: RemoveFacetBindingInput;
};

export type ResourceTemplateServiceManagementAction =
  | AddServiceAction
  | UpdateServiceAction
  | DeleteServiceAction
  | AddFacetBindingAction
  | RemoveFacetBindingAction;
