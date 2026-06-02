'use client'

import { useRenown } from '@powerhousedao/reactor-browser'
import { useEffect } from 'react'
import { setAuthTokenProvider } from '@/modules/sdk/client/reactor-client'

/**
 * Bridges the React-tree-scoped Renown instance to the module-scoped reactor
 * client by registering a bearer-token provider. Internal to the SDK — apps
 * should not mount this directly; use `<PowerhouseSDKProvider>`.
 *
 * Token expiry is 600s; every reactor request mints a fresh one through the
 * provider, so rotation is automatic. We deliberately omit the `aud` claim —
 * the switchboard's verifier doesn't configure an expected audience and
 * did-jwt rejects tokens carrying `aud` without matching server config.
 */
export function RenownAuthBridge() {
  const renown = useRenown()

  useEffect(() => {
    if (!renown) {
      setAuthTokenProvider(null)
      return
    }

    setAuthTokenProvider(async () => {
      try {
        return await renown.getBearerToken({ expiresIn: 600 })
      } catch {
        return null
      }
    })

    return () => {
      setAuthTokenProvider(null)
    }
  }, [renown])

  return null
}
