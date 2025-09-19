import { LinkIcon } from 'lucide-react'
import React from 'react'
import { FinacesBarChart } from '@/app/network/[slug]/finances/components/finaces-bar-chart'
import { FinancesStackedAreaChar } from '@/app/network/[slug]/finances/components/finances-stacked-area-chart'

export function FinacesSection() {
  return (
    <div className="mt-6 flex flex-col gap-6 xl:mt-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl leading-9.5 font-bold lg:text-[32px]">Finances</h2>
          <LinkIcon />
        </div>
        <div>*All values are converted to USDS</div>
      </div>
      <div className="flex w-full flex-col items-center gap-4 xl:flex-row xl:gap-8">
        <FinacesBarChart />
        <FinancesStackedAreaChar />
      </div>
    </div>
  )
}
