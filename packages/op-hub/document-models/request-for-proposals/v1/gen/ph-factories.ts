/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 * Factory methods for creating RequestForProposalsDocument instances
 */
import type { PHAuthState, PHBaseState, PHDocumentState } from "document-model";
import { createBaseState, defaultBaseState } from "document-model";
import type {
  RequestForProposalsDocument,
  RequestForProposalsGlobalState,
  RequestForProposalsLocalState,
  RequestForProposalsPHState,
} from "./types.js";
import { utils } from "./utils.js";

export function defaultGlobalState(): RequestForProposalsGlobalState {
  return {
    issuer: "placeholder-id",
    code: null,
    title: "",
    summary: "",
    briefing: "",
    rfpCommenter: [],
    eligibilityCriteria: "",
    evaluationCriteria: "",
    budgetRange: {
      min: null,
      max: null,
      currency: null,
    },
    contextDocuments: [],
    status: "DRAFT",
    proposals: [],
    deadline: null,
    tags: null,
  };
}

export function defaultLocalState(): RequestForProposalsLocalState {
  return {};
}

export function defaultPHState(): RequestForProposalsPHState {
  return {
    ...defaultBaseState(),
    global: defaultGlobalState(),
    local: defaultLocalState(),
  };
}

export function createGlobalState(
  state?: Partial<RequestForProposalsGlobalState>,
): RequestForProposalsGlobalState {
  return {
    ...defaultGlobalState(),
    ...(state || {}),
  };
}

export function createLocalState(
  state?: Partial<RequestForProposalsLocalState>,
): RequestForProposalsLocalState {
  return {
    ...defaultLocalState(),
    ...(state || {}),
  } as RequestForProposalsLocalState;
}

export function createState(
  baseState?: Partial<PHBaseState>,
  globalState?: Partial<RequestForProposalsGlobalState>,
  localState?: Partial<RequestForProposalsLocalState>,
): RequestForProposalsPHState {
  return {
    ...createBaseState(baseState?.auth, baseState?.document),
    global: createGlobalState(globalState),
    local: createLocalState(localState),
  };
}

/**
 * Creates a RequestForProposalsDocument with custom global and local state
 * This properly handles the PHBaseState requirements while allowing
 * document-specific state to be set.
 */
export function createRequestForProposalsDocument(
  state?: Partial<{
    auth?: Partial<PHAuthState>;
    document?: Partial<PHDocumentState>;
    global?: Partial<RequestForProposalsGlobalState>;
    local?: Partial<RequestForProposalsLocalState>;
  }>,
): RequestForProposalsDocument {
  const document = utils.createDocument(
    createState(
      createBaseState(state?.auth, { version: 1, ...state?.document }),
      state?.global,
      state?.local,
    ),
  );

  return document;
}
