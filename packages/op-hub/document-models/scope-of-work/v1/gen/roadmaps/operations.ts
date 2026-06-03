/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { type SignalDispatch } from "document-model";
import type { ScopeOfWorkGlobalState } from "../types.js";
import type {
  AddRoadmapAction,
  EditRoadmapAction,
  RemoveRoadmapAction,
} from "./actions.js";

export interface ScopeOfWorkRoadmapsOperations {
  addRoadmapOperation: (
    state: ScopeOfWorkGlobalState,
    action: AddRoadmapAction,
    dispatch?: SignalDispatch,
  ) => void;
  removeRoadmapOperation: (
    state: ScopeOfWorkGlobalState,
    action: RemoveRoadmapAction,
    dispatch?: SignalDispatch,
  ) => void;
  editRoadmapOperation: (
    state: ScopeOfWorkGlobalState,
    action: EditRoadmapAction,
    dispatch?: SignalDispatch,
  ) => void;
}
