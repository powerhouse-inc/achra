'use client'

import { useRenown } from '@powerhousedao/reactor-browser'
import { useEffect } from 'react'
import type { PowerhouseClient } from '../client/create-client'

/**
 * Bridges the React-tree-scoped Renown instance to a specific
 * {@link PowerhouseClient} by registering a bearer-token provider on it.
 * Internal to the SDK — apps should not mount this directly; use
 * `<PowerhouseSDKProvider>`.
 *
 * Token expiry is 600s; every reactor request mints a fresh one through the
 * provider, so rotation is automatic. We deliberately omit the `aud` claim —
 * the switchboard's verifier doesn't configure an expected audience and
 * did-jwt rejects tokens carrying `aud` without matching server config.
 */
export function RenownAuthBridge({ client }: { client: PowerhouseClient }) {
  const renown = useRenown()

  useEffect(() => {
    if (!renown) {
      client.setTokenProvider(null)
      return
    }

    client.setTokenProvider(async () => {
      try {
        return await renown.getBearerToken({ expiresIn: 600 })
      } catch {
        return null
      }
    })

    return () => {
      client.setTokenProvider(null)
    }
  }, [renown, client])

  return null
}
