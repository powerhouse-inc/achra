/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import type { Reducer, StateReducer } from "document-model";
import { createReducer, isDocumentAction } from "document-model";
import type { BuilderProfilePHState } from "document-models/builder-profile/v1";

import { builderProfileBuildersOperations } from "../src/reducers/builders.js";

import {
  AddContributorInputSchema,
  AddLinkInputSchema,
  AddScopeInputSchema,
  AddSkillInputSchema,
  EditLinkInputSchema,
  RemoveContributorInputSchema,
  RemoveLinkInputSchema,
  RemoveScopeInputSchema,
  RemoveSkillInputSchema,
  SetOperatorInputSchema,
  SetOpHubMemberInputSchema,
  SetWalletAddressInputSchema,
  UpdateProfileInputSchema,
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

const stateReducer: StateReducer<BuilderProfilePHState> = (
  state,
  action,
  dispatch,
) => {
  if (isDocumentAction(action)) {
    return state;
  }
  switch (action.type) {
    case "UPDATE_PROFILE": {
      memoizedSchema(UpdateProfileInputSchema).parse(action.input);

      builderProfileBuildersOperations.updateProfileOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "ADD_SKILL": {
      memoizedSchema(AddSkillInputSchema).parse(action.input);

      builderProfileBuildersOperations.addSkillOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "REMOVE_SKILL": {
      memoizedSchema(RemoveSkillInputSchema).parse(action.input);

      builderProfileBuildersOperations.removeSkillOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "ADD_SCOPE": {
      memoizedSchema(AddScopeInputSchema).parse(action.input);

      builderProfileBuildersOperations.addScopeOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "REMOVE_SCOPE": {
      memoizedSchema(RemoveScopeInputSchema).parse(action.input);

      builderProfileBuildersOperations.removeScopeOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "ADD_LINK": {
      memoizedSchema(AddLinkInputSchema).parse(action.input);

      builderProfileBuildersOperations.addLinkOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "EDIT_LINK": {
      memoizedSchema(EditLinkInputSchema).parse(action.input);

      builderProfileBuildersOperations.editLinkOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "REMOVE_LINK": {
      memoizedSchema(RemoveLinkInputSchema).parse(action.input);

      builderProfileBuildersOperations.removeLinkOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "ADD_CONTRIBUTOR": {
      memoizedSchema(AddContributorInputSchema).parse(action.input);

      builderProfileBuildersOperations.addContributorOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "REMOVE_CONTRIBUTOR": {
      memoizedSchema(RemoveContributorInputSchema).parse(action.input);

      builderProfileBuildersOperations.removeContributorOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "SET_OPERATOR": {
      memoizedSchema(SetOperatorInputSchema).parse(action.input);

      builderProfileBuildersOperations.setOperatorOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "SET_OP_HUB_MEMBER": {
      memoizedSchema(SetOpHubMemberInputSchema).parse(action.input);

      builderProfileBuildersOperations.setOpHubMemberOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "SET_WALLET_ADDRESS": {
      memoizedSchema(SetWalletAddressInputSchema).parse(action.input);

      builderProfileBuildersOperations.setWalletAddressOperation(
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

export const reducer: Reducer<BuilderProfilePHState> =
  createReducer(stateReducer);
