'use client'

import { useMemo } from 'react'
import type { ScopeOfWork_Milestone } from '@/modules/__generated__/graphql/switchboard-generated'
import { MilestoneStatusSection } from '@/modules/roadmap/components/milestone-status-section'
import { MilestoneTitleSection } from '@/modules/roadmap/components/milestone-title-section'
import { getProgressPercentage } from '@/modules/roadmap/lib/type-helpers'
import { mockedDeliverables } from '@/modules/roadmap/mocks/roadmap'
import { Card, CardContent, CardHeader } from '@/shared/components/ui/card'
import { cn } from '@/shared/lib/utils'
import Coordinators from './coordinators'
import LatestKeyResults from './latest-key-results'

interface MilestoneExtendedCardProps {
  milestone: ScopeOfWork_Milestone
  className?: string
}

export default function MilestoneExtendedCard({
  milestone,
  className,
}: MilestoneExtendedCardProps) {
  const progress = useMemo(() => {
    return getProgressPercentage(milestone.scope?.progress)
  }, [milestone.scope?.progress])

  const keyResults = useMemo(() => {
    if (!milestone.scope?.deliverables) return []

    const allKeyResults = milestone.scope.deliverables.flatMap((deliverableId) => {
      const deliverable = mockedDeliverables.find((d) => d.id === deliverableId)
      return deliverable?.keyResults ?? []
    })

    return allKeyResults.slice(0, 3)
  }, [milestone.scope?.deliverables])

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
          <span className="text-accent-foreground/30 font-semibold">Details</span>
        </div>
      </CardHeader>

      <CardContent className="mx-2 mt-2 flex flex-1 flex-col gap-1 p-0">
        <MilestoneTitleSection title={milestone.title} description={milestone.description} />
        <MilestoneStatusSection status={milestone.scope?.status} progress={progress} />
        <Coordinators coordinators={milestone.coordinators} />
        <LatestKeyResults keyResults={keyResults} />
      </CardContent>
    </Card>
  )
}
