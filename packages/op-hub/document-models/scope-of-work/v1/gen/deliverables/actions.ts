/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import type { Action } from "document-model";
import type {
  AddDeliverableInput,
  AddKeyResultInput,
  EditDeliverableInput,
  EditKeyResultInput,
  RemoveDeliverableInput,
  RemoveKeyResultInput,
  SetDeliverableBudgetAnchorProjectInput,
  SetDeliverableProgressInput,
} from "../types.js";

export type AddDeliverableAction = Action & {
  type: "ADD_DELIVERABLE";
  input: AddDeliverableInput;
};
export type RemoveDeliverableAction = Action & {
  type: "REMOVE_DELIVERABLE";
  input: RemoveDeliverableInput;
};
export type EditDeliverableAction = Action & {
  type: "EDIT_DELIVERABLE";
  input: EditDeliverableInput;
};
export type SetDeliverableProgressAction = Action & {
  type: "SET_DELIVERABLE_PROGRESS";
  input: SetDeliverableProgressInput;
};
export type AddKeyResultAction = Action & {
  type: "ADD_KEY_RESULT";
  input: AddKeyResultInput;
};
export type RemoveKeyResultAction = Action & {
  type: "REMOVE_KEY_RESULT";
  input: RemoveKeyResultInput;
};
export type EditKeyResultAction = Action & {
  type: "EDIT_KEY_RESULT";
  input: EditKeyResultInput;
};
export type SetDeliverableBudgetAnchorProjectAction = Action & {
  type: "SET_DELIVERABLE_BUDGET_ANCHOR_PROJECT";
  input: SetDeliverableBudgetAnchorProjectInput;
};

export type ScopeOfWorkDeliverablesAction =
  | AddDeliverableAction
  | RemoveDeliverableAction
  | EditDeliverableAction
  | SetDeliverableProgressAction
  | AddKeyResultAction
  | RemoveKeyResultAction
  | EditKeyResultAction
  | SetDeliverableBudgetAnchorProjectAction;
