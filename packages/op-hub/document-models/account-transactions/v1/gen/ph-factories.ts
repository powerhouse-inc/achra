/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 * Factory methods for creating AccountTransactionsDocument instances
 */
import type { PHAuthState, PHBaseState, PHDocumentState } from "document-model";
import { createBaseState, defaultBaseState } from "document-model";
import type {
  AccountTransactionsDocument,
  AccountTransactionsGlobalState,
  AccountTransactionsLocalState,
  AccountTransactionsPHState,
} from "./types.js";
import { utils } from "./utils.js";

export function defaultGlobalState(): AccountTransactionsGlobalState {
  return {
    account: {
      id: "",
      account: "",
      name: "",
      budgetPath: null,
      accountTransactionsId: null,
      chain: null,
      type: null,
      owners: null,
      KycAmlStatus: null,
    },
    transactions: [],
    budgets: [],
  };
}

export function defaultLocalState(): AccountTransactionsLocalState {
  return {};
}

export function defaultPHState(): AccountTransactionsPHState {
  return {
    ...defaultBaseState(),
    global: defaultGlobalState(),
    local: defaultLocalState(),
  };
}

export function createGlobalState(
  state?: Partial<AccountTransactionsGlobalState>,
): AccountTransactionsGlobalState {
  return {
    ...defaultGlobalState(),
    ...(state || {}),
  };
}

export function createLocalState(
  state?: Partial<AccountTransactionsLocalState>,
): AccountTransactionsLocalState {
  return {
    ...defaultLocalState(),
    ...(state || {}),
  } as AccountTransactionsLocalState;
}

export function createState(
  baseState?: Partial<PHBaseState>,
  globalState?: Partial<AccountTransactionsGlobalState>,
  localState?: Partial<AccountTransactionsLocalState>,
): AccountTransactionsPHState {
  return {
    ...createBaseState(baseState?.auth, baseState?.document),
    global: createGlobalState(globalState),
    local: createLocalState(localState),
  };
}

/**
 * Creates a AccountTransactionsDocument with custom global and local state
 * This properly handles the PHBaseState requirements while allowing
 * document-specific state to be set.
 */
export function createAccountTransactionsDocument(
  state?: Partial<{
    auth?: Partial<PHAuthState>;
    document?: Partial<PHDocumentState>;
    global?: Partial<AccountTransactionsGlobalState>;
    local?: Partial<AccountTransactionsLocalState>;
  }>,
): AccountTransactionsDocument {
  const document = utils.createDocument(
    state
      ? createState(
          createBaseState(state.auth, state.document),
          state.global,
          state.local,
        )
      : undefined,
  );

  return document;
}
