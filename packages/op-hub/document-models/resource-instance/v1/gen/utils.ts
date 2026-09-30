/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import type { DocumentModelUtils, PHBaseState, Reducer } from "document-model";
import {
  baseCreateDocument,
  baseLoadFromInputVersioned,
  baseSaveToFileHandle,
  createBaseState,
} from "document-model";
import { resourceInstanceUpgradeManifest } from "../../upgrades/upgrade-manifest.js";
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
      ...createBaseState(state?.auth, { version: 1, ...state?.document }),
      global: { ...initialGlobalState, ...state?.global },
      local: { ...initialLocalState, ...state?.local },
    };
  },
  createDocument(state) {
    return baseCreateDocument(
      utils.createState,
      state,
      resourceInstanceDocumentType,
    );
  },
  saveToFileHandle(document, input) {
    return baseSaveToFileHandle(document, input);
  },
  loadFromInput(input) {
    return baseLoadFromInputVersioned(input, {
      reducers: { 1: reducer as unknown as Reducer<PHBaseState> },
      upgradeManifest: resourceInstanceUpgradeManifest,
    });
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
