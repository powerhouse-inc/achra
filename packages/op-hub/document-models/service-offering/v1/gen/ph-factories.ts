/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 * Factory methods for creating ServiceOfferingDocument instances
 */
import type { PHAuthState, PHBaseState, PHDocumentState } from "document-model";
import { createBaseState, defaultBaseState } from "document-model";
import type {
  ServiceOfferingDocument,
  ServiceOfferingGlobalState,
  ServiceOfferingLocalState,
  ServiceOfferingPHState,
} from "./types.js";
import { utils } from "./utils.js";

export function defaultGlobalState(): ServiceOfferingGlobalState {
  return {
    id: null,
    operatorId: null,
    resourceTemplateId: null,
    title: "",
    summary: "",
    description: null,
    thumbnailUrl: null,
    infoLink: null,
    status: "DRAFT",
    lastModified: null,
    availableBillingCycles: [],
    facetTargets: [],
    services: [],
    tiers: [],
    optionGroups: [],
  };
}

export function defaultLocalState(): ServiceOfferingLocalState {
  return {};
}

export function defaultPHState(): ServiceOfferingPHState {
  return {
    ...defaultBaseState(),
    global: defaultGlobalState(),
    local: defaultLocalState(),
  };
}

export function createGlobalState(
  state?: Partial<ServiceOfferingGlobalState>,
): ServiceOfferingGlobalState {
  return {
    ...defaultGlobalState(),
    ...(state || {}),
  };
}

export function createLocalState(
  state?: Partial<ServiceOfferingLocalState>,
): ServiceOfferingLocalState {
  return {
    ...defaultLocalState(),
    ...(state || {}),
  } as ServiceOfferingLocalState;
}

export function createState(
  baseState?: Partial<PHBaseState>,
  globalState?: Partial<ServiceOfferingGlobalState>,
  localState?: Partial<ServiceOfferingLocalState>,
): ServiceOfferingPHState {
  return {
    ...createBaseState(baseState?.auth, baseState?.document),
    global: createGlobalState(globalState),
    local: createLocalState(localState),
  };
}

/**
 * Creates a ServiceOfferingDocument with custom global and local state
 * This properly handles the PHBaseState requirements while allowing
 * document-specific state to be set.
 */
export function createServiceOfferingDocument(
  state?: Partial<{
    auth?: Partial<PHAuthState>;
    document?: Partial<PHDocumentState>;
    global?: Partial<ServiceOfferingGlobalState>;
    local?: Partial<ServiceOfferingLocalState>;
  }>,
): ServiceOfferingDocument {
  const document = utils.createDocument(
    createState(
      createBaseState(state?.auth, { version: 1, ...state?.document }),
      state?.global,
      state?.local,
    ),
  );

  return document;
}
