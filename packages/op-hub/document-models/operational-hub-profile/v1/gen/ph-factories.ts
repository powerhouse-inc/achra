/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 * Factory methods for creating OperationalHubProfileDocument instances
 */
import type { PHAuthState, PHBaseState, PHDocumentState } from "document-model";
import { createBaseState, defaultBaseState } from "document-model";
import type {
  OperationalHubProfileDocument,
  OperationalHubProfileGlobalState,
  OperationalHubProfileLocalState,
  OperationalHubProfilePHState,
} from "./types.js";
import { utils } from "./utils.js";

export function defaultGlobalState(): OperationalHubProfileGlobalState {
  return { name: "", operatorTeam: null, subteams: [] };
}

export function defaultLocalState(): OperationalHubProfileLocalState {
  return {};
}

export function defaultPHState(): OperationalHubProfilePHState {
  return {
    ...defaultBaseState(),
    global: defaultGlobalState(),
    local: defaultLocalState(),
  };
}

export function createGlobalState(
  state?: Partial<OperationalHubProfileGlobalState>,
): OperationalHubProfileGlobalState {
  return {
    ...defaultGlobalState(),
    ...(state || {}),
  };
}

export function createLocalState(
  state?: Partial<OperationalHubProfileLocalState>,
): OperationalHubProfileLocalState {
  return {
    ...defaultLocalState(),
    ...(state || {}),
  } as OperationalHubProfileLocalState;
}

export function createState(
  baseState?: Partial<PHBaseState>,
  globalState?: Partial<OperationalHubProfileGlobalState>,
  localState?: Partial<OperationalHubProfileLocalState>,
): OperationalHubProfilePHState {
  return {
    ...createBaseState(baseState?.auth, baseState?.document),
    global: createGlobalState(globalState),
    local: createLocalState(localState),
  };
}

/**
 * Creates a OperationalHubProfileDocument with custom global and local state
 * This properly handles the PHBaseState requirements while allowing
 * document-specific state to be set.
 */
export function createOperationalHubProfileDocument(
  state?: Partial<{
    auth?: Partial<PHAuthState>;
    document?: Partial<PHDocumentState>;
    global?: Partial<OperationalHubProfileGlobalState>;
    local?: Partial<OperationalHubProfileLocalState>;
  }>,
): OperationalHubProfileDocument {
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
