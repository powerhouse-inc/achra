/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import type { PHBaseState, PHDocument } from "document-model";
import type { BuilderProfileAction } from "./actions.js";
import type { BuilderProfileState as BuilderProfileGlobalState } from "./schema/types.js";

type BuilderProfileLocalState = Record<PropertyKey, never>;

type BuilderProfilePHState = PHBaseState & {
  global: BuilderProfileGlobalState;
  local: BuilderProfileLocalState;
};
type BuilderProfileDocument = PHDocument<BuilderProfilePHState>;

export * from "./schema/types.js";

export type {
  BuilderProfileAction,
  BuilderProfileDocument,
  BuilderProfileGlobalState,
  BuilderProfileLocalState,
  BuilderProfilePHState,
};
