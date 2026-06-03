/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import type { Reducer, StateReducer } from "document-model";
import { createReducer, isDocumentAction } from "document-model";
import type { BuildersPHState } from "document-models/builders/v1";

import { buildersBuildersOperations } from "../src/reducers/builders.js";

import {
  AddBuilderInputSchema,
  RemoveBuilderInputSchema,
} from "./schema/zod.js";

const stateReducer: StateReducer<BuildersPHState> = (
  state,
  action,
  dispatch,
) => {
  if (isDocumentAction(action)) {
    return state;
  }
  switch (action.type) {
    case "ADD_BUILDER": {
      AddBuilderInputSchema().parse(action.input);

      buildersBuildersOperations.addBuilderOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "REMOVE_BUILDER": {
      RemoveBuilderInputSchema().parse(action.input);

      buildersBuildersOperations.removeBuilderOperation(
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

export const reducer: Reducer<BuildersPHState> = createReducer(stateReducer);
