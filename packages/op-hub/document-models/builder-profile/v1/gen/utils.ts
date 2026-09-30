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
import { builderProfileUpgradeManifest } from "../../upgrades/upgrade-manifest.js";
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
      ...createBaseState(state?.auth, { version: 1, ...state?.document }),
      global: { ...initialGlobalState, ...state?.global },
      local: { ...initialLocalState, ...state?.local },
    };
  },
  createDocument(state) {
    return baseCreateDocument(
      utils.createState,
      state,
      builderProfileDocumentType,
    );
  },
  saveToFileHandle(document, input) {
    return baseSaveToFileHandle(document, input);
  },
  loadFromInput(input) {
    return baseLoadFromInputVersioned(input, {
      reducers: { 1: reducer as unknown as Reducer<PHBaseState> },
      upgradeManifest: builderProfileUpgradeManifest,
    });
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
