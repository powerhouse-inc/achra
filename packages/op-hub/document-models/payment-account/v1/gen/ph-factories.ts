/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 * Factory methods for creating PaymentAccountDocument instances
 */
import type { PHAuthState, PHBaseState, PHDocumentState } from "document-model";
import { createBaseState, defaultBaseState } from "document-model";
import type {
  PaymentAccountDocument,
  PaymentAccountGlobalState,
  PaymentAccountLocalState,
  PaymentAccountPHState,
} from "./types.js";
import { utils } from "./utils.js";

export function defaultGlobalState(): PaymentAccountGlobalState {
  return {
    operatorId: null,
    lastModified: null,
    stripeAccountId: null,
    stripeChargesEnabled: false,
    stripePayoutsEnabled: false,
    stripeDetailsSubmitted: false,
    stripeRequirementsCurrentlyDue: [],
    stripeRequirementsDisabledReason: null,
  };
}

export function defaultLocalState(): PaymentAccountLocalState {
  return {};
}

export function defaultPHState(): PaymentAccountPHState {
  return {
    ...defaultBaseState(),
    global: defaultGlobalState(),
    local: defaultLocalState(),
  };
}

export function createGlobalState(
  state?: Partial<PaymentAccountGlobalState>,
): PaymentAccountGlobalState {
  return {
    ...defaultGlobalState(),
    ...(state || {}),
  };
}

export function createLocalState(
  state?: Partial<PaymentAccountLocalState>,
): PaymentAccountLocalState {
  return {
    ...defaultLocalState(),
    ...(state || {}),
  } as PaymentAccountLocalState;
}

export function createState(
  baseState?: Partial<PHBaseState>,
  globalState?: Partial<PaymentAccountGlobalState>,
  localState?: Partial<PaymentAccountLocalState>,
): PaymentAccountPHState {
  return {
    ...createBaseState(baseState?.auth, baseState?.document),
    global: createGlobalState(globalState),
    local: createLocalState(localState),
  };
}

/**
 * Creates a PaymentAccountDocument with custom global and local state
 * This properly handles the PHBaseState requirements while allowing
 * document-specific state to be set.
 */
export function createPaymentAccountDocument(
  state?: Partial<{
    auth?: Partial<PHAuthState>;
    document?: Partial<PHDocumentState>;
    global?: Partial<PaymentAccountGlobalState>;
    local?: Partial<PaymentAccountLocalState>;
  }>,
): PaymentAccountDocument {
  const document = utils.createDocument(
    state
      ? createState(
          createBaseState(state.auth, state.document),
          state.global,
          state.local,
        )
      : undefined,
  );

  return document;
}
