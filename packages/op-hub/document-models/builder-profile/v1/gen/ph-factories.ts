/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 * Factory methods for creating BuilderProfileDocument instances
 */
import type { PHAuthState, PHBaseState, PHDocumentState } from "document-model";
import { createBaseState, defaultBaseState } from "document-model";
import type {
  BuilderProfileDocument,
  BuilderProfileGlobalState,
  BuilderProfileLocalState,
  BuilderProfilePHState,
} from "./types.js";
import { utils } from "./utils.js";

export function defaultGlobalState(): BuilderProfileGlobalState {
  return {
    id: null,
    walletAddress: null,
    code: null,
    slug: null,
    name: null,
    icon: null,
    description: null,
    about: null,
    lastModified: null,
    isOperator: false,
    operationalHubMember: {
      name: null,
      phid: null,
    },
    contributors: [],
    status: null,
    skills: [],
    scopes: [],
    links: [],
  };
}

export function defaultLocalState(): BuilderProfileLocalState {
  return {};
}

export function defaultPHState(): BuilderProfilePHState {
  return {
    ...defaultBaseState(),
    global: defaultGlobalState(),
    local: defaultLocalState(),
  };
}

export function createGlobalState(
  state?: Partial<BuilderProfileGlobalState>,
): BuilderProfileGlobalState {
  return {
    ...defaultGlobalState(),
    ...(state || {}),
  };
}

export function createLocalState(
  state?: Partial<BuilderProfileLocalState>,
): BuilderProfileLocalState {
  return {
    ...defaultLocalState(),
    ...(state || {}),
  } as BuilderProfileLocalState;
}

export function createState(
  baseState?: Partial<PHBaseState>,
  globalState?: Partial<BuilderProfileGlobalState>,
  localState?: Partial<BuilderProfileLocalState>,
): BuilderProfilePHState {
  return {
    ...createBaseState(baseState?.auth, baseState?.document),
    global: createGlobalState(globalState),
    local: createLocalState(localState),
  };
}

/**
 * Creates a BuilderProfileDocument with custom global and local state
 * This properly handles the PHBaseState requirements while allowing
 * document-specific state to be set.
 */
export function createBuilderProfileDocument(
  state?: Partial<{
    auth?: Partial<PHAuthState>;
    document?: Partial<PHDocumentState>;
    global?: Partial<BuilderProfileGlobalState>;
    local?: Partial<BuilderProfileLocalState>;
  }>,
): BuilderProfileDocument {
  const document = utils.createDocument(
    createState(
      createBaseState(state?.auth, { version: 1, ...state?.document }),
      state?.global,
      state?.local,
    ),
  );

  return document;
}
