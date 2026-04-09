'use client'

import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useMemo } from 'react'
import type {
  ScopeOfWork_Milestone,
  Sow_Deliverable,
} from '@/modules/__generated__/graphql/switchboard-generated'
import { MilestoneStatusSection } from '@/modules/roadmap/components/milestone-status-section'
import { MilestoneTitleSection } from '@/modules/roadmap/components/milestone-title-section'
import { getProgressPercentage } from '@/modules/roadmap/lib/type-helpers'
import { Button } from '@/modules/shared/components/ui/button'
import { Card, CardContent, CardHeader } from '@/shared/components/ui/card'
import { cn } from '@/shared/lib/utils'
import Coordinators from './coordinators'
import LatestKeyResults from './latest-key-results'

interface MilestoneExtendedCardProps {
  milestone: ScopeOfWork_Milestone
  className?: string
  networkSlug: string
  roadmapSlug: string
  deliverables: Sow_Deliverable[]
}

export default function MilestoneExtendedCard({
  milestone,
  className,
  networkSlug,
  roadmapSlug,
  deliverables,
}: MilestoneExtendedCardProps) {
  const progress = useMemo(() => {
    return getProgressPercentage(milestone.scope?.progress)
  }, [milestone.scope?.progress])

  const keyResults = useMemo(() => {
    if (!milestone.scope?.deliverables) return []

    const allKeyResults = milestone.scope.deliverables.flatMap((deliverableId) => {
      const milestoneDeliverable = deliverables.find((d) => d.id === deliverableId)
      return milestoneDeliverable?.keyResults ?? []
    })

    return allKeyResults.slice(0, 3)
  }, [milestone.scope, deliverables])

  return (
    <Card
      className={cn(
        'w-full gap-0 overflow-hidden rounded-xl border-0 px-0 pt-0 pb-2 shadow-lg',
        className,
      )}
    >
      <CardHeader className="bg-accent flex items-center justify-between gap-0 rounded-t-xl rounded-b-none px-2 py-0.5">
        <div className="text-accent-foreground/30 flex items-center gap-1 text-base/6 font-semibold">
          {milestone.sequenceCode}
        </div>
        <Button variant="ghost" asChild>
          <Link href={`/network/${networkSlug}/roadmap/${roadmapSlug}#${milestone.sequenceCode}`}>
            Details
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </CardHeader>

      <CardContent className="mx-2 mt-2 flex flex-col gap-1 p-0">
        <MilestoneTitleSection title={milestone.title} description={milestone.description} />
        <MilestoneStatusSection status={milestone.scope?.status} progress={progress} />
        <Coordinators coordinators={milestone.coordinators} />
        <LatestKeyResults keyResults={keyResults} />
      </CardContent>
    </Card>
  )
}
