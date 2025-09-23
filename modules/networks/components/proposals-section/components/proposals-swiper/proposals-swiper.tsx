'use client'

import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { cn } from '@/shared/lib/utils'
import { ProposalCard } from '../proposal-card/proposal-card'
import useProposalsSwiper from './use-proposals-swiper'
import type { Proposal } from '../../proposals-section'

// Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'

interface ProposalsSwiperProps {
  proposals: Proposal[]
}

export default function ProposalsSwiper({ proposals }: ProposalsSwiperProps) {
  const { adjustCardHeights, swiperRef, swiperBreakpoints } = useProposalsSwiper()

  return (
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
        breakpoints={swiperBreakpoints}
        className={cn(
          '!pb-10',
          '[&_.swiper-slide]:mb-2 [&_.swiper-slide]:box-border [&_.swiper-slide]:flex [&_.swiper-slide]:h-auto',
        )}
      >
        {proposals.map((proposal) => (
          <SwiperSlide key={proposal.id} className="flex">
            <div className="mx-2 flex h-full flex-1">
              <ProposalCard
                id={proposal.id}
                title={proposal.title}
                budget={proposal.budget}
                deadlineDate={proposal.deadlineDate}
                experienceLevel={proposal.experienceLevel}
                detailsHref={proposal.detailsHref}
                className="swiper-proposal-card"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
