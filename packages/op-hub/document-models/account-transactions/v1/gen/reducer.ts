/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import type { Reducer, StateReducer } from "document-model";
import { createReducer, isDocumentAction } from "document-model";
import type { AccountTransactionsPHState } from "document-models/account-transactions/v1";

import { accountTransactionsAccountOperations } from "../src/reducers/account.js";
import { accountTransactionsBudgetsOperations } from "../src/reducers/budgets.js";
import { accountTransactionsTransactionsOperations } from "../src/reducers/transactions.js";

import {
  AddBudgetInputSchema,
  AddTransactionInputSchema,
  DeleteBudgetInputSchema,
  DeleteTransactionInputSchema,
  SetAccountInputSchema,
  UpdateBudgetInputSchema,
  UpdateTransactionInputSchema,
  UpdateTransactionPeriodInputSchema,
} from "./schema/zod.js";

const stateReducer: StateReducer<AccountTransactionsPHState> = (
  state,
  action,
  dispatch,
) => {
  if (isDocumentAction(action)) {
    return state;
  }
  switch (action.type) {
    case "SET_ACCOUNT": {
      SetAccountInputSchema().parse(action.input);

      accountTransactionsAccountOperations.setAccountOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "ADD_TRANSACTION": {
      AddTransactionInputSchema().parse(action.input);

      accountTransactionsTransactionsOperations.addTransactionOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "UPDATE_TRANSACTION": {
      UpdateTransactionInputSchema().parse(action.input);

      accountTransactionsTransactionsOperations.updateTransactionOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "DELETE_TRANSACTION": {
      DeleteTransactionInputSchema().parse(action.input);

      accountTransactionsTransactionsOperations.deleteTransactionOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "UPDATE_TRANSACTION_PERIOD": {
      UpdateTransactionPeriodInputSchema().parse(action.input);

      accountTransactionsTransactionsOperations.updateTransactionPeriodOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "ADD_BUDGET": {
      AddBudgetInputSchema().parse(action.input);

      accountTransactionsBudgetsOperations.addBudgetOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "UPDATE_BUDGET": {
      UpdateBudgetInputSchema().parse(action.input);

      accountTransactionsBudgetsOperations.updateBudgetOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "DELETE_BUDGET": {
      DeleteBudgetInputSchema().parse(action.input);

      accountTransactionsBudgetsOperations.deleteBudgetOperation(
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

export const reducer: Reducer<AccountTransactionsPHState> =
  createReducer(stateReducer);
