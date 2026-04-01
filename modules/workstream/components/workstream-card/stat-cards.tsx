'use client'

import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { BudgetEstimateCard } from './budget-estimate-card'
import { PaymentTermsCard } from './payment-terms-card'
import { RoadmapCard } from './roadmap-card'

interface StatCardsProps {
  milestones: number
  deliverables: number
  totalBudget: number
}

function StatCards({ milestones, deliverables, totalBudget }: StatCardsProps) {
  return (
    <>
      {/* Mobile */}
      <div className="md:hidden">
        <Swiper navigation={true} modules={[Navigation]}>
          <SwiperSlide>
            <div className="h-31.5 px-5 sm:px-10 [&>*:first-child]:h-full">
              <RoadmapCard milestones={milestones} deliverables={deliverables} />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="h-31.5 px-5 sm:px-10 [&>*:first-child]:h-full">
              <BudgetEstimateCard totalBudget={totalBudget} />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="h-31.5 px-5 sm:px-10 [&>*:first-child]:h-full">
              <PaymentTermsCard />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      {/* Desktop */}
      <div className="hidden grid-cols-1 gap-2 md:grid md:grid-cols-2 md:gap-4 lg:grid-cols-3 lg:gap-6 md:[&>*:last-child]:col-span-2 lg:[&>*:last-child]:col-span-1">
        <RoadmapCard milestones={milestones} deliverables={deliverables} />
        <BudgetEstimateCard totalBudget={totalBudget} />
        <PaymentTermsCard />
      </div>
    </>
  )
}

export { StatCards }
