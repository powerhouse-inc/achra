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
  const { handleAfterInit, adjustCardHeights, swiperRef, isSwiperReady } = useRoadmapSwiper()

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
            handleAfterInit()
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
            !isSwiperReady && '!hidden',
          )}
        >
          {milestones.map((milestone) => (
            <SwiperSlide key={milestone.id} className="flex">
              <div className="mx-2 flex h-full">
                <MilestoneExtendedCard milestone={milestone} className="swiper-milestone-card" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="grid grid-cols-1">
          <div className={cn('flex h-full overflow-hidden pb-10', isSwiperReady && 'hidden')}>
            {milestones.map((milestone) => (
              <div
                key={milestone.id}
                className="mx-2 flex h-full w-full sm:min-w-[calc(100%/2-16px)] lg:min-w-[calc(100%/3-16px)] xl:min-w-[calc(100%/4-16px)]"
              >
                <MilestoneExtendedCard
                  milestone={milestone}
                  className="swiper-milestone-card mb-2"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
