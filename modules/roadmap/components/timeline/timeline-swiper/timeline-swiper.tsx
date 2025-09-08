'use client'

import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { cn } from '@/shared/lib/utils'
import { MilestoneCard } from '../../milestone-card'
import useTimelineSwiper from './use-timeline-swiper'
import type { Milestone } from '../../milestone-card/types'

// Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'

export default function TimelineSwiper({ milestones }: { milestones: Milestone[] }) {
  const { adjustCardHeights, swiperRef } = useTimelineSwiper()

  return (
    <div className="mt-6 hidden flex-col md:flex lg:hidden">
      <div className="relative -mx-2">
        <Swiper
          ref={swiperRef}
          modules={[Pagination]}
          pagination={{
            clickable: true,
          }}
          onAfterInit={() => adjustCardHeights()}
          onResize={() => adjustCardHeights()}
          onBreakpoint={() => adjustCardHeights()}
          breakpoints={{
            768: {
              slidesPerView: 3,
              slidesPerGroup: 3,
              spaceBetween: 8,
            },
          }}
          centerInsufficientSlides
          className={cn(
            'milestone-swiper !pb-10',
            '[&_.swiper-slide]:mb-2 [&_.swiper-slide]:box-border [&_.swiper-slide]:flex [&_.swiper-slide]:h-auto',
            '[&_.swiper-pagination]:!absolute [&_.swiper-pagination]:!bottom-0 [&_.swiper-pagination]:!z-10',
            '[&_.swiper-pagination-bullet]:h-4 [&_.swiper-pagination-bullet]:w-4 [&_.swiper-pagination-bullet]:bg-gray-300 [&_.swiper-pagination-bullet]:opacity-100',
            '[&_.swiper-pagination-bullet:first-child]:rounded-l-full [&_.swiper-pagination-bullet:last-child]:rounded-r-full',
            '[&_.swiper-pagination-bullet:not(.swiper-pagination-bullet-active):hover]:bg-gray-400',
            '[&_.swiper-pagination-bullet-active]:bg-blue-600',
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
