import type { BudgetMetricWithName } from '@/modules/finances/types'

export type AnalyticMetric =
  | 'Budget'
  | 'Forecast'
  | 'ProtocolNetOutflow'
  | 'PaymentsOnChain'
  | 'Actuals'

/**
 * Represents a metric value with its numeric value
 */
interface MetricValue {
  value: number
}

export interface BudgetMetric {
  budget: MetricValue
  paymentsOnChain: MetricValue
  protocolNetOutflow?: MetricValue
  forecast?: MetricValue
  actuals?: MetricValue
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
}
