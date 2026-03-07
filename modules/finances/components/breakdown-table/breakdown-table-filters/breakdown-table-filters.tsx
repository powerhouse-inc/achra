'use client'

import { useMemo } from 'react'

import { GRANULARITY_OPTIONS, METRIC_OPTIONS } from '@/modules/finances/types'
import { BasicSelect } from '@/modules/shared/components/basic-select/basic-select'
import { DrawerSelect, FilterDrawer } from '@/modules/shared/components/filter-drawer/filter-drawer'
import { MultipleSelector, type Option } from '@/modules/shared/components/form/multiselect'
import { Button } from '@/modules/shared/components/ui/button'
import { useBreakdownTableFilters } from './use-breakdown-table-filters'

const metricOptions: Option[] = Object.values(METRIC_OPTIONS).map((value) => ({
  value,
  label: value,
  group: 'Metrics',
}))

const granularityOptions: Option[] = Object.values(GRANULARITY_OPTIONS).map((value) => ({
  value,
  label: value,
  group: 'Granularity',
}))

function BreakdownTableFilters() {
  const {
    metrics,
    granularity,
    setMetrics,
    setGranularity,
    onReset,
    isResetDisabled,
    isResetPending,
    isMetricsPending,
    isGranularityPending,
  } = useBreakdownTableFilters()

  const selectedMetricOptions = useMemo(
    () =>
      metricOptions.filter((option) =>
        metrics.includes(option.value as (typeof METRIC_OPTIONS)[keyof typeof METRIC_OPTIONS]),
      ),
    [metrics],
  )

  const handleMetricsChange = (options: Option[]) => {
    setMetrics(
      options.map((option) => option.value as (typeof METRIC_OPTIONS)[keyof typeof METRIC_OPTIONS]),
    )
  }

  const handleDrawerMetricsChange = (values: string[]) => {
    setMetrics(values as Array<(typeof METRIC_OPTIONS)[keyof typeof METRIC_OPTIONS]>)
  }

  const handleDrawerGranularityChange = (value: string) => {
    setGranularity(value as (typeof GRANULARITY_OPTIONS)[keyof typeof GRANULARITY_OPTIONS])
  }

  return (
    <div className="row flex gap-4">
      <div className="hidden items-center gap-4 md:flex">
        <MultipleSelector
          value={selectedMetricOptions}
          onChange={handleMetricsChange}
          options={metricOptions}
          enableSearch={false}
          groupBy="group"
          selectAllGroup="Metrics"
          placeholder="Metric"
          className="bg-background dark:bg-background"
          commandProps={{
            className: 'md:w-48 lg:w-65',
          }}
          isLoading={isMetricsPending}
          disabled={isResetPending}
        />
        <BasicSelect
          key={`granularity-${granularity}`}
          value={granularity}
          label="Granularity"
          onValueChange={(value) => {
            setGranularity(value as (typeof GRANULARITY_OPTIONS)[keyof typeof GRANULARITY_OPTIONS])
          }}
          options={Object.values(GRANULARITY_OPTIONS)}
          placeholder="Monthly"
          className="md:w-27 lg:w-46"
          isLoading={isGranularityPending}
          disabled={isResetPending}
        />
        <Button
          className="text-foreground/50 px-4 hover:bg-transparent dark:hover:bg-transparent"
          variant="ghost"
          onClick={onReset}
          disabled={isResetDisabled}
        >
          Reset Filter
        </Button>
      </div>
      <div className="flex items-center gap-4 md:hidden">
        <FilterDrawer
          onReset={onReset}
          isResetDisabled={isResetDisabled}
          isResetPending={isResetPending}
        >
          <DrawerSelect
            value={metrics}
            onChange={handleDrawerMetricsChange}
            label="Metric"
            options={metricOptions}
            multiselect={true}
          />
          <DrawerSelect
            value={granularity}
            onChange={handleDrawerGranularityChange}
            label="Granularity"
            options={granularityOptions}
          />
        </FilterDrawer>
      </div>
    </div>
  )
}

export { BreakdownTableFilters }
