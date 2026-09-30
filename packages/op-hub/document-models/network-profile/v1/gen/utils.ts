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
import { networkProfileUpgradeManifest } from "../../upgrades/upgrade-manifest.js";
import {
  assertIsNetworkProfileDocument,
  assertIsNetworkProfileState,
  isNetworkProfileDocument,
  isNetworkProfileState,
} from "./document-schema.js";
import { networkProfileDocumentType } from "./document-type.js";
import { reducer } from "./reducer.js";
import type {
  NetworkProfileGlobalState,
  NetworkProfileLocalState,
  NetworkProfilePHState,
} from "./types.js";

export const initialGlobalState: NetworkProfileGlobalState = {
  name: "",
  icon: "",
  darkThemeIcon: "",
  logo: "",
  darkThemeLogo: "",
  logoBig: "",
  website: null,
  description: "",
  category: [],
  x: null,
  github: null,
  discord: null,
  youtube: null,
};
export const initialLocalState: NetworkProfileLocalState = {};

export const utils: DocumentModelUtils<NetworkProfilePHState> = {
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
      networkProfileDocumentType,
    );
  },
  saveToFileHandle(document, input) {
    return baseSaveToFileHandle(document, input);
  },
  loadFromInput(input) {
    return baseLoadFromInputVersioned(input, {
      reducers: { 1: reducer as unknown as Reducer<PHBaseState> },
      upgradeManifest: networkProfileUpgradeManifest,
    });
  },
  isStateOfType(state) {
    return isNetworkProfileState(state);
  },
  assertIsStateOfType(state) {
    return assertIsNetworkProfileState(state);
  },
  isDocumentOfType(document) {
    return isNetworkProfileDocument(document);
  },
  assertIsDocumentOfType(document) {
    return assertIsNetworkProfileDocument(document);
  },
};
