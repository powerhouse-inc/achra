/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import type { PHBaseState, PHDocument } from "document-model";
import type { AccountsAction } from "./actions.js";
import type { AccountsState as AccountsGlobalState } from "./schema/types.js";

type AccountsLocalState = Record<PropertyKey, never>;

type AccountsPHState = PHBaseState & {
  global: AccountsGlobalState;
  local: AccountsLocalState;
};
type AccountsDocument = PHDocument<AccountsPHState>;

export * from "./schema/types.js";

export type {
  AccountsAction,
  AccountsDocument,
  AccountsGlobalState,
  AccountsLocalState,
  AccountsPHState,
};
