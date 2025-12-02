'use client'

import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { MilestoneCard } from '@/modules/roadmap/components/milestone-card'
import type { RoadmapDetails_Milestone } from '@/modules/roadmap/types'
import useRoadmapSwiper from '@/modules/roadmap/components/roadmap-swiper/use-roadmap-swiper'
import { cn } from '@/shared/lib/utils'

interface TimelineSwiperProps {
  milestones: RoadmapDetails_Milestone[]
}

export default function TimelineSwiper({ milestones }: TimelineSwiperProps) {
  const { adjustCardHeights, swiperRef } = useRoadmapSwiper()

  return (
    <div className="hidden flex-col md:flex lg:hidden">
      <div className="relative -mx-2">
        <Swiper
          ref={swiperRef}
          modules={[Pagination]}
          pagination={{
            clickable: true,
          }}
          onAfterInit={() => {
            adjustCardHeights()
          }}
          onResize={() => {
            adjustCardHeights()
          }}
          onBreakpoint={() => {
            adjustCardHeights()
          }}
          breakpoints={{
            768: {
              slidesPerView: 3,
              slidesPerGroup: 3,
              spaceBetween: 8,
            },
          }}
          centerInsufficientSlides
          className={cn(
            '!pb-10',
            '[&_.swiper-slide]:mb-2 [&_.swiper-slide]:box-border [&_.swiper-slide]:flex [&_.swiper-slide]:h-auto',
          )}
        >
          {milestones.map((milestone) => (
            <SwiperSlide key={milestone.id} className="flex">
              <div className="mx-2 flex h-full flex-1">
                <MilestoneCard milestone={milestone} className="swiper-milestone-card" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}
