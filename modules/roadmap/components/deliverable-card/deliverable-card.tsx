'use client'

import { useCallback, useState } from 'react'
import { Sow_DeliverableStatus } from '@/modules/__generated__/graphql/switchboard-generated'
import type {
  RoadmapDetails_Contributor,
  RoadmapDetails_Deliverable,
  RoadmapDetails_Project,
} from '@/modules/roadmap/types'
import { DeliverableStatusChip } from '@/modules/shared/components/chips/deliverable-status-chip'
import { Avatar, AvatarFallback } from '@/modules/shared/components/ui/avatar'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/modules/shared/components/ui/tooltip'
import { useIsMobile } from '@/modules/shared/hooks/use-mobile'
import { cn } from '@/modules/shared/lib/utils'
import { isBinaryProgress, isStoryPointProgress } from '../../lib/type-helpers'
import KeyResults from '../milestone-details-card/key-results/key-results'
import DeliverablePercentageBar from './deliverable-percentage-bar'
import DeliverableStoryPointBar from './deliverable-storypoint-bar'
import ProjectLink from './project-link'

export type DeliverableViewMode = 'compacted' | 'detailed'

interface DeliverableCardProps {
  deliverable: RoadmapDetails_Deliverable
  contributors: RoadmapDetails_Contributor[]
  projects: RoadmapDetails_Project[]
  viewMode: DeliverableViewMode
  maxKeyResultsOnRow: number
  isProjectCard?: boolean
}

export default function DeliverableCard({
  deliverable,
  contributors,
  projects,
  viewMode,
  maxKeyResultsOnRow,
  isProjectCard,
}: DeliverableCardProps) {
  const isMobile = useIsMobile()
  const [expanded, setExpanded] = useState<boolean>(false)
  const handleToggleExpand = useCallback(() => {
    setExpanded((prev) => !prev)
  }, [])

  const deliverableOwner = contributors.find((contributor) => contributor.id === deliverable.owner)
  const deliverableProject = projects.find(
    (project) => project.id === deliverable.budgetAnchor?.project,
  )

  return (
    <div
      className={cn(
        'flex-start flex flex-col rounded-xl border p-4 shadow-sm',
        !isMobile && viewMode === 'compacted' && !expanded ? 'h-fit' : 'h-auto',
      )}
    >
      {/* Header */}
      <div className="flex-start flex gap-6 self-stretch">
        <div className="mb-2 flex max-w-[calc(100%-51px)] flex-1 flex-col items-start">
          <div className={cn(viewMode !== 'detailed' && 'truncate', 'self-stretch font-semibold')}>
            {deliverable.title}
          </div>
        </div>
        <div className="flex items-center">
          <Tooltip>
            <TooltipTrigger asChild>
              <Avatar className="size-6.5 self-start border-2 shadow-md">
                <AvatarFallback>{deliverableOwner?.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent side="bottom" align="end">
              <div className="flex flex-col gap-4">
                <div className="font-bold tracking-wide">Deliverable Owner</div>

                <div className="flex items-center gap-2">
                  <Avatar className="size-8 border-2 shadow-md">
                    <AvatarFallback>{deliverableOwner?.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="text-base tracking-wide">{deliverableOwner?.name}</div>
                </div>
              </div>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>

      {/* progress */}
      <div className="flex w-full items-center gap-2">
        <DeliverableStatusChip status={deliverable.status} />
        {deliverable.status === Sow_DeliverableStatus.InProgress &&
          deliverable.workProgress &&
          (isStoryPointProgress(deliverable.workProgress) ? (
            <DeliverableStoryPointBar
              total={deliverable.workProgress.total}
              completed={deliverable.workProgress.completed}
            />
          ) : isBinaryProgress(deliverable.workProgress) ? (
            <DeliverablePercentageBar percentage={deliverable.workProgress.done ? 100 : 0} />
          ) : (
            <DeliverablePercentageBar percentage={deliverable.workProgress.value} />
          ))}
      </div>

      {(viewMode === 'detailed' || expanded) && (
        <div className="mt-2 flex flex-col gap-2 text-sm/5.5 xl:text-base">
          {deliverable.description.split('\n').map((paragraph, index) => (
            <p className="m-0" key={index}>
              {paragraph}
            </p>
          ))}
        </div>
      )}

      <div className="mt-auto flex w-full flex-col pt-4">
        {isProjectCard ? (
          // TODO: enable this once the project pages are implemented

          // (deliverable as IncrementedDeliverable).milestoneOverride && (
          //     <MilestoneLink
          //       roadmapSlug={
          //         (deliverable as IncrementedDeliverable).milestoneOverride?.roadmapSlug ?? ''
          //       }
          //       code={(deliverable as IncrementedDeliverable).milestoneOverride?.code ?? ''}
          //     />
          //   )
          <div>Milestone link - Coming soon</div>
        ) : (
          deliverableProject?.code &&
          deliverableProject.title && (
            <ProjectLink
              href="#" // TODO: enable this once the project pages are implemented
              code={deliverableProject.code}
              name={deliverableProject.title}
            />
          )
        )}
        <KeyResults
          keyResults={deliverable.keyResults}
          viewMode={viewMode}
          expanded={expanded}
          handleToggleExpand={handleToggleExpand}
          maxKeyResultsOnRow={maxKeyResultsOnRow}
        />
      </div>
    </div>
  )
}
