import React from 'react'
import { revenueAndSpendingData } from '@/mocks/networks-mock/revenueAndSpendingData'
import { ExternalLinkButton } from '@/modules/shared/components/external-link-button/external-link-button'
import { InternalLinkButton } from '@/modules/shared/components/internal-link-button'
import { Card, CardTitle } from '@/modules/shared/components/ui/card'
import { getYearsForChart } from '../finances-section/utils'
import FinancesBarChart from './finaces-bar-chart'
import { FinancesLegends } from './legend-card-section'

export function CardBarChart() {
  return (
    <Card className="bg-popover h-full w-full rounded-xl p-4 shadow-lg lg:px-6 xl:px-4 xl:pt-4 xl:pb-6 2xl:px-6 2xl:pt-4 2xl:pb-6">
      <CardTitle className="text-xl leading-[120%] font-bold xl:text-lg">
        Sky Ecosystem Finances
      </CardTitle>
      <div className="flex w-full flex-col gap-4 sm:flex-row xl:flex-col xl:gap-8">
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
      <div className="flex flex-wrap justify-between">
        <ExternalLinkButton href="https://makerburn.com">makerburn.com</ExternalLinkButton>
        <InternalLinkButton href="/networks">Details</InternalLinkButton>
      </div>
    </Card>
  )
}
