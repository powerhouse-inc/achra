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
import { resourceTemplateUpgradeManifest } from "../../upgrades/upgrade-manifest.js";
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
      ...createBaseState(state?.auth, { version: 1, ...state?.document }),
      global: { ...initialGlobalState, ...state?.global },
      local: { ...initialLocalState, ...state?.local },
    };
  },
  createDocument(state) {
    return baseCreateDocument(
      utils.createState,
      state,
      resourceTemplateDocumentType,
    );
  },
  saveToFileHandle(document, input) {
    return baseSaveToFileHandle(document, input);
  },
  loadFromInput(input) {
    return baseLoadFromInputVersioned(input, {
      reducers: { 1: reducer as unknown as Reducer<PHBaseState> },
      upgradeManifest: resourceTemplateUpgradeManifest,
    });
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
