/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import type { PHBaseState, PHDocument } from "document-model";
import type { InvoiceAction } from "./actions.js";
import type { InvoiceState as InvoiceGlobalState } from "./schema/types.js";

type InvoiceLocalState = Record<PropertyKey, never>;

type InvoicePHState = PHBaseState & {
  global: InvoiceGlobalState;
  local: InvoiceLocalState;
};
type InvoiceDocument = PHDocument<InvoicePHState>;

export * from "./schema/types.js";

export type {
  InvoiceAction,
  InvoiceDocument,
  InvoiceGlobalState,
  InvoiceLocalState,
  InvoicePHState,
};
