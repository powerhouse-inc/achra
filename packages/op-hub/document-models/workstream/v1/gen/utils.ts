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
  assertIsWorkstreamDocument,
  assertIsWorkstreamState,
  isWorkstreamDocument,
  isWorkstreamState,
} from "./document-schema.js";
import { workstreamDocumentType } from "./document-type.js";
import { reducer } from "./reducer.js";
import type {
  WorkstreamGlobalState,
  WorkstreamLocalState,
  WorkstreamPHState,
} from "./types.js";

export const initialGlobalState: WorkstreamGlobalState = {
  code: null,
  title: null,
  status: "RFP_DRAFT",
  client: null,
  rfp: null,
  initialProposal: null,
  alternativeProposals: [],
  sow: null,
  paymentTerms: null,
  paymentRequests: [],
};
export const initialLocalState: WorkstreamLocalState = {};

export const utils: DocumentModelUtils<WorkstreamPHState> = {
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

    document.header.documentType = workstreamDocumentType;

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
    return isWorkstreamState(state);
  },
  assertIsStateOfType(state) {
    return assertIsWorkstreamState(state);
  },
  isDocumentOfType(document) {
    return isWorkstreamDocument(document);
  },
  assertIsDocumentOfType(document) {
    return assertIsWorkstreamDocument(document);
  },
};
