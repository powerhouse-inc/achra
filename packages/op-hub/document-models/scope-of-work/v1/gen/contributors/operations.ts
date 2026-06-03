/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { type SignalDispatch } from "document-model";
import type { ScopeOfWorkGlobalState } from "../types.js";
import type {
  AddAgentAction,
  EditAgentAction,
  RemoveAgentAction,
} from "./actions.js";

export interface ScopeOfWorkContributorsOperations {
  addAgentOperation: (
    state: ScopeOfWorkGlobalState,
    action: AddAgentAction,
    dispatch?: SignalDispatch,
  ) => void;
  removeAgentOperation: (
    state: ScopeOfWorkGlobalState,
    action: RemoveAgentAction,
    dispatch?: SignalDispatch,
  ) => void;
  editAgentOperation: (
    state: ScopeOfWorkGlobalState,
    action: EditAgentAction,
    dispatch?: SignalDispatch,
  ) => void;
}
