/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { type SignalDispatch } from "document-model";
import type { ScopeOfWorkGlobalState } from "../types.js";
import type {
  AddDeliverableInSetAction,
  EditDeliverablesSetAction,
  RemoveDeliverableInSetAction,
} from "./actions.js";

export interface ScopeOfWorkDeliverablesSetOperations {
  editDeliverablesSetOperation: (
    state: ScopeOfWorkGlobalState,
    action: EditDeliverablesSetAction,
    dispatch?: SignalDispatch,
  ) => void;
  addDeliverableInSetOperation: (
    state: ScopeOfWorkGlobalState,
    action: AddDeliverableInSetAction,
    dispatch?: SignalDispatch,
  ) => void;
  removeDeliverableInSetOperation: (
    state: ScopeOfWorkGlobalState,
    action: RemoveDeliverableInSetAction,
    dispatch?: SignalDispatch,
  ) => void;
}
