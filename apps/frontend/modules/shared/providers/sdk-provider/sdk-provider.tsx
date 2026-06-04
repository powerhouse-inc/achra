'use client'

import { PowerhouseSDKProvider } from '@achra/sdk/react'
import { toast } from 'sonner'
import type { ReactNode } from 'react'

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
      // Env access stays in app code so Next inlines `NEXT_PUBLIC_SWITCHBOARD_URL`
      // into the client bundle; the package never reads `process.env`. Falls back
      // to the SDK's localhost default when unset.
      switchboardUrl={process.env.NEXT_PUBLIC_SWITCHBOARD_URL}
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
