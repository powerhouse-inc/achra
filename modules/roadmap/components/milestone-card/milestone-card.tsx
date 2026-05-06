'use client'

import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useMemo } from 'react'
import type { ScopeOfWork_Milestone } from '@/modules/__generated__/graphql/switchboard-generated'
import { MilestoneStatusSection } from '@/modules/roadmap/components/milestone-status-section'
import { MilestoneTitleSection } from '@/modules/roadmap/components/milestone-title-section'
import { formatDateStringToQuarter } from '@/modules/roadmap/lib/milestone-card-utils'
import { getProgressPercentage } from '@/modules/roadmap/lib/type-helpers'
import { Button } from '@/shared/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/shared/components/ui/card'
import { cn } from '@/shared/lib/utils'

interface MilestoneCardProps {
  milestone: ScopeOfWork_Milestone
  className?: string
}

function MilestoneCard({ milestone, className }: MilestoneCardProps) {
  const progress = useMemo(() => {
    return getProgressPercentage(milestone.scope?.progress)
  }, [milestone.scope?.progress])

  return (
    <Card
      className={cn(
        'h-full w-full gap-0 overflow-hidden rounded-xl border-0 px-0 pt-0 pb-2',
        className,
      )}
    >
      <CardHeader className="bg-accent flex items-center justify-between gap-0 rounded-t-xl rounded-b-none p-2">
        <div className="text-accent-foreground/30 flex items-center gap-1 font-semibold">
          {milestone.sequenceCode}
        </div>
        <div className="flex items-center">
          <span className="text-accent-foreground/30 font-semibold">
            {formatDateStringToQuarter(milestone.deliveryTarget)}
          </span>
        </div>
      </CardHeader>

      <CardContent className="mx-2 mt-2 flex flex-1 flex-col gap-1 p-0">
        <MilestoneTitleSection title={milestone.title} description={milestone.description} />
        <MilestoneStatusSection status={milestone.scope?.status} progress={progress} />
      </CardContent>

      <CardFooter className="mx-2 mt-1 p-0">
        <Button variant="secondary" className="w-full" asChild>
          <Link href={`#${milestone.sequenceCode}`}>
            View
            <ArrowRight />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

export { MilestoneCard }
