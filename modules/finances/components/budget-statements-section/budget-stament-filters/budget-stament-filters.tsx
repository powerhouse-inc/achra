'use client'
import { ArrowUpDown } from 'lucide-react'
import { METRIC_OPTIONS } from '@/modules/finances/types'
import { BasicSelect } from '@/modules/shared/components/basic-select/basic-select'
import { FilterDrawer } from '@/modules/shared/components/filter-drawer/filter-drawer'
import { Button } from '@/modules/shared/components/ui/button'
import { MetricSelectDrawer } from '../metric-budget-filters/metric-select-drawer'
import { BudgetStatementPopover } from './budget-stament-popover'
import { StatusSelectBudget, StatusSelectDrawer } from './budget-stament-status'
import useBudgetStamentFilters from './useBudgetStamentFilters'
import type { MetricWithoutBudget } from '../type'

interface BudgetStatementFiltersProps {
  setBudgetMetric: (value: MetricWithoutBudget) => Promise<URLSearchParams>
}

export default function BudgetStatementFilters({
  setBudgetMetric,
}: Readonly<BudgetStatementFiltersProps>) {
  const {
    open,
    setOpen,
    status,
    setStatus,
    metricSort,
    metric,
    setMetric,
    onReset,
    handleOnMetricSelect,
  } = useBudgetStamentFilters()
  return (
    <div className="row flex w-full justify-end gap-4">
      <div className="hidden w-full items-center justify-end gap-4 md:flex">
        <Button
          className="text-foreground/50 px-4 hover:bg-transparent dark:hover:bg-transparent"
          variant="ghost"
          onClick={onReset}
        >
          Reset Filter
        </Button>
        <BasicSelect
          key={metric}
          value={metric}
          label="Metric"
          onValueChange={(value) => {
            void setMetric(value as MetricWithoutBudget)
            void setBudgetMetric(value as MetricWithoutBudget)
          }}
          options={Object.values(METRIC_OPTIONS).filter((metric) => metric !== 'Budget')}
          placeholder="Budget"
          className="md:min-w-25.5 lg:min-w-46"
        />
        <StatusSelectBudget status={status} setStatus={setStatus} className="md:w-25.5 lg:w-46" />
      </div>
      <div className="flex w-full gap-4 lg:hidden">
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
            <FilterDrawer onReset={onReset} filterTrigger={<ArrowUpDown className="size-4.5" />}>
              <MetricSelectDrawer metric={metric} setMetric={setMetric} />
            </FilterDrawer>
          </div>
        </div>
      </div>
    </div>
  )
}
