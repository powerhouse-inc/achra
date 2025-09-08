'use client'

import { MilestoneCard } from '../milestone-card'
import { DesktopTimeline } from './desktop-timeline'
import { TimelineSwiper } from './timeline-swiper'
import type { Milestone } from '../milestone-card/types'

export default function Timeline({ milestones }: { milestones: Milestone[] }) {
  if (milestones.length === 0) {
    return null
  }

  return (
    <>
      {/* Mobile Timeline */}
      <div className="relative z-10 flex flex-col gap-6 md:hidden">
        <div className="absolute top-0 left-1/2 -z-10 h-full w-1.5 -translate-x-1/2 bg-gray-200" />
        {milestones.map((milestone) => (
          <MilestoneCard key={milestone.id} milestone={milestone} />
        ))}
      </div>

      {/* Tablet Timeline with Swiper */}
      <TimelineSwiper milestones={milestones} />

      {/* Desktop Timeline */}
      <DesktopTimeline milestones={milestones} />
    </>
  )
}
