'use client'

import { cn } from '@/shared/lib/utils'
import { MilestoneCard } from '../milestone-card'
import TimelineSwiper from './timeline-swiper'
import type { Milestone } from '../milestone-card/types'

export default function Timeline({ milestones }: {milestones: Milestone[]}) {
  if (milestones.length === 0) {
    return null
  }

  const upMilestones = milestones.length < 4 ? milestones : milestones.filter((_, i) => i % 2 === 0)
  const downMilestones = milestones.filter((_, i) => i % 2 !== 0)

  return (
    <>
      {/* Mobile Timeline */}
      <div className="flex flex-col gap-6 relative z-10 md:hidden">
        <div className="absolute left-1/2 top-0 h-full w-1.5 -translate-x-1/2 bg-gray-200 -z-10" />
        {milestones.map((milestone) => (
          <MilestoneCard key={milestone.id} milestone={milestone} />
        ))}
      </div>

      {/* Tablet Timeline with Swiper */}
      <TimelineSwiper milestones={milestones} />

      {/* Desktop Timeline */}
      <div className="hidden lg:flex lg:flex-col lg:w-fit lg:mx-auto">
        <div className={cn(
          'flex items-stretch gap-6 lg:gap-10 xl:gap-[73px] 2xl:gap-[103px]',
          milestones.length > 3 && 'pr-20 lg:pr-[130px] xl:pr-[180px] 2xl:pr-[195px]'
        )}>
          {upMilestones.map((milestone, _) => {
            const isLast = milestone === milestones[milestones.length - 1]
            
            return (
              <div
                key={milestone.id}
                className="overview-up-card-wrapper relative pb-6 w-full max-w-[291px] xl:max-w-[304px]"
              >
                {!isLast && (
                  <div 
                    className="absolute -bottom-0.5 left-1/2 translate-x-4 h-0.5 bg-gray-200 z-0"
                    style={{
                      width: milestones.length < 4 
                        ? 'calc(100% - 8px)' 
                        : milestones.length === 4 
                          ? 'calc(25% + 8px)'
                          : '160px'
                    }}
                  />
                )}
                <div 
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 z-10"
                  style={{
                    backgroundImage: 'radial-gradient(circle, #2563eb 40%, white 40%, white 60%, #6b7280 60%)',
                    borderRadius: '50%'
                  }}
                />
                <MilestoneCard milestone={milestone} />
              </div>
            )
          })}
        </div>

        {milestones.length > 3 && (
          <div className={cn(
            'flex items-stretch gap-6 lg:gap-10 xl:gap-[73px] 2xl:gap-[103px]',
            'pl-20 lg:pl-[130px] xl:pl-[180px] 2xl:pl-[195px]'
          )}>
            {downMilestones.map((milestone, _) => {
              const isLast = milestone === milestones[milestones.length - 1]
              
              return (
                <div
                  key={milestone.id}
                  className="overview-down-card-wrapper relative pt-6 w-full max-w-[291px] xl:max-w-[304px]"
                >
                  {!isLast && (
                    <div 
                      className="absolute top-0 left-1/2 translate-x-4 h-0.5 bg-gray-200 z-0"
                      style={{
                        width: milestones.length < 4 
                          ? 'calc(100% - 8px)' 
                          : milestones.length === 4 
                            ? 'calc(25% + 8px)'
                            : '180px'
                      }}
                    />
                  )}
                  <div 
                    className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 z-10"
                    style={{
                      backgroundImage: 'radial-gradient(circle, #2563eb 40%, white 40%, white 60%, #6b7280 60%)',
                      borderRadius: '50%'
                    }}
                  />
                  <MilestoneCard milestone={milestone} />
                </div>
              )
            })}
          </div>
        )}
      </div>
    </>
  )
}
