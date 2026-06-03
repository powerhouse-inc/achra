/**
 * Shared GraphQL utility for determining the correct Switchboard URL
 * based on the current environment.
 */

export function getGraphQLUrl(): string {
  if (typeof window === "undefined") {
    return "http://localhost:4001/graphql";
  }

  const baseURI = window.document.baseURI;

  if (baseURI.includes("localhost")) {
    return "http://localhost:4001/graphql";
  }

  const url = new URL(baseURI);
  // Matches `connect.X` (Vetra-style: connect.mild-dove-63.vetra.io)
  // and `connect-X` (Powerhouse-style: connect-staging.powerhouse.xyz,
  // connect-dev.powerhouse.xyz). The captured separator is preserved.
  url.host = url.host.replace(/^connect([.-])/, "switchboard$1");
  return `${url.origin}/graphql`;
}

/**
 * Returns the GraphQL endpoint for a custom subgraph.
 * Custom subgraphs are served at `/graphql/<subgraph-name>`.
 */
export function getSubgraphUrl(subgraph: string): string {
  return `${getGraphQLUrl()}/${subgraph}`;
}
