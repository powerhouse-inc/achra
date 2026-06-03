'use client'

import { Button } from '@achra/ui/button'
import { Card, CardContent } from '@achra/ui/card'
import { AlertTriangle, ArrowLeft, Loader2, RefreshCw } from 'lucide-react'

interface SpinUpStepProps {
  isError: boolean
  error: Error | null
  onRetry: () => void
  onBack: () => void
}

function SpinUpStep({ isError, error, onRetry, onBack }: SpinUpStepProps) {
  if (isError) {
    return (
      <Card className="overflow-hidden">
        <CardContent className="flex flex-col items-center gap-5 px-8 py-12 text-center">
          <div className="bg-destructive/10 text-destructive flex size-12 items-center justify-center rounded-full">
            <AlertTriangle className="size-5" aria-hidden="true" />
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold tracking-tight">
              Couldn&apos;t create your drive
            </h2>
            <p className="text-muted-foreground max-w-md text-sm">{error?.message}</p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button variant="outline" onClick={onBack} className="gap-2">
              <ArrowLeft className="size-4" aria-hidden="true" />
              Go back
            </Button>
            <Button onClick={onRetry} className="gap-2">
              <RefreshCw className="size-4" aria-hidden="true" />
              Try again
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden">
      <CardContent className="flex flex-col items-center gap-5 px-8 py-12 text-center">
        <div className="bg-primary/10 text-primary flex size-12 items-center justify-center rounded-full">
          <Loader2 className="size-5 animate-spin" aria-hidden="true" />
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold tracking-tight">Spinning up your drive</h2>
          <p className="text-muted-foreground max-w-md text-sm">
            Hang tight — this takes just a few seconds.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export { SpinUpStep }
