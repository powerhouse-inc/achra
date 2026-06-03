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
  assertIsScopeOfWorkDocument,
  assertIsScopeOfWorkState,
  isScopeOfWorkDocument,
  isScopeOfWorkState,
} from "./document-schema.js";
import { scopeOfWorkDocumentType } from "./document-type.js";
import { reducer } from "./reducer.js";
import type {
  ScopeOfWorkGlobalState,
  ScopeOfWorkLocalState,
  ScopeOfWorkPHState,
} from "./types.js";

export const initialGlobalState: ScopeOfWorkGlobalState = {
  title: "Scope of Work",
  description:
    "The Scope of Work model defines a structured plan for executing contributor work; on top of deliverables and roadmaps with milestones it now also includes projects as budget anchors for project based budgeting.",
  status: "DRAFT",
  deliverables: [],
  projects: [],
  roadmaps: [],
  contributors: [],
};
export const initialLocalState: ScopeOfWorkLocalState = {};

export const utils: DocumentModelUtils<ScopeOfWorkPHState> = {
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

    document.header.documentType = scopeOfWorkDocumentType;

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
    return isScopeOfWorkState(state);
  },
  assertIsStateOfType(state) {
    return assertIsScopeOfWorkState(state);
  },
  isDocumentOfType(document) {
    return isScopeOfWorkDocument(document);
  },
  assertIsDocumentOfType(document) {
    return assertIsScopeOfWorkDocument(document);
  },
};
