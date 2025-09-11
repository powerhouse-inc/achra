'use client'

import { useMemo } from 'react'
import {
  type ScopeOfWork_Agent,
  type ScopeOfWork_Project,
  type ScopeOfWork_Deliverable,
  type ScopeOfWork_Milestone,
  ScopeOfWork_DeliverableStatus,
  ScopeOfWork_DeliverableSetStatus,
} from '@/modules/__generated__/graphql/switchboard-generated'
import { cn } from '@/modules/shared/lib/utils'
import Contributors from './contributors'
import Coordinators from './coordinators'
import DeliverablesSection from './deliverables-section'
import MilestoneProgress from './milestone-progress'
import TargetData from './target-data'
import TitleAndDescription from './title-and-description'

interface MilestoneDetailsCardProps {
  milestone: ScopeOfWork_Milestone
  deliverables: ScopeOfWork_Deliverable[]
  contributors: ScopeOfWork_Agent[]
  projects: ScopeOfWork_Project[]
}

export default function MilestoneDetailsCard({
  milestone,
  deliverables,
  contributors,
  projects,
}: MilestoneDetailsCardProps) {
  const milestoneContributors = useMemo(() => {
    const uniqueContributors: Record<string, ScopeOfWork_Agent> = {}
    deliverables.forEach((deliverable) => {
      if (deliverable.owner && !uniqueContributors[deliverable.owner]) {
        uniqueContributors[deliverable.owner] = contributors.find(
          (contributor) => contributor.id === deliverable.owner,
        )!
      }
    })
    return Object.values(uniqueContributors)
  }, [deliverables, contributors])

  return (
    <article
      id={milestone.sequenceCode}
      className="relative scroll-mt-[155px] md:flex md:flex-col md:gap-6 lg:flex-row lg:gap-8"
    >
      <div className="flex flex-col gap-4 md:flex-row md:gap-6 lg:sticky lg:top-[160px] lg:h-fit">
        <aside
          className={cn(
            // Layout
            'flex flex-col gap-2',
            // Border and background
            'bg-accent rounded-xl border',
            // Padding
            'px-4 pt-8 pb-4',
            // Responsive widths and spacing
            'w-full',
            'md:w-1/2',
            'lg:w-[304px] lg:gap-4 lg:px-4 lg:pt-4 lg:pb-6',
            'xl:w-[379px] xl:px-6',
            '2xl:w-[416px]',
          )}
        >
          <div className="text-foreground/30 inline-flex max-w-fit items-center gap-1 rounded-md border px-2 py-1 text-xl font-bold">
            {milestone.sequenceCode}
          </div>

          <MilestoneProgress
            // TODO: replace this with the actual progress data from the API once it is fixed
            data={{
              deliverablesCompleted: {
                __typename: 'ScopeOfWork_DeliverablesCompleted',
                completed: deliverables.filter(
                  (deliverable) => deliverable.status === ScopeOfWork_DeliverableStatus.Delivered,
                ).length,
                total: deliverables.length,
              },
              progress: {
                __typename: 'ScopeOfWork_Percentage',
                value: 0.8,
              },
              status: ScopeOfWork_DeliverableSetStatus.InProgress,
            }}
          />
          <TargetData targetDate={milestone.deliveryTarget} />
          <Coordinators coordinators={milestone.coordinators} />
          <Contributors contributors={milestoneContributors} />
        </aside>

        <div className="block md:w-1/2 lg:hidden">
          <TitleAndDescription title={milestone.title} description={milestone.description} />
        </div>
      </div>

      <main
        className={cn(
          'mt-4 flex w-full flex-col',
          // Responsive margin and gap
          'lg:mt-5 lg:max-w-[calc(100%-304px-24px)] lg:gap-6',
          'xl:max-w-[calc(100%-379px-32px)]',
          '2xl:max-w-[calc(100%-416px-32px)]',
        )}
      >
        <div className="hidden lg:block">
          <TitleAndDescription title={milestone.title} description={milestone.description} />
        </div>

        <DeliverablesSection
          deliverables={deliverables}
          contributors={contributors}
          projects={projects}
        />
      </main>
    </article>
  )
}
