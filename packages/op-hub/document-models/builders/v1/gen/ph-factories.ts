/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 * Factory methods for creating BuildersDocument instances
 */
import type { PHAuthState, PHBaseState, PHDocumentState } from "document-model";
import { createBaseState, defaultBaseState } from "document-model";
import type {
  BuildersDocument,
  BuildersGlobalState,
  BuildersLocalState,
  BuildersPHState,
} from "./types.js";
import { utils } from "./utils.js";

export function defaultGlobalState(): BuildersGlobalState {
  return {
    builders: [],
  };
}

export function defaultLocalState(): BuildersLocalState {
  return {};
}

export function defaultPHState(): BuildersPHState {
  return {
    ...defaultBaseState(),
    global: defaultGlobalState(),
    local: defaultLocalState(),
  };
}

export function createGlobalState(
  state?: Partial<BuildersGlobalState>,
): BuildersGlobalState {
  return {
    ...defaultGlobalState(),
    ...(state || {}),
  };
}

export function createLocalState(
  state?: Partial<BuildersLocalState>,
): BuildersLocalState {
  return {
    ...defaultLocalState(),
    ...(state || {}),
  } as BuildersLocalState;
}

export function createState(
  baseState?: Partial<PHBaseState>,
  globalState?: Partial<BuildersGlobalState>,
  localState?: Partial<BuildersLocalState>,
): BuildersPHState {
  return {
    ...createBaseState(baseState?.auth, baseState?.document),
    global: createGlobalState(globalState),
    local: createLocalState(localState),
  };
}

/**
 * Creates a BuildersDocument with custom global and local state
 * This properly handles the PHBaseState requirements while allowing
 * document-specific state to be set.
 */
export function createBuildersDocument(
  state?: Partial<{
    auth?: Partial<PHAuthState>;
    document?: Partial<PHDocumentState>;
    global?: Partial<BuildersGlobalState>;
    local?: Partial<BuildersLocalState>;
  }>,
): BuildersDocument {
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
