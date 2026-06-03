/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 * Factory methods for creating FacetDocument instances
 */
import type { PHAuthState, PHBaseState, PHDocumentState } from "document-model";
import { createBaseState, defaultBaseState } from "document-model";
import type {
  FacetDocument,
  FacetGlobalState,
  FacetLocalState,
  FacetPHState,
} from "./types.js";
import { utils } from "./utils.js";

export function defaultGlobalState(): FacetGlobalState {
  return {
    id: null,
    name: "",
    description: null,
    lastModified: null,
    options: [],
  };
}

export function defaultLocalState(): FacetLocalState {
  return {};
}

export function defaultPHState(): FacetPHState {
  return {
    ...defaultBaseState(),
    global: defaultGlobalState(),
    local: defaultLocalState(),
  };
}

export function createGlobalState(
  state?: Partial<FacetGlobalState>,
): FacetGlobalState {
  return {
    ...defaultGlobalState(),
    ...(state || {}),
  };
}

export function createLocalState(
  state?: Partial<FacetLocalState>,
): FacetLocalState {
  return {
    ...defaultLocalState(),
    ...(state || {}),
  } as FacetLocalState;
}

export function createState(
  baseState?: Partial<PHBaseState>,
  globalState?: Partial<FacetGlobalState>,
  localState?: Partial<FacetLocalState>,
): FacetPHState {
  return {
    ...createBaseState(baseState?.auth, baseState?.document),
    global: createGlobalState(globalState),
    local: createLocalState(localState),
  };
}

/**
 * Creates a FacetDocument with custom global and local state
 * This properly handles the PHBaseState requirements while allowing
 * document-specific state to be set.
 */
export function createFacetDocument(
  state?: Partial<{
    auth?: Partial<PHAuthState>;
    document?: Partial<PHDocumentState>;
    global?: Partial<FacetGlobalState>;
    local?: Partial<FacetLocalState>;
  }>,
): FacetDocument {
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
