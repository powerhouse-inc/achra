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
  assertIsFacetDocument,
  assertIsFacetState,
  isFacetDocument,
  isFacetState,
} from "./document-schema.js";
import { facetDocumentType } from "./document-type.js";
import { reducer } from "./reducer.js";
import type {
  FacetGlobalState,
  FacetLocalState,
  FacetPHState,
} from "./types.js";

export const initialGlobalState: FacetGlobalState = {
  id: null,
  name: "",
  description: null,
  lastModified: null,
  options: [],
};
export const initialLocalState: FacetLocalState = {};

export const utils: DocumentModelUtils<FacetPHState> = {
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

    document.header.documentType = facetDocumentType;

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
    return isFacetState(state);
  },
  assertIsStateOfType(state) {
    return assertIsFacetState(state);
  },
  isDocumentOfType(document) {
    return isFacetDocument(document);
  },
  assertIsDocumentOfType(document) {
    return assertIsFacetDocument(document);
  },
};
