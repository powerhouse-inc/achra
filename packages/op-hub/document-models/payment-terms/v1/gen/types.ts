/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import type { PHBaseState, PHDocument } from "document-model";
import type { PaymentTermsAction } from "./actions.js";
import type { PaymentTermsState as PaymentTermsGlobalState } from "./schema/types.js";

type PaymentTermsLocalState = Record<PropertyKey, never>;

type PaymentTermsPHState = PHBaseState & {
  global: PaymentTermsGlobalState;
  local: PaymentTermsLocalState;
};
type PaymentTermsDocument = PHDocument<PaymentTermsPHState>;

export * from "./schema/types.js";

export type {
  PaymentTermsAction,
  PaymentTermsDocument,
  PaymentTermsGlobalState,
  PaymentTermsLocalState,
  PaymentTermsPHState,
};
