'use client'

import { Renown as RenownSDK } from '@powerhousedao/reactor-browser'
import { Suspense } from 'react'
import { toast } from 'sonner'
import { PostLoginRedirect } from '@/modules/shared/components/post-login-redirect/post-login-redirect'

export function Renown({ appName, url }: { appName: string; url?: string }) {
  return (
    <>
      <RenownSDK
        appName={appName}
        url={url}
        onError={(error) => {
          if (error instanceof Error && error.message === 'window is undefined') return
          if (process.env.NODE_ENV === 'development') {
            // console is required for DX purposes
            // eslint-disable-next-line no-console
            console.error('[Renown]', error)
          }
          toast.error("We couldn't sign you in. Please try again.")
        }}
      />
      <Suspense fallback={null}>
        <PostLoginRedirect />
      </Suspense>
    </>
  )
}
