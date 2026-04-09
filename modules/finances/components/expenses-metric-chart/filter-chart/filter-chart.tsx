'use client'

import { useQueryStates } from 'nuqs'
import { useCallback, useMemo } from 'react'
import { BasicSelect } from '@/modules/shared/components/basic-select/basic-select'
import { FilterDrawer } from '@/modules/shared/components/filter-drawer/filter-drawer'
import { Button } from '@/modules/shared/components/ui/button'
import { expensesMetricChartFiltersConfig } from '../../../lib/expenses-metric-chart-search-params'
import { GRANULARITY_OPTIONS } from '../../../types'
import {
  ExpensesMetricCumulativeDrawer,
  ExpensesMetricCumulativeFilter,
} from '../filter-metric-expenses-metric-chart/filter-cumulative-expenses-metric-chart'
import { ExpensesMetricGranularitySelectDrawer } from '../filter-metric-expenses-metric-chart/filter-granularity-expenses-metric-chart'

function FilterChart() {
  const [filters, setFilters] = useQueryStates(expensesMetricChartFiltersConfig)
  const isCumulative = filters.cumulative === 'true'

  const onReset = useCallback(() => {
    void setFilters({
      granularity: GRANULARITY_OPTIONS.Monthly,
      cumulative: 'false',
      cumulativeType: 'relative',
    })
  }, [setFilters])

  const isResetDisabled = useMemo(
    () =>
      filters.granularity === GRANULARITY_OPTIONS.Monthly &&
      filters.cumulative === 'false' &&
      filters.cumulativeType === 'relative',
    [filters.cumulative, filters.cumulativeType, filters.granularity],
  )

  return (
    <div className="row flex w-full items-center justify-end gap-4 md:w-auto">
      <div className="hidden flex-wrap items-center justify-end gap-3 md:flex">
        <Button
          variant="ghost"
          className="text-muted-foreground"
          onClick={onReset}
          disabled={isResetDisabled}
        >
          Reset Filters
        </Button>
        <BasicSelect
          key={`granularity-${filters.granularity}`}
          label="Granularity"
          value={filters.granularity}
          onValueChange={(value) => {
            void setFilters({ granularity: value as GRANULARITY_OPTIONS })
          }}
          options={Object.values(GRANULARITY_OPTIONS)}
          placeholder="Monthly"
        />
        <ExpensesMetricCumulativeFilter
          isCumulative={isCumulative}
          cumulativeType={filters.cumulativeType}
          onToggleCumulative={() => {
            void setFilters({
              cumulative: isCumulative ? 'false' : 'true',
              cumulativeType: 'relative',
            })
          }}
          onChangeCumulativeType={(value) => {
            void setFilters({
              cumulative: 'true',
              cumulativeType: value,
            })
          }}
        />
      </div>
      <div className="flex items-center gap-4 md:hidden">
        <FilterDrawer onReset={onReset} isResetDisabled={isResetDisabled}>
          <ExpensesMetricGranularitySelectDrawer
            granularity={filters.granularity}
            setGranularity={async (granularity) => setFilters({ granularity })}
          />
          <ExpensesMetricCumulativeDrawer
            isCumulative={isCumulative}
            cumulativeType={filters.cumulativeType}
            onToggleCumulative={() => {
              void setFilters({
                cumulative: isCumulative ? 'false' : 'true',
                cumulativeType: 'relative',
              })
            }}
            onChangeCumulativeType={(value) => {
              void setFilters({
                cumulative: 'true',
                cumulativeType: value,
              })
            }}
          />
        </FilterDrawer>
      </div>
    </div>
  )
}

export { FilterChart }
