/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { type SignalDispatch } from "document-model";
import type { ScopeOfWorkGlobalState } from "../types.js";
import type {
  AddProjectAction,
  AddProjectDeliverableAction,
  RemoveProjectAction,
  RemoveProjectDeliverableAction,
  SetProjectMarginAction,
  SetProjectTotalBudgetAction,
  UpdateProjectAction,
  UpdateProjectOwnerAction,
} from "./actions.js";

export interface ScopeOfWorkProjectsOperations {
  addProjectOperation: (
    state: ScopeOfWorkGlobalState,
    action: AddProjectAction,
    dispatch?: SignalDispatch,
  ) => void;
  updateProjectOperation: (
    state: ScopeOfWorkGlobalState,
    action: UpdateProjectAction,
    dispatch?: SignalDispatch,
  ) => void;
  updateProjectOwnerOperation: (
    state: ScopeOfWorkGlobalState,
    action: UpdateProjectOwnerAction,
    dispatch?: SignalDispatch,
  ) => void;
  removeProjectOperation: (
    state: ScopeOfWorkGlobalState,
    action: RemoveProjectAction,
    dispatch?: SignalDispatch,
  ) => void;
  setProjectMarginOperation: (
    state: ScopeOfWorkGlobalState,
    action: SetProjectMarginAction,
    dispatch?: SignalDispatch,
  ) => void;
  setProjectTotalBudgetOperation: (
    state: ScopeOfWorkGlobalState,
    action: SetProjectTotalBudgetAction,
    dispatch?: SignalDispatch,
  ) => void;
  addProjectDeliverableOperation: (
    state: ScopeOfWorkGlobalState,
    action: AddProjectDeliverableAction,
    dispatch?: SignalDispatch,
  ) => void;
  removeProjectDeliverableOperation: (
    state: ScopeOfWorkGlobalState,
    action: RemoveProjectDeliverableAction,
    dispatch?: SignalDispatch,
  ) => void;
}
