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
import { subscriptionInvoiceUpgradeManifest } from "../../upgrades/upgrade-manifest.js";
import {
  assertIsSubscriptionInvoiceDocument,
  assertIsSubscriptionInvoiceState,
  isSubscriptionInvoiceDocument,
  isSubscriptionInvoiceState,
} from "./document-schema.js";
import { subscriptionInvoiceDocumentType } from "./document-type.js";
import { reducer } from "./reducer.js";
import type {
  SubscriptionInvoiceGlobalState,
  SubscriptionInvoiceLocalState,
  SubscriptionInvoicePHState,
} from "./types.js";

export const initialGlobalState: SubscriptionInvoiceGlobalState = {
  invoiceNumber: null,
  issuedAt: null,
  dueDate: null,
  status: "DRAFT",
  customerId: null,
  customerName: null,
  customerEmail: null,
  sourceSubscriptionId: null,
  sourceSubscriptionName: null,
  cycleStart: null,
  cycleEnd: null,
  billingCycle: null,
  lineItems: [],
  currency: null,
  subtotal: 0,
  creditApplied: 0,
  totalDue: 0,
  totalPaid: 0,
  stripeInvoiceId: null,
  notes: null,
};
export const initialLocalState: SubscriptionInvoiceLocalState = {};

export const utils: DocumentModelUtils<SubscriptionInvoicePHState> = {
  fileExtension: "inv",
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
      subscriptionInvoiceDocumentType,
    );
  },
  saveToFileHandle(document, input) {
    return baseSaveToFileHandle(document, input);
  },
  loadFromInput(input) {
    return baseLoadFromInputVersioned(input, {
      reducers: { 1: reducer as unknown as Reducer<PHBaseState> },
      upgradeManifest: subscriptionInvoiceUpgradeManifest,
    });
  },
  isStateOfType(state) {
    return isSubscriptionInvoiceState(state);
  },
  assertIsStateOfType(state) {
    return assertIsSubscriptionInvoiceState(state);
  },
  isDocumentOfType(document) {
    return isSubscriptionInvoiceDocument(document);
  },
  assertIsDocumentOfType(document) {
    return assertIsSubscriptionInvoiceDocument(document);
  },
};
