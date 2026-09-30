/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import type { Reducer, StateReducer } from "document-model";
import { createReducer, isDocumentAction } from "document-model";
import type { OperationalHubProfilePHState } from "document-models/operational-hub-profile/v1";

import { operationalHubProfileConfigurationOperations } from "../src/reducers/configuration.js";

import {
  AddSubteamInputSchema,
  RemoveSubteamInputSchema,
  SetOperationalHubNameInputSchema,
  SetOperatorTeamInputSchema,
} from "./schema/zod.js";

const schemaMemo = new Map<() => unknown, unknown>();

function memoizedSchema<T>(makeSchema: () => T): T {
  let schema = schemaMemo.get(makeSchema) as T | undefined;
  if (schema === undefined) {
    schema = makeSchema();
    schemaMemo.set(makeSchema, schema);
  }
  return schema;
}

const stateReducer: StateReducer<OperationalHubProfilePHState> = (
  state,
  action,
  dispatch,
) => {
  if (isDocumentAction(action)) {
    return state;
  }
  switch (action.type) {
    case "SET_OPERATIONAL_HUB_NAME": {
      memoizedSchema(SetOperationalHubNameInputSchema).parse(action.input);

      operationalHubProfileConfigurationOperations.setOperationalHubNameOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "SET_OPERATOR_TEAM": {
      memoizedSchema(SetOperatorTeamInputSchema).parse(action.input);

      operationalHubProfileConfigurationOperations.setOperatorTeamOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "ADD_SUBTEAM": {
      memoizedSchema(AddSubteamInputSchema).parse(action.input);

      operationalHubProfileConfigurationOperations.addSubteamOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "REMOVE_SUBTEAM": {
      memoizedSchema(RemoveSubteamInputSchema).parse(action.input);

      operationalHubProfileConfigurationOperations.removeSubteamOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    default:
      return state;
  }
};

export const reducer: Reducer<OperationalHubProfilePHState> =
  createReducer(stateReducer);
