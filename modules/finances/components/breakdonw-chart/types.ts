import type { BudgetMetric } from '@/modules/finances/types'
export interface BudgetMetricWithName extends BudgetMetric {
  name: string
  code?: string
}

export interface NavigationCard {
  image: string
  title: string
  description?: string
  href: string
  totalDai?: number
  valueDai?: number
  budgetCapValue?: number
  color: string
  code?: string
  codePath?: string
  percent: number
}

export interface DoughnutSeries {
  name: string
  value: number
  percent: number
  metrics: BudgetMetricWithName
  color: string
  code?: string
  isVisible?: boolean
  originalColor?: string
  originalValue?: number
  actuals?: number
  budgetCap?: number
}

export const METRIC_OPTIONS = [
  'Budget',
  'Forecast',
  'Actuals',
  'Net Protocol Outflow',
  'Net Expenses On-Chain',
] as const

export const GRANULARITY_OPTIONS = ['Monthly', 'Quarterly', 'Annually'] as const

export type MetricType = (typeof METRIC_OPTIONS)[number]
export type GranularityType = (typeof GRANULARITY_OPTIONS)[number]
