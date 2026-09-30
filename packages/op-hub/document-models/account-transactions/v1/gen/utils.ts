/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import type { DocumentModelUtils, PHBaseState, Reducer } from "document-model";
import {
  baseCreateDocument,
  baseLoadFromInputVersioned,
  baseSaveToFileHandle,
  createBaseState,
} from "document-model";
import { accountTransactionsUpgradeManifest } from "../../upgrades/upgrade-manifest.js";
import {
  assertIsAccountTransactionsDocument,
  assertIsAccountTransactionsState,
  isAccountTransactionsDocument,
  isAccountTransactionsState,
} from "./document-schema.js";
import { accountTransactionsDocumentType } from "./document-type.js";
import { reducer } from "./reducer.js";
import type {
  AccountTransactionsGlobalState,
  AccountTransactionsLocalState,
  AccountTransactionsPHState,
} from "./types.js";

export const initialGlobalState: AccountTransactionsGlobalState = {
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
export const initialLocalState: AccountTransactionsLocalState = {};

export const utils: DocumentModelUtils<AccountTransactionsPHState> = {
  fileExtension: "",
  createState(state) {
    return {
      ...createBaseState(state?.auth, { version: 1, ...state?.document }),
      global: { ...initialGlobalState, ...state?.global },
      local: { ...initialLocalState, ...state?.local },
    };
  },
  createDocument(state) {
    return baseCreateDocument(
      utils.createState,
      state,
      accountTransactionsDocumentType,
    );
  },
  saveToFileHandle(document, input) {
    return baseSaveToFileHandle(document, input);
  },
  loadFromInput(input) {
    return baseLoadFromInputVersioned(input, {
      reducers: { 1: reducer as unknown as Reducer<PHBaseState> },
      upgradeManifest: accountTransactionsUpgradeManifest,
    });
  },
  isStateOfType(state) {
    return isAccountTransactionsState(state);
  },
  assertIsStateOfType(state) {
    return assertIsAccountTransactionsState(state);
  },
  isDocumentOfType(document) {
    return isAccountTransactionsDocument(document);
  },
  assertIsDocumentOfType(document) {
    return assertIsAccountTransactionsDocument(document);
  },
};
