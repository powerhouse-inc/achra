/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import type { PHBaseState, PHDocument } from "document-model";
import type { FacetAction } from "./actions.js";
import type { FacetState as FacetGlobalState } from "./schema/types.js";

type FacetLocalState = Record<PropertyKey, never>;

type FacetPHState = PHBaseState & {
  global: FacetGlobalState;
  local: FacetLocalState;
};
type FacetDocument = PHDocument<FacetPHState>;

export * from "./schema/types.js";

export type {
  FacetAction,
  FacetDocument,
  FacetGlobalState,
  FacetLocalState,
  FacetPHState,
};
