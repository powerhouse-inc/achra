/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import type { Action } from "document-model";
import type {
  AddAlternativeProposalInput,
  EditAlternativeProposalInput,
  EditInitialProposalInput,
  RemoveAlternativeProposalInput,
} from "../types.js";

export type EditInitialProposalAction = Action & {
  type: "EDIT_INITIAL_PROPOSAL";
  input: EditInitialProposalInput;
};
export type AddAlternativeProposalAction = Action & {
  type: "ADD_ALTERNATIVE_PROPOSAL";
  input: AddAlternativeProposalInput;
};
export type EditAlternativeProposalAction = Action & {
  type: "EDIT_ALTERNATIVE_PROPOSAL";
  input: EditAlternativeProposalInput;
};
export type RemoveAlternativeProposalAction = Action & {
  type: "REMOVE_ALTERNATIVE_PROPOSAL";
  input: RemoveAlternativeProposalInput;
};

export type WorkstreamProposalsAction =
  | EditInitialProposalAction
  | AddAlternativeProposalAction
  | EditAlternativeProposalAction
  | RemoveAlternativeProposalAction;
