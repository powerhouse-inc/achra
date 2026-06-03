/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import type { Action } from "document-model";
import type { AddBuilderInput, RemoveBuilderInput } from "../types.js";

export type AddBuilderAction = Action & {
  type: "ADD_BUILDER";
  input: AddBuilderInput;
};
export type RemoveBuilderAction = Action & {
  type: "REMOVE_BUILDER";
  input: RemoveBuilderInput;
};

export type BuildersBuildersAction = AddBuilderAction | RemoveBuilderAction;
