/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 * Factory methods for creating ResourceTemplateDocument instances
 */
import type { PHAuthState, PHBaseState, PHDocumentState } from "document-model";
import { createBaseState, defaultBaseState } from "document-model";
import type {
  ResourceTemplateDocument,
  ResourceTemplateGlobalState,
  ResourceTemplateLocalState,
  ResourceTemplatePHState,
} from "./types.js";
import { utils } from "./utils.js";

export function defaultGlobalState(): ResourceTemplateGlobalState {
  return {
    id: null,
    operatorId: null,
    title: "",
    summary: "",
    description: null,
    thumbnailUrl: null,
    infoLink: null,
    status: "DRAFT",
    lastModified: null,
    targetAudiences: [],
    setupServices: [],
    recurringServices: [],
    facetTargets: [],
    services: [],
    optionGroups: [],
    faqFields: [],
    contentSections: [],
    weight: null,
    subtitle: null,
  };
}

export function defaultLocalState(): ResourceTemplateLocalState {
  return {};
}

export function defaultPHState(): ResourceTemplatePHState {
  return {
    ...defaultBaseState(),
    global: defaultGlobalState(),
    local: defaultLocalState(),
  };
}

export function createGlobalState(
  state?: Partial<ResourceTemplateGlobalState>,
): ResourceTemplateGlobalState {
  return {
    ...defaultGlobalState(),
    ...(state || {}),
  };
}

export function createLocalState(
  state?: Partial<ResourceTemplateLocalState>,
): ResourceTemplateLocalState {
  return {
    ...defaultLocalState(),
    ...(state || {}),
  } as ResourceTemplateLocalState;
}

export function createState(
  baseState?: Partial<PHBaseState>,
  globalState?: Partial<ResourceTemplateGlobalState>,
  localState?: Partial<ResourceTemplateLocalState>,
): ResourceTemplatePHState {
  return {
    ...createBaseState(baseState?.auth, baseState?.document),
    global: createGlobalState(globalState),
    local: createLocalState(localState),
  };
}

/**
 * Creates a ResourceTemplateDocument with custom global and local state
 * This properly handles the PHBaseState requirements while allowing
 * document-specific state to be set.
 */
export function createResourceTemplateDocument(
  state?: Partial<{
    auth?: Partial<PHAuthState>;
    document?: Partial<PHDocumentState>;
    global?: Partial<ResourceTemplateGlobalState>;
    local?: Partial<ResourceTemplateLocalState>;
  }>,
): ResourceTemplateDocument {
  const document = utils.createDocument(
    createState(
      createBaseState(state?.auth, { version: 1, ...state?.document }),
      state?.global,
      state?.local,
    ),
  );

  return document;
}
