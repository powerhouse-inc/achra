/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 * Factory methods for creating PaymentTermsDocument instances
 */
import type { PHAuthState, PHBaseState, PHDocumentState } from "document-model";
import { createBaseState, defaultBaseState } from "document-model";
import type {
  PaymentTermsDocument,
  PaymentTermsGlobalState,
  PaymentTermsLocalState,
  PaymentTermsPHState,
} from "./types.js";
import { utils } from "./utils.js";

export function defaultGlobalState(): PaymentTermsGlobalState {
  return {
    status: "DRAFT",
    proposer: "",
    payer: "",
    currency: "USD",
    paymentModel: "MILESTONE",
    totalAmount: null,
    milestoneSchedule: [],
    costAndMaterials: null,
    retainerDetails: null,
    escrowDetails: null,
    evaluation: null,
    bonusClauses: [],
    penaltyClauses: [],
  };
}

export function defaultLocalState(): PaymentTermsLocalState {
  return {};
}

export function defaultPHState(): PaymentTermsPHState {
  return {
    ...defaultBaseState(),
    global: defaultGlobalState(),
    local: defaultLocalState(),
  };
}

export function createGlobalState(
  state?: Partial<PaymentTermsGlobalState>,
): PaymentTermsGlobalState {
  return {
    ...defaultGlobalState(),
    ...(state || {}),
  };
}

export function createLocalState(
  state?: Partial<PaymentTermsLocalState>,
): PaymentTermsLocalState {
  return {
    ...defaultLocalState(),
    ...(state || {}),
  } as PaymentTermsLocalState;
}

export function createState(
  baseState?: Partial<PHBaseState>,
  globalState?: Partial<PaymentTermsGlobalState>,
  localState?: Partial<PaymentTermsLocalState>,
): PaymentTermsPHState {
  return {
    ...createBaseState(baseState?.auth, baseState?.document),
    global: createGlobalState(globalState),
    local: createLocalState(localState),
  };
}

/**
 * Creates a PaymentTermsDocument with custom global and local state
 * This properly handles the PHBaseState requirements while allowing
 * document-specific state to be set.
 */
export function createPaymentTermsDocument(
  state?: Partial<{
    auth?: Partial<PHAuthState>;
    document?: Partial<PHDocumentState>;
    global?: Partial<PaymentTermsGlobalState>;
    local?: Partial<PaymentTermsLocalState>;
  }>,
): PaymentTermsDocument {
  const document = utils.createDocument(
    createState(
      createBaseState(state?.auth, { version: 1, ...state?.document }),
      state?.global,
      state?.local,
    ),
  );

  return document;
}
