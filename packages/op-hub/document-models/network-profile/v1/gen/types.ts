/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import type { PHBaseState, PHDocument } from "document-model";
import type { NetworkProfileAction } from "./actions.js";
import type { NetworkProfileState as NetworkProfileGlobalState } from "./schema/types.js";

type NetworkProfileLocalState = Record<PropertyKey, never>;

type NetworkProfilePHState = PHBaseState & {
  global: NetworkProfileGlobalState;
  local: NetworkProfileLocalState;
};
type NetworkProfileDocument = PHDocument<NetworkProfilePHState>;

export * from "./schema/types.js";

export type {
  NetworkProfileAction,
  NetworkProfileDocument,
  NetworkProfileGlobalState,
  NetworkProfileLocalState,
  NetworkProfilePHState,
};
