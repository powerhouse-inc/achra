/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import type { Action } from "document-model";
import type {
  AddOptionInput,
  RemoveOptionInput,
  ReorderOptionsInput,
  UpdateOptionInput,
} from "../types.js";

export type AddOptionAction = Action & {
  type: "ADD_OPTION";
  input: AddOptionInput;
};
export type UpdateOptionAction = Action & {
  type: "UPDATE_OPTION";
  input: UpdateOptionInput;
};
export type RemoveOptionAction = Action & {
  type: "REMOVE_OPTION";
  input: RemoveOptionInput;
};
export type ReorderOptionsAction = Action & {
  type: "REORDER_OPTIONS";
  input: ReorderOptionsInput;
};

export type FacetOptionManagementAction =
  | AddOptionAction
  | UpdateOptionAction
  | RemoveOptionAction
  | ReorderOptionsAction;
