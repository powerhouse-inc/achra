/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import type { Reducer, StateReducer } from "document-model";
import { createReducer, isDocumentAction } from "document-model";
import type { AccountsPHState } from "document-models/accounts/v1";

import { accountsAccountsOperations } from "../src/reducers/accounts.js";

import {
  AddAccountInputSchema,
  DeleteAccountInputSchema,
  UpdateAccountInputSchema,
  UpdateKycStatusInputSchema,
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

const stateReducer: StateReducer<AccountsPHState> = (
  state,
  action,
  dispatch,
) => {
  if (isDocumentAction(action)) {
    return state;
  }
  switch (action.type) {
    case "ADD_ACCOUNT": {
      memoizedSchema(AddAccountInputSchema).parse(action.input);

      accountsAccountsOperations.addAccountOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "UPDATE_ACCOUNT": {
      memoizedSchema(UpdateAccountInputSchema).parse(action.input);

      accountsAccountsOperations.updateAccountOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "DELETE_ACCOUNT": {
      memoizedSchema(DeleteAccountInputSchema).parse(action.input);

      accountsAccountsOperations.deleteAccountOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "UPDATE_KYC_STATUS": {
      memoizedSchema(UpdateKycStatusInputSchema).parse(action.input);

      accountsAccountsOperations.updateKycStatusOperation(
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

export const reducer: Reducer<AccountsPHState> = createReducer(stateReducer);
