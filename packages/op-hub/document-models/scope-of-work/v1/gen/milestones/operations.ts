/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { type SignalDispatch } from "document-model";
import type { ScopeOfWorkGlobalState } from "../types.js";
import type {
  AddCoordinatorAction,
  AddMilestoneAction,
  AddMilestoneDeliverableAction,
  EditMilestoneAction,
  RemoveCoordinatorAction,
  RemoveMilestoneAction,
  RemoveMilestoneDeliverableAction,
} from "./actions.js";

export interface ScopeOfWorkMilestonesOperations {
  addMilestoneOperation: (
    state: ScopeOfWorkGlobalState,
    action: AddMilestoneAction,
    dispatch?: SignalDispatch,
  ) => void;
  removeMilestoneOperation: (
    state: ScopeOfWorkGlobalState,
    action: RemoveMilestoneAction,
    dispatch?: SignalDispatch,
  ) => void;
  editMilestoneOperation: (
    state: ScopeOfWorkGlobalState,
    action: EditMilestoneAction,
    dispatch?: SignalDispatch,
  ) => void;
  addCoordinatorOperation: (
    state: ScopeOfWorkGlobalState,
    action: AddCoordinatorAction,
    dispatch?: SignalDispatch,
  ) => void;
  removeCoordinatorOperation: (
    state: ScopeOfWorkGlobalState,
    action: RemoveCoordinatorAction,
    dispatch?: SignalDispatch,
  ) => void;
  addMilestoneDeliverableOperation: (
    state: ScopeOfWorkGlobalState,
    action: AddMilestoneDeliverableAction,
    dispatch?: SignalDispatch,
  ) => void;
  removeMilestoneDeliverableOperation: (
    state: ScopeOfWorkGlobalState,
    action: RemoveMilestoneDeliverableAction,
    dispatch?: SignalDispatch,
  ) => void;
}
