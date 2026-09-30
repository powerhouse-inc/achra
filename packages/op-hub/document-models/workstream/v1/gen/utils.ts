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
import { workstreamUpgradeManifest } from "../../upgrades/upgrade-manifest.js";
import {
  assertIsWorkstreamDocument,
  assertIsWorkstreamState,
  isWorkstreamDocument,
  isWorkstreamState,
} from "./document-schema.js";
import { workstreamDocumentType } from "./document-type.js";
import { reducer } from "./reducer.js";
import type {
  WorkstreamGlobalState,
  WorkstreamLocalState,
  WorkstreamPHState,
} from "./types.js";

export const initialGlobalState: WorkstreamGlobalState = {
  code: null,
  title: null,
  status: "RFP_DRAFT",
  client: null,
  rfp: null,
  initialProposal: null,
  alternativeProposals: [],
  sow: null,
  paymentTerms: null,
  paymentRequests: [],
};
export const initialLocalState: WorkstreamLocalState = {};

export const utils: DocumentModelUtils<WorkstreamPHState> = {
  fileExtension: "",
  createState(state) {
    return {
      ...createBaseState(state?.auth, { version: 1, ...state?.document }),
      global: { ...initialGlobalState, ...state?.global },
      local: { ...initialLocalState, ...state?.local },
    };
  },
  createDocument(state) {
    return baseCreateDocument(utils.createState, state, workstreamDocumentType);
  },
  saveToFileHandle(document, input) {
    return baseSaveToFileHandle(document, input);
  },
  loadFromInput(input) {
    return baseLoadFromInputVersioned(input, {
      reducers: { 1: reducer as unknown as Reducer<PHBaseState> },
      upgradeManifest: workstreamUpgradeManifest,
    });
  },
  isStateOfType(state) {
    return isWorkstreamState(state);
  },
  assertIsStateOfType(state) {
    return assertIsWorkstreamState(state);
  },
  isDocumentOfType(document) {
    return isWorkstreamDocument(document);
  },
  assertIsDocumentOfType(document) {
    return assertIsWorkstreamDocument(document);
  },
};
