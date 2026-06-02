'use client'

import { Renown as RenownSDK } from '@powerhousedao/reactor-browser'
import { RenownAuthBridge } from '@/modules/sdk/auth/bridge'
import type { ReactNode } from 'react'

export interface PowerhouseSDKProviderProps {
  appName: string
  renownUrl?: string
  /**
   * When false, Renown is not mounted and `useAuth()` returns
   * `'unauthenticated'` permanently. Useful for feature-flagging auth off
   * in lower environments.
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
 *  - mounts Renown (the Powerhouse identity SDK)
 *  - bridges Renown's bearer token into the reactor client middleware
 *
 * Replaces the two-step `<Renown />` + `<RenownAuthBridge />` mounting and
 * makes it impossible to forget the bridge.
 */
export function PowerhouseSDKProvider({
  appName,
  renownUrl,
  enabled = true,
  onAuthError,
  children,
}: PowerhouseSDKProviderProps) {
  return (
    <>
      {enabled ? (
        <>
          <RenownSDK appName={appName} url={renownUrl} onError={onAuthError} />
          <RenownAuthBridge />
        </>
      ) : null}
      {children}
    </>
  )
}
