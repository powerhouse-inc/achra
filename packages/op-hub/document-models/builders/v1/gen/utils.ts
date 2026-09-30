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
import { buildersUpgradeManifest } from "../../upgrades/upgrade-manifest.js";
import {
  assertIsBuildersDocument,
  assertIsBuildersState,
  isBuildersDocument,
  isBuildersState,
} from "./document-schema.js";
import { buildersDocumentType } from "./document-type.js";
import { reducer } from "./reducer.js";
import type {
  BuildersGlobalState,
  BuildersLocalState,
  BuildersPHState,
} from "./types.js";

export const initialGlobalState: BuildersGlobalState = {
  builders: [],
};
export const initialLocalState: BuildersLocalState = {};

export const utils: DocumentModelUtils<BuildersPHState> = {
  fileExtension: "",
  createState(state) {
    return {
      ...createBaseState(state?.auth, { version: 1, ...state?.document }),
      global: { ...initialGlobalState, ...state?.global },
      local: { ...initialLocalState, ...state?.local },
    };
  },
  createDocument(state) {
    return baseCreateDocument(utils.createState, state, buildersDocumentType);
  },
  saveToFileHandle(document, input) {
    return baseSaveToFileHandle(document, input);
  },
  loadFromInput(input) {
    return baseLoadFromInputVersioned(input, {
      reducers: { 1: reducer as unknown as Reducer<PHBaseState> },
      upgradeManifest: buildersUpgradeManifest,
    });
  },
  isStateOfType(state) {
    return isBuildersState(state);
  },
  assertIsStateOfType(state) {
    return assertIsBuildersState(state);
  },
  isDocumentOfType(document) {
    return isBuildersDocument(document);
  },
  assertIsDocumentOfType(document) {
    return assertIsBuildersDocument(document);
  },
};
