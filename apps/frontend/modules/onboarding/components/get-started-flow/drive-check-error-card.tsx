'use client'

import { AlertTriangle } from 'lucide-react'
import { Button } from '@/modules/shared/components/ui/button'
import { Card, CardContent } from '@/modules/shared/components/ui/card'

interface DriveCheckErrorCardProps {
  onRetry: () => void
}

function DriveCheckErrorCard({ onRetry }: DriveCheckErrorCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="flex flex-col items-center gap-5 px-8 py-12 text-center">
        <div className="bg-destructive/15 text-destructive flex size-12 items-center justify-center rounded-full">
          <AlertTriangle className="size-5" aria-hidden="true" />
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold tracking-tight">
            We couldn&apos;t check your drives
          </h2>
          <p className="text-muted-foreground max-w-md text-sm">
            Something went wrong while looking up your account. Try again in a moment.
          </p>
        </div>
        <Button onClick={onRetry} className="min-w-44">
          Try again
        </Button>
      </CardContent>
    </Card>
  )
}

export { DriveCheckErrorCard }
