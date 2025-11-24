'use client'

import { ServerCrash } from 'lucide-react'
import { useEffect } from 'react'
import { Button } from '@/modules/shared/components/ui/button'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/modules/shared/components/ui/empty'

export default function NetworkError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // util to log the error to the console
    // eslint-disable-next-line no-console
    console.error('Error caught by boundary:', {
      message: error.message,
      digest: error.digest,
      // Only log stack in development
      ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
    })
  }, [error])

  return (
    <main className="flex min-h-[calc(100dvh-10rem)] items-center justify-center px-6">
      <Empty className="bg-background mx-auto w-full max-w-sm border border-solid md:p-6">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <ServerCrash />
          </EmptyMedia>
          <EmptyTitle>Something went wrong</EmptyTitle>
          <EmptyDescription>
            Something went wrong while loading this page. Please try again.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button onClick={reset} variant="default">
            Try again
          </Button>
        </EmptyContent>
      </Empty>
    </main>
  )
}
