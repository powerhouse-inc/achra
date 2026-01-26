import type { BudgetStatementsQuery } from '@/modules/__generated__/graphql/switchboard-generated'
import type { METRIC_OPTIONS } from '../../types'

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

// Type from the GraphQL API
export type BudgetStatement = BudgetStatementsQuery['budgetStatements'][number]

export type MetricWithoutBudget = Exclude<METRIC_OPTIONS, METRIC_OPTIONS.Budget>
