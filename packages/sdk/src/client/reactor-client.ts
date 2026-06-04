// Alias the reactor-browser factory so it doesn't collide with the SDK's own
// public `createClient` (see ./create-client).
import { createClient as createReactorClient } from '@powerhousedao/reactor-browser'

export type ReactorClient = ReturnType<typeof createReactorClient>

/** Resolves a fresh bearer token for the next reactor request, or null. */
export type TokenProvider = () => Promise<string | null>

/**
 * Executes a raw GraphQL operation against the switchboard, with the same
 * bearer token the reactor client uses. The reactor's typed client only covers
 * reactor operations (CreateDocument/GetDocument/…); domain subgraph reads
 * (`getBuilderDrives`, `builders`) go through this.
 */
export type GraphqlFetcher = <T>(query: string, variables?: Record<string, unknown>) => Promise<T>

/** Reactor endpoint default — the local switchboard. */
const DEFAULT_SWITCHBOARD_URL = 'http://localhost:4001/graphql'

export interface ReactorClientHandleOptions {
  /** Reactor GraphQL endpoint. Falls back to `http://localhost:4001/graphql`. */
  switchboardUrl?: string
  /**
   * Initial bearer-token provider. Usually left undefined: the React auth
   * bridge swaps one in via {@link ReactorClientHandle.setTokenProvider} once
   * Renown has hydrated.
   */
  getToken?: TokenProvider
}

/**
 * Owns one reactor GraphQL client plus its auth state. Created per
 * {@link import('./create-client').PowerhouseClient} instance — there is no
 * module-level singleton, so two clients (or a test client) never share a
 * connection or a token provider.
 */
export interface ReactorClientHandle {
  readonly reactorClient: ReactorClient
  readonly switchboardUrl: string
  /** Resolve a bearer token for an out-of-band request (e.g. the GraphQL read fetcher). */
  getToken: TokenProvider
  /** Raw GraphQL fetcher for domain subgraph reads, authed like the reactor client. */
  graphql: GraphqlFetcher
  /** Swap the bearer-token provider. Called by the React auth bridge. */
  setTokenProvider(provider: TokenProvider | null): void
}

/**
 * Build a reactor client bound to one endpoint, with a swappable token
 * provider closed over by the auth middleware. The client is built eagerly
 * (once per call); the old lazy-`getReactorClient` boot-ordering dance is gone
 * because the URL is known at construction time.
 */
export function createReactorClientHandle(
  options: ReactorClientHandleOptions = {},
): ReactorClientHandle {
  const switchboardUrl = options.switchboardUrl || DEFAULT_SWITCHBOARD_URL

  // Mutable so the React auth bridge can register Renown's token provider after
  // the SDK client is already constructed.
  let tokenProvider: TokenProvider | null = options.getToken ?? null

  async function resolveToken(): Promise<string | null> {
    if (tokenProvider) {
      try {
        return await tokenProvider()
      } catch {
        /* fall through to global fallback */
      }
    }
    // Covers the race between client construction and the bridge mounting:
    // Renown sets `window.ph.renown` at mount, before our effect runs.
    if (typeof window !== 'undefined') {
      try {
        const renown = (
          window as unknown as {
            ph?: {
              renown?: {
                getBearerToken: (opts: { expiresIn: number }) => Promise<string | null>
              }
            }
          }
        ).ph?.renown
        if (renown) return await renown.getBearerToken({ expiresIn: 600 })
      } catch {
        /* no token available */
      }
    }
    return null
  }

  async function withAuth<T>(
    action: (requestHeaders?: Record<string, string>) => Promise<T>,
  ): Promise<T> {
    const token = await resolveToken()
    if (!token) return action()
    // Lowercase `authorization` is required: the reactor SDK forwards headers
    // verbatim, and the WebSocket subscription path is case-sensitive.
    return action({ authorization: `Bearer ${token}` })
  }

  const reactorClient = createReactorClient(switchboardUrl, withAuth)

  const graphql: GraphqlFetcher = async <T>(
    query: string,
    variables?: Record<string, unknown>,
  ): Promise<T> => {
    const token = await resolveToken()
    const res = await fetch(switchboardUrl, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        ...(token ? { authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ query, variables }),
    })
    const json = (await res.json()) as { data?: T; errors?: { message: string }[] }
    if (json.errors?.length) {
      throw new Error(json.errors[0].message)
    }
    return json.data as T
  }

  return {
    reactorClient,
    switchboardUrl,
    getToken: resolveToken,
    graphql,
    setTokenProvider(provider) {
      tokenProvider = provider
    },
  }
}
