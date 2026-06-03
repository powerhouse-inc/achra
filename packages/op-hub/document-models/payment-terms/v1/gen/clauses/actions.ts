/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import type { Action } from "document-model";
import type {
  AddBonusClauseInput,
  AddPenaltyClauseInput,
  DeleteBonusClauseInput,
  DeletePenaltyClauseInput,
  UpdateBonusClauseInput,
  UpdatePenaltyClauseInput,
} from "../types.js";

export type AddBonusClauseAction = Action & {
  type: "ADD_BONUS_CLAUSE";
  input: AddBonusClauseInput;
};
export type UpdateBonusClauseAction = Action & {
  type: "UPDATE_BONUS_CLAUSE";
  input: UpdateBonusClauseInput;
};
export type DeleteBonusClauseAction = Action & {
  type: "DELETE_BONUS_CLAUSE";
  input: DeleteBonusClauseInput;
};
export type AddPenaltyClauseAction = Action & {
  type: "ADD_PENALTY_CLAUSE";
  input: AddPenaltyClauseInput;
};
export type UpdatePenaltyClauseAction = Action & {
  type: "UPDATE_PENALTY_CLAUSE";
  input: UpdatePenaltyClauseInput;
};
export type DeletePenaltyClauseAction = Action & {
  type: "DELETE_PENALTY_CLAUSE";
  input: DeletePenaltyClauseInput;
};

export type PaymentTermsClausesAction =
  | AddBonusClauseAction
  | UpdateBonusClauseAction
  | DeleteBonusClauseAction
  | AddPenaltyClauseAction
  | UpdatePenaltyClauseAction
  | DeletePenaltyClauseAction;
