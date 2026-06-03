/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import type { Action } from "document-model";
import type {
  AddContextDocumentInput,
  RemoveContextDocumentInput,
} from "../types.js";

export type AddContextDocumentAction = Action & {
  type: "ADD_CONTEXT_DOCUMENT";
  input: AddContextDocumentInput;
};
export type RemoveContextDocumentAction = Action & {
  type: "REMOVE_CONTEXT_DOCUMENT";
  input: RemoveContextDocumentInput;
};

export type RequestForProposalsContexDocumentAction =
  | AddContextDocumentAction
  | RemoveContextDocumentAction;
