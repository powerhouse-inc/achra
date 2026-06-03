/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { type SignalDispatch } from "document-model";
import type { RequestForProposalsGlobalState } from "../types.js";
import type {
  AddProposalAction,
  ChangeProposalStatusAction,
  RemoveProposalAction,
} from "./actions.js";

export interface RequestForProposalsProposalsOperations {
  addProposalOperation: (
    state: RequestForProposalsGlobalState,
    action: AddProposalAction,
    dispatch?: SignalDispatch,
  ) => void;
  changeProposalStatusOperation: (
    state: RequestForProposalsGlobalState,
    action: ChangeProposalStatusAction,
    dispatch?: SignalDispatch,
  ) => void;
  removeProposalOperation: (
    state: RequestForProposalsGlobalState,
    action: RemoveProposalAction,
    dispatch?: SignalDispatch,
  ) => void;
}
