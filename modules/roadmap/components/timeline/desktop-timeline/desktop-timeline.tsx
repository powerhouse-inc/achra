'use client'

import { cn } from '@/shared/lib/utils'
import { MilestoneCard } from '../../milestone-card'
import useDesktopTimeline from './use-desktop-timeline'
import type { Milestone } from '../../milestone-card/types'

const containerBaseClasses = 'flex items-stretch gap-10 xl:gap-18.25 2xl:gap-25.75'
const spacingUpClasses = 'pr-32.5 xl:pr-45 2xl:pr-48.75'
const spacingDownClasses = 'pl-32.5 xl:pl-45 2xl:pl-48.75'
const milestoneBaseClasses = 'relative w-full max-w-72.75 xl:max-w-76'
const lineBaseClasses =
  'desktop-timeline-line bg-accent-foreground/30 absolute left-1/2 z-0 ml-4 h-px w-0'
const dotBaseClasses =
  'border-accent-foreground/30 absolute left-1/2 z-10 flex h-2.75 w-2.75 -translate-x-1/2 items-center justify-center rounded-full border'
const progressDotClasses = 'bg-status-progress h-1.5 w-1.5 rounded-full'

export default function DesktopTimeline({ milestones }: { milestones: Milestone[] }) {
  const { containerRef, upMilestones, downMilestones } = useDesktopTimeline({ milestones })

  if (milestones.length === 0) return null

  return (
    <div className="mx-auto hidden w-fit flex-col lg:flex" ref={containerRef}>
      <div className={cn(containerBaseClasses, milestones.length > 3 && spacingUpClasses)}>
        {upMilestones.map((milestone, index) => {
          const order = milestones.length < 4 ? index : index * 2

          return (
            <div
              key={milestone.id}
              className={cn(milestoneBaseClasses, 'pb-6')}
              data-milestone-order={order}
            >
              <div className={cn(lineBaseClasses, '-bottom-px')} />
              <div className={cn(dotBaseClasses, '-bottom-1.5')}>
                {milestone.progress !== 0 && <div className={progressDotClasses} />}
              </div>
              <MilestoneCard milestone={milestone} />
            </div>
          )
        })}
      </div>

      {milestones.length > 3 && (
        <div className={cn(containerBaseClasses, spacingDownClasses)}>
          {downMilestones.map((milestone, index) => {
            const order = index * 2 + 1

            return (
              <div
                key={milestone.id}
                className={cn(milestoneBaseClasses, 'pt-6')}
                data-milestone-order={order}
              >
                <div className={cn(lineBaseClasses, 'top-0')} />
                <div className={cn(dotBaseClasses, '-top-1.25')}>
                  {milestone.progress !== 0 && <div className={progressDotClasses} />}
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
