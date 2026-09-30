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
import { expenseReportUpgradeManifest } from "../../upgrades/upgrade-manifest.js";
import {
  assertIsExpenseReportDocument,
  assertIsExpenseReportState,
  isExpenseReportDocument,
  isExpenseReportState,
} from "./document-schema.js";
import { expenseReportDocumentType } from "./document-type.js";
import { reducer } from "./reducer.js";
import type {
  ExpenseReportGlobalState,
  ExpenseReportLocalState,
  ExpenseReportPHState,
} from "./types.js";

export const initialGlobalState: ExpenseReportGlobalState = {
  ownerId: null,
  status: "DRAFT",
  wallets: [],
  groups: [
    {
      id: "57b0fdd7-51f5-4725-8a05-7ab3c15d90c2",
      label: "Headcount Expenses",
      parentId: null,
    },
    {
      id: "4971def8-64f8-4eab-b69b-a869d10452c2",
      label: "Non-Headcount Expenses",
      parentId: null,
    },
    {
      id: "e27b7f51-dc22-4ebe-8659-4e41824ae58c",
      label: "Travel & Entertainment",
      parentId: "57b0fdd7-51f5-4725-8a05-7ab3c15d90c2",
    },
    {
      id: "e4dce6df-1aa6-4861-b9f4-d861ad74d66c",
      label: "Compensation & Benefits",
      parentId: "57b0fdd7-51f5-4725-8a05-7ab3c15d90c2",
    },
    {
      id: "92e445ba-96af-4793-ae01-9b71035174ba",
      label: "Marketing Expense",
      parentId: "4971def8-64f8-4eab-b69b-a869d10452c2",
    },
    {
      id: "778dbd41-3d4a-4c8f-9004-7797f04e5b40",
      label: "Admin Expense",
      parentId: "4971def8-64f8-4eab-b69b-a869d10452c2",
    },
    {
      id: "5f024d53-7d0e-4818-9661-256aee69709d",
      label: "Professional Services",
      parentId: "4971def8-64f8-4eab-b69b-a869d10452c2",
    },
    {
      id: "659337f4-01c3-495a-89d7-c177c4137620",
      label: "Cost of Goods Sold",
      parentId: "4971def8-64f8-4eab-b69b-a869d10452c2",
    },
    {
      id: "1d6f0601-966a-4982-811d-981ac28db0b4",
      label: "Software Development Expense",
      parentId: "4971def8-64f8-4eab-b69b-a869d10452c2",
    },
    {
      id: "800dac9a-5665-4826-a972-b3170c789d92",
      label: "Income Tax Expense",
      parentId: "4971def8-64f8-4eab-b69b-a869d10452c2",
    },
    {
      id: "30ed3523-c15a-411f-a8f6-7bb6b978f6f8",
      label: "Software Expense",
      parentId: "4971def8-64f8-4eab-b69b-a869d10452c2",
    },
    {
      id: "ba7688ad-1329-4344-8f8a-e0f27dc648b8",
      label: "Gas Expense",
      parentId: "4971def8-64f8-4eab-b69b-a869d10452c2",
    },
    {
      id: "465367d1-636a-45a1-9e43-4a48dd074918",
      label: "Budget",
      parentId: null,
    },
    {
      id: "aa5b7188-2231-445e-9f3d-7e5d1ce5754f",
      label: "Interest Income",
      parentId: null,
    },
    {
      id: "d1e9bd15-930d-4faa-ba61-8f2a3b1d0e8f",
      label: "Other Income Expense (Non-operating)",
      parentId: null,
    },
    {
      id: "133b762c-a240-4a42-8bf6-9c29b3675f91",
      label: "Other Income",
      parentId: null,
    },
    {
      id: "1c61e841-c599-4c38-944a-7c9450c27d17",
      label: "Current Asset",
      parentId: null,
    },
    {
      id: "5a33a954-09d0-4ddd-95fc-c56853de4dbd",
      label: "Fixed Asset",
      parentId: null,
    },
    {
      id: "75130e59-7c11-44ae-980c-eaa4968a4a56",
      label: "Non-Current Asset",
      parentId: null,
    },
    {
      id: "b3091879-f549-4227-beef-c8d4947be2e7",
      label: "Current Liability",
      parentId: null,
    },
    {
      id: "2f64aca7-38db-4ff4-8cc5-8e0952c23151",
      label: "Non-current Liability",
      parentId: null,
    },
    {
      id: "42e480eb-9790-49ed-af35-3ab124af556e",
      label: "Owner Equity",
      parentId: null,
    },
    {
      id: "248f0af0-74b1-4fd9-9e7f-3d723f5c4c56",
      label: "Equity",
      parentId: null,
    },
    {
      id: "5044752a-5618-4ab2-90b7-54b5d95e38cf",
      label: "Adjustment A/C",
      parentId: null,
    },
    {
      id: "566fede7-b593-43d0-84b6-50301e5a84ed",
      label: "Temporary Holding Account",
      parentId: null,
    },
    {
      id: "f0077e3f-2931-4637-8715-ba3a01ce3786",
      label: "Other",
      parentId: null,
    },
    {
      id: "470504f0-a89f-4555-a46e-667c74240238",
      label: "Internal Transfers",
      parentId: null,
    },
    {
      id: "121482a1-b69f-4511-g46f-267c24450238",
      label: "Uncategorized",
      parentId: null,
    },
  ],
  periodStart: null,
  periodEnd: null,
  startDate: null,
  endDate: null,
};
export const initialLocalState: ExpenseReportLocalState = {};

export const utils: DocumentModelUtils<ExpenseReportPHState> = {
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
      expenseReportDocumentType,
    );
  },
  saveToFileHandle(document, input) {
    return baseSaveToFileHandle(document, input);
  },
  loadFromInput(input) {
    return baseLoadFromInputVersioned(input, {
      reducers: { 1: reducer as unknown as Reducer<PHBaseState> },
      upgradeManifest: expenseReportUpgradeManifest,
    });
  },
  isStateOfType(state) {
    return isExpenseReportState(state);
  },
  assertIsStateOfType(state) {
    return assertIsExpenseReportState(state);
  },
  isDocumentOfType(document) {
    return isExpenseReportDocument(document);
  },
  assertIsDocumentOfType(document) {
    return assertIsExpenseReportDocument(document);
  },
};
