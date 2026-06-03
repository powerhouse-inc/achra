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
  assertIsResourceTemplateDocument,
  assertIsResourceTemplateState,
  isResourceTemplateDocument,
  isResourceTemplateState,
} from "./document-schema.js";
import { resourceTemplateDocumentType } from "./document-type.js";
import { reducer } from "./reducer.js";
import type {
  ResourceTemplateGlobalState,
  ResourceTemplateLocalState,
  ResourceTemplatePHState,
} from "./types.js";

export const initialGlobalState: ResourceTemplateGlobalState = {
  id: null,
  operatorId: null,
  title: "",
  summary: "",
  description: null,
  thumbnailUrl: null,
  infoLink: null,
  status: "DRAFT",
  lastModified: null,
  targetAudiences: [],
  setupServices: [],
  recurringServices: [],
  facetTargets: [],
  services: [],
  optionGroups: [],
  faqFields: [],
  contentSections: [],
  weight: null,
  subtitle: null,
};
export const initialLocalState: ResourceTemplateLocalState = {};

export const utils: DocumentModelUtils<ResourceTemplatePHState> = {
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

    document.header.documentType = resourceTemplateDocumentType;

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
    return isResourceTemplateState(state);
  },
  assertIsStateOfType(state) {
    return assertIsResourceTemplateState(state);
  },
  isDocumentOfType(document) {
    return isResourceTemplateDocument(document);
  },
  assertIsDocumentOfType(document) {
    return assertIsResourceTemplateDocument(document);
  },
};
