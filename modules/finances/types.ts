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
