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
  assertIsServiceOfferingDocument,
  assertIsServiceOfferingState,
  isServiceOfferingDocument,
  isServiceOfferingState,
} from "./document-schema.js";
import { serviceOfferingDocumentType } from "./document-type.js";
import { reducer } from "./reducer.js";
import type {
  ServiceOfferingGlobalState,
  ServiceOfferingLocalState,
  ServiceOfferingPHState,
} from "./types.js";

export const initialGlobalState: ServiceOfferingGlobalState = {
  id: null,
  operatorId: null,
  resourceTemplateId: null,
  title: "",
  summary: "",
  description: null,
  thumbnailUrl: null,
  infoLink: null,
  status: "DRAFT",
  lastModified: null,
  availableBillingCycles: [],
  facetTargets: [],
  services: [],
  tiers: [],
  optionGroups: [],
};
export const initialLocalState: ServiceOfferingLocalState = {};

export const utils: DocumentModelUtils<ServiceOfferingPHState> = {
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

    document.header.documentType = serviceOfferingDocumentType;

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
    return isServiceOfferingState(state);
  },
  assertIsStateOfType(state) {
    return assertIsServiceOfferingState(state);
  },
  isDocumentOfType(document) {
    return isServiceOfferingDocument(document);
  },
  assertIsDocumentOfType(document) {
    return assertIsServiceOfferingDocument(document);
  },
};
