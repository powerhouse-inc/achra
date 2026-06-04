import type { GraphqlFetcher, ReactorClient } from './client/reactor-client'
import type { BoundDocuments } from './documents/registry'

/**
 * The injected dependencies every domain function receives as its first
 * argument. This is the seam that replaces the old module-level
 * `getReactorClient()` singleton:
 *
 *  - it makes the SDK instance-based (each `createClient` owns its own `ctx`);
 *  - it is the unit-test seam — a test builds a `ClientContext` with a fake
 *    `reactorClient` and fake `documents` and calls a domain function directly,
 *    with no React and no network.
 *
 * Domain functions take `ctx` as arg 1; the `PowerhouseClient` facade
 * partial-applies its own `ctx` to expose them as namespaced methods.
 */
export interface ClientContext {
  readonly reactorClient: ReactorClient
  /** Raw switchboard GraphQL fetcher for domain subgraph reads. */
  readonly graphql: GraphqlFetcher
  readonly documents: BoundDocuments
}
