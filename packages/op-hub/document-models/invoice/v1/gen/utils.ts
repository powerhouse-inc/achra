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
import { invoiceUpgradeManifest } from "../../upgrades/upgrade-manifest.js";
import {
  assertIsInvoiceDocument,
  assertIsInvoiceState,
  isInvoiceDocument,
  isInvoiceState,
} from "./document-schema.js";
import { invoiceDocumentType } from "./document-type.js";
import { reducer } from "./reducer.js";
import type {
  InvoiceGlobalState,
  InvoiceLocalState,
  InvoicePHState,
} from "./types.js";

export const initialGlobalState: InvoiceGlobalState = {
  status: "DRAFT",
  invoiceNo: "",
  dateIssued: null,
  dateDue: null,
  dateDelivered: null,
  issuer: {
    id: null,
    name: null,
    address: null,
    contactInfo: null,
    country: null,
    paymentRouting: null,
  },
  payer: {
    id: null,
    name: null,
    address: null,
    contactInfo: null,
    country: null,
    paymentRouting: null,
  },
  currency: "",
  lineItems: [],
  totalPriceTaxExcl: 0,
  totalPriceTaxIncl: 0,
  notes: null,
  rejections: [],
  payments: [],
  payAfter: null,
  invoiceTags: [],
  exported: {
    timestamp: null,
    exportedLineItems: [],
  },
  closureReason: null,
};
export const initialLocalState: InvoiceLocalState = {};

export const utils: DocumentModelUtils<InvoicePHState> = {
  fileExtension: "",
  createState(state) {
    return {
      ...createBaseState(state?.auth, { version: 1, ...state?.document }),
      global: { ...initialGlobalState, ...state?.global },
      local: { ...initialLocalState, ...state?.local },
    };
  },
  createDocument(state) {
    return baseCreateDocument(utils.createState, state, invoiceDocumentType);
  },
  saveToFileHandle(document, input) {
    return baseSaveToFileHandle(document, input);
  },
  loadFromInput(input) {
    return baseLoadFromInputVersioned(input, {
      reducers: { 1: reducer as unknown as Reducer<PHBaseState> },
      upgradeManifest: invoiceUpgradeManifest,
    });
  },
  isStateOfType(state) {
    return isInvoiceState(state);
  },
  assertIsStateOfType(state) {
    return assertIsInvoiceState(state);
  },
  isDocumentOfType(document) {
    return isInvoiceDocument(document);
  },
  assertIsDocumentOfType(document) {
    return assertIsInvoiceDocument(document);
  },
};
