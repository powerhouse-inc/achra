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
  assertIsBuilderProfileDocument,
  assertIsBuilderProfileState,
  isBuilderProfileDocument,
  isBuilderProfileState,
} from "./document-schema.js";
import { builderProfileDocumentType } from "./document-type.js";
import { reducer } from "./reducer.js";
import type {
  BuilderProfileGlobalState,
  BuilderProfileLocalState,
  BuilderProfilePHState,
} from "./types.js";

export const initialGlobalState: BuilderProfileGlobalState = {
  id: null,
  walletAddress: null,
  code: null,
  slug: null,
  name: null,
  icon: null,
  description: null,
  about: null,
  lastModified: null,
  isOperator: false,
  operationalHubMember: {
    name: null,
    phid: null,
  },
  contributors: [],
  status: null,
  skills: [],
  scopes: [],
  links: [],
};
export const initialLocalState: BuilderProfileLocalState = {};

export const utils: DocumentModelUtils<BuilderProfilePHState> = {
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

    document.header.documentType = builderProfileDocumentType;

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
    return isBuilderProfileState(state);
  },
  assertIsStateOfType(state) {
    return assertIsBuilderProfileState(state);
  },
  isDocumentOfType(document) {
    return isBuilderProfileDocument(document);
  },
  assertIsDocumentOfType(document) {
    return assertIsBuilderProfileDocument(document);
  },
};
