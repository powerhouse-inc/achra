/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import type { DocumentModelUtils } from "document-model";
import {
  baseCreateDocument,
  baseLoadFromInput,
  baseSaveToFileHandle,
  defaultBaseState,
  generateId,
} from "document-model";
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
      ...defaultBaseState(),
      global: { ...initialGlobalState, ...state?.global },
      local: { ...initialLocalState, ...state?.local },
    };
  },
  createDocument(state) {
    const document = baseCreateDocument(utils.createState, state);

    document.header.documentType = accountsDocumentType;

    // for backwards compatibility, but this is NOT a valid signed document id
    document.header.id = generateId();

    return document;
  },
  saveToFileHandle(document, input) {
    return baseSaveToFileHandle(document, input);
  },
  loadFromInput(input) {
    return baseLoadFromInput(input, reducer);
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
