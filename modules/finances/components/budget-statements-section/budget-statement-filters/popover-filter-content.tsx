'use client'
import { Button } from '@/modules/shared/components/ui/button'
import { PopoverContent } from '@/modules/shared/components/ui/popover'
import { MetricItemFilter } from './metric-item-filter'

export type SortOptionValue =
  | 'reporting_newest'
  | 'reporting_oldest'
  | 'modified_newest'
  | 'modified_oldest'

interface SortPopoverContentProps {
  metric: SortOptionValue
  handleOnMetricSelect: (value: SortOptionValue) => void
}

export function SortPopoverContent({
  metric,
  handleOnMetricSelect,
}: Readonly<SortPopoverContentProps>) {
  return (
    <PopoverContent className="mt-1 w-60 p-0" align="end">
      <div className="flex flex-col gap-1 p-2">
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
          isSelected={metric === 'reporting_newest'}
          onClick={() => {
            handleOnMetricSelect('reporting_newest')
          }}
        />
        <MetricItemFilter
          label="Oldest First"
          isSelected={metric === 'reporting_oldest'}
          onClick={() => {
            handleOnMetricSelect('reporting_oldest')
          }}
        />

        <div className="text-muted-foreground/80 mt-2 px-2 py-1.5 text-xs font-semibold">
          Last Modified
        </div>
        <MetricItemFilter
          label="Newest First"
          isSelected={metric === 'modified_newest'}
          onClick={() => {
            handleOnMetricSelect('modified_newest')
          }}
        />
        <MetricItemFilter
          label="Oldest First"
          isSelected={metric === 'modified_oldest'}
          onClick={() => {
            handleOnMetricSelect('modified_oldest')
          }}
        />
      </div>
    </PopoverContent>
  )
}
