/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import type { Reducer, StateReducer } from "document-model";
import { createReducer, isDocumentAction } from "document-model";
import type { SnapshotReportPHState } from "document-models/snapshot-report/v1";

import { snapshotReportAccountsOperations } from "../src/reducers/accounts.js";
import { snapshotReportBalancesOperations } from "../src/reducers/balances.js";
import { snapshotReportConfigurationOperations } from "../src/reducers/configuration.js";
import { snapshotReportTransactionsOperations } from "../src/reducers/transactions.js";

import {
  AddOwnerIdInputSchema,
  AddSnapshotAccountInputSchema,
  AddTransactionInputSchema,
  RecalculateFlowTypesInputSchema,
  RemoveEndingBalanceInputSchema,
  RemoveOwnerIdInputSchema,
  RemoveSnapshotAccountInputSchema,
  RemoveStartingBalanceInputSchema,
  RemoveTransactionInputSchema,
  SetAccountsDocumentInputSchema,
  SetEndingBalanceInputSchema,
  SetPeriodEndInputSchema,
  SetPeriodInputSchema,
  SetPeriodStartInputSchema,
  SetReportConfigInputSchema,
  SetStartingBalanceInputSchema,
  UpdateSnapshotAccountTypeInputSchema,
  UpdateTransactionFlowTypeInputSchema,
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

const stateReducer: StateReducer<SnapshotReportPHState> = (
  state,
  action,
  dispatch,
) => {
  if (isDocumentAction(action)) {
    return state;
  }
  switch (action.type) {
    case "SET_REPORT_CONFIG": {
      memoizedSchema(SetReportConfigInputSchema).parse(action.input);

      snapshotReportConfigurationOperations.setReportConfigOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "SET_ACCOUNTS_DOCUMENT": {
      memoizedSchema(SetAccountsDocumentInputSchema).parse(action.input);

      snapshotReportConfigurationOperations.setAccountsDocumentOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "SET_PERIOD": {
      memoizedSchema(SetPeriodInputSchema).parse(action.input);

      snapshotReportConfigurationOperations.setPeriodOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "ADD_OWNER_ID": {
      memoizedSchema(AddOwnerIdInputSchema).parse(action.input);

      snapshotReportConfigurationOperations.addOwnerIdOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "SET_PERIOD_START": {
      memoizedSchema(SetPeriodStartInputSchema).parse(action.input);

      snapshotReportConfigurationOperations.setPeriodStartOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "SET_PERIOD_END": {
      memoizedSchema(SetPeriodEndInputSchema).parse(action.input);

      snapshotReportConfigurationOperations.setPeriodEndOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "REMOVE_OWNER_ID": {
      memoizedSchema(RemoveOwnerIdInputSchema).parse(action.input);

      snapshotReportConfigurationOperations.removeOwnerIdOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "ADD_SNAPSHOT_ACCOUNT": {
      memoizedSchema(AddSnapshotAccountInputSchema).parse(action.input);

      snapshotReportAccountsOperations.addSnapshotAccountOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "UPDATE_SNAPSHOT_ACCOUNT_TYPE": {
      memoizedSchema(UpdateSnapshotAccountTypeInputSchema).parse(action.input);

      snapshotReportAccountsOperations.updateSnapshotAccountTypeOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "REMOVE_SNAPSHOT_ACCOUNT": {
      memoizedSchema(RemoveSnapshotAccountInputSchema).parse(action.input);

      snapshotReportAccountsOperations.removeSnapshotAccountOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "SET_STARTING_BALANCE": {
      memoizedSchema(SetStartingBalanceInputSchema).parse(action.input);

      snapshotReportBalancesOperations.setStartingBalanceOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "SET_ENDING_BALANCE": {
      memoizedSchema(SetEndingBalanceInputSchema).parse(action.input);

      snapshotReportBalancesOperations.setEndingBalanceOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "REMOVE_STARTING_BALANCE": {
      memoizedSchema(RemoveStartingBalanceInputSchema).parse(action.input);

      snapshotReportBalancesOperations.removeStartingBalanceOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "REMOVE_ENDING_BALANCE": {
      memoizedSchema(RemoveEndingBalanceInputSchema).parse(action.input);

      snapshotReportBalancesOperations.removeEndingBalanceOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "ADD_TRANSACTION": {
      memoizedSchema(AddTransactionInputSchema).parse(action.input);

      snapshotReportTransactionsOperations.addTransactionOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "REMOVE_TRANSACTION": {
      memoizedSchema(RemoveTransactionInputSchema).parse(action.input);

      snapshotReportTransactionsOperations.removeTransactionOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "UPDATE_TRANSACTION_FLOW_TYPE": {
      memoizedSchema(UpdateTransactionFlowTypeInputSchema).parse(action.input);

      snapshotReportTransactionsOperations.updateTransactionFlowTypeOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "RECALCULATE_FLOW_TYPES": {
      memoizedSchema(RecalculateFlowTypesInputSchema).parse(action.input);

      snapshotReportTransactionsOperations.recalculateFlowTypesOperation(
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

export const reducer: Reducer<SnapshotReportPHState> =
  createReducer(stateReducer);
