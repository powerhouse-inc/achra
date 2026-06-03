/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { type SignalDispatch } from "document-model";
import type { ScopeOfWorkGlobalState } from "../types.js";
import type {
  AddDeliverableAction,
  AddKeyResultAction,
  EditDeliverableAction,
  EditKeyResultAction,
  RemoveDeliverableAction,
  RemoveKeyResultAction,
  SetDeliverableBudgetAnchorProjectAction,
  SetDeliverableProgressAction,
} from "./actions.js";

export interface ScopeOfWorkDeliverablesOperations {
  addDeliverableOperation: (
    state: ScopeOfWorkGlobalState,
    action: AddDeliverableAction,
    dispatch?: SignalDispatch,
  ) => void;
  removeDeliverableOperation: (
    state: ScopeOfWorkGlobalState,
    action: RemoveDeliverableAction,
    dispatch?: SignalDispatch,
  ) => void;
  editDeliverableOperation: (
    state: ScopeOfWorkGlobalState,
    action: EditDeliverableAction,
    dispatch?: SignalDispatch,
  ) => void;
  setDeliverableProgressOperation: (
    state: ScopeOfWorkGlobalState,
    action: SetDeliverableProgressAction,
    dispatch?: SignalDispatch,
  ) => void;
  addKeyResultOperation: (
    state: ScopeOfWorkGlobalState,
    action: AddKeyResultAction,
    dispatch?: SignalDispatch,
  ) => void;
  removeKeyResultOperation: (
    state: ScopeOfWorkGlobalState,
    action: RemoveKeyResultAction,
    dispatch?: SignalDispatch,
  ) => void;
  editKeyResultOperation: (
    state: ScopeOfWorkGlobalState,
    action: EditKeyResultAction,
    dispatch?: SignalDispatch,
  ) => void;
  setDeliverableBudgetAnchorProjectOperation: (
    state: ScopeOfWorkGlobalState,
    action: SetDeliverableBudgetAnchorProjectAction,
    dispatch?: SignalDispatch,
  ) => void;
}
