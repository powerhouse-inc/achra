'use client'

import { useMemo } from 'react'
import { encodeSectionId } from '@/modules/shared/components/section-activation/section-id-utils'
import { cn } from '@/modules/shared/lib/utils'
import Contributors from './contributors'
import Coordinators from './coordinators'
import DeliverablesSection from './deliverables-section'
import MilestoneProgress from './milestone-progress'
import TargetData from './target-data'
import TitleAndDescription from './title-and-description'
import type {
  RoadmapDetails_Contributor,
  RoadmapDetails_Deliverable,
  RoadmapDetails_Milestone,
  RoadmapDetails_Project,
} from '../../types'

interface MilestoneDetailsCardProps {
  milestone: RoadmapDetails_Milestone
  deliverables: RoadmapDetails_Deliverable[]
  contributors: RoadmapDetails_Contributor[]
  projects: RoadmapDetails_Project[]
}

export default function MilestoneDetailsCard({
  milestone,
  deliverables,
  contributors,
  projects,
}: MilestoneDetailsCardProps) {
  const milestoneContributors = useMemo(() => {
    const uniqueContributors: Record<string, Pick<RoadmapDetails_Contributor, 'id' | 'name'>> = {}
    deliverables.forEach((deliverable) => {
      if (
        deliverable.owner &&
        !Object.prototype.hasOwnProperty.call(uniqueContributors, deliverable.owner)
      ) {
        const contributor = contributors.find((contributor) => contributor.id === deliverable.owner)
        if (contributor) {
          uniqueContributors[deliverable.owner] = contributor
        }
      }
    })
    return Object.values(uniqueContributors)
  }, [deliverables, contributors])

  return (
    <article
      id={encodeSectionId(milestone.sequenceCode)}
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
            'lg:w-76 lg:gap-4 lg:px-4 lg:pt-4 lg:pb-6',
            'xl:w-94.5 xl:px-6',
            '2xl:w-104',
          )}
        >
          <div className="text-foreground/30 inline-flex max-w-fit items-center gap-1 rounded-md border px-2 py-1 text-xl font-bold">
            {milestone.sequenceCode}
          </div>

          <MilestoneProgress scope={milestone.scope} />
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
