/**
 * GraphQL client utility for fetching remote builder profiles from Switchboard.
 * Used as a fallback when local drives don't have the builder profile documents.
 */

function getGraphQLUrl(): string {
  if (typeof window === "undefined") {
    return "http://localhost:4001/graphql";
  }

  const baseURI = window.document.baseURI;

  if (baseURI.includes("localhost")) {
    return "http://localhost:4001/graphql";
  }

  if (baseURI.includes("-dev.")) {
    return "https://switchboard-dev.powerhouse.xyz/graphql";
  }

  if (baseURI.includes("-staging.")) {
    return "https://switchboard-staging.powerhouse.xyz/graphql";
  }

  return "https://switchboard.powerhouse.xyz/graphql";
}

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

const GET_BUILDER_PROFILES_QUERY = `
  query GetBuilderProfiles($limit: Int!) {
    BuilderProfile {
      documents(paging: { limit: $limit }) {
        items {
          id
          name
          state {
            global {
              name
              slug
              icon
            }
          }
        }
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
  };
}

interface BuilderProfilesResponse {
  BuilderProfile: {
    documents: {
      items: Array<{
        id: string;
        name: string;
        state: {
          global: {
            name: string | null;
            slug: string | null;
            icon: string | null;
          };
        };
      }>;
    };
  };
}

/**
 * Fetches all builder profiles from the Switchboard subgraph.
 * The subgraph aggregates documents across drives, so a single query covers them all.
 */
export async function fetchAllRemoteBuilderProfiles(): Promise<
  RemoteBuilderProfile[]
> {
  const data = await graphqlRequest<BuilderProfilesResponse>(
    GET_BUILDER_PROFILES_QUERY,
    { limit: 1000 },
    { silent: true },
  );

  const items = data?.BuilderProfile?.documents?.items ?? [];
  return items.map((item) => ({
    id: item.id,
    state: {
      name: item.state.global.name ?? item.name ?? null,
      slug: item.state.global.slug ?? null,
      icon: item.state.global.icon ?? null,
    },
  }));
}
