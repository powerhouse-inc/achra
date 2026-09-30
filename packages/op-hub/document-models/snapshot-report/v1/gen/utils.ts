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
import { snapshotReportUpgradeManifest } from "../../upgrades/upgrade-manifest.js";
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
      ...createBaseState(state?.auth, { version: 1, ...state?.document }),
      global: { ...initialGlobalState, ...state?.global },
      local: { ...initialLocalState, ...state?.local },
    };
  },
  createDocument(state) {
    return baseCreateDocument(
      utils.createState,
      state,
      snapshotReportDocumentType,
    );
  },
  saveToFileHandle(document, input) {
    return baseSaveToFileHandle(document, input);
  },
  loadFromInput(input) {
    return baseLoadFromInputVersioned(input, {
      reducers: { 1: reducer as unknown as Reducer<PHBaseState> },
      upgradeManifest: snapshotReportUpgradeManifest,
    });
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
