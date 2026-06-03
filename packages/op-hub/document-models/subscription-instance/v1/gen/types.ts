/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import type { PHBaseState, PHDocument } from "document-model";
import type { SubscriptionInstanceAction } from "./actions.js";
import type { SubscriptionInstanceState as SubscriptionInstanceGlobalState } from "./schema/types.js";

type SubscriptionInstanceLocalState = Record<PropertyKey, never>;

type SubscriptionInstancePHState = PHBaseState & {
  global: SubscriptionInstanceGlobalState;
  local: SubscriptionInstanceLocalState;
};
type SubscriptionInstanceDocument = PHDocument<SubscriptionInstancePHState>;

export * from "./schema/types.js";

export type {
  SubscriptionInstanceAction,
  SubscriptionInstanceDocument,
  SubscriptionInstanceGlobalState,
  SubscriptionInstanceLocalState,
  SubscriptionInstancePHState,
};
