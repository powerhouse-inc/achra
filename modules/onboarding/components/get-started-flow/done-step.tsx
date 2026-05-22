'use client'

import { CheckCircle2 } from 'lucide-react'
import { Button } from '@/modules/shared/components/ui/button'
import { Card, CardContent } from '@/modules/shared/components/ui/card'

function DoneStep() {
  return (
    <Card>
      <CardContent className="flex flex-col items-center gap-5 px-8 py-12 text-center">
        <div className="bg-status-success/15 text-status-success flex size-12 items-center justify-center rounded-full">
          <CheckCircle2 className="size-5" aria-hidden="true" />
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold tracking-tight">Your drive is ready</h2>
          <p className="text-muted-foreground max-w-md text-sm">Pick where you want to go next.</p>
        </div>
        <div className="grid w-full max-w-md grid-cols-1 gap-3 sm:grid-cols-2">
          <Button variant="outline" className="w-full min-w-0">
            My Account
          </Button>
          <Button className="w-full min-w-0">Explore my Drive</Button>
        </div>
      </CardContent>
    </Card>
  )
}

export { DoneStep }
