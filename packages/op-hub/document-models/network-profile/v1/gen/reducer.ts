/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import type { Reducer, StateReducer } from "document-model";
import { createReducer, isDocumentAction } from "document-model";
import type { NetworkProfilePHState } from "document-models/network-profile/v1";

import { networkProfileNetworkProfileManagementOperations } from "../src/reducers/network-profile-management.js";

import {
  SetCategoryInputSchema,
  SetDescriptionInputSchema,
  SetDiscordInputSchema,
  SetGithubInputSchema,
  SetIconInputSchema,
  SetLogoBigInputSchema,
  SetLogoInputSchema,
  SetProfileNameInputSchema,
  SetWebsiteInputSchema,
  SetXInputSchema,
  SetYoutubeInputSchema,
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

const stateReducer: StateReducer<NetworkProfilePHState> = (
  state,
  action,
  dispatch,
) => {
  if (isDocumentAction(action)) {
    return state;
  }
  switch (action.type) {
    case "SET_ICON": {
      memoizedSchema(SetIconInputSchema).parse(action.input);

      networkProfileNetworkProfileManagementOperations.setIconOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "SET_LOGO": {
      memoizedSchema(SetLogoInputSchema).parse(action.input);

      networkProfileNetworkProfileManagementOperations.setLogoOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "SET_LOGO_BIG": {
      memoizedSchema(SetLogoBigInputSchema).parse(action.input);

      networkProfileNetworkProfileManagementOperations.setLogoBigOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "SET_WEBSITE": {
      memoizedSchema(SetWebsiteInputSchema).parse(action.input);

      networkProfileNetworkProfileManagementOperations.setWebsiteOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "SET_DESCRIPTION": {
      memoizedSchema(SetDescriptionInputSchema).parse(action.input);

      networkProfileNetworkProfileManagementOperations.setDescriptionOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "SET_CATEGORY": {
      memoizedSchema(SetCategoryInputSchema).parse(action.input);

      networkProfileNetworkProfileManagementOperations.setCategoryOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "SET_X": {
      memoizedSchema(SetXInputSchema).parse(action.input);

      networkProfileNetworkProfileManagementOperations.setXOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "SET_GITHUB": {
      memoizedSchema(SetGithubInputSchema).parse(action.input);

      networkProfileNetworkProfileManagementOperations.setGithubOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "SET_DISCORD": {
      memoizedSchema(SetDiscordInputSchema).parse(action.input);

      networkProfileNetworkProfileManagementOperations.setDiscordOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "SET_YOUTUBE": {
      memoizedSchema(SetYoutubeInputSchema).parse(action.input);

      networkProfileNetworkProfileManagementOperations.setYoutubeOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "SET_PROFILE_NAME": {
      memoizedSchema(SetProfileNameInputSchema).parse(action.input);

      networkProfileNetworkProfileManagementOperations.setProfileNameOperation(
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

export const reducer: Reducer<NetworkProfilePHState> =
  createReducer(stateReducer);
