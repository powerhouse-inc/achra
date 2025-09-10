'use client'

import { cn } from '@/shared/lib/utils'
import { MilestoneCard } from '../../milestone-card'
import useDesktopTimeline from './use-desktop-timeline'
import type { Milestone } from '../../milestone-card/types'

export default function DesktopTimeline({ milestones }: { milestones: Milestone[] }) {
  const { containerRef, upMilestones, downMilestones } = useDesktopTimeline({ milestones })

  if (milestones.length === 0) return null

  return (
    <div className="mx-auto hidden w-fit flex-col lg:flex" ref={containerRef}>
      <div
        className={cn(
          'flex items-stretch gap-10 xl:gap-[73px] 2xl:gap-[103px]',
          milestones.length > 3 && 'pr-[130px] xl:pr-[180px] 2xl:pr-[195px]',
        )}
      >
        {upMilestones.map((milestone, index) => {
          const order = milestones.length < 4 ? index : index * 2

          return (
            <div
              key={milestone.id}
              className="relative w-full max-w-[291px] pb-6 xl:max-w-[304px]"
              data-milestone-order={order}
            >
              <div className="desktop-timeline-line bg-accent-foreground/30 absolute -bottom-0.5 left-1/2 z-0 ml-4 h-px w-0" />
              <div className="border-accent-foreground/30 absolute -bottom-1.5 left-1/2 z-10 flex h-3 w-3 -translate-x-1/2 items-center justify-center rounded-full border-1">
                <div className="bg-status-progress h-1.5 w-1.5 rounded-full" />
              </div>
              <MilestoneCard milestone={milestone} />
            </div>
          )
        })}
      </div>

      {milestones.length > 3 && (
        <div
          className={cn(
            'flex items-stretch gap-10 xl:gap-[73px] 2xl:gap-[103px]',
            'pl-[130px] xl:pl-[180px] 2xl:pl-[195px]',
          )}
        >
          {downMilestones.map((milestone, index) => {
            const order = index * 2 + 1

            return (
              <div
                key={milestone.id}
                className="relative w-full max-w-[291px] pt-6 xl:max-w-[304px]"
                data-milestone-order={order}
              >
                <div className="desktop-timeline-line bg-accent-foreground/30 absolute top-px left-1/2 z-0 ml-4 h-px w-0" />
                <div className="border-accent-foreground/30 absolute -top-1.5 left-1/2 z-10 flex h-3 w-3 -translate-x-1/2 items-center justify-center rounded-full border-1">
                  <div className="bg-status-progress h-1.5 w-1.5 rounded-full" />
                </div>
                <MilestoneCard milestone={milestone} />
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
