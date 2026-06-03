/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 * Factory methods for creating SubscriptionInvoiceDocument instances
 */
import type { PHAuthState, PHBaseState, PHDocumentState } from "document-model";
import { createBaseState, defaultBaseState } from "document-model";
import type {
  SubscriptionInvoiceDocument,
  SubscriptionInvoiceGlobalState,
  SubscriptionInvoiceLocalState,
  SubscriptionInvoicePHState,
} from "./types.js";
import { utils } from "./utils.js";

export function defaultGlobalState(): SubscriptionInvoiceGlobalState {
  return {
    invoiceNumber: null,
    issuedAt: null,
    dueDate: null,
    status: "DRAFT",
    customerId: null,
    customerName: null,
    customerEmail: null,
    sourceSubscriptionId: null,
    sourceSubscriptionName: null,
    cycleStart: null,
    cycleEnd: null,
    billingCycle: null,
    lineItems: [],
    currency: null,
    subtotal: 0,
    creditApplied: 0,
    totalDue: 0,
    totalPaid: 0,
    stripeInvoiceId: null,
    notes: null,
  };
}

export function defaultLocalState(): SubscriptionInvoiceLocalState {
  return {};
}

export function defaultPHState(): SubscriptionInvoicePHState {
  return {
    ...defaultBaseState(),
    global: defaultGlobalState(),
    local: defaultLocalState(),
  };
}

export function createGlobalState(
  state?: Partial<SubscriptionInvoiceGlobalState>,
): SubscriptionInvoiceGlobalState {
  return {
    ...defaultGlobalState(),
    ...(state || {}),
  };
}

export function createLocalState(
  state?: Partial<SubscriptionInvoiceLocalState>,
): SubscriptionInvoiceLocalState {
  return {
    ...defaultLocalState(),
    ...(state || {}),
  } as SubscriptionInvoiceLocalState;
}

export function createState(
  baseState?: Partial<PHBaseState>,
  globalState?: Partial<SubscriptionInvoiceGlobalState>,
  localState?: Partial<SubscriptionInvoiceLocalState>,
): SubscriptionInvoicePHState {
  return {
    ...createBaseState(baseState?.auth, baseState?.document),
    global: createGlobalState(globalState),
    local: createLocalState(localState),
  };
}

/**
 * Creates a SubscriptionInvoiceDocument with custom global and local state
 * This properly handles the PHBaseState requirements while allowing
 * document-specific state to be set.
 */
export function createSubscriptionInvoiceDocument(
  state?: Partial<{
    auth?: Partial<PHAuthState>;
    document?: Partial<PHDocumentState>;
    global?: Partial<SubscriptionInvoiceGlobalState>;
    local?: Partial<SubscriptionInvoiceLocalState>;
  }>,
): SubscriptionInvoiceDocument {
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
