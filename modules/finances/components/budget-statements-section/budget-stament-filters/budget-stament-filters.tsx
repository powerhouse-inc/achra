'use client'
import { ArrowUpDown } from 'lucide-react'
import { useState } from 'react'

import { METRIC_OPTIONS } from '@/modules/finances/types'
import { BasicSelect } from '@/modules/shared/components/basic-select/basic-select'
import { FilterDrawer } from '@/modules/shared/components/filter-drawer/filter-drawer'
import { Button } from '@/modules/shared/components/ui/button'
import { MetricSelectDrawer } from '../metric-budget-filters/metric-select-drawer'
import { BudgetStatementPopover } from './budget-stament-popover'
import { StatusSelectBudget, StatusSelectDrawer } from './budget-stament-status'
import { MetricItemFilter } from './metric-item-filter'
import useBudgetStamentFilters from './use-budget-stament-filters'
import type { MetricWithoutBudget } from '../type'

export default function BudgetStatementFilters() {
  const [open, setOpen] = useState(false)
  const {
    status,
    setStatus,
    metricSort,
    metric,
    setMetric,
    onReset,
    handleOnMetricSelect,
    isStatusPending,
    isMetricPending,
    isResetPending,
    isResetDisabled,
  } = useBudgetStamentFilters()
  return (
    <div className="row flex gap-4">
      <div className="hidden items-center gap-4 md:flex">
        <Button
          className="text-foreground/50 px-4 hover:bg-transparent dark:hover:bg-transparent"
          variant="ghost"
          onClick={onReset}
          disabled={isResetDisabled}
        >
          Reset Filter
        </Button>
        <BasicSelect
          key={metric}
          value={metric}
          label="Metric"
          onValueChange={(value) => {
            setMetric(value as MetricWithoutBudget)
          }}
          options={Object.values(METRIC_OPTIONS).filter((metric) => metric !== 'Budget')}
          placeholder="Budget"
          className="md:min-w-25.5 lg:min-w-46"
          isLoading={isMetricPending}
          disabled={isResetPending}
        />
        <StatusSelectBudget
          status={status}
          setStatus={setStatus}
          className="md:w-25.5 lg:w-46"
          isLoading={isStatusPending}
          disabled={isResetPending}
        />
      </div>
      <div className="flex gap-4 lg:hidden">
        <div className="flex items-center gap-4 md:hidden">
          <FilterDrawer onReset={onReset}>
            <StatusSelectDrawer status={status} setStatus={setStatus} />
            <MetricSelectDrawer metric={metric} setMetric={setMetric} />
          </FilterDrawer>
        </div>

        <div className="flex items-center gap-4 lg:hidden">
          <BudgetStatementPopover
            className="hidden md:flex"
            handleOnMetricSelect={handleOnMetricSelect}
            metric={metricSort}
            open={open}
            setOpen={setOpen}
          />
          <div className="flex md:hidden">
            <FilterDrawer
              onReset={onReset}
              filterTrigger={
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ArrowUpDown className="size-4.5" />
                </Button>
              }
            >
              <div className="border-input flex flex-col gap-1 rounded-xl border p-2">
                <div className="flex items-center justify-between px-2 pt-2 pb-1">
                  <span className="text-foreground text-sm font-semibold">Sort by</span>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      handleOnMetricSelect('modified_newest')
                    }}
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors outline-none"
                  >
                    Reset
                  </Button>
                </div>
                <div className="text-muted-foreground/80 px-2 py-1.5 text-xs font-semibold">
                  Reporting Month
                </div>
                <MetricItemFilter
                  label="Newest First"
                  isSelected={metricSort === 'reporting_newest'}
                  onClick={() => {
                    handleOnMetricSelect('reporting_newest')
                  }}
                />
                <MetricItemFilter
                  label="Oldest First"
                  isSelected={metricSort === 'reporting_oldest'}
                  onClick={() => {
                    handleOnMetricSelect('reporting_oldest')
                  }}
                />

                <div className="text-muted-foreground/80 mt-2 px-2 py-1.5 text-xs font-semibold">
                  Last Modified
                </div>
                <MetricItemFilter
                  label="Newest First"
                  isSelected={metricSort === 'modified_newest'}
                  onClick={() => {
                    handleOnMetricSelect('modified_newest')
                  }}
                />
                <MetricItemFilter
                  label="Oldest First"
                  isSelected={metricSort === 'modified_oldest'}
                  onClick={() => {
                    handleOnMetricSelect('modified_oldest')
                  }}
                />
              </div>
            </FilterDrawer>
          </div>
        </div>
      </div>
    </div>
  )
}
