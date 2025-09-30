import type { TABS } from './constants'

export interface StackedAreaSeries {
  type: string
  name: string
  stack: string
  stackStrategy: string
  areaStyle: object
  emphasis: { focus: string }
  showSymbol: false
  data: number[]
  itemStyle: { color: string }
}

export type TabValue = (typeof TABS)[keyof typeof TABS]

export type MetricKey = 'Actuals' | 'PaymentsOnChain' | 'Forecast' | 'OperationalReserves'
export type MetricKeyExtended = MetricKey | 'ProtocolNetOutflow' | 'PaymentsOnChainSum'
export type BudgetKey =
  | 'legacyOthers'
  | 'legacyCoreUnits'
  | 'governanceScope'
  | 'stability'
  | 'support'
  | 'protocol'
  | 'accessibility'
  | 'immutable'
export type FormattedFinancesData = Record<MetricKey, Record<BudgetKey, number[]>>
