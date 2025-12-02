'use client'

import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import type {
  ScopeOfWork_Milestone,
  Sow_Deliverable,
} from '@/modules/__generated__/graphql/switchboard-generated'
import {
  MilestoneExtendedCard,
  MilestoneExtendedCardSkeleton,
} from '@/modules/roadmap/components/milestone-extended-card'
import { cn } from '@/shared/lib/utils'
import useRoadmapSwiper from './use-roadmap-swiper'

interface RoadmapSwiperProps {
  milestones: ScopeOfWork_Milestone[]
  networkSlug: string
  roadmapSlug: string
  deliverables: Sow_Deliverable[]
}

export default function RoadmapSwiper({
  milestones,
  networkSlug,
  roadmapSlug,
  deliverables,
}: RoadmapSwiperProps) {
  const { handleAfterInit, adjustCardHeights, swiperRef, isSwiperReady } = useRoadmapSwiper()

  return (
    <div className="-mx-4 hidden flex-col sm:flex">
      <div className="relative">
        <Swiper
          ref={swiperRef}
          watchSlidesProgress
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
            isSwiperReady && 'pb-10!',
            '[&_.swiper-slide]:mb-2 [&_.swiper-slide]:box-border [&_.swiper-slide]:flex [&_.swiper-slide]:h-auto',
            // Hide the swiper until it is ready using invisible! and h-0 to avoid layout flickering
            !isSwiperReady && 'invisible! h-0',
            'px-2!',
          )}
        >
          {milestones.map((milestone) => (
            <SwiperSlide key={milestone.id} className="flex">
              {({ isVisible }) => {
                return (
                  <div className={cn('mx-2 flex h-full pt-2')} data-visible={isVisible}>
                    <MilestoneExtendedCard
                      milestone={milestone}
                      className={cn('swiper-milestone-card', { 'shadow-none': !isVisible })}
                      networkSlug={networkSlug}
                      roadmapSlug={roadmapSlug}
                      deliverables={deliverables}
                    />
                  </div>
                )
              }}
            </SwiperSlide>
          ))}
        </Swiper>
        <div className={cn('flex gap-2', isSwiperReady && 'hidden')}>
          <MilestoneExtendedCardSkeleton />
          <MilestoneExtendedCardSkeleton className="hidden sm:flex" />
          <MilestoneExtendedCardSkeleton className="hidden lg:flex" />
          <MilestoneExtendedCardSkeleton className="hidden xl:flex" />
        </div>
      </div>
    </div>
  )
}
