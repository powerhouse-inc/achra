'use client'

import { ListFilter } from 'lucide-react'
import { useQueryState } from 'nuqs'
import { useCallback } from 'react'
import { BasicSelect } from '@/modules/shared/components/basic-select/basic-select'
import { Button } from '@/modules/shared/components/ui/button'
import { granularityParser, metricParser } from './lib/search-params-server'
import { GRANULARITY_OPTIONS, type GranularityType, METRIC_OPTIONS, type MetricType } from './types'

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
          key={`metric-${metric ?? 'empty'}`}
          value={metric ?? undefined}
          label="Metric"
          onValueChange={(value) => {
            void setMetric(value as MetricType)
          }}
          options={METRIC_OPTIONS as unknown as string[]}
          placeholder="Budget"
        />
        <BasicSelect
          key={`granularity-${granularity ?? 'empty'}`}
          label="Granularity"
          value={granularity ?? undefined}
          onValueChange={(value) => {
            void setGranularity(value as GranularityType)
          }}
          options={GRANULARITY_OPTIONS as unknown as string[]}
          placeholder="Monthly"
        />
      </div>
      <div className="flex items-center gap-4 md:hidden">
        <button type="button" aria-label="Filter" onClick={() => {}} className="cursor-pointer">
          <ListFilter className="size-5" />
        </button>
      </div>
    </div>
  )
}
