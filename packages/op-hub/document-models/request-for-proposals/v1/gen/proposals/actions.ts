/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import type { Action } from "document-model";
import type {
  AddProposalInput,
  ChangeProposalStatusInput,
  RemoveProposalInput,
} from "../types.js";

export type AddProposalAction = Action & {
  type: "ADD_PROPOSAL";
  input: AddProposalInput;
};
export type ChangeProposalStatusAction = Action & {
  type: "CHANGE_PROPOSAL_STATUS";
  input: ChangeProposalStatusInput;
};
export type RemoveProposalAction = Action & {
  type: "REMOVE_PROPOSAL";
  input: RemoveProposalInput;
};

export type RequestForProposalsProposalsAction =
  | AddProposalAction
  | ChangeProposalStatusAction
  | RemoveProposalAction;
