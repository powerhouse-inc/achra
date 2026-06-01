import { createClient } from '@powerhousedao/reactor-browser'

// process.env.NEXT_PUBLIC_* references must be literal for Next.js to inline
// them into the client bundle. Dynamic access (process.env[key]) does NOT get
// inlined and resolves to undefined in the browser. When this module is
// extracted to a standalone package, this fallback should move to a
// configureSDK({ switchboardUrl }) entry point.
const SWITCHBOARD_URL = process.env.NEXT_PUBLIC_SWITCHBOARD_URL || 'http://localhost:4001/graphql'

export type AuthTokenProvider = () => Promise<string | null>

let authTokenProvider: AuthTokenProvider | null = null

/**
 * Register the bearer-token provider for all reactor client requests.
 *
 * Called by the SDK's auth bridge once the Renown instance has hydrated —
 * not part of the public API. The fallback in `resolveToken` covers the
 * race between controller instantiation and bridge mount.
 */
export function setAuthTokenProvider(provider: AuthTokenProvider | null): void {
  authTokenProvider = provider
}

async function resolveToken(): Promise<string | null> {
  if (authTokenProvider) {
    try {
      return await authTokenProvider()
    } catch {
      /* fall through to global fallback */
    }
  }
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

export const reactorClient = createClient(SWITCHBOARD_URL, withAuth)

export type ReactorClient = typeof reactorClient
