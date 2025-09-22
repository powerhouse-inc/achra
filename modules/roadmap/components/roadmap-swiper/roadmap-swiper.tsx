'use client'

import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { ScopeOfWork_Milestone } from '@/modules/__generated__/graphql/switchboard-generated'
import { MilestoneExtendedCard } from '@/modules/roadmap/components/milestone-extended-card'
import { cn } from '@/shared/lib/utils'
import useRoadmapSwiper from './use-roadmap-swiper'

interface RoadmapSwiperProps {
  milestones: ScopeOfWork_Milestone[]
}

export default function RoadmapSwiper({ milestones }: RoadmapSwiperProps) {
  const { adjustCardHeights, swiperRef } = useRoadmapSwiper()

  return (
    <div className="hidden flex-col sm:flex">
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
            640: {
              slidesPerView: 2,
              slidesPerGroup: 2,
              spaceBetween: 0,
            },
            768: {
              slidesPerView: 2,
              slidesPerGroup: 2,
              spaceBetween: 8,
            },
            1024: {
              slidesPerView: 3,
              slidesPerGroup: 3,
              spaceBetween: 8,
            },
            1280: {
              slidesPerView: 4,
              slidesPerGroup: 4,
              spaceBetween: 0,
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
                <MilestoneExtendedCard milestone={milestone} className="swiper-milestone-card" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}
