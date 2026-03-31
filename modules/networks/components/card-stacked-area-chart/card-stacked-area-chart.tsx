'use client'
import { useTheme } from 'next-themes'
import React, { useState } from 'react'
import {
  mockFinancesData,
  mockYears,
} from '@/modules/networks/mocks/card-stacked-area-chart-finances'
import { InternalLink } from '@/modules/shared/components/internal-link'
import { TabButton } from '@/modules/shared/components/tab-button/tab-button'
import { Card } from '@/modules/shared/components/ui/card'
import { cn } from '@/modules/shared/lib/utils'
import { ItemLegend } from '../card-bar-chart/cards/legend-item'
import { FinancesTabs } from './components/finances-tabs'
import StackedAreaChart from './components/stacked-area-chart'
import { REALIZED_EXPENSES_FILTER, TABS } from './constants'
import { getStackedAreaSeries } from './utils'
import type { MetricKey, TabValue } from './type'

export function CardStackedAreaChart() {
  const isLightMode = useTheme().theme === 'light'

  const [activeTab, setActiveTab] = useState<TabValue>(TABS.REALIZED_EXPENSES)
  const [realizedExpensesFilter, setRealizedExpensesFilter] = useState<REALIZED_EXPENSES_FILTER>(
    REALIZED_EXPENSES_FILTER.ACTUALS,
  )

  const getSelectedMetric = (): MetricKey => {
    if (activeTab === TABS.REALIZED_EXPENSES) {
      return realizedExpensesFilter === REALIZED_EXPENSES_FILTER.ACTUALS
        ? 'Actuals'
        : 'PaymentsOnChain'
    }
    if (activeTab === TABS.OPERATIONAL_RESERVES) {
      return 'OperationalReserves'
    }
    return 'Forecast'
  }

  const selectedMetric = getSelectedMetric()
  const series = getStackedAreaSeries(mockFinancesData, selectedMetric, isLightMode)

  const handleTabChange = (tab: TabValue) => {
    setActiveTab(tab)
  }
  const handleRealizedExpensesFilterChange = (filter: REALIZED_EXPENSES_FILTER) => {
    setRealizedExpensesFilter(filter)
  }
  return (
    <Card
      className={cn(
        'bg-popover w-full rounded-lg border-transparent shadow-lg',
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
            onClick={() => {
              handleRealizedExpensesFilterChange(REALIZED_EXPENSES_FILTER.ACTUALS)
            }}
            isSelect={realizedExpensesFilter === REALIZED_EXPENSES_FILTER.ACTUALS}
          />
          <TabButton
            label="Payments"
            onClick={() => {
              handleRealizedExpensesFilterChange(REALIZED_EXPENSES_FILTER.PAYMENTS)
            }}
            isSelect={realizedExpensesFilter === REALIZED_EXPENSES_FILTER.PAYMENTS}
          />
        </div>
      </div>
      <div className="flex h-full w-full flex-col gap-4 px-2 sm:flex-row sm:px-0 lg:gap-4 xl:flex-col xl:gap-4">
        <StackedAreaChart series={series} years={mockYears} />

        <div
          className={cn(
            'sm:bg-accent border-bordersm:m-0 flex flex-wrap justify-center rounded-xl border sm:w-full sm:flex-col sm:justify-between sm:border-none xl:flex-row xl:justify-start',
            // gap
            'gap-x-6 gap-y-2',
            // Padding
            'xl:min-h-none min-h-28 px-2 py-2 sm:h-full sm:p-3.5 md:px-8 md:py-4 xl:h-36 xl:px-6 xl:py-7',
          )}
        >
          {series.map((item) => {
            return (
              <ItemLegend
                style={{
                  color: item.itemStyle.color,
                  fill: item.itemStyle.color,
                }}
                key={item.name}
              >
                {item.name}
              </ItemLegend>
            )
          })}
        </div>
      </div>

      <div className="mt-3.5 flex justify-center sm:-mt-0.5 lg:mt-2 xl:mt-4">
        <InternalLink href="/networks" className="w-fit xl:h-9">
          Realized Expenses
        </InternalLink>
      </div>
    </Card>
  )
}
