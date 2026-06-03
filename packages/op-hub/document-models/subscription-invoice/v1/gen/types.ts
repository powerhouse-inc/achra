/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import type { PHBaseState, PHDocument } from "document-model";
import type { SubscriptionInvoiceAction } from "./actions.js";
import type { SubscriptionInvoiceState as SubscriptionInvoiceGlobalState } from "./schema/types.js";

type SubscriptionInvoiceLocalState = Record<PropertyKey, never>;

type SubscriptionInvoicePHState = PHBaseState & {
  global: SubscriptionInvoiceGlobalState;
  local: SubscriptionInvoiceLocalState;
};
type SubscriptionInvoiceDocument = PHDocument<SubscriptionInvoicePHState>;

export * from "./schema/types.js";

export type {
  SubscriptionInvoiceAction,
  SubscriptionInvoiceDocument,
  SubscriptionInvoiceGlobalState,
  SubscriptionInvoiceLocalState,
  SubscriptionInvoicePHState,
};
