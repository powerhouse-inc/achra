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
import { paymentTermsUpgradeManifest } from "../../upgrades/upgrade-manifest.js";
import {
  assertIsPaymentTermsDocument,
  assertIsPaymentTermsState,
  isPaymentTermsDocument,
  isPaymentTermsState,
} from "./document-schema.js";
import { paymentTermsDocumentType } from "./document-type.js";
import { reducer } from "./reducer.js";
import type {
  PaymentTermsGlobalState,
  PaymentTermsLocalState,
  PaymentTermsPHState,
} from "./types.js";

export const initialGlobalState: PaymentTermsGlobalState = {
  status: "DRAFT",
  proposer: "",
  payer: "",
  currency: "USD",
  paymentModel: "MILESTONE",
  totalAmount: null,
  milestoneSchedule: [],
  costAndMaterials: null,
  retainerDetails: null,
  escrowDetails: null,
  evaluation: null,
  bonusClauses: [],
  penaltyClauses: [],
};
export const initialLocalState: PaymentTermsLocalState = {};

export const utils: DocumentModelUtils<PaymentTermsPHState> = {
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
      paymentTermsDocumentType,
    );
  },
  saveToFileHandle(document, input) {
    return baseSaveToFileHandle(document, input);
  },
  loadFromInput(input) {
    return baseLoadFromInputVersioned(input, {
      reducers: { 1: reducer as unknown as Reducer<PHBaseState> },
      upgradeManifest: paymentTermsUpgradeManifest,
    });
  },
  isStateOfType(state) {
    return isPaymentTermsState(state);
  },
  assertIsStateOfType(state) {
    return assertIsPaymentTermsState(state);
  },
  isDocumentOfType(document) {
    return isPaymentTermsDocument(document);
  },
  assertIsDocumentOfType(document) {
    return assertIsPaymentTermsDocument(document);
  },
};
