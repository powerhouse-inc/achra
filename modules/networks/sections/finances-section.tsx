import { LinkIcon } from 'lucide-react'
import React from 'react'
import { CardBarChart } from '@/modules/networks/components/card-bar-chart/card-bar-chart'
import { CardStackedAreaChart } from '@/modules/networks/components/card-stacked-area-chart/card-stacked-area-chart'

export function FinacesSection() {
  return (
    <div className="mt-6 flex flex-col gap-6 xl:mt-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl leading-9 font-bold lg:text-3xl">Finances</h2>
          <LinkIcon />
        </div>
        <div>*All values are converted to USDS</div>
      </div>
      <div className="flex w-full flex-col items-center gap-4 xl:flex-row xl:gap-8">
        <CardBarChart />
        <CardStackedAreaChart />
      </div>
    </div>
  )
}
