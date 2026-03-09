'use client'

import { useFinancesYear } from '../../../hooks/use-finaces-year'
import { TitleSectionFinances } from '../../title-section-finances'
import { FilterChart } from '../filter-chart'

const TOOLTIP_CONTENT =
  'Monitor reserve dynamics with a waterfall view of net inflows and outflows. Use granularity and category filters to explore how each budget contributes to reserve changes over time.'

export function TitleFilterSection() {
  const { year } = useFinancesYear()
  const range = `Jan - Dec ${year}`

  return (
    <div className="flex flex-row flex-wrap items-start justify-between">
      <TitleSectionFinances
        title="Finances Reserves Chart"
        hash="finances-reserves-chart"
        tooltipContent={TOOLTIP_CONTENT}
        range={range}
      />
      <FilterChart />
    </div>
  )
}
