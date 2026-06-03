/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import type { PHBaseState, PHDocument } from "document-model";
import type { BuildersAction } from "./actions.js";
import type { BuildersState as BuildersGlobalState } from "./schema/types.js";

type BuildersLocalState = Record<PropertyKey, never>;

type BuildersPHState = PHBaseState & {
  global: BuildersGlobalState;
  local: BuildersLocalState;
};
type BuildersDocument = PHDocument<BuildersPHState>;

export * from "./schema/types.js";

export type {
  BuildersAction,
  BuildersDocument,
  BuildersGlobalState,
  BuildersLocalState,
  BuildersPHState,
};
