/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import type { Action } from "document-model";
import type { SetFacetDescriptionInput, SetFacetNameInput } from "../types.js";

export type SetFacetNameAction = Action & {
  type: "SET_FACET_NAME";
  input: SetFacetNameInput;
};
export type SetFacetDescriptionAction = Action & {
  type: "SET_FACET_DESCRIPTION";
  input: SetFacetDescriptionInput;
};

export type FacetFacetManagementAction =
  | SetFacetNameAction
  | SetFacetDescriptionAction;
