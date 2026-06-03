/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import type { Action } from "document-model";
import type {
  SetBasicTermsInput,
  SetCostAndMaterialsInput,
  SetEscrowDetailsInput,
  SetEvaluationTermsInput,
  SetRetainerDetailsInput,
  UpdateStatusInput,
} from "../types.js";

export type SetBasicTermsAction = Action & {
  type: "SET_BASIC_TERMS";
  input: SetBasicTermsInput;
};
export type UpdateStatusAction = Action & {
  type: "UPDATE_STATUS";
  input: UpdateStatusInput;
};
export type SetCostAndMaterialsAction = Action & {
  type: "SET_COST_AND_MATERIALS";
  input: SetCostAndMaterialsInput;
};
export type SetEscrowDetailsAction = Action & {
  type: "SET_ESCROW_DETAILS";
  input: SetEscrowDetailsInput;
};
export type SetEvaluationTermsAction = Action & {
  type: "SET_EVALUATION_TERMS";
  input: SetEvaluationTermsInput;
};
export type SetRetainerDetailsAction = Action & {
  type: "SET_RETAINER_DETAILS";
  input: SetRetainerDetailsInput;
};

export type PaymentTermsTermsAction =
  | SetBasicTermsAction
  | UpdateStatusAction
  | SetCostAndMaterialsAction
  | SetEscrowDetailsAction
  | SetEvaluationTermsAction
  | SetRetainerDetailsAction;
