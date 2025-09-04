'use client'

import { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import type { SwiperRef } from 'swiper/react'
import { cn } from '@/shared/lib/utils'
import { MilestoneCard } from '../milestone-card'
import type { Milestone } from '../milestone-card/types'

// Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'

export default function TimelineSwiper({ milestones }: { milestones: Milestone[] }) {
  const swiperRef = useRef<SwiperRef>(null)

  return (
    <div className="mt-6 hidden flex-col md:flex lg:hidden">
      <div className="relative -mx-2">
        <Swiper
          ref={swiperRef}
          modules={[Pagination]}
          pagination={{
            clickable: true,
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
            'milestone-swiper',
            '[&_.swiper-slide]:mb-2 [&_.swiper-slide]:box-border [&_.swiper-slide]:h-auto',
            '[&_.swiper-pagination-horizontal]:relative [&_.swiper-pagination-horizontal]:bottom-0 [&_.swiper-pagination-horizontal]:mt-4',
            '[&_.swiper-pagination-bullet]:h-4 [&_.swiper-pagination-bullet]:w-4 [&_.swiper-pagination-bullet]:bg-gray-300 [&_.swiper-pagination-bullet]:opacity-100',
            '[&_.swiper-pagination-bullet:first-child]:rounded-l-full [&_.swiper-pagination-bullet:last-child]:rounded-r-full',
            '[&_.swiper-pagination-bullet:not(.swiper-pagination-bullet-active):hover]:bg-gray-400',
            '[&_.swiper-pagination-bullet-active]:bg-blue-600',
          )}
        >
          {milestones.map((milestone) => (
            <SwiperSlide key={milestone.id}>
              <div className="mx-2 h-full">
                <MilestoneCard milestone={milestone} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}
