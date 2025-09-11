'use client'

import { ArrowRight } from 'lucide-react'
import { ScopeOfWork_DeliverableStatus } from '@/modules/__generated__/graphql/switchboard-generated'
import { DeliverableStatusChip } from '@/shared/components/chips/deliverable-status-chip'
import { Button } from '@/shared/components/ui/button'
import { Card, CardHeader, CardContent, CardFooter } from '@/shared/components/ui/card'
import { Progress } from '@/shared/components/ui/progress'
import { cn } from '@/shared/lib/utils'
import { formatDateStringToQuarter } from './utils'
import type { Milestone } from './types'

interface MilestoneCardProps {
  milestone: Milestone
  className?: string
}

export default function MilestoneCard({ milestone, className }: MilestoneCardProps) {
  return (
    // TODO: add the correct shadow if different from shadow-sm
    <Card
      className={cn(
        'h-full w-full gap-0 overflow-hidden rounded-xl border-0 px-0 pt-0 pb-2',
        className,
      )}
    >
      <CardHeader className="bg-accent flex items-center justify-between gap-0 rounded-t-xl rounded-b-none p-2">
        <div className="flex items-center gap-1">
          <span className="text-accent-foreground/30 font-semibold">{milestone.sequenceCode}</span>
          <span className="text-accent-foreground font-semibold">{milestone.code}</span>
        </div>
        <div className="flex items-center">
          <span className="text-accent-foreground/30 font-semibold">
            {formatDateStringToQuarter(milestone.targetDate)}
          </span>
        </div>
      </CardHeader>

      <CardContent className="mx-2 mt-2 flex flex-1 flex-col gap-1 p-0">
        <div className="milestone-title-section bg-popover flex flex-1 flex-col gap-2 rounded-xl border px-2 py-1">
          <h4 className="text-card-foreground line-clamp-2 text-sm leading-6 font-semibold">
            {milestone.title}
          </h4>
          {milestone.abstract && (
            <p className="text-card-foreground/50 flex-1 text-xs leading-4.5 font-medium">
              {milestone.abstract}
            </p>
          )}
        </div>

        <div className="bg-popover flex flex-col gap-2 rounded-xl border p-2">
          <div className="flex items-center justify-between">
            <span className="text-card-foreground text-xs leading-4.5 font-medium">Status</span>
            {/* TODO: replace this with the actual status from the API */}
            <DeliverableStatusChip status={ScopeOfWork_DeliverableStatus.Todo} />
          </div>
          <div className="relative">
            <Progress
              value={milestone.progress}
              className={cn(
                'bg-accent [&>div]:bg-status-progress h-4 rounded',
                milestone.progress === 100 && '[&>div]:bg-status-success',
              )}
            />
            <div
              className={cn(
                'absolute inset-0 z-10 flex items-center justify-end pr-2 text-xs font-bold',
                milestone.progress === 100
                  ? 'text-primary-foreground'
                  : 'text-accent-foreground/30',
              )}
            >
              {milestone.progress}%
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="mx-2 mt-1 p-0">
        <Button
          variant="secondary"
          className="hover:bg-secondary w-full rounded-md shadow-none hover:opacity-90 has-[>svg]:px-4"
          asChild
        >
          <a href={`#${milestone.code}`}>
            View
            <ArrowRight />
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}
