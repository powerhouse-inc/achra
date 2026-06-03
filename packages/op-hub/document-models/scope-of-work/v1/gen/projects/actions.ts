/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import type { Action } from "document-model";
import type {
  AddProjectDeliverableInput,
  AddProjectInput,
  RemoveProjectDeliverableInput,
  RemoveProjectInput,
  SetProjectMarginInput,
  SetProjectTotalBudgetInput,
  UpdateProjectInput,
  UpdateProjectOwnerInput,
} from "../types.js";

export type AddProjectAction = Action & {
  type: "ADD_PROJECT";
  input: AddProjectInput;
};
export type UpdateProjectAction = Action & {
  type: "UPDATE_PROJECT";
  input: UpdateProjectInput;
};
export type UpdateProjectOwnerAction = Action & {
  type: "UPDATE_PROJECT_OWNER";
  input: UpdateProjectOwnerInput;
};
export type RemoveProjectAction = Action & {
  type: "REMOVE_PROJECT";
  input: RemoveProjectInput;
};
export type SetProjectMarginAction = Action & {
  type: "SET_PROJECT_MARGIN";
  input: SetProjectMarginInput;
};
export type SetProjectTotalBudgetAction = Action & {
  type: "SET_PROJECT_TOTAL_BUDGET";
  input: SetProjectTotalBudgetInput;
};
export type AddProjectDeliverableAction = Action & {
  type: "ADD_PROJECT_DELIVERABLE";
  input: AddProjectDeliverableInput;
};
export type RemoveProjectDeliverableAction = Action & {
  type: "REMOVE_PROJECT_DELIVERABLE";
  input: RemoveProjectDeliverableInput;
};

export type ScopeOfWorkProjectsAction =
  | AddProjectAction
  | UpdateProjectAction
  | UpdateProjectOwnerAction
  | RemoveProjectAction
  | SetProjectMarginAction
  | SetProjectTotalBudgetAction
  | AddProjectDeliverableAction
  | RemoveProjectDeliverableAction;
