/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import type { Reducer, StateReducer } from "document-model";
import { createReducer, isDocumentAction } from "document-model";
import type { SubscriptionInvoicePHState } from "document-models/subscription-invoice/v1";

import { subscriptionInvoiceInvoiceOperations } from "../src/reducers/invoice.js";

import {
  InitializeSubscriptionInvoiceInputSchema,
  MarkSubscriptionInvoiceIssuedInputSchema,
  MarkSubscriptionInvoicePaidInputSchema,
  SetSubscriptionInvoiceNotesInputSchema,
  SetSubscriptionInvoiceStripeIdInputSchema,
  VoidSubscriptionInvoiceInputSchema,
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

const stateReducer: StateReducer<SubscriptionInvoicePHState> = (
  state,
  action,
  dispatch,
) => {
  if (isDocumentAction(action)) {
    return state;
  }
  switch (action.type) {
    case "INITIALIZE_SUBSCRIPTION_INVOICE": {
      memoizedSchema(InitializeSubscriptionInvoiceInputSchema).parse(
        action.input,
      );

      subscriptionInvoiceInvoiceOperations.initializeSubscriptionInvoiceOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "MARK_SUBSCRIPTION_INVOICE_ISSUED": {
      memoizedSchema(MarkSubscriptionInvoiceIssuedInputSchema).parse(
        action.input,
      );

      subscriptionInvoiceInvoiceOperations.markSubscriptionInvoiceIssuedOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "MARK_SUBSCRIPTION_INVOICE_PAID": {
      memoizedSchema(MarkSubscriptionInvoicePaidInputSchema).parse(
        action.input,
      );

      subscriptionInvoiceInvoiceOperations.markSubscriptionInvoicePaidOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "VOID_SUBSCRIPTION_INVOICE": {
      memoizedSchema(VoidSubscriptionInvoiceInputSchema).parse(action.input);

      subscriptionInvoiceInvoiceOperations.voidSubscriptionInvoiceOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "SET_SUBSCRIPTION_INVOICE_STRIPE_ID": {
      memoizedSchema(SetSubscriptionInvoiceStripeIdInputSchema).parse(
        action.input,
      );

      subscriptionInvoiceInvoiceOperations.setSubscriptionInvoiceStripeIdOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "SET_SUBSCRIPTION_INVOICE_NOTES": {
      memoizedSchema(SetSubscriptionInvoiceNotesInputSchema).parse(
        action.input,
      );

      subscriptionInvoiceInvoiceOperations.setSubscriptionInvoiceNotesOperation(
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

export const reducer: Reducer<SubscriptionInvoicePHState> =
  createReducer(stateReducer);
