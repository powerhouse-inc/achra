import React from 'react'
import { revenueAndSpendingData } from '@/mocks/networks-mock/revenueAndSpendingData'
import { ExternalLink } from '@/modules/shared/components/external-link/external-link'
import { InternalLink } from '@/modules/shared/components/internal-link/internal-link'
import { Card, CardTitle } from '@/modules/shared/components/ui/card'
import { getYearsForChart } from '../finances-section/utils'
import FinancesBarChart from './finances-bar-chart'
import { FinancesLegends } from './legend-card-section'

export function CardBarChart() {
  return (
    <Card className="bg-popover h-full w-full rounded-xl p-4 pt-2 shadow-lg sm:gap-0 sm:pt-4 lg:px-6 xl:px-4 xl:pt-4 xl:pb-6 2xl:px-6 2xl:pt-4 2xl:pb-6">
      <CardTitle className="mb-0.5 text-xl leading-[120%] font-bold lg:mb-0 xl:mb-6 xl:text-lg 2xl:mb-7">
        Sky Ecosystem Finances
      </CardTitle>
      <div className="flex w-full flex-col gap-3.5 sm:flex-row sm:gap-4 xl:flex-col xl:gap-6.25">
        <div className="flex w-full">
          <FinancesBarChart
            revenueAndSpendingData={revenueAndSpendingData}
            years={getYearsForChart(revenueAndSpendingData)}
          />
        </div>
        <div className="flex w-full">
          <FinancesLegends />
        </div>
      </div>
      <div className="flex flex-wrap justify-between sm:mt-4 xl:mt-6">
        <ExternalLink href="https://makerburn.com">Risk Dashboard</ExternalLink>
        <InternalLink href="/networks">Details</InternalLink>
      </div>
    </Card>
  )
}
