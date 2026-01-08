'use client'

import { useQueryState } from 'nuqs'
import { useCallback } from 'react'
import { BasicSelect } from '@/modules/shared/components/basic-select/basic-select'
import { FilterDrawer } from '@/modules/shared/components/filter-drawer/filter-drawer'
import { Button } from '@/modules/shared/components/ui/button'
import { GRANULARITY_OPTIONS, METRIC_OPTIONS } from '../../types'
import {
  BreakdownGranularitySelectDrawer,
  BreakdownMetricSelectDrawer,
} from './filter-metric-breakdown-chart'
import { granularityParser, metricParser } from './lib/search-params-server'
export default function FilterChart() {
  const [metric, setMetric] = useQueryState('metric', metricParser)
  const [granularity, setGranularity] = useQueryState('granularity', granularityParser)

  const onReset = useCallback(() => {
    void setMetric(null)
    void setGranularity(null)
  }, [setGranularity, setMetric])

  return (
    <div className="row flex gap-4">
      <div className="hidden items-center gap-4 md:flex">
        <Button variant="ghost" className="text-muted-foreground" onClick={onReset}>
          Reset Filters
        </Button>
        <BasicSelect
          key={`metric-${metric}`}
          value={metric}
          label="Metric"
          onValueChange={(value) => {
            void setMetric(value as METRIC_OPTIONS)
          }}
          options={Object.values(METRIC_OPTIONS)}
          placeholder="Budget"
        />
        <BasicSelect
          key={`granularity-${granularity}`}
          label="Granularity"
          value={granularity}
          onValueChange={(value) => {
            void setGranularity(value as GRANULARITY_OPTIONS)
          }}
          options={Object.values(GRANULARITY_OPTIONS)}
          placeholder="Monthly"
        />
      </div>
      <div className="flex items-center gap-4 md:hidden">
        <FilterDrawer onReset={onReset}>
          <BreakdownMetricSelectDrawer metric={metric} setMetric={setMetric} />
          <BreakdownGranularitySelectDrawer
            granularity={granularity}
            setGranularity={setGranularity}
          />
        </FilterDrawer>
      </div>
    </div>
  )
}
