import type { AnalyticMetric, BudgetMetric } from '../../types'

export interface ValuesDataWithBorder {
  value: number | null | undefined
  itemStyle: {
    borderRadius: number[]
  }
}

export interface BreakdownChartSeriesData {
  name: string
  data: ValuesDataWithBorder[]
  dataOriginal: ValuesDataWithBorder[]
  type: 'bar'
  stack: 'x'
  barWidth: number
  showBackground: boolean
  itemStyle: {
    color: string
    colorOriginal: string
  }
  isVisible: boolean
}

export type AnalyticGranularity =
  | 'total'
  | 'annual'
  | 'semiAnnual'
  | 'quarterly'
  | 'monthly'
  | 'weekly'
  | 'daily'
  | 'hourly'

export interface BarChartSeries {
  name: string
  seriesName: string
  color: string
  value: number
  dataIndex: number
}

export type AnalyticGranularityForBreakdownChart = Extract<
  AnalyticGranularity,
  'monthly' | 'quarterly' | 'annual'
>

export interface ValueAndUnit {
  value: number
  unit: string
}

export type BreakdownBudgetAnalytic = Record<string, BudgetMetric[]>

export interface AnalyticSeriesRow {
  dimensions: Array<{
    name: 'budget'
    path: string
  }>
  metric: AnalyticMetric
  unit: 'DAI'
  value: number
  sum: number
}

export interface AnalyticSeries {
  period: string
  start: string
  end: string
  rows: AnalyticSeriesRow[]
}
export interface Analytic {
  series: AnalyticSeries[]
}
