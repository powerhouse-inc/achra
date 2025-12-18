import type { Builder } from '@/modules/__generated__/graphql/switchboard-generated'

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

// TODO :Delete this when Api its ready
export interface BudgetStatementExpenseReport extends Builder {
  actualExpenses: number | null
  forecastExpenses: number | null
  paymentsOnChain: number | null
  netProtocolOutflow: number | null
  month: string
}
