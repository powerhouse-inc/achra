/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import type { Reducer, StateReducer } from "document-model";
import { createReducer, isDocumentAction } from "document-model";
import type { BillingStatementPHState } from "document-models/billing-statement/v1";

import { billingStatementGeneralOperations } from "../src/reducers/general.js";
import { billingStatementLineItemsOperations } from "../src/reducers/line-items.js";
import { billingStatementTagsOperations } from "../src/reducers/tags.js";

import {
  AddLineItemInputSchema,
  DeleteLineItemInputSchema,
  EditBillingStatementInputSchema,
  EditContributorInputSchema,
  EditLineItemInputSchema,
  EditLineItemTagInputSchema,
  EditStatusInputSchema,
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

const stateReducer: StateReducer<BillingStatementPHState> = (
  state,
  action,
  dispatch,
) => {
  if (isDocumentAction(action)) {
    return state;
  }
  switch (action.type) {
    case "EDIT_BILLING_STATEMENT": {
      memoizedSchema(EditBillingStatementInputSchema).parse(action.input);

      billingStatementGeneralOperations.editBillingStatementOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "EDIT_CONTRIBUTOR": {
      memoizedSchema(EditContributorInputSchema).parse(action.input);

      billingStatementGeneralOperations.editContributorOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "EDIT_STATUS": {
      memoizedSchema(EditStatusInputSchema).parse(action.input);

      billingStatementGeneralOperations.editStatusOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "ADD_LINE_ITEM": {
      memoizedSchema(AddLineItemInputSchema).parse(action.input);

      billingStatementLineItemsOperations.addLineItemOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "EDIT_LINE_ITEM": {
      memoizedSchema(EditLineItemInputSchema).parse(action.input);

      billingStatementLineItemsOperations.editLineItemOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "DELETE_LINE_ITEM": {
      memoizedSchema(DeleteLineItemInputSchema).parse(action.input);

      billingStatementLineItemsOperations.deleteLineItemOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "EDIT_LINE_ITEM_TAG": {
      memoizedSchema(EditLineItemTagInputSchema).parse(action.input);

      billingStatementTagsOperations.editLineItemTagOperation(
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

export const reducer: Reducer<BillingStatementPHState> =
  createReducer(stateReducer);
