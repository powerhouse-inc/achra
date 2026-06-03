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
  assertIsSnapshotReportDocument,
  assertIsSnapshotReportState,
  isSnapshotReportDocument,
  isSnapshotReportState,
} from "./document-schema.js";
import { snapshotReportDocumentType } from "./document-type.js";
import { reducer } from "./reducer.js";
import type {
  SnapshotReportGlobalState,
  SnapshotReportLocalState,
  SnapshotReportPHState,
} from "./types.js";

export const initialGlobalState: SnapshotReportGlobalState = {
  ownerIds: [],
  accountsDocumentId: null,
  startDate: null,
  endDate: null,
  reportName: null,
  reportPeriodStart: null,
  reportPeriodEnd: null,
  snapshotAccounts: [],
};
export const initialLocalState: SnapshotReportLocalState = {};

export const utils: DocumentModelUtils<SnapshotReportPHState> = {
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

    document.header.documentType = snapshotReportDocumentType;

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
    return isSnapshotReportState(state);
  },
  assertIsStateOfType(state) {
    return assertIsSnapshotReportState(state);
  },
  isDocumentOfType(document) {
    return isSnapshotReportDocument(document);
  },
  assertIsDocumentOfType(document) {
    return assertIsSnapshotReportDocument(document);
  },
};
