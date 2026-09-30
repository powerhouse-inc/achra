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
import { serviceOfferingUpgradeManifest } from "../../upgrades/upgrade-manifest.js";
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
      ...createBaseState(state?.auth, { version: 1, ...state?.document }),
      global: { ...initialGlobalState, ...state?.global },
      local: { ...initialLocalState, ...state?.local },
    };
  },
  createDocument(state) {
    return baseCreateDocument(
      utils.createState,
      state,
      serviceOfferingDocumentType,
    );
  },
  saveToFileHandle(document, input) {
    return baseSaveToFileHandle(document, input);
  },
  loadFromInput(input) {
    return baseLoadFromInputVersioned(input, {
      reducers: { 1: reducer as unknown as Reducer<PHBaseState> },
      upgradeManifest: serviceOfferingUpgradeManifest,
    });
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
