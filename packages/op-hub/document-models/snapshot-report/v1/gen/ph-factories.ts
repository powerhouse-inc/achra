/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 * Factory methods for creating SnapshotReportDocument instances
 */
import type { PHAuthState, PHBaseState, PHDocumentState } from "document-model";
import { createBaseState, defaultBaseState } from "document-model";
import type {
  SnapshotReportDocument,
  SnapshotReportGlobalState,
  SnapshotReportLocalState,
  SnapshotReportPHState,
} from "./types.js";
import { utils } from "./utils.js";

export function defaultGlobalState(): SnapshotReportGlobalState {
  return {
    ownerIds: [],
    accountsDocumentId: null,
    startDate: null,
    endDate: null,
    reportName: null,
    reportPeriodStart: null,
    reportPeriodEnd: null,
    snapshotAccounts: [],
  };
}

export function defaultLocalState(): SnapshotReportLocalState {
  return {};
}

export function defaultPHState(): SnapshotReportPHState {
  return {
    ...defaultBaseState(),
    global: defaultGlobalState(),
    local: defaultLocalState(),
  };
}

export function createGlobalState(
  state?: Partial<SnapshotReportGlobalState>,
): SnapshotReportGlobalState {
  return {
    ...defaultGlobalState(),
    ...(state || {}),
  };
}

export function createLocalState(
  state?: Partial<SnapshotReportLocalState>,
): SnapshotReportLocalState {
  return {
    ...defaultLocalState(),
    ...(state || {}),
  } as SnapshotReportLocalState;
}

export function createState(
  baseState?: Partial<PHBaseState>,
  globalState?: Partial<SnapshotReportGlobalState>,
  localState?: Partial<SnapshotReportLocalState>,
): SnapshotReportPHState {
  return {
    ...createBaseState(baseState?.auth, baseState?.document),
    global: createGlobalState(globalState),
    local: createLocalState(localState),
  };
}

/**
 * Creates a SnapshotReportDocument with custom global and local state
 * This properly handles the PHBaseState requirements while allowing
 * document-specific state to be set.
 */
export function createSnapshotReportDocument(
  state?: Partial<{
    auth?: Partial<PHAuthState>;
    document?: Partial<PHDocumentState>;
    global?: Partial<SnapshotReportGlobalState>;
    local?: Partial<SnapshotReportLocalState>;
  }>,
): SnapshotReportDocument {
  const document = utils.createDocument(
    state
      ? createState(
          createBaseState(state.auth, state.document),
          state.global,
          state.local,
        )
      : undefined,
  );

  return document;
}
