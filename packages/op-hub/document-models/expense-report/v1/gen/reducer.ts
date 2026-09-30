/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import type { Reducer, StateReducer } from "document-model";
import { createReducer, isDocumentAction } from "document-model";
import type { ExpenseReportPHState } from "document-models/expense-report/v1";

import { expenseReportWalletOperations } from "../src/reducers/wallet.js";

import {
  AddBillingStatementInputSchema,
  AddLineItemGroupInputSchema,
  AddLineItemInputSchema,
  AddWalletInputSchema,
  RemoveBillingStatementInputSchema,
  RemoveGroupTotalsInputSchema,
  RemoveLineItemGroupInputSchema,
  RemoveLineItemInputSchema,
  RemoveWalletInputSchema,
  SetGroupTotalsInputSchema,
  SetOwnerIdInputSchema,
  SetPeriodEndInputSchema,
  SetPeriodInputSchema,
  SetPeriodStartInputSchema,
  SetStatusInputSchema,
  UpdateLineItemGroupInputSchema,
  UpdateLineItemInputSchema,
  UpdateWalletInputSchema,
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

const stateReducer: StateReducer<ExpenseReportPHState> = (
  state,
  action,
  dispatch,
) => {
  if (isDocumentAction(action)) {
    return state;
  }
  switch (action.type) {
    case "ADD_WALLET": {
      memoizedSchema(AddWalletInputSchema).parse(action.input);

      expenseReportWalletOperations.addWalletOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "REMOVE_WALLET": {
      memoizedSchema(RemoveWalletInputSchema).parse(action.input);

      expenseReportWalletOperations.removeWalletOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "ADD_BILLING_STATEMENT": {
      memoizedSchema(AddBillingStatementInputSchema).parse(action.input);

      expenseReportWalletOperations.addBillingStatementOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "REMOVE_BILLING_STATEMENT": {
      memoizedSchema(RemoveBillingStatementInputSchema).parse(action.input);

      expenseReportWalletOperations.removeBillingStatementOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "ADD_LINE_ITEM": {
      memoizedSchema(AddLineItemInputSchema).parse(action.input);

      expenseReportWalletOperations.addLineItemOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "UPDATE_LINE_ITEM": {
      memoizedSchema(UpdateLineItemInputSchema).parse(action.input);

      expenseReportWalletOperations.updateLineItemOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "REMOVE_LINE_ITEM": {
      memoizedSchema(RemoveLineItemInputSchema).parse(action.input);

      expenseReportWalletOperations.removeLineItemOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "ADD_LINE_ITEM_GROUP": {
      memoizedSchema(AddLineItemGroupInputSchema).parse(action.input);

      expenseReportWalletOperations.addLineItemGroupOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "UPDATE_LINE_ITEM_GROUP": {
      memoizedSchema(UpdateLineItemGroupInputSchema).parse(action.input);

      expenseReportWalletOperations.updateLineItemGroupOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "REMOVE_LINE_ITEM_GROUP": {
      memoizedSchema(RemoveLineItemGroupInputSchema).parse(action.input);

      expenseReportWalletOperations.removeLineItemGroupOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "SET_GROUP_TOTALS": {
      memoizedSchema(SetGroupTotalsInputSchema).parse(action.input);

      expenseReportWalletOperations.setGroupTotalsOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "REMOVE_GROUP_TOTALS": {
      memoizedSchema(RemoveGroupTotalsInputSchema).parse(action.input);

      expenseReportWalletOperations.removeGroupTotalsOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "SET_PERIOD_START": {
      memoizedSchema(SetPeriodStartInputSchema).parse(action.input);

      expenseReportWalletOperations.setPeriodStartOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "SET_PERIOD_END": {
      memoizedSchema(SetPeriodEndInputSchema).parse(action.input);

      expenseReportWalletOperations.setPeriodEndOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "UPDATE_WALLET": {
      memoizedSchema(UpdateWalletInputSchema).parse(action.input);

      expenseReportWalletOperations.updateWalletOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "SET_OWNER_ID": {
      memoizedSchema(SetOwnerIdInputSchema).parse(action.input);

      expenseReportWalletOperations.setOwnerIdOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "SET_STATUS": {
      memoizedSchema(SetStatusInputSchema).parse(action.input);

      expenseReportWalletOperations.setStatusOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "SET_PERIOD": {
      memoizedSchema(SetPeriodInputSchema).parse(action.input);

      expenseReportWalletOperations.setPeriodOperation(
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

export const reducer: Reducer<ExpenseReportPHState> =
  createReducer(stateReducer);
