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
