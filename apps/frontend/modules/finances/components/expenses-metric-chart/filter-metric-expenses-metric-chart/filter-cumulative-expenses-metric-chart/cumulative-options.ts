import type { CumulativeType } from '@/modules/finances/lib/expenses-metric-chart-search-params'

const CUMULATIVE_OPTIONS: Array<{
  value: CumulativeType
  label: string
  description: string
}> = [
  {
    value: 'relative',
    label: 'Relative Cumulative',
    description: 'Aggregated expense metrics relative to the start of the year.',
  },
  {
    value: 'absolute',
    label: 'Absolute Cumulative',
    description: 'A continuous aggregation of expenses over the entire dataset.',
  },
]

export { CUMULATIVE_OPTIONS }
