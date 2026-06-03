/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { createAction } from "document-model";
import {
  AddSubteamInputSchema,
  RemoveSubteamInputSchema,
  SetOperationalHubNameInputSchema,
  SetOperatorTeamInputSchema,
} from "../schema/zod.js";
import type {
  AddSubteamInput,
  RemoveSubteamInput,
  SetOperationalHubNameInput,
  SetOperatorTeamInput,
} from "../types.js";
import type {
  AddSubteamAction,
  RemoveSubteamAction,
  SetOperationalHubNameAction,
  SetOperatorTeamAction,
} from "./actions.js";

export const setOperationalHubName = (input: SetOperationalHubNameInput) =>
  createAction<SetOperationalHubNameAction>(
    "SET_OPERATIONAL_HUB_NAME",
    { ...input },
    undefined,
    SetOperationalHubNameInputSchema,
    "global",
  );

export const setOperatorTeam = (input: SetOperatorTeamInput) =>
  createAction<SetOperatorTeamAction>(
    "SET_OPERATOR_TEAM",
    { ...input },
    undefined,
    SetOperatorTeamInputSchema,
    "global",
  );

export const addSubteam = (input: AddSubteamInput) =>
  createAction<AddSubteamAction>(
    "ADD_SUBTEAM",
    { ...input },
    undefined,
    AddSubteamInputSchema,
    "global",
  );

export const removeSubteam = (input: RemoveSubteamInput) =>
  createAction<RemoveSubteamAction>(
    "REMOVE_SUBTEAM",
    { ...input },
    undefined,
    RemoveSubteamInputSchema,
    "global",
  );
