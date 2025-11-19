'use client'

import { useMemo } from 'react'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import ProposalCardOutline from './proposal-card-outline'

interface StatCardsProps {
  milestones: number
  deliverables: number
}

function StatCards({ milestones, deliverables }: StatCardsProps) {
  const card1 = useMemo(
    () => (
      <ProposalCardOutline title="Roadmap">
        <div className="flex gap-2 text-center">
          <div className="flex flex-1 flex-col">
            <div className="text-3xl font-bold">{milestones}</div>
            <div className="text-foreground/50">Milestones</div>
          </div>
          <div className="flex flex-1 flex-col">
            <div className="text-3xl font-bold">{deliverables}</div>
            <div className="text-foreground/50">Deliverables</div>
          </div>
        </div>
      </ProposalCardOutline>
    ),
    [milestones, deliverables],
  )
  const card2 = useMemo(
    () => (
      <ProposalCardOutline title="Budget Estimate" className="pb-6">
        <div className="flex h-full gap-2 text-center">
          <div className="flex flex-1 items-end justify-center gap-2">
            <div className="text-3xl font-bold">18.2</div>
            <div className="text-foreground/50 text-left leading-4 uppercase">
              <div>K</div>
              <div>USD</div>
            </div>
          </div>
          <div className="flex flex-1 items-end justify-center gap-2">
            <div className="text-3xl font-bold">4.0</div>
            <div className="text-foreground/50 text-left leading-4 uppercase">
              <div>K</div>
              <div>POWTS</div>
            </div>
          </div>
        </div>
      </ProposalCardOutline>
    ),
    [],
  )
  const card3 = useMemo(
    () => (
      <ProposalCardOutline title="Payment Terms" className="gap-8">
        <div className="flex flex-wrap justify-between gap-2 gap-y-3 px-6 text-center text-sm/5.5 uppercase [&>div]:flex-1 [&>div]:whitespace-nowrap">
          <div>Retainer</div>
          <div>Monthly</div>
          <div>Cost & Materials</div>
        </div>
      </ProposalCardOutline>
    ),
    [],
  )

  return (
    <>
      {/* Mobile */}
      <div className="md:hidden">
        <Swiper navigation={true} modules={[Navigation]}>
          <SwiperSlide>
            <div className="h-31.5 px-5 sm:px-10 [&>*:first-child]:h-full">{card1}</div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="h-31.5 px-5 sm:px-10 [&>*:first-child]:h-full">{card2}</div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="h-31.5 px-5 sm:px-10 [&>*:first-child]:h-full">{card3}</div>
          </SwiperSlide>
        </Swiper>
      </div>

      {/* Desktop */}
      <div className="hidden grid-cols-1 gap-2 md:grid md:grid-cols-2 md:gap-4 lg:grid-cols-3 lg:gap-6 md:[&>*:last-child]:col-span-2 lg:[&>*:last-child]:col-span-1">
        {card1}
        {card2}
        {card3}
      </div>
    </>
  )
}

export { StatCards }
