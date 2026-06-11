/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import type { Reducer, StateReducer } from "document-model";
import { createReducer, isDocumentAction } from "document-model";
import type { PaymentAccountPHState } from "document-models/payment-account/v1";

import { paymentAccountStripeOperations } from "../src/reducers/stripe.js";

import {
  ConnectStripeAccountInputSchema,
  SetOperatorInputSchema,
  SyncStripeAccountStatusInputSchema,
} from "./schema/zod.js";

const stateReducer: StateReducer<PaymentAccountPHState> = (
  state,
  action,
  dispatch,
) => {
  if (isDocumentAction(action)) {
    return state;
  }
  switch (action.type) {
    case "SET_OPERATOR": {
      SetOperatorInputSchema().parse(action.input);

      paymentAccountStripeOperations.setOperatorOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "CONNECT_STRIPE_ACCOUNT": {
      ConnectStripeAccountInputSchema().parse(action.input);

      paymentAccountStripeOperations.connectStripeAccountOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "SYNC_STRIPE_ACCOUNT_STATUS": {
      SyncStripeAccountStatusInputSchema().parse(action.input);

      paymentAccountStripeOperations.syncStripeAccountStatusOperation(
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

export const reducer: Reducer<PaymentAccountPHState> =
  createReducer(stateReducer);
