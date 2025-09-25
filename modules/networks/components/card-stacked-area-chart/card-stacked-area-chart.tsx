'use client'
import React, { useState } from 'react'
import { InternalLink } from '@/modules/shared/components/internal-link'
import { Card } from '@/modules/shared/components/ui/card'
import { cn } from '@/modules/shared/lib/utils'
import { ItemLegend } from '../card-bar-chart/cards/legend-item'
import { FinancesTabs } from './components/finances-tabs'
import StackedAreaChart from './components/stacket-area-chart'
import { TabButton } from './components/tab-button'
import { mockedFinancesStackedAreaChartData, mockYears } from './mocks/finances'
import { TABS, type TabValue } from './type'
import { getStackedAreaSeries } from './utils'

export function CardStackedAreaChart() {
  const series = getStackedAreaSeries(mockedFinancesStackedAreaChartData, 'PaymentsOnChain')
  const [activeTab, setActiveTab] = useState<TabValue>(TABS.REALIZED_EXPENSES)

  const handleTabChange = (tab: TabValue) => {
    setActiveTab(tab)
  }

  return (
    <Card
      className={cn(
        'bg-popover w-full overflow-hidden overflow-y-auto rounded-lg shadow-lg',
        // Padding
        'pt-0 pb-4 sm:p-4 lg:px-6 xl:px-4 xl:pt-4 xl:pb-6 2xl:px-6 2xl:pt-4 2xl:pb-6',
        // gap
        'sm:gap:4 gap-2 lg:gap-4 xl:gap-2',
      )}
    >
      <div className="sm:gap:8 flex flex-col gap-4.5 sm:flex-row xl:flex-col xl:gap-2">
        <FinancesTabs activeTab={activeTab} onTabChange={handleTabChange} />

        <div className="flex w-full items-end justify-end gap-2 px-4 sm:px-0">
          <TabButton label="Actuals" onClick={() => {}} isSelect />
          <TabButton label="Payments" onClick={() => {}} />
        </div>
      </div>
      <div className="flex h-full w-full flex-col gap-4 px-4 sm:flex-row sm:px-0 lg:gap-6 xl:flex-col xl:gap-4.5">
        <StackedAreaChart series={series} years={mockYears} />

        <div
          className={cn(
            'sm:bg-accent flex flex-wrap justify-center gap-x-6 gap-y-2 rounded-xl border border-gray-200 sm:m-0 sm:w-full sm:flex-col sm:justify-between sm:border-none xl:mt-3 xl:flex-row xl:justify-start',
            // Padding
            'p-2 sm:p-4 md:px-8 md:py-4 xl:px-6 xl:py-7',
          )}
        >
          {series.map((item) => (
            <ItemLegend key={item.name} color={item.itemStyle.color}>
              {item.name}
            </ItemLegend>
          ))}
        </div>
      </div>

      <div className="mt-4 flex justify-center sm:mt-0 lg:mt-2 xl:mt-4">
        <InternalLink href="/networks" className="w-fit">
          Realized Expenses
        </InternalLink>
      </div>
    </Card>
  )
}
