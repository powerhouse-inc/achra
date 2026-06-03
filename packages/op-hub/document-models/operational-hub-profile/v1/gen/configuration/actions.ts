/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import type { Action } from "document-model";
import type {
  AddSubteamInput,
  RemoveSubteamInput,
  SetOperationalHubNameInput,
  SetOperatorTeamInput,
} from "../types.js";

export type SetOperationalHubNameAction = Action & {
  type: "SET_OPERATIONAL_HUB_NAME";
  input: SetOperationalHubNameInput;
};
export type SetOperatorTeamAction = Action & {
  type: "SET_OPERATOR_TEAM";
  input: SetOperatorTeamInput;
};
export type AddSubteamAction = Action & {
  type: "ADD_SUBTEAM";
  input: AddSubteamInput;
};
export type RemoveSubteamAction = Action & {
  type: "REMOVE_SUBTEAM";
  input: RemoveSubteamInput;
};

export type OperationalHubProfileConfigurationAction =
  | SetOperationalHubNameAction
  | SetOperatorTeamAction
  | AddSubteamAction
  | RemoveSubteamAction;
