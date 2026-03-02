'use client'
import { Suspense } from 'react'
import { useFinancesYear } from '../../hooks/use-finaces-year'
import { TitleSectionFinances } from '../title-section-finances'
import { FilterChart } from './filter-chart'

export function TitleFilterSection() {
  const { year } = useFinancesYear()
  const TOOLTIP_CONTENT =
    "Explore MakerDAO's financial distribution across the 'MakerDAO Legacy', 'Atlas Immutable', and 'Scope Framework' budgets from 2021-2024. This tool helps track allocation efficiency, identify funding fluctuations, and pinpoint transitions between legacy and endgame budgets."
  const RANGE = `Jan - Dec ${year}`
  return (
    <div className="flex flex-row flex-wrap items-start justify-between">
      <TitleSectionFinances
        title="Breakdown Chart"
        hash="breakdown-chart"
        tooltipContent={TOOLTIP_CONTENT}
        range={RANGE}
      />
      <Suspense fallback={<div>Loading...</div>}>
        <FilterChart />
      </Suspense>
    </div>
  )
}
