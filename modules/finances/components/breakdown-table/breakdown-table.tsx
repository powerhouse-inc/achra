'use client'

import { useFinancesYear } from '../../hooks/use-finaces-year'
import { TitleSectionFinances } from '../title-section-finances'
import { BreakdownTableFilters } from './breakdown-table-filters'
import { TableHeader } from './table-header'
import { useBreakdownTable } from './use-breakdown-table'

function BreakdownTable() {
  const { year } = useFinancesYear()
  const range = `Jan - Dec ${year}`

  const { isLoading, selectedGranularity, tableHeader, activeMetrics } = useBreakdownTable()

  return (
    <div>
      <div className="flex w-full items-center justify-between gap-4">
        <TitleSectionFinances
          title="Breakdown Table"
          hash="breakdown-table"
          tooltipContent="The breakdown table enhances the functionality of the breakdown chart by providing a side-by-side multi-metric comparison. It delivers a detailed view with subtotals for each budget category and their subdivisions, along with a cumulative total for selected metrics."
          range={range.toUpperCase()}
        />
        <BreakdownTableFilters />
      </div>

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div>
            <TableHeader
              granularity={selectedGranularity}
              title="Sky Budget"
              year={year}
              headerTable={tableHeader ?? []}
              activeMetrics={activeMetrics}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export { BreakdownTable }
