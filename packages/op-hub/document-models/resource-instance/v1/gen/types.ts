/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import type { PHBaseState, PHDocument } from "document-model";
import type { ResourceInstanceAction } from "./actions.js";
import type { ResourceInstanceState as ResourceInstanceGlobalState } from "./schema/types.js";

type ResourceInstanceLocalState = Record<PropertyKey, never>;

type ResourceInstancePHState = PHBaseState & {
  global: ResourceInstanceGlobalState;
  local: ResourceInstanceLocalState;
};
type ResourceInstanceDocument = PHDocument<ResourceInstancePHState>;

export * from "./schema/types.js";

export type {
  ResourceInstanceAction,
  ResourceInstanceDocument,
  ResourceInstanceGlobalState,
  ResourceInstanceLocalState,
  ResourceInstancePHState,
};
