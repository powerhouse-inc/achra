import React from 'react'
import { RevenueCard } from './cards/revenue-card'
import { SpendingCard } from './cards/spending-card'

export function FinancesLegends() {
  return (
    <div className="flex w-full flex-col gap-2 sm:gap-4 md:mt-0 md:flex-col md:gap-6 xl:mt-3 xl:flex-col">
      <div className="flex flex-col gap-4 md:flex-row xl:flex-col">
        <div className="flex w-full flex-col gap-2 sm:gap-6 xl:flex-row xl:gap-8">
          <div className="flex h-full w-full sm:h-27 lg:h-full">
            <RevenueCard />
          </div>
          <div className="flex w-full">
            <SpendingCard />
          </div>
        </div>
      </div>
    </div>
  )
}
