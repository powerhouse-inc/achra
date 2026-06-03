/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import type { Action } from "document-model";
import type {
  AddTargetAudienceInput,
  RemoveTargetAudienceInput,
} from "../types.js";

export type AddTargetAudienceAction = Action & {
  type: "ADD_TARGET_AUDIENCE";
  input: AddTargetAudienceInput;
};
export type RemoveTargetAudienceAction = Action & {
  type: "REMOVE_TARGET_AUDIENCE";
  input: RemoveTargetAudienceInput;
};

export type ResourceTemplateAudienceManagementAction =
  | AddTargetAudienceAction
  | RemoveTargetAudienceAction;
