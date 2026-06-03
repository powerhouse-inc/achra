/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import type { Action } from "document-model";
import type {
  AddCoordinatorInput,
  AddMilestoneDeliverableInput,
  AddMilestoneInput,
  EditMilestoneInput,
  RemoveCoordinatorInput,
  RemoveMilestoneDeliverableInput,
  RemoveMilestoneInput,
} from "../types.js";

export type AddMilestoneAction = Action & {
  type: "ADD_MILESTONE";
  input: AddMilestoneInput;
};
export type RemoveMilestoneAction = Action & {
  type: "REMOVE_MILESTONE";
  input: RemoveMilestoneInput;
};
export type EditMilestoneAction = Action & {
  type: "EDIT_MILESTONE";
  input: EditMilestoneInput;
};
export type AddCoordinatorAction = Action & {
  type: "ADD_COORDINATOR";
  input: AddCoordinatorInput;
};
export type RemoveCoordinatorAction = Action & {
  type: "REMOVE_COORDINATOR";
  input: RemoveCoordinatorInput;
};
export type AddMilestoneDeliverableAction = Action & {
  type: "ADD_MILESTONE_DELIVERABLE";
  input: AddMilestoneDeliverableInput;
};
export type RemoveMilestoneDeliverableAction = Action & {
  type: "REMOVE_MILESTONE_DELIVERABLE";
  input: RemoveMilestoneDeliverableInput;
};

export type ScopeOfWorkMilestonesAction =
  | AddMilestoneAction
  | RemoveMilestoneAction
  | EditMilestoneAction
  | AddCoordinatorAction
  | RemoveCoordinatorAction
  | AddMilestoneDeliverableAction
  | RemoveMilestoneDeliverableAction;
