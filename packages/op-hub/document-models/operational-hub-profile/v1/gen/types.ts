/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import type { PHBaseState, PHDocument } from "document-model";
import type { OperationalHubProfileAction } from "./actions.js";
import type { OperationalHubProfileState as OperationalHubProfileGlobalState } from "./schema/types.js";

type OperationalHubProfileLocalState = Record<PropertyKey, never>;

type OperationalHubProfilePHState = PHBaseState & {
  global: OperationalHubProfileGlobalState;
  local: OperationalHubProfileLocalState;
};
type OperationalHubProfileDocument = PHDocument<OperationalHubProfilePHState>;

export * from "./schema/types.js";

export type {
  OperationalHubProfileAction,
  OperationalHubProfileDocument,
  OperationalHubProfileGlobalState,
  OperationalHubProfileLocalState,
  OperationalHubProfilePHState,
};
