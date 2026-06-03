/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import type { Action } from "document-model";
import type {
  AddServiceInput,
  DeleteServiceInput,
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

export type ServiceOfferingServicesAction =
  | AddServiceAction
  | UpdateServiceAction
  | DeleteServiceAction;
