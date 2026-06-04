'use client'

import { createContext, type ReactNode, useContext } from 'react'
import type { PowerhouseClient } from '../client/create-client'

const ClientContext = createContext<PowerhouseClient | null>(null)

export function PowerhouseClientProvider({
  client,
  children,
}: {
  client: PowerhouseClient
  children: ReactNode
}) {
  return <ClientContext.Provider value={client}>{children}</ClientContext.Provider>
}

/**
 * Read the {@link PowerhouseClient} provided by `PowerhouseSDKProvider`. Throws
 * if called outside the provider, so a missing provider fails loudly rather
 * than silently no-op'ing reactor calls.
 */
export function useClient(): PowerhouseClient {
  const client = useContext(ClientContext)
  if (!client) {
    throw new Error('useClient must be used within a <PowerhouseSDKProvider>.')
  }
  return client
}
