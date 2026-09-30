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
import { operationalHubProfileUpgradeManifest } from "../../upgrades/upgrade-manifest.js";
import {
  assertIsOperationalHubProfileDocument,
  assertIsOperationalHubProfileState,
  isOperationalHubProfileDocument,
  isOperationalHubProfileState,
} from "./document-schema.js";
import { operationalHubProfileDocumentType } from "./document-type.js";
import { reducer } from "./reducer.js";
import type {
  OperationalHubProfileGlobalState,
  OperationalHubProfileLocalState,
  OperationalHubProfilePHState,
} from "./types.js";

export const initialGlobalState: OperationalHubProfileGlobalState = {
  name: "",
  operatorTeam: null,
  subteams: [],
};
export const initialLocalState: OperationalHubProfileLocalState = {};

export const utils: DocumentModelUtils<OperationalHubProfilePHState> = {
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
      operationalHubProfileDocumentType,
    );
  },
  saveToFileHandle(document, input) {
    return baseSaveToFileHandle(document, input);
  },
  loadFromInput(input) {
    return baseLoadFromInputVersioned(input, {
      reducers: { 1: reducer as unknown as Reducer<PHBaseState> },
      upgradeManifest: operationalHubProfileUpgradeManifest,
    });
  },
  isStateOfType(state) {
    return isOperationalHubProfileState(state);
  },
  assertIsStateOfType(state) {
    return assertIsOperationalHubProfileState(state);
  },
  isDocumentOfType(document) {
    return isOperationalHubProfileDocument(document);
  },
  assertIsDocumentOfType(document) {
    return assertIsOperationalHubProfileDocument(document);
  },
};
