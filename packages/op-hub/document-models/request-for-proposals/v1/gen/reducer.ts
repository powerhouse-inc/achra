/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import type { Reducer, StateReducer } from "document-model";
import { createReducer, isDocumentAction } from "document-model";
import type { RequestForProposalsPHState } from "document-models/request-for-proposals/v1";

import { requestForProposalsContexDocumentOperations } from "../src/reducers/contex-document.js";
import { requestForProposalsProposalsOperations } from "../src/reducers/proposals.js";
import { requestForProposalsRfpStateOperations } from "../src/reducers/rfp-state.js";

import {
  AddContextDocumentInputSchema,
  AddProposalInputSchema,
  ChangeProposalStatusInputSchema,
  EditRfpInputSchema,
  RemoveContextDocumentInputSchema,
  RemoveProposalInputSchema,
} from "./schema/zod.js";

const stateReducer: StateReducer<RequestForProposalsPHState> = (
  state,
  action,
  dispatch,
) => {
  if (isDocumentAction(action)) {
    return state;
  }
  switch (action.type) {
    case "EDIT_RFP": {
      EditRfpInputSchema().parse(action.input);

      requestForProposalsRfpStateOperations.editRfpOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "ADD_CONTEXT_DOCUMENT": {
      AddContextDocumentInputSchema().parse(action.input);

      requestForProposalsContexDocumentOperations.addContextDocumentOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "REMOVE_CONTEXT_DOCUMENT": {
      RemoveContextDocumentInputSchema().parse(action.input);

      requestForProposalsContexDocumentOperations.removeContextDocumentOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "ADD_PROPOSAL": {
      AddProposalInputSchema().parse(action.input);

      requestForProposalsProposalsOperations.addProposalOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "CHANGE_PROPOSAL_STATUS": {
      ChangeProposalStatusInputSchema().parse(action.input);

      requestForProposalsProposalsOperations.changeProposalStatusOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "REMOVE_PROPOSAL": {
      RemoveProposalInputSchema().parse(action.input);

      requestForProposalsProposalsOperations.removeProposalOperation(
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

export const reducer: Reducer<RequestForProposalsPHState> =
  createReducer(stateReducer);
