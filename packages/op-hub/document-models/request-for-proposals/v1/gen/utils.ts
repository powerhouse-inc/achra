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
import { requestForProposalsUpgradeManifest } from "../../upgrades/upgrade-manifest.js";
import {
  assertIsRequestForProposalsDocument,
  assertIsRequestForProposalsState,
  isRequestForProposalsDocument,
  isRequestForProposalsState,
} from "./document-schema.js";
import { requestForProposalsDocumentType } from "./document-type.js";
import { reducer } from "./reducer.js";
import type {
  RequestForProposalsGlobalState,
  RequestForProposalsLocalState,
  RequestForProposalsPHState,
} from "./types.js";

export const initialGlobalState: RequestForProposalsGlobalState = {
  issuer: "placeholder-id",
  code: null,
  title: "",
  summary: "",
  briefing: "",
  rfpCommenter: [],
  eligibilityCriteria: "",
  evaluationCriteria: "",
  budgetRange: {
    min: null,
    max: null,
    currency: null,
  },
  contextDocuments: [],
  status: "DRAFT",
  proposals: [],
  deadline: null,
  tags: null,
};
export const initialLocalState: RequestForProposalsLocalState = {};

export const utils: DocumentModelUtils<RequestForProposalsPHState> = {
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
      requestForProposalsDocumentType,
    );
  },
  saveToFileHandle(document, input) {
    return baseSaveToFileHandle(document, input);
  },
  loadFromInput(input) {
    return baseLoadFromInputVersioned(input, {
      reducers: { 1: reducer as unknown as Reducer<PHBaseState> },
      upgradeManifest: requestForProposalsUpgradeManifest,
    });
  },
  isStateOfType(state) {
    return isRequestForProposalsState(state);
  },
  assertIsStateOfType(state) {
    return assertIsRequestForProposalsState(state);
  },
  isDocumentOfType(document) {
    return isRequestForProposalsDocument(document);
  },
  assertIsDocumentOfType(document) {
    return assertIsRequestForProposalsDocument(document);
  },
};
