/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import type { Reducer, StateReducer } from "document-model";
import { createReducer, isDocumentAction } from "document-model";
import type { FacetPHState } from "document-models/facet/v1";

import { facetFacetManagementOperations } from "../src/reducers/facet-management.js";
import { facetOptionManagementOperations } from "../src/reducers/option-management.js";

import {
  AddOptionInputSchema,
  RemoveOptionInputSchema,
  ReorderOptionsInputSchema,
  SetFacetDescriptionInputSchema,
  SetFacetNameInputSchema,
  UpdateOptionInputSchema,
} from "./schema/zod.js";

const stateReducer: StateReducer<FacetPHState> = (state, action, dispatch) => {
  if (isDocumentAction(action)) {
    return state;
  }
  switch (action.type) {
    case "SET_FACET_NAME": {
      SetFacetNameInputSchema().parse(action.input);

      facetFacetManagementOperations.setFacetNameOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "SET_FACET_DESCRIPTION": {
      SetFacetDescriptionInputSchema().parse(action.input);

      facetFacetManagementOperations.setFacetDescriptionOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "ADD_OPTION": {
      AddOptionInputSchema().parse(action.input);

      facetOptionManagementOperations.addOptionOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "UPDATE_OPTION": {
      UpdateOptionInputSchema().parse(action.input);

      facetOptionManagementOperations.updateOptionOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "REMOVE_OPTION": {
      RemoveOptionInputSchema().parse(action.input);

      facetOptionManagementOperations.removeOptionOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "REORDER_OPTIONS": {
      ReorderOptionsInputSchema().parse(action.input);

      facetOptionManagementOperations.reorderOptionsOperation(
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

export const reducer: Reducer<FacetPHState> = createReducer(stateReducer);
