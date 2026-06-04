'use client'

import { configureSDK } from '@achra/sdk'
import { PowerhouseSDKProvider } from '@achra/sdk/react'
import { toast } from 'sonner'
import type { ReactNode } from 'react'

// Point the (framework-agnostic) SDK at this app's reactor endpoint. The env
// access stays in app code so Next inlines `NEXT_PUBLIC_SWITCHBOARD_URL` into
// the client bundle; the package never reads `process.env`. Runs at module load
// — before any reactor call — and is a no-op when the env var is unset (the SDK
// keeps its localhost default).
configureSDK({ switchboardUrl: process.env.NEXT_PUBLIC_SWITCHBOARD_URL })

interface SDKProviderProps {
  appName: string
  renownUrl?: string
  enabled?: boolean
  children: ReactNode
}

/**
 * Achra-specific wrapper around the SDK provider. Owns app-side policy for
 * auth errors (toast, dev-mode console). Kept thin so the SDK provider
 * itself stays portable.
 */
export function SDKProvider({ appName, renownUrl, enabled, children }: SDKProviderProps) {
  return (
    <PowerhouseSDKProvider
      appName={appName}
      renownUrl={renownUrl}
      enabled={enabled}
      onAuthError={(error) => {
        if (error instanceof Error && error.message === 'window is undefined') return
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.error('[Renown]', error)
        }
        toast.error("We couldn't sign you in. Please try again.")
      }}
    >
      {children}
    </PowerhouseSDKProvider>
  )
}
