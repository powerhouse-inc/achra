'use client'

import { useCallback, useEffect } from 'react'
import { useLocalStorage } from 'usehooks-ts'
import { cn } from '@/shared/lib/utils'
import { STORAGE_KEY } from './constants'
import { SuccessView } from './success-view'
import { WhitelistForm } from './whitelist-form'

function WhitelistOverlay() {
  const [isSubmitted, setIsSubmitted] = useLocalStorage<boolean>(STORAGE_KEY, false, {
    initializeWithValue: false,
  })

  useEffect(() => {
    if (typeof window === 'undefined') return

    const body = document.body
    body.style.overflow = 'hidden'

    return () => {
      body.style.overflow = 'auto'
    }
  }, [])

  const handleSuccess = useCallback(() => {
    setIsSubmitted(true)
  }, [setIsSubmitted])

  return (
    <div className="fixed right-0 bottom-0 left-0 z-50 h-[calc(100vh-12rem)] sm:h-[calc(100vh-18rem)]">
      <div
        className={cn(
          'bg-background relative h-full',
          'before:to-background before:absolute before:-top-[118px] before:right-0 before:left-0 before:h-30 before:bg-gradient-to-b before:from-transparent before:content-[""]',
        )}
      >
        <div className="container flex h-full w-full flex-col items-center justify-center px-4 pt-8">
          {isSubmitted ? <SuccessView /> : <WhitelistForm onSuccess={handleSuccess} />}
        </div>
      </div>
    </div>
  )
}

export { WhitelistOverlay }
