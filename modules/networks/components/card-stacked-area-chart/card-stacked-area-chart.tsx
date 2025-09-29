'use client'
import React, { useState } from 'react'
import { InternalLink } from '@/modules/shared/components/internal-link'
import { TabButton } from '@/modules/shared/components/tab-button/tab-button'
import { Card } from '@/modules/shared/components/ui/card'
import { useMediaQuery } from '@/modules/shared/hooks/use-media-query'
import { cn } from '@/modules/shared/lib/utils'
import { ItemLegend } from '../card-bar-chart/cards/legend-item'
import { FinancesTabs } from './components/finances-tabs'
import StackedAreaChart from './components/stacket-area-chart'
import { REALIZED_EXPENSES_FILTER, TABS } from './constants'
import { mockedFinancesStackedAreaChartData, mockYears } from './mocks/finances'
import { getStackedAreaSeries } from './utils'
import type { TabValue } from './type'

export function CardStackedAreaChart() {
  const series = getStackedAreaSeries(mockedFinancesStackedAreaChartData, 'PaymentsOnChain')
  const [activeTab, setActiveTab] = useState<TabValue>(TABS.REALIZED_EXPENSES)
  const [realizedExpensesFilter, setRealizedExpensesFilter] = useState<REALIZED_EXPENSES_FILTER>(
    REALIZED_EXPENSES_FILTER.ACTUALS,
  )

  const isTablet = useMediaQuery({ from: 'sm', to: 'md' })

  const handleTabChange = (tab: TabValue) => {
    setActiveTab(tab)
  }
  const handleRealizedExpensesFilterChange = (filter: REALIZED_EXPENSES_FILTER) => {
    setRealizedExpensesFilter(filter)
  }
  return (
    <Card
      className={cn(
        'bg-popover w-full overflow-hidden rounded-lg shadow-lg',
        // Padding
        'pt-0 pb-4 sm:p-4 lg:px-6 xl:px-4 xl:pt-4 xl:pb-6 2xl:px-6 2xl:pt-4 2xl:pb-6',
        // gap
        'gap-2 sm:gap-4 lg:gap-4 xl:gap-2',
      )}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:gap-8 xl:flex-col xl:gap-2">
        <FinancesTabs activeTab={activeTab} onTabChange={handleTabChange} />

        <div
          className={cn(
            'flex w-full items-end justify-end gap-2 px-4 sm:px-0',
            activeTab === TABS.REALIZED_EXPENSES ? 'visible' : 'invisible',
          )}
        >
          <TabButton
            label="Actuals"
            size={isTablet ? 'small' : 'default'}
            onClick={() => {
              handleRealizedExpensesFilterChange(REALIZED_EXPENSES_FILTER.ACTUALS)
            }}
            isSelect={realizedExpensesFilter === REALIZED_EXPENSES_FILTER.ACTUALS}
          />
          <TabButton
            size={isTablet ? 'small' : 'default'}
            label="Payments"
            onClick={() => {
              handleRealizedExpensesFilterChange(REALIZED_EXPENSES_FILTER.PAYMENTS)
            }}
            isSelect={realizedExpensesFilter === REALIZED_EXPENSES_FILTER.PAYMENTS}
          />
        </div>
      </div>
      <div className="flex h-full w-full flex-col gap-4 px-2 sm:flex-row sm:px-0 lg:gap-6 xl:flex-col xl:gap-4.5">
        <StackedAreaChart series={series} years={mockYears} />

        <div
          className={cn(
            'sm:bg-accent border-bordersm:m-0 flex flex-wrap justify-center rounded-xl border sm:w-full sm:flex-col sm:justify-between sm:border-none xl:flex-row xl:justify-start',
            // gap
            'gap-x-6 gap-y-2',
            // Padding
            'h-28 py-2 sm:h-full sm:p-3.5 md:px-8 md:py-4 xl:px-6 xl:py-7',
          )}
        >
          {series.map((item) => (
            <ItemLegend key={item.name} color={item.itemStyle.color}>
              {item.name}
            </ItemLegend>
          ))}
        </div>
      </div>

      <div className="mt-3.5 flex justify-center sm:-mt-0.5 lg:mt-2 xl:mt-4">
        <InternalLink href="/networks" className="h-8 w-fit">
          Realized Expenses
        </InternalLink>
      </div>
    </Card>
  )
}
