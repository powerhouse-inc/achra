/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import type { PHBaseState, PHDocument } from "document-model";
import type { WorkstreamAction } from "./actions.js";
import type { WorkstreamState as WorkstreamGlobalState } from "./schema/types.js";

type WorkstreamLocalState = Record<PropertyKey, never>;

type WorkstreamPHState = PHBaseState & {
  global: WorkstreamGlobalState;
  local: WorkstreamLocalState;
};
type WorkstreamDocument = PHDocument<WorkstreamPHState>;

export * from "./schema/types.js";

export type {
  WorkstreamAction,
  WorkstreamDocument,
  WorkstreamGlobalState,
  WorkstreamLocalState,
  WorkstreamPHState,
};
