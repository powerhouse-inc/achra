'use client'

import { Renown as RenownSDK } from '@powerhousedao/reactor-browser'
import { toast } from 'sonner'

export function Renown({ appName, url }: { appName: string; url?: string }) {
  return (
    <RenownSDK
      appName={appName}
      url={url}
      onError={(error) => {
        if (error instanceof Error && error.message === 'window is undefined') return
        console.error('[Renown]', error)
        toast.error('Authentication error')
      }}
    />
  )
}
