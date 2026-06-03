'use client'

import { Button } from '@achra/ui/button'
import { Card, CardContent } from '@achra/ui/card'
import { CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import type { BuilderDriveLink } from '@/modules/__generated__/graphql/switchboard-generated'

interface DoneStepProps {
  drive: BuilderDriveLink | null
}

function DoneStep({ drive }: DoneStepProps) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center gap-5 px-8 py-12 text-center">
        <div className="bg-status-success/15 text-status-success flex size-12 items-center justify-center rounded-full">
          <CheckCircle2 className="size-5" aria-hidden="true" />
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold tracking-tight">You&apos;re all set!</h2>
          <p className="text-muted-foreground max-w-md text-sm">
            Your drive is ready. Pick where you want to go next.
          </p>
        </div>
        <div className="grid w-full max-w-md grid-cols-1 gap-3 sm:grid-cols-2">
          <Button variant="outline" className="w-full min-w-0" asChild>
            <Link href="/my-account">My Account</Link>
          </Button>
          <Button className="w-full min-w-0" asChild disabled={!drive}>
            {drive ? (
              <a href={drive.driveLink as string} target="_blank" rel="noopener noreferrer">
                Explore my Workspace
              </a>
            ) : (
              <span aria-disabled="true">Explore my Workspace</span>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export { DoneStep }
