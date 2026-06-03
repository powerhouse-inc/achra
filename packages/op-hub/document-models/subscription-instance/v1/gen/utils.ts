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
  generateId,
} from "document-model";
import {
  assertIsSubscriptionInstanceDocument,
  assertIsSubscriptionInstanceState,
  isSubscriptionInstanceDocument,
  isSubscriptionInstanceState,
} from "./document-schema.js";
import { subscriptionInstanceDocumentType } from "./document-type.js";
import { reducer } from "./reducer.js";
import type {
  SubscriptionInstanceGlobalState,
  SubscriptionInstanceLocalState,
  SubscriptionInstancePHState,
} from "./types.js";

export const initialGlobalState: SubscriptionInstanceGlobalState = {
  customerId: null,
  customerName: null,
  customerEmail: null,
  customerType: null,
  teamMemberCount: null,
  operatorId: null,
  serviceOfferingId: null,
  tierName: null,
  tierPricingOptionId: null,
  tierPrice: null,
  tierCurrency: null,
  tierPricingMode: null,
  selectedBillingCycle: null,
  globalCurrency: null,
  resource: null,
  status: "PENDING",
  createdAt: null,
  activatedSince: null,
  pausedSince: null,
  expiringSince: null,
  cancelledSince: null,
  cancellationReason: null,
  autoRenew: false,
  operatorNotes: null,
  nextBillingDate: null,
  currentBillingCycleStart: null,
  totalDebt: null,
  totalCredit: null,
  currentCycleOverage: null,
  debtLineItems: [],
  services: [],
  serviceGroups: [],
};
export const initialLocalState: SubscriptionInstanceLocalState = {};

export const utils: DocumentModelUtils<SubscriptionInstancePHState> = {
  fileExtension: "",
  createState(state) {
    return {
      ...defaultBaseState(),
      global: { ...initialGlobalState, ...state?.global },
      local: { ...initialLocalState, ...state?.local },
    };
  },
  createDocument(state) {
    const document = baseCreateDocument(utils.createState, state);

    document.header.documentType = subscriptionInstanceDocumentType;

    // for backwards compatibility, but this is NOT a valid signed document id
    document.header.id = generateId();

    return document;
  },
  saveToFileHandle(document, input) {
    return baseSaveToFileHandle(document, input);
  },
  loadFromInput(input) {
    return baseLoadFromInput(input, reducer);
  },
  isStateOfType(state) {
    return isSubscriptionInstanceState(state);
  },
  assertIsStateOfType(state) {
    return assertIsSubscriptionInstanceState(state);
  },
  isDocumentOfType(document) {
    return isSubscriptionInstanceDocument(document);
  },
  assertIsDocumentOfType(document) {
    return assertIsSubscriptionInstanceDocument(document);
  },
};
