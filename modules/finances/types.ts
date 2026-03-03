export interface Wallet {
  id: string
  name: string
  address: string
  usdsBalance: number
  skyBalance: number
}

export interface WalletGroup {
  id: string
  name: string
  wallets: Wallet[]
}

export interface HorizontalBudgetBarProps {
  actuals: number
  prediction: number
  budgetCap: number
  className?: string
  maxPercentage?: number
}

export interface QuarterCardProps {
  paymentsOnChain: number
  budgetCap: number
}

export interface FiancesNavigationCard {
  image: string
  codePath: string
  title: string
  description: string
  href: string
  valueDai: number
  totalDai: number
  budgetCapValue: number
  code: string
  color: string
  percent: number
}
export interface ValueAndUnit {
  value: number
  unit: string
}

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

export type AnalyticGranularityForBreakdownChart = Extract<
  AnalyticGranularity,
  'monthly' | 'quarterly' | 'annual'
>

export interface BarChartSeries {
  name: string
  seriesName: string
  color: string
  value: number
  dataIndex: number
}

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

export interface BudgetMetric {
  actuals: ValueAndUnit
  budget: ValueAndUnit
  forecast: ValueAndUnit
  paymentsOnChain: ValueAndUnit
  paymentsOffChainIncluded: ValueAndUnit
  protocolNetOutflow: ValueAndUnit
}

export type BreakdownBudgetAnalytic = Record<string, BudgetMetric[]>

export interface Budget {
  parentId: string | null
  name: string
  image: string
  idPath: string
  id: string
  description: string
  codePath: string
  code: string
}

export type AnalyticMetric =
  | 'Budget'
  | 'Forecast'
  | 'PaymentsOnChain'
  | 'ProtocolNetOutflow'
  | 'Actuals'

export interface BudgetMetricWithName extends BudgetMetric {
  name: string
  code?: string
}

export interface MetricValues {
  Budget: number
  Forecast: number
  ProtocolNetOutflow: number
  PaymentsOnChain: number
  Actuals: number
}

export enum METRIC_OPTIONS {
  Budget = 'Budget',
  Forecast = 'Forecast',
  Actuals = 'Actuals',
  NetProtocolOutflow = 'Net Protocol Outflow',
  NetExpensesOnChain = 'Net Expenses On-Chain',
}
export enum GRANULARITY_OPTIONS {
  Monthly = 'Monthly',
  Quarterly = 'Quarterly',
  Annually = 'Annually',
}

// Budget Statements types
export enum MetricOption {
  Budget = 'Budget',
  Forecast = 'Forecast',
  Actuals = 'Actuals',
  NetProtocolOutflow = 'Net Protocol Outflow',
  NetExpensesOnChain = 'Net Expenses On-Chain',
}

export enum SortOptionValue {
  ReportingNewest = 'reporting_newest',
  ReportingOldest = 'reporting_oldest',
  ModifiedNewest = 'modified_newest',
  ModifiedOldest = 'modified_oldest',
}

export type BudgetStatement = any // Type from GraphQL API

export type MetricWithoutBudget = Exclude<METRIC_OPTIONS, METRIC_OPTIONS.Budget>

// Doughnut Chart types
interface DoughnutMetricValue {
  value: number
}

export interface DoughnutBudgetMetric {
  budget: DoughnutMetricValue
  paymentsOnChain: DoughnutMetricValue
  protocolNetOutflow?: DoughnutMetricValue
  forecast?: DoughnutMetricValue
  actuals?: DoughnutMetricValue
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

// Expenses Metric Chart types

export interface ValuesDataWithBorder {
  value: number | null | undefined
}

export interface ExpensesMetricChartSeriesData {
  name: string
  data: ValuesDataWithBorder[]
  dataOriginal: ValuesDataWithBorder[]
  type: 'line'
  smooth: boolean
  showSymbol: boolean
  symbolSize: number
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
