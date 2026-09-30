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
import { billingStatementUpgradeManifest } from "../../upgrades/upgrade-manifest.js";
import {
  assertIsBillingStatementDocument,
  assertIsBillingStatementState,
  isBillingStatementDocument,
  isBillingStatementState,
} from "./document-schema.js";
import { billingStatementDocumentType } from "./document-type.js";
import { reducer } from "./reducer.js";
import type {
  BillingStatementGlobalState,
  BillingStatementLocalState,
  BillingStatementPHState,
} from "./types.js";

export const initialGlobalState: BillingStatementGlobalState = {
  contributor: null,
  dateIssued: "2025-06-10T15:42:17.873Z",
  dateDue: "2025-06-10T15:42:17.873Z",
  lineItems: [],
  status: "DRAFT",
  currency: "",
  totalCash: 0,
  totalPowt: 0,
  notes: "",
};
export const initialLocalState: BillingStatementLocalState = {};

export const utils: DocumentModelUtils<BillingStatementPHState> = {
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
      billingStatementDocumentType,
    );
  },
  saveToFileHandle(document, input) {
    return baseSaveToFileHandle(document, input);
  },
  loadFromInput(input) {
    return baseLoadFromInputVersioned(input, {
      reducers: { 1: reducer as unknown as Reducer<PHBaseState> },
      upgradeManifest: billingStatementUpgradeManifest,
    });
  },
  isStateOfType(state) {
    return isBillingStatementState(state);
  },
  assertIsStateOfType(state) {
    return assertIsBillingStatementState(state);
  },
  isDocumentOfType(document) {
    return isBillingStatementDocument(document);
  },
  assertIsDocumentOfType(document) {
    return assertIsBillingStatementDocument(document);
  },
};
