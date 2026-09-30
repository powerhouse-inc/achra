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
import { accountsUpgradeManifest } from "../../upgrades/upgrade-manifest.js";
import {
  assertIsAccountsDocument,
  assertIsAccountsState,
  isAccountsDocument,
  isAccountsState,
} from "./document-schema.js";
import { accountsDocumentType } from "./document-type.js";
import { reducer } from "./reducer.js";
import type {
  AccountsGlobalState,
  AccountsLocalState,
  AccountsPHState,
} from "./types.js";

export const initialGlobalState: AccountsGlobalState = { accounts: [] };
export const initialLocalState: AccountsLocalState = {};

export const utils: DocumentModelUtils<AccountsPHState> = {
  fileExtension: "",
  createState(state) {
    return {
      ...createBaseState(state?.auth, { version: 1, ...state?.document }),
      global: { ...initialGlobalState, ...state?.global },
      local: { ...initialLocalState, ...state?.local },
    };
  },
  createDocument(state) {
    return baseCreateDocument(utils.createState, state, accountsDocumentType);
  },
  saveToFileHandle(document, input) {
    return baseSaveToFileHandle(document, input);
  },
  loadFromInput(input) {
    return baseLoadFromInputVersioned(input, {
      reducers: { 1: reducer as unknown as Reducer<PHBaseState> },
      upgradeManifest: accountsUpgradeManifest,
    });
  },
  isStateOfType(state) {
    return isAccountsState(state);
  },
  assertIsStateOfType(state) {
    return assertIsAccountsState(state);
  },
  isDocumentOfType(document) {
    return isAccountsDocument(document);
  },
  assertIsDocumentOfType(document) {
    return assertIsAccountsDocument(document);
  },
};
