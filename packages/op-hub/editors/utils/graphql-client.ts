/**
 * Shared GraphQL client for fetching data from the Reactor API.
 * All editors should import from this module instead of maintaining their own copies.
 */

// ── URL resolution ──

function getGraphQLUrl(): string {
  if (typeof window === "undefined") {
    return "http://localhost:4001/graphql";
  }

  const baseURI = window.document.baseURI;

  if (baseURI.includes("localhost")) {
    return "http://localhost:4001/graphql";
  }

  const url = new URL(baseURI);
  url.host = url.host.replace(/^connect([.-])/, "switchboard$1");
  return `${url.origin}/graphql`;
}

// ── Generic request helper ──

interface GraphQLResponse<T> {
  data?: T;
  errors?: Array<{ message: string }>;
}

export async function graphqlRequest<T>(
  query: string,
  variables?: Record<string, unknown>,
  options?: { silent?: boolean },
): Promise<T | null> {
  try {
    const response = await fetch(getGraphQLUrl(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables }),
    });

    if (!response.ok) {
      if (!options?.silent) {
        console.warn(
          "[graphql-client] Request failed:",
          response.status,
          response.statusText,
        );
      }
      return null;
    }

    const result = (await response.json()) as GraphQLResponse<T>;

    if (result.errors?.length && !result.data) {
      if (!options?.silent) {
        console.warn("[graphql-client] GraphQL errors:", result.errors);
      }
      return null;
    }

    return result.data ?? null;
  } catch (error) {
    if (!options?.silent) {
      console.warn("[graphql-client] Request error:", error);
    }
    return null;
  }
}

// ── Shared types ──

export interface FindDocumentsItem {
  id: string;
  name: string;
  state: Record<string, unknown>;
}

interface FindDocumentsResponse {
  findDocuments: {
    items: FindDocumentsItem[];
    totalCount: number;
  };
}

interface SingleDocumentResponse {
  document: {
    document: FindDocumentsItem;
  } | null;
}

interface MutateDocumentResponse {
  mutateDocument: { id: string; name: string } | null;
}

// ── Helpers ──

export function getGlobalState(
  state: Record<string, unknown>,
): Record<string, unknown> {
  if (state && typeof state === "object" && "global" in state) {
    return (state as { global: Record<string, unknown> }).global;
  }
  return state;
}

// ── Generic queries ──

const FIND_DOCUMENTS_QUERY = `
  query FindDocuments($type: String!) {
    findDocuments(search: { type: $type }) {
      items { id name state }
      totalCount
    }
  }
`;

const GET_DOCUMENT_QUERY = `
  query GetDocument($identifier: String!) {
    document(identifier: $identifier) {
      document { id name state }
    }
  }
`;

const MUTATE_DOCUMENT_MUTATION = `
  mutation MutateDocument($documentIdentifier: String!, $actions: [JSONObject!]!) {
    mutateDocument(documentIdentifier: $documentIdentifier, actions: $actions) {
      id
      name
    }
  }
`;

export async function findDocuments(
  type: string,
  options?: { silent?: boolean },
): Promise<FindDocumentsItem[]> {
  const data = await graphqlRequest<FindDocumentsResponse>(
    FIND_DOCUMENTS_QUERY,
    { type },
    options,
  );
  return data?.findDocuments?.items ?? [];
}

export async function getDocument(
  identifier: string,
): Promise<FindDocumentsItem | null> {
  const data = await graphqlRequest<SingleDocumentResponse>(
    GET_DOCUMENT_QUERY,
    { identifier },
  );
  return data?.document?.document ?? null;
}

export async function mutateDocument(
  documentIdentifier: string,
  actions: Array<{ type: string; input: unknown; scope: string }>,
): Promise<{ id: string; name: string } | null> {
  const data = await graphqlRequest<MutateDocumentResponse>(
    MUTATE_DOCUMENT_MUTATION,
    { documentIdentifier, actions },
  );
  return data?.mutateDocument ?? null;
}

// ── Builder Profile queries ──

export interface RemoteBuilderProfile {
  id: string;
  state: {
    name: string | null;
    slug: string | null;
    icon: string | null;
    description?: string | null;
  };
}

function toRemoteProfile(
  item: FindDocumentsItem,
  includeDescription = false,
): RemoteBuilderProfile {
  const global = getGlobalState(item.state);
  const profile: RemoteBuilderProfile = {
    id: item.id,
    state: {
      name: (global.name as string) ?? null,
      slug: (global.slug as string) ?? null,
      icon: (global.icon as string) ?? null,
    },
  };
  if (includeDescription) {
    profile.state.description = (global.description as string) ?? null;
  }
  return profile;
}

export async function fetchBuilderProfileById(
  docId: string,
): Promise<RemoteBuilderProfile | null> {
  const item = await getDocument(docId);
  return item ? toRemoteProfile(item, true) : null;
}

export async function fetchAllRemoteBuilderProfiles(): Promise<
  RemoteBuilderProfile[]
> {
  try {
    const items = await findDocuments("powerhouse/builder-profile");
    return items.map((item) => toRemoteProfile(item, true));
  } catch {
    return [];
  }
}

export async function fetchRemoteBuilderProfilesByIds(
  phids: string[],
): Promise<Map<string, RemoteBuilderProfile>> {
  if (!phids.length) {
    return new Map();
  }

  try {
    const allProfiles = await fetchAllRemoteBuilderProfiles();

    const result = new Map<string, RemoteBuilderProfile>();
    for (const profile of allProfiles) {
      if (phids.includes(profile.id)) {
        result.set(profile.id, profile);
      }
    }

    const missingPhids = phids.filter((phid) => !result.has(phid));
    if (missingPhids.length > 0) {
      const directFetches = missingPhids.map(async (phid) => {
        const profile = await fetchBuilderProfileById(phid);
        if (profile) {
          result.set(phid, profile);
        }
      });
      await Promise.all(directFetches);
    }

    return result;
  } catch {
    return new Map();
  }
}

// ── Resource Template queries ──

interface RemoteResourceTemplateService {
  id: string;
  title: string;
  isSetupFormation: boolean;
  description: string | null;
  displayOrder: number | null;
  optionGroupId: string | null;
}

export interface RemoteResourceTemplate {
  id: string;
  name: string | null;
  operatorName?: string | null;
  state: {
    id: string | null;
    operatorId: string | null;
    title: string | null;
    summary: string | null;
    description: string | null;
    thumbnailUrl: string | null;
    infoLink: string | null;
    status: string | null;
    lastModified: string | null;
    targetAudiences: Array<{
      id: string;
      label: string;
      color: string | null;
    }>;
    setupServices: string[];
    recurringServices: string[];
    facetTargets: Array<{
      id: string;
      categoryKey: string;
      categoryLabel: string;
      selectedOptions: string[];
    }>;
    services: RemoteResourceTemplateService[];
  };
}

const RESOURCE_TEMPLATES_QUERY = `
  query ResourceTemplates {
    resourceTemplates {
      id
      operatorId
      title
      summary
      description
      thumbnailUrl
      infoLink
      status
      lastModified
      targetAudiences { id label color }
      setupServices
      recurringServices
      facetTargets { id categoryKey categoryLabel selectedOptions }
      services { id title isSetupFormation description displayOrder optionGroupId }
    }
  }
`;

interface ResourceTemplatesResponse {
  resourceTemplates: Array<{
    id: string;
    operatorId: string;
    title: string;
    summary: string;
    description: string | null;
    thumbnailUrl: string | null;
    infoLink: string | null;
    status: string;
    lastModified: string;
    targetAudiences: Array<{ id: string; label: string; color: string | null }>;
    setupServices: string[];
    recurringServices: string[];
    facetTargets: Array<{
      id: string;
      categoryKey: string;
      categoryLabel: string;
      selectedOptions: string[];
    }>;
    services: RemoteResourceTemplateService[];
  }>;
}

export async function fetchAllRemoteResourceTemplates(): Promise<
  RemoteResourceTemplate[]
> {
  try {
    const data = await graphqlRequest<ResourceTemplatesResponse>(
      RESOURCE_TEMPLATES_QUERY,
      undefined,
      { silent: true },
    );
    return (data?.resourceTemplates ?? []).map((t) => ({
      id: t.id,
      name: t.title,
      state: {
        id: t.id,
        operatorId: t.operatorId,
        title: t.title,
        summary: t.summary,
        description: t.description,
        thumbnailUrl: t.thumbnailUrl,
        infoLink: t.infoLink,
        status: t.status,
        lastModified: t.lastModified,
        targetAudiences: t.targetAudiences ?? [],
        setupServices: t.setupServices ?? [],
        recurringServices: t.recurringServices ?? [],
        facetTargets: t.facetTargets ?? [],
        services: t.services ?? [],
      },
    }));
  } catch {
    return [];
  }
}

// ── SetOpHubMember mutation ──

export interface SetOpHubMemberInput {
  name: string | null;
  phid: string | null;
}

export async function setOpHubMemberOnBuilderProfile(
  docId: string,
  input: SetOpHubMemberInput,
): Promise<boolean> {
  try {
    const result = await mutateDocument(docId, [
      { type: "SET_OP_HUB_MEMBER", input, scope: "global" },
    ]);
    return result !== null;
  } catch (error) {
    console.warn("[graphql-client] Failed to set op hub member:", error);
    return false;
  }
}
