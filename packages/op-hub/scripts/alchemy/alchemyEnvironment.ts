/**
 * Environment-aware configuration for Alchemy API integration
 * Follows the contributor-billing pattern for local/remote compatibility
 */

import { getSubgraphUrl } from "../../editors/shared/graphql.js";

function getGraphQLUrl(): string {
  return getSubgraphUrl("acc-txs-addon");
}

// Cache the URL to avoid recalculating on every access
let cachedUrl: string | null = null;
function getCachedGraphQLUrl(): string {
  if (cachedUrl === null) {
    cachedUrl = getGraphQLUrl();
  }
  return cachedUrl;
}

export const AlchemyEnvironmentConfig = {
  get endpoint() {
    return getCachedGraphQLUrl();
  },
  get isLocal() {
    return getCachedGraphQLUrl().includes("localhost");
  },
  // API calls work regardless of document location
  apiKey:
    typeof process !== "undefined" ? process.env.ALCHEMY_API_KEY : undefined,
  network:
    typeof process !== "undefined"
      ? process.env.ALCHEMY_NETWORK || "mainnet"
      : "mainnet",

  // Debug info
  get debugInfo() {
    return {
      mode: this.isLocal ? "Local Connect" : "Remote Switchboard",
      endpoint: this.endpoint,
      network: this.network,
      hasApiKey: !!this.apiKey,
    };
  },
};

/**
 * Get the appropriate GraphQL endpoint based on environment
 */
export function getAlchemyGraphQLEndpoint(): string {
  return AlchemyEnvironmentConfig.endpoint;
}

/**
 * Check if we're running in local development mode
 */
export function isLocalEnvironment(): boolean {
  return AlchemyEnvironmentConfig.isLocal;
}

/**
 * Log environment information for debugging
 */
export function logEnvironmentInfo(): void {
  console.log("[AlchemyEnvironment]", AlchemyEnvironmentConfig.debugInfo);
}
