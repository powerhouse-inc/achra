'use client'

import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { cn } from '@/shared/lib/utils'
import { ProposalCard } from '../proposal-card/proposal-card'
import { PROPOSALS_SWIPER_BREAKPOINTS } from './constants'
import useProposalsSwiper from './use-proposals-swiper'
import type { Proposal } from '../../proposals-section'

interface ProposalsSwiperProps {
  proposals: Proposal[]
}

export default function ProposalsSwiper({ proposals }: ProposalsSwiperProps) {
  const { handleAfterInit, swiperRef, isSwiperReady } = useProposalsSwiper()

  return (
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
        breakpoints={PROPOSALS_SWIPER_BREAKPOINTS}
        className={cn(
          '!pb-10',
          '[&_.swiper-slide]:mb-2 [&_.swiper-slide]:box-border [&_.swiper-slide]:flex [&_.swiper-slide]:h-auto',
          !isSwiperReady && '!hidden',
        )}
      >
        {proposals.map((proposal) => (
          <SwiperSlide key={proposal.id} className="flex">
            <div className="mx-2 flex h-full flex-1">
              <ProposalCard
                id={proposal.id}
                title={proposal.title}
                budget={proposal.budget}
                submissionDeadline={proposal.submissionDeadline}
                experienceLevel={proposal.experienceLevel}
                detailsHref={proposal.detailsHref}
                className="swiper-proposal-card"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={cn('flex overflow-hidden pb-10', isSwiperReady && 'hidden')}>
        {proposals.map((proposal) => (
          <div
            key={proposal.id}
            className="mx-2 mb-2 flex h-full w-full min-w-[calc(100%-16px)] sm:min-w-[calc(100%/2-16px)] lg:min-w-[calc(100%/3-16px)] xl:min-w-[calc(100%/4-16px)]"
          >
            <ProposalCard
              id={proposal.id}
              title={proposal.title}
              budget={proposal.budget}
              submissionDeadline={proposal.submissionDeadline}
              experienceLevel={proposal.experienceLevel}
              detailsHref={proposal.detailsHref}
              className="swiper-proposal-card w-full"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
