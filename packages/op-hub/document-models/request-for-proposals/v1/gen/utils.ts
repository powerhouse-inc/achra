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
  assertIsRequestForProposalsDocument,
  assertIsRequestForProposalsState,
  isRequestForProposalsDocument,
  isRequestForProposalsState,
} from "./document-schema.js";
import { requestForProposalsDocumentType } from "./document-type.js";
import { reducer } from "./reducer.js";
import type {
  RequestForProposalsGlobalState,
  RequestForProposalsLocalState,
  RequestForProposalsPHState,
} from "./types.js";

export const initialGlobalState: RequestForProposalsGlobalState = {
  issuer: "placeholder-id",
  code: null,
  title: "",
  summary: "",
  briefing: "",
  rfpCommenter: [],
  eligibilityCriteria: "",
  evaluationCriteria: "",
  budgetRange: {
    min: null,
    max: null,
    currency: null,
  },
  contextDocuments: [],
  status: "DRAFT",
  proposals: [],
  deadline: null,
  tags: null,
};
export const initialLocalState: RequestForProposalsLocalState = {};

export const utils: DocumentModelUtils<RequestForProposalsPHState> = {
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

    document.header.documentType = requestForProposalsDocumentType;

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
    return isRequestForProposalsState(state);
  },
  assertIsStateOfType(state) {
    return assertIsRequestForProposalsState(state);
  },
  isDocumentOfType(document) {
    return isRequestForProposalsDocument(document);
  },
  assertIsDocumentOfType(document) {
    return assertIsRequestForProposalsDocument(document);
  },
};
