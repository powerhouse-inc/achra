import React from 'react'
import { CardBarChart } from '@/modules/networks/components/card-bar-chart/card-bar-chart'
import { CardStackedAreaChart } from '@/modules/networks/components/card-stacked-area-chart/card-stacked-area-chart'
import { UsdsIcon } from '@/modules/shared/components/svgs'
import SectionTitle from '../section-title/section-title'

export function FinancesSection() {
  return (
    <div className="mt-6 flex flex-col gap-6 xl:mt-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <SectionTitle title="Finances" hash="finances" />
        <div className="flex items-center gap-2 text-xs/5 font-semibold xl:text-sm">
          <UsdsIcon className="size-5 md:size-6" />
          *All values are converted to USDS
        </div>
      </div>
      <div className="flex w-full flex-col items-center gap-4 xl:flex-row xl:gap-8">
        <CardBarChart />
        <CardStackedAreaChart />
      </div>
    </div>
  )
}
