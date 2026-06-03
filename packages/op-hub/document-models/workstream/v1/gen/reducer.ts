/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import type { Reducer, StateReducer } from "document-model";
import { createReducer, isDocumentAction } from "document-model";
import type { WorkstreamPHState } from "document-models/workstream/v1";

import { workstreamProposalsOperations } from "../src/reducers/proposals.js";
import { workstreamWorkstreamOperations } from "../src/reducers/workstream.js";

import {
  AddAlternativeProposalInputSchema,
  AddPaymentRequestInputSchema,
  EditAlternativeProposalInputSchema,
  EditClientInfoInputSchema,
  EditInitialProposalInputSchema,
  EditWorkstreamInputSchema,
  RemoveAlternativeProposalInputSchema,
  RemovePaymentRequestInputSchema,
  SetRequestForProposalInputSchema,
} from "./schema/zod.js";

const stateReducer: StateReducer<WorkstreamPHState> = (
  state,
  action,
  dispatch,
) => {
  if (isDocumentAction(action)) {
    return state;
  }
  switch (action.type) {
    case "EDIT_WORKSTREAM": {
      EditWorkstreamInputSchema().parse(action.input);

      workstreamWorkstreamOperations.editWorkstreamOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "EDIT_CLIENT_INFO": {
      EditClientInfoInputSchema().parse(action.input);

      workstreamWorkstreamOperations.editClientInfoOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "SET_REQUEST_FOR_PROPOSAL": {
      SetRequestForProposalInputSchema().parse(action.input);

      workstreamWorkstreamOperations.setRequestForProposalOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "ADD_PAYMENT_REQUEST": {
      AddPaymentRequestInputSchema().parse(action.input);

      workstreamWorkstreamOperations.addPaymentRequestOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "REMOVE_PAYMENT_REQUEST": {
      RemovePaymentRequestInputSchema().parse(action.input);

      workstreamWorkstreamOperations.removePaymentRequestOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "EDIT_INITIAL_PROPOSAL": {
      EditInitialProposalInputSchema().parse(action.input);

      workstreamProposalsOperations.editInitialProposalOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "ADD_ALTERNATIVE_PROPOSAL": {
      AddAlternativeProposalInputSchema().parse(action.input);

      workstreamProposalsOperations.addAlternativeProposalOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "EDIT_ALTERNATIVE_PROPOSAL": {
      EditAlternativeProposalInputSchema().parse(action.input);

      workstreamProposalsOperations.editAlternativeProposalOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "REMOVE_ALTERNATIVE_PROPOSAL": {
      RemoveAlternativeProposalInputSchema().parse(action.input);

      workstreamProposalsOperations.removeAlternativeProposalOperation(
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

export const reducer: Reducer<WorkstreamPHState> = createReducer(stateReducer);
