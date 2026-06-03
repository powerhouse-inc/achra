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
  assertIsResourceInstanceDocument,
  assertIsResourceInstanceState,
  isResourceInstanceDocument,
  isResourceInstanceState,
} from "./document-schema.js";
import { resourceInstanceDocumentType } from "./document-type.js";
import { reducer } from "./reducer.js";
import type {
  ResourceInstanceGlobalState,
  ResourceInstanceLocalState,
  ResourceInstancePHState,
} from "./types.js";

export const initialGlobalState: ResourceInstanceGlobalState = {
  resourceTemplateId: null,
  customerId: null,
  customerName: null,
  templateName: null,
  thumbnailUrl: null,
  infoLink: null,
  description: null,
  operatorProfile: null,
  status: "DRAFT",
  configuration: [],
  confirmedAt: null,
  provisioningStartedAt: null,
  provisioningCompletedAt: null,
  provisioningFailureReason: null,
  activatedAt: null,
  suspendedAt: null,
  suspensionType: null,
  suspensionReason: null,
  suspensionDetails: null,
  resumedAt: null,
  terminatedAt: null,
  terminationReason: null,
};
export const initialLocalState: ResourceInstanceLocalState = {};

export const utils: DocumentModelUtils<ResourceInstancePHState> = {
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

    document.header.documentType = resourceInstanceDocumentType;

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
    return isResourceInstanceState(state);
  },
  assertIsStateOfType(state) {
    return assertIsResourceInstanceState(state);
  },
  isDocumentOfType(document) {
    return isResourceInstanceDocument(document);
  },
  assertIsDocumentOfType(document) {
    return assertIsResourceInstanceDocument(document);
  },
};
