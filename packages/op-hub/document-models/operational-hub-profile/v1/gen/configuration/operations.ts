/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { type SignalDispatch } from "document-model";
import type { OperationalHubProfileGlobalState } from "../types.js";
import type {
  AddSubteamAction,
  RemoveSubteamAction,
  SetOperationalHubNameAction,
  SetOperatorTeamAction,
} from "./actions.js";

export interface OperationalHubProfileConfigurationOperations {
  setOperationalHubNameOperation: (
    state: OperationalHubProfileGlobalState,
    action: SetOperationalHubNameAction,
    dispatch?: SignalDispatch,
  ) => void;
  setOperatorTeamOperation: (
    state: OperationalHubProfileGlobalState,
    action: SetOperatorTeamAction,
    dispatch?: SignalDispatch,
  ) => void;
  addSubteamOperation: (
    state: OperationalHubProfileGlobalState,
    action: AddSubteamAction,
    dispatch?: SignalDispatch,
  ) => void;
  removeSubteamOperation: (
    state: OperationalHubProfileGlobalState,
    action: RemoveSubteamAction,
    dispatch?: SignalDispatch,
  ) => void;
}
