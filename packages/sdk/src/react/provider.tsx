'use client'

import { Renown as RenownSDK } from '@powerhousedao/reactor-browser'
import { type ReactNode, useState } from 'react'
import { createClient } from '../client/create-client'
import { RenownAuthBridge } from './bridge'
import { PowerhouseClientProvider } from './client-context'

export interface PowerhouseSDKProviderProps {
  appName: string
  /**
   * Reactor GraphQL endpoint. The host app reads its own env (e.g.
   * `NEXT_PUBLIC_SWITCHBOARD_URL`) and passes it in — the package never reads
   * `process.env`. Defaults to the local switchboard when omitted.
   */
  switchboardUrl?: string
  renownUrl?: string
  /**
   * When false, Renown is not mounted and `useAuth()` returns
   * `'unauthenticated'` permanently. The client is still created and provided,
   * so non-auth reads via `useClient()` keep working. Useful for
   * feature-flagging auth off in lower environments.
   */
  enabled?: boolean
  /**
   * Side-effect hook for app-level reactions to auth errors (toast,
   * telemetry). The SDK itself does not toast, redirect, or log on errors
   * — that's the app's policy. Called with the original error from
   * Renown's `onError`.
   */
  onAuthError?: (error: unknown) => void
  children: ReactNode
}

/**
 * Single mount point for everything the signed-document SDK needs:
 *
 *  - creates ONE {@link PowerhouseClient} and provides it via context
 *    (read with `useClient()`);
 *  - mounts Renown (the Powerhouse identity SDK);
 *  - bridges Renown's bearer token into THIS client instance's token provider.
 *
 * The client lives in `useState` (not `useMemo`, which React may discard) so
 * the token provider the bridge installs survives re-renders. The client and
 * its context wrap children regardless of `enabled`; only Renown + the bridge
 * are gated, so reads work even with auth flagged off.
 */
export function PowerhouseSDKProvider({
  appName,
  switchboardUrl,
  renownUrl,
  enabled = true,
  onAuthError,
  children,
}: PowerhouseSDKProviderProps) {
  const [client] = useState(() => createClient({ switchboardUrl }))

  return (
    <PowerhouseClientProvider client={client}>
      {enabled ? (
        <>
          <RenownSDK appName={appName} url={renownUrl} onError={onAuthError} />
          <RenownAuthBridge client={client} />
        </>
      ) : null}
      {children}
    </PowerhouseClientProvider>
  )
}
