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
  assertIsNetworkProfileDocument,
  assertIsNetworkProfileState,
  isNetworkProfileDocument,
  isNetworkProfileState,
} from "./document-schema.js";
import { networkProfileDocumentType } from "./document-type.js";
import { reducer } from "./reducer.js";
import type {
  NetworkProfileGlobalState,
  NetworkProfileLocalState,
  NetworkProfilePHState,
} from "./types.js";

export const initialGlobalState: NetworkProfileGlobalState = {
  name: "",
  icon: "",
  darkThemeIcon: "",
  logo: "",
  darkThemeLogo: "",
  logoBig: "",
  website: null,
  description: "",
  category: [],
  x: null,
  github: null,
  discord: null,
  youtube: null,
};
export const initialLocalState: NetworkProfileLocalState = {};

export const utils: DocumentModelUtils<NetworkProfilePHState> = {
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

    document.header.documentType = networkProfileDocumentType;

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
    return isNetworkProfileState(state);
  },
  assertIsStateOfType(state) {
    return assertIsNetworkProfileState(state);
  },
  isDocumentOfType(document) {
    return isNetworkProfileDocument(document);
  },
  assertIsDocumentOfType(document) {
    return assertIsNetworkProfileDocument(document);
  },
};
