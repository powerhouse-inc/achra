/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import type { PHBaseState, PHDocument } from "document-model";
import type { AccountTransactionsAction } from "./actions.js";
import type { AccountTransactionsState as AccountTransactionsGlobalState } from "./schema/types.js";

type AccountTransactionsLocalState = Record<PropertyKey, never>;

type AccountTransactionsPHState = PHBaseState & {
  global: AccountTransactionsGlobalState;
  local: AccountTransactionsLocalState;
};
type AccountTransactionsDocument = PHDocument<AccountTransactionsPHState>;

export * from "./schema/types.js";

export type {
  AccountTransactionsAction,
  AccountTransactionsDocument,
  AccountTransactionsGlobalState,
  AccountTransactionsLocalState,
  AccountTransactionsPHState,
};
