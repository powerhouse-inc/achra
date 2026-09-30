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
import { facetUpgradeManifest } from "../../upgrades/upgrade-manifest.js";
import {
  assertIsFacetDocument,
  assertIsFacetState,
  isFacetDocument,
  isFacetState,
} from "./document-schema.js";
import { facetDocumentType } from "./document-type.js";
import { reducer } from "./reducer.js";
import type {
  FacetGlobalState,
  FacetLocalState,
  FacetPHState,
} from "./types.js";

export const initialGlobalState: FacetGlobalState = {
  id: null,
  name: "",
  description: null,
  lastModified: null,
  options: [],
};
export const initialLocalState: FacetLocalState = {};

export const utils: DocumentModelUtils<FacetPHState> = {
  fileExtension: "",
  createState(state) {
    return {
      ...createBaseState(state?.auth, { version: 1, ...state?.document }),
      global: { ...initialGlobalState, ...state?.global },
      local: { ...initialLocalState, ...state?.local },
    };
  },
  createDocument(state) {
    return baseCreateDocument(utils.createState, state, facetDocumentType);
  },
  saveToFileHandle(document, input) {
    return baseSaveToFileHandle(document, input);
  },
  loadFromInput(input) {
    return baseLoadFromInputVersioned(input, {
      reducers: { 1: reducer as unknown as Reducer<PHBaseState> },
      upgradeManifest: facetUpgradeManifest,
    });
  },
  isStateOfType(state) {
    return isFacetState(state);
  },
  assertIsStateOfType(state) {
    return assertIsFacetState(state);
  },
  isDocumentOfType(document) {
    return isFacetDocument(document);
  },
  assertIsDocumentOfType(document) {
    return assertIsFacetDocument(document);
  },
};
