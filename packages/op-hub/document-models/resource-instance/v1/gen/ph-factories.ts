/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 * Factory methods for creating ResourceInstanceDocument instances
 */
import type { PHAuthState, PHBaseState, PHDocumentState } from "document-model";
import { createBaseState, defaultBaseState } from "document-model";
import type {
  ResourceInstanceDocument,
  ResourceInstanceGlobalState,
  ResourceInstanceLocalState,
  ResourceInstancePHState,
} from "./types.js";
import { utils } from "./utils.js";

export function defaultGlobalState(): ResourceInstanceGlobalState {
  return {
    resourceTemplateId: null,
    customerId: null,
    customerName: null,
    templateName: null,
    thumbnailUrl: null,
    infoLink: null,
    description: null,
    operatorProfile: null,
    status: "DRAFT",
    configuration: [],
    confirmedAt: null,
    provisioningStartedAt: null,
    provisioningCompletedAt: null,
    provisioningFailureReason: null,
    activatedAt: null,
    suspendedAt: null,
    suspensionType: null,
    suspensionReason: null,
    suspensionDetails: null,
    resumedAt: null,
    terminatedAt: null,
    terminationReason: null,
  };
}

export function defaultLocalState(): ResourceInstanceLocalState {
  return {};
}

export function defaultPHState(): ResourceInstancePHState {
  return {
    ...defaultBaseState(),
    global: defaultGlobalState(),
    local: defaultLocalState(),
  };
}

export function createGlobalState(
  state?: Partial<ResourceInstanceGlobalState>,
): ResourceInstanceGlobalState {
  return {
    ...defaultGlobalState(),
    ...(state || {}),
  };
}

export function createLocalState(
  state?: Partial<ResourceInstanceLocalState>,
): ResourceInstanceLocalState {
  return {
    ...defaultLocalState(),
    ...(state || {}),
  } as ResourceInstanceLocalState;
}

export function createState(
  baseState?: Partial<PHBaseState>,
  globalState?: Partial<ResourceInstanceGlobalState>,
  localState?: Partial<ResourceInstanceLocalState>,
): ResourceInstancePHState {
  return {
    ...createBaseState(baseState?.auth, baseState?.document),
    global: createGlobalState(globalState),
    local: createLocalState(localState),
  };
}

/**
 * Creates a ResourceInstanceDocument with custom global and local state
 * This properly handles the PHBaseState requirements while allowing
 * document-specific state to be set.
 */
export function createResourceInstanceDocument(
  state?: Partial<{
    auth?: Partial<PHAuthState>;
    document?: Partial<PHDocumentState>;
    global?: Partial<ResourceInstanceGlobalState>;
    local?: Partial<ResourceInstanceLocalState>;
  }>,
): ResourceInstanceDocument {
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
