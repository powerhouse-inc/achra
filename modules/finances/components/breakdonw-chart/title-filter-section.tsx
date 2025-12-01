import FilterChart from './filter-chart'
import TitleBreakdownChart from './title-breakdown-chart'

export default function TitleFilterSection() {
  return (
    <div className="flex flex-row flex-wrap items-start justify-between">
      <TitleBreakdownChart title="Breakdown Chart" hash="breakdown-chart" />
      <FilterChart />
    </div>
  )
}
