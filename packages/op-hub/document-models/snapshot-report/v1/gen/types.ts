/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import type { PHBaseState, PHDocument } from "document-model";
import type { SnapshotReportAction } from "./actions.js";
import type { SnapshotReportState as SnapshotReportGlobalState } from "./schema/types.js";

type SnapshotReportLocalState = Record<PropertyKey, never>;

type SnapshotReportPHState = PHBaseState & {
  global: SnapshotReportGlobalState;
  local: SnapshotReportLocalState;
};
type SnapshotReportDocument = PHDocument<SnapshotReportPHState>;

export * from "./schema/types.js";

export type {
  SnapshotReportAction,
  SnapshotReportDocument,
  SnapshotReportGlobalState,
  SnapshotReportLocalState,
  SnapshotReportPHState,
};
