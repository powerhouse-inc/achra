/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { type SignalDispatch } from "document-model";
import type { WorkstreamGlobalState } from "../types.js";
import type {
  AddPaymentRequestAction,
  EditClientInfoAction,
  EditWorkstreamAction,
  RemovePaymentRequestAction,
  SetRequestForProposalAction,
} from "./actions.js";

export interface WorkstreamWorkstreamOperations {
  editWorkstreamOperation: (
    state: WorkstreamGlobalState,
    action: EditWorkstreamAction,
    dispatch?: SignalDispatch,
  ) => void;
  editClientInfoOperation: (
    state: WorkstreamGlobalState,
    action: EditClientInfoAction,
    dispatch?: SignalDispatch,
  ) => void;
  setRequestForProposalOperation: (
    state: WorkstreamGlobalState,
    action: SetRequestForProposalAction,
    dispatch?: SignalDispatch,
  ) => void;
  addPaymentRequestOperation: (
    state: WorkstreamGlobalState,
    action: AddPaymentRequestAction,
    dispatch?: SignalDispatch,
  ) => void;
  removePaymentRequestOperation: (
    state: WorkstreamGlobalState,
    action: RemovePaymentRequestAction,
    dispatch?: SignalDispatch,
  ) => void;
}
