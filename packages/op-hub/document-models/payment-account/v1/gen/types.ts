/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import type { PHBaseState, PHDocument } from "document-model";
import type { PaymentAccountAction } from "./actions.js";
import type { PaymentAccountState as PaymentAccountGlobalState } from "./schema/types.js";

type PaymentAccountLocalState = Record<PropertyKey, never>;

type PaymentAccountPHState = PHBaseState & {
  global: PaymentAccountGlobalState;
  local: PaymentAccountLocalState;
};
type PaymentAccountDocument = PHDocument<PaymentAccountPHState>;

export * from "./schema/types.js";

export type {
  PaymentAccountAction,
  PaymentAccountDocument,
  PaymentAccountGlobalState,
  PaymentAccountLocalState,
  PaymentAccountPHState,
};
