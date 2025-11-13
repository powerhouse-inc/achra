'use client'

import { useEffect } from 'react'
import { useWhitelistOverlay } from '@/modules/whitelist/hooks/use-whitelist-overlay'
import { cn } from '@/shared/lib/utils'
import { WhitelistForm } from '../whitelist-form'

function WhitelistOverlay() {
  const shouldShow = useWhitelistOverlay()

  useEffect(() => {
    if (typeof window === 'undefined' || !shouldShow) return

    const body = document.body
    body.style.overflow = 'hidden'

    return () => {
      body.style.overflow = 'auto'
    }
  }, [shouldShow])

  /**
   * The whitelist overlay should not be rendered for the current route or it
   * is not enabled in the feature flags.
   */
  if (!shouldShow) return null

  return (
    <div className="fixed right-0 bottom-0 left-0 z-50 h-[calc(100vh-12rem)] sm:h-[calc(100vh-18rem)]">
      <div
        className={cn(
          'bg-background relative h-full',
          'before:to-background before:absolute before:-top-[118px] before:right-0 before:left-0 before:h-30 before:bg-gradient-to-b before:from-transparent before:content-[""]',
        )}
      >
        <div className="container flex h-full w-full flex-col items-center justify-center px-4">
          <WhitelistForm />
        </div>
      </div>
    </div>
  )
}

export { WhitelistOverlay }
