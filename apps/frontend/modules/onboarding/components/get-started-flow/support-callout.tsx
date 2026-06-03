'use client'

import { Button } from '@achra/ui/button'
import { cn } from '@achra/ui/lib/utils'
import { LifeBuoy } from 'lucide-react'
import { SUPPORT_DISCORD_URL } from '@/modules/onboarding/lib/constants'

interface SupportCalloutProps {
  className?: string
}

function SupportCallout({ className }: SupportCalloutProps) {
  return (
    <div className={cn('flex flex-col items-start gap-3', className)}>
      <span className="text-muted-foreground flex size-9 items-center justify-center rounded-full border">
        <LifeBuoy className="size-4" aria-hidden="true" />
      </span>
      <div className="flex flex-col gap-1">
        <p className="text-sm font-semibold">Having trouble?</p>
        <p className="text-muted-foreground text-sm">
          Feel free to contact us and we&apos;ll always help you through the process.
        </p>
      </div>
      <Button variant="outline" size="sm" asChild>
        <a href={SUPPORT_DISCORD_URL} target="_blank" rel="noopener noreferrer">
          Contact us
        </a>
      </Button>
    </div>
  )
}

export { SupportCallout }
