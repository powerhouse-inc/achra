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
import { subscriptionInstanceUpgradeManifest } from "../../upgrades/upgrade-manifest.js";
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
      ...createBaseState(state?.auth, { version: 1, ...state?.document }),
      global: { ...initialGlobalState, ...state?.global },
      local: { ...initialLocalState, ...state?.local },
    };
  },
  createDocument(state) {
    return baseCreateDocument(
      utils.createState,
      state,
      subscriptionInstanceDocumentType,
    );
  },
  saveToFileHandle(document, input) {
    return baseSaveToFileHandle(document, input);
  },
  loadFromInput(input) {
    return baseLoadFromInputVersioned(input, {
      reducers: { 1: reducer as unknown as Reducer<PHBaseState> },
      upgradeManifest: subscriptionInstanceUpgradeManifest,
    });
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
