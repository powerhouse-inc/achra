'use client'

import { cn } from '@/shared/lib/utils'
import { MilestoneCard } from '../../milestone-card'
import useDesktopTimeline from './use-desktop-timeline'
import type { Milestone } from '../../milestone-card/types'

export default function DesktopTimeline({ milestones }: { milestones: Milestone[] }) {
  const desktopTimeline = useDesktopTimeline()

  if (milestones.length === 0) return null

  const upMilestones = milestones.length < 4 ? milestones : milestones.filter((_, i) => i % 2 === 0)
  const downMilestones = milestones.filter((_, i) => i % 2 !== 0)

  return (
    <div
      className="hidden lg:mx-auto lg:flex lg:w-fit lg:flex-col"
      ref={desktopTimeline.containerRef}
    >
      <div
        className={cn(
          'flex items-stretch gap-6 lg:gap-10 xl:gap-[73px] 2xl:gap-[103px]',
          milestones.length > 3 && 'pr-20 lg:pr-[130px] xl:pr-[180px] 2xl:pr-[195px]',
        )}
      >
        {upMilestones.map((milestone, index) => {
          const order = milestones.length < 4 ? index : index * 2

          return (
            <div
              key={milestone.id}
              className="overview-up-card-wrapper relative w-full max-w-[291px] pb-6 xl:max-w-[304px]"
              data-milestone-order={order}
            >
              <div className="desktop-timeline-line absolute -bottom-0.5 left-1/2 z-0 ml-5 h-0.5 w-0 bg-gray-200" />
              <div
                className="absolute -bottom-2 left-1/2 z-10 h-4 w-4 -translate-x-1/2 rounded-full"
                style={{
                  backgroundImage:
                    'radial-gradient(circle, #2563eb 40%, white 40%, white 60%, #6b7280 60%)',
                }}
              />
              <MilestoneCard milestone={milestone} />
            </div>
          )
        })}
      </div>

      {milestones.length > 3 && (
        <div
          className={cn(
            'flex items-stretch gap-6 lg:gap-10 xl:gap-[73px] 2xl:gap-[103px]',
            'pl-20 lg:pl-[130px] xl:pl-[180px] 2xl:pl-[195px]',
          )}
        >
          {downMilestones.map((milestone, index) => {
            const order = index * 2 + 1

            return (
              <div
                key={milestone.id}
                className="overview-down-card-wrapper relative w-full max-w-[291px] pt-6 xl:max-w-[304px]"
                data-milestone-order={order}
              >
                <div className="desktop-timeline-line absolute top-0 left-1/2 z-0 ml-5 h-0.5 w-0 bg-gray-200" />
                <div
                  className="absolute -top-2 left-1/2 z-10 h-4 w-4 -translate-x-1/2 rounded-full"
                  style={{
                    backgroundImage:
                      'radial-gradient(circle, #2563eb 40%, white 40%, white 60%, #6b7280 60%)',
                  }}
                />
                <MilestoneCard milestone={milestone} />
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
