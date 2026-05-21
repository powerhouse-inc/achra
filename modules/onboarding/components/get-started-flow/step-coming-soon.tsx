'use client'

import { ArrowLeft, Sparkles } from 'lucide-react'
import { Button } from '@/modules/shared/components/ui/button'
import { Card, CardContent } from '@/modules/shared/components/ui/card'

interface StepComingSoonProps {
  onBack: () => void
  personaTitle: string
}

function StepComingSoon({ onBack, personaTitle }: StepComingSoonProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="flex flex-col items-center gap-5 px-8 py-12 text-center">
        <div className="bg-primary/10 text-primary flex size-14 items-center justify-center rounded-full">
          <Sparkles className="size-6" aria-hidden="true" />
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold tracking-tight">Step 2 is coming soon</h2>
          <p className="text-muted-foreground max-w-md text-sm">
            Nice — you&apos;re set as{' '}
            <span className="text-foreground font-medium">{personaTitle}</span>. We&apos;ll spin up
            your drive and the rest of the flow in the next iteration.
          </p>
        </div>
        <Button variant="outline" onClick={onBack} className="gap-2">
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to Step 1
        </Button>
      </CardContent>
    </Card>
  )
}

export { StepComingSoon }
