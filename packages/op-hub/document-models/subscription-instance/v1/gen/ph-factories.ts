/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 * Factory methods for creating SubscriptionInstanceDocument instances
 */
import type { PHAuthState, PHBaseState, PHDocumentState } from "document-model";
import { createBaseState, defaultBaseState } from "document-model";
import type {
  SubscriptionInstanceDocument,
  SubscriptionInstanceGlobalState,
  SubscriptionInstanceLocalState,
  SubscriptionInstancePHState,
} from "./types.js";
import { utils } from "./utils.js";

export function defaultGlobalState(): SubscriptionInstanceGlobalState {
  return {
    customerId: null,
    customerName: null,
    customerEmail: null,
    customerType: null,
    teamMemberCount: null,
    operatorId: null,
    serviceOfferingId: null,
    tierName: null,
    tierPricingOptionId: null,
    tierPrice: null,
    tierCurrency: null,
    tierPricingMode: null,
    selectedBillingCycle: null,
    globalCurrency: null,
    resource: null,
    status: "PENDING",
    createdAt: null,
    activatedSince: null,
    pausedSince: null,
    expiringSince: null,
    cancelledSince: null,
    cancellationReason: null,
    autoRenew: false,
    operatorNotes: null,
    nextBillingDate: null,
    currentBillingCycleStart: null,
    totalDebt: null,
    totalCredit: null,
    currentCycleOverage: null,
    debtLineItems: [],
    services: [],
    serviceGroups: [],
  };
}

export function defaultLocalState(): SubscriptionInstanceLocalState {
  return {};
}

export function defaultPHState(): SubscriptionInstancePHState {
  return {
    ...defaultBaseState(),
    global: defaultGlobalState(),
    local: defaultLocalState(),
  };
}

export function createGlobalState(
  state?: Partial<SubscriptionInstanceGlobalState>,
): SubscriptionInstanceGlobalState {
  return {
    ...defaultGlobalState(),
    ...(state || {}),
  };
}

export function createLocalState(
  state?: Partial<SubscriptionInstanceLocalState>,
): SubscriptionInstanceLocalState {
  return {
    ...defaultLocalState(),
    ...(state || {}),
  } as SubscriptionInstanceLocalState;
}

export function createState(
  baseState?: Partial<PHBaseState>,
  globalState?: Partial<SubscriptionInstanceGlobalState>,
  localState?: Partial<SubscriptionInstanceLocalState>,
): SubscriptionInstancePHState {
  return {
    ...createBaseState(baseState?.auth, baseState?.document),
    global: createGlobalState(globalState),
    local: createLocalState(localState),
  };
}

/**
 * Creates a SubscriptionInstanceDocument with custom global and local state
 * This properly handles the PHBaseState requirements while allowing
 * document-specific state to be set.
 */
export function createSubscriptionInstanceDocument(
  state?: Partial<{
    auth?: Partial<PHAuthState>;
    document?: Partial<PHDocumentState>;
    global?: Partial<SubscriptionInstanceGlobalState>;
    local?: Partial<SubscriptionInstanceLocalState>;
  }>,
): SubscriptionInstanceDocument {
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
