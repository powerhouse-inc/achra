/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import type { DocumentModelUtils } from "document-model";
import {
  baseCreateDocument,
  baseLoadFromInput,
  baseSaveToFileHandle,
  defaultBaseState,
} from "document-model";
import {
  assertIsPaymentAccountDocument,
  assertIsPaymentAccountState,
  isPaymentAccountDocument,
  isPaymentAccountState,
} from "./document-schema.js";
import { paymentAccountDocumentType } from "./document-type.js";
import { reducer } from "./reducer.js";
import type {
  PaymentAccountGlobalState,
  PaymentAccountLocalState,
  PaymentAccountPHState,
} from "./types.js";

export const initialGlobalState: PaymentAccountGlobalState = {
  operatorId: null,
  lastModified: null,
  stripeAccountId: null,
  stripeChargesEnabled: false,
  stripePayoutsEnabled: false,
  stripeDetailsSubmitted: false,
  stripeRequirementsCurrentlyDue: [],
  stripeRequirementsDisabledReason: null,
};
export const initialLocalState: PaymentAccountLocalState = {};

export const utils: DocumentModelUtils<PaymentAccountPHState> = {
  fileExtension: "",
  createState(state) {
    return {
      ...defaultBaseState(),
      global: { ...initialGlobalState, ...state?.global },
      local: { ...initialLocalState, ...state?.local },
    };
  },
  createDocument(state) {
    return baseCreateDocument(
      utils.createState,
      state,
      paymentAccountDocumentType,
    );
  },
  saveToFileHandle(document, input) {
    return baseSaveToFileHandle(document, input);
  },
  loadFromInput(input) {
    return baseLoadFromInput(input, reducer);
  },
  isStateOfType(state) {
    return isPaymentAccountState(state);
  },
  assertIsStateOfType(state) {
    return assertIsPaymentAccountState(state);
  },
  isDocumentOfType(document) {
    return isPaymentAccountDocument(document);
  },
  assertIsDocumentOfType(document) {
    return assertIsPaymentAccountDocument(document);
  },
};
