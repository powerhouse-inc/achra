/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import type { Action } from "document-model";
import type {
  SetOperatorInput,
  SetTemplateIdInput,
  SetWeightInput,
  UpdateTemplateInfoInput,
  UpdateTemplateStatusInput,
} from "../types.js";

export type UpdateTemplateInfoAction = Action & {
  type: "UPDATE_TEMPLATE_INFO";
  input: UpdateTemplateInfoInput;
};
export type UpdateTemplateStatusAction = Action & {
  type: "UPDATE_TEMPLATE_STATUS";
  input: UpdateTemplateStatusInput;
};
export type SetOperatorAction = Action & {
  type: "SET_OPERATOR";
  input: SetOperatorInput;
};
export type SetTemplateIdAction = Action & {
  type: "SET_TEMPLATE_ID";
  input: SetTemplateIdInput;
};
export type SetWeightAction = Action & {
  type: "SET_WEIGHT";
  input: SetWeightInput;
};

export type ResourceTemplateTemplateManagementAction =
  | UpdateTemplateInfoAction
  | UpdateTemplateStatusAction
  | SetOperatorAction
  | SetTemplateIdAction
  | SetWeightAction;
