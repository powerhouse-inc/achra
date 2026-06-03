/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 * Factory methods for creating ScopeOfWorkDocument instances
 */
import type { PHAuthState, PHBaseState, PHDocumentState } from "document-model";
import { createBaseState, defaultBaseState } from "document-model";
import type {
  ScopeOfWorkDocument,
  ScopeOfWorkGlobalState,
  ScopeOfWorkLocalState,
  ScopeOfWorkPHState,
} from "./types.js";
import { utils } from "./utils.js";

export function defaultGlobalState(): ScopeOfWorkGlobalState {
  return {
    title: "Scope of Work",
    description:
      "The Scope of Work model defines a structured plan for executing contributor work; on top of deliverables and roadmaps with milestones it now also includes projects as budget anchors for project based budgeting.",
    status: "DRAFT",
    deliverables: [],
    projects: [],
    roadmaps: [],
    contributors: [],
  };
}

export function defaultLocalState(): ScopeOfWorkLocalState {
  return {};
}

export function defaultPHState(): ScopeOfWorkPHState {
  return {
    ...defaultBaseState(),
    global: defaultGlobalState(),
    local: defaultLocalState(),
  };
}

export function createGlobalState(
  state?: Partial<ScopeOfWorkGlobalState>,
): ScopeOfWorkGlobalState {
  return {
    ...defaultGlobalState(),
    ...(state || {}),
  };
}

export function createLocalState(
  state?: Partial<ScopeOfWorkLocalState>,
): ScopeOfWorkLocalState {
  return {
    ...defaultLocalState(),
    ...(state || {}),
  } as ScopeOfWorkLocalState;
}

export function createState(
  baseState?: Partial<PHBaseState>,
  globalState?: Partial<ScopeOfWorkGlobalState>,
  localState?: Partial<ScopeOfWorkLocalState>,
): ScopeOfWorkPHState {
  return {
    ...createBaseState(baseState?.auth, baseState?.document),
    global: createGlobalState(globalState),
    local: createLocalState(localState),
  };
}

/**
 * Creates a ScopeOfWorkDocument with custom global and local state
 * This properly handles the PHBaseState requirements while allowing
 * document-specific state to be set.
 */
export function createScopeOfWorkDocument(
  state?: Partial<{
    auth?: Partial<PHAuthState>;
    document?: Partial<PHDocumentState>;
    global?: Partial<ScopeOfWorkGlobalState>;
    local?: Partial<ScopeOfWorkLocalState>;
  }>,
): ScopeOfWorkDocument {
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
