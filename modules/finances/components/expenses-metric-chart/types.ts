import type { AnalyticMetric, BudgetMetric } from '../../types'

export interface ValuesDataWithBorder {
  value: number | null
}

export interface ExpensesMetricChartSeriesData {
  name: string
  data: ValuesDataWithBorder[]
  dataOriginal: ValuesDataWithBorder[]
  type: 'line'
  smooth: boolean
  showSymbol: boolean
  connectNulls: boolean
  lineStyle: {
    width: number
    color: string
    colorOriginal: string
  }
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

export interface LineChartSeries {
  name: string
  seriesName: string
  color: string
  value: number
  dataIndex: number
}

export type AnalyticGranularityForExpensesMetricChart = Extract<
  AnalyticGranularity,
  'monthly' | 'quarterly' | 'annual'
>

export interface ValueAndUnit {
  value: number
  unit: string
}

export type ExpensesMetricBudgetAnalytic = Record<string, BudgetMetric[]>

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
