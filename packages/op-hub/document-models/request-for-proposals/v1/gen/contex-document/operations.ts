/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { type SignalDispatch } from "document-model";
import type { RequestForProposalsGlobalState } from "../types.js";
import type {
  AddContextDocumentAction,
  RemoveContextDocumentAction,
} from "./actions.js";

export interface RequestForProposalsContexDocumentOperations {
  addContextDocumentOperation: (
    state: RequestForProposalsGlobalState,
    action: AddContextDocumentAction,
    dispatch?: SignalDispatch,
  ) => void;
  removeContextDocumentOperation: (
    state: RequestForProposalsGlobalState,
    action: RemoveContextDocumentAction,
    dispatch?: SignalDispatch,
  ) => void;
}
