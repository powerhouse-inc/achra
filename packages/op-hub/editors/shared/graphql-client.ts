/**
 * GraphQL client utility for fetching remote builder profiles from Switchboard.
 * This is used as a fallback when local drives don't have the builder profile documents.
 */

import { getGraphQLUrl } from "./graphql.js";

interface GraphQLResponse<T> {
  data?: T;
  errors?: Array<{ message: string }>;
}

async function graphqlRequest<T>(
  query: string,
  variables?: Record<string, unknown>,
  options?: { silent?: boolean },
): Promise<T | null> {
  try {
    const response = await fetch(getGraphQLUrl(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
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

    // Return data even if there are errors - partial data might still be useful
    // Only treat as full failure if there's no data at all
    if (result.errors?.length && !result.data) {
      if (!options?.silent) {
        console.warn("[graphql-client] GraphQL errors:", result.errors);
      }
      return null;
    }

    return result.data ?? null;
  } catch (error) {
    // Silently fail - this is a fallback mechanism
    if (!options?.silent) {
      console.warn("[graphql-client] Request error:", error);
    }
    return null;
  }
}

// Query to find all builder profile documents
const FIND_BUILDER_PROFILES_QUERY = `
  query FindBuilderProfiles {
    findDocuments(search: { type: "powerhouse/builder-profile" }) {
      items {
        id
        name
        state
      }
      totalCount
    }
  }
`;

// Query to get a single builder profile by identifier
const GET_BUILDER_PROFILE_QUERY = `
  query GetBuilderProfile($identifier: String!) {
    document(identifier: $identifier) {
      document {
        id
        name
        state
      }
    }
  }
`;

export interface RemoteBuilderProfile {
  id: string;
  state: {
    name: string | null;
    slug: string | null;
    icon: string | null;
    description: string | null;
  };
}

function getGlobalState(
  state: Record<string, unknown>,
): Record<string, unknown> {
  if (state && typeof state === "object" && "global" in state) {
    return (state as { global: Record<string, unknown> }).global;
  }
  return state;
}

interface FindBuilderProfilesItem {
  id: string;
  name: string;
  state: Record<string, unknown>;
}

interface FindBuilderProfilesResponse {
  findDocuments: {
    items: FindBuilderProfilesItem[];
    totalCount: number;
  };
}

interface SingleBuilderProfileResponse {
  document: {
    document: FindBuilderProfilesItem;
  } | null;
}

function toRemoteProfile(item: FindBuilderProfilesItem): RemoteBuilderProfile {
  const global = getGlobalState(item.state);
  return {
    id: item.id,
    state: {
      name: (global.name as string) ?? null,
      slug: (global.slug as string) ?? null,
      icon: (global.icon as string) ?? null,
      description: (global.description as string) ?? null,
    },
  };
}

/**
 * Fetches a single builder profile by document ID
 */
export async function fetchBuilderProfileById(
  docId: string,
): Promise<RemoteBuilderProfile | null> {
  const data = await graphqlRequest<SingleBuilderProfileResponse>(
    GET_BUILDER_PROFILE_QUERY,
    { identifier: docId },
  );
  const item = data?.document?.document;
  return item ? toRemoteProfile(item) : null;
}

/**
 * Fetches all builder profiles using BuilderProfile_findDocuments.
 */
export async function fetchAllRemoteBuilderProfiles(): Promise<
  RemoteBuilderProfile[]
> {
  try {
    const data = await graphqlRequest<FindBuilderProfilesResponse>(
      FIND_BUILDER_PROFILES_QUERY,
    );
    const items = data?.findDocuments?.items ?? [];
    return items.map(toRemoteProfile);
  } catch {
    return [];
  }
}

/**
 * Fetches multiple builder profiles by their IDs.
 */
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

    // For any missing profiles, try direct fetch
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

// Mutation to set operational hub member on a builder profile
const SET_OP_HUB_MEMBER_MUTATION = `
  mutation SetOpHubMember($documentIdentifier: String!, $actions: [JSONObject!]!) {
    mutateDocument(documentIdentifier: $documentIdentifier, actions: $actions) {
      id
      name
    }
  }
`;

export interface SetOpHubMemberInput {
  name: string | null;
  phid: string | null;
}

interface SetOpHubMemberResponse {
  mutateDocument: { id: string; name: string } | null;
}

/**
 * Sets the operational hub member on a builder profile document.
 *
 * @param docId - The builder profile document ID (PHID)
 * @param input - The operational hub member data (name and phid of the op hub)
 * @returns true if successful, false otherwise
 */
export async function setOpHubMemberOnBuilderProfile(
  docId: string,
  input: SetOpHubMemberInput,
): Promise<boolean> {
  try {
    const data = await graphqlRequest<SetOpHubMemberResponse>(
      SET_OP_HUB_MEMBER_MUTATION,
      {
        documentIdentifier: docId,
        actions: [{ type: "SET_OP_HUB_MEMBER", input, scope: "global" }],
      },
    );
    return data?.mutateDocument != null;
  } catch (error) {
    console.warn("[graphql-client] Failed to set op hub member:", error);
    return false;
  }
}
