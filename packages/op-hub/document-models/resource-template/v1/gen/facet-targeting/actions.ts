/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import type { Action } from "document-model";
import type {
  AddFacetOptionInput,
  RemoveFacetOptionInput,
  RemoveFacetTargetInput,
  SetFacetTargetInput,
} from "../types.js";

export type SetFacetTargetAction = Action & {
  type: "SET_FACET_TARGET";
  input: SetFacetTargetInput;
};
export type RemoveFacetTargetAction = Action & {
  type: "REMOVE_FACET_TARGET";
  input: RemoveFacetTargetInput;
};
export type AddFacetOptionAction = Action & {
  type: "ADD_FACET_OPTION";
  input: AddFacetOptionInput;
};
export type RemoveFacetOptionAction = Action & {
  type: "REMOVE_FACET_OPTION";
  input: RemoveFacetOptionInput;
};

export type ResourceTemplateFacetTargetingAction =
  | SetFacetTargetAction
  | RemoveFacetTargetAction
  | AddFacetOptionAction
  | RemoveFacetOptionAction;
