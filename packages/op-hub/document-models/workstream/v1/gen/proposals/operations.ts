/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { type SignalDispatch } from "document-model";
import type { WorkstreamGlobalState } from "../types.js";
import type {
  AddAlternativeProposalAction,
  EditAlternativeProposalAction,
  EditInitialProposalAction,
  RemoveAlternativeProposalAction,
} from "./actions.js";

export interface WorkstreamProposalsOperations {
  editInitialProposalOperation: (
    state: WorkstreamGlobalState,
    action: EditInitialProposalAction,
    dispatch?: SignalDispatch,
  ) => void;
  addAlternativeProposalOperation: (
    state: WorkstreamGlobalState,
    action: AddAlternativeProposalAction,
    dispatch?: SignalDispatch,
  ) => void;
  editAlternativeProposalOperation: (
    state: WorkstreamGlobalState,
    action: EditAlternativeProposalAction,
    dispatch?: SignalDispatch,
  ) => void;
  removeAlternativeProposalOperation: (
    state: WorkstreamGlobalState,
    action: RemoveAlternativeProposalAction,
    dispatch?: SignalDispatch,
  ) => void;
}
