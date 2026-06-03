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
      ...defaultBaseState(),
      global: { ...initialGlobalState, ...state?.global },
      local: { ...initialLocalState, ...state?.local },
    };
  },
  createDocument(state) {
    const document = baseCreateDocument(utils.createState, state);

    document.header.documentType = accountTransactionsDocumentType;

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
