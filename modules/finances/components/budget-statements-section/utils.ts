import { METRIC_OPTIONS } from '../../types'
import type { BudgetStatementExpenseReport, MetricWithoutBudget } from './type'

export const getAmountByMetric = (
  budgetMetric: MetricWithoutBudget,
  builder: BudgetStatementExpenseReport,
) => {
  switch (budgetMetric) {
    case METRIC_OPTIONS.Forecast:
      return builder.forecastExpenses
    case METRIC_OPTIONS.NetProtocolOutflow:
      return builder.netProtocolOutflow
    case METRIC_OPTIONS.NetExpensesOnChain:
      return builder.paymentsOnChain
    case METRIC_OPTIONS.Actuals:
    default:
      return builder.actualExpenses
  }
}

export const getMetricLabel = (selectedMetric: MetricWithoutBudget, isDesktopLg = false) => {
  switch (selectedMetric) {
    case METRIC_OPTIONS.NetExpensesOnChain:
      return 'Net On-Chain'
    case METRIC_OPTIONS.NetProtocolOutflow:
      return isDesktopLg ? 'Prtcol Outflow' : 'Protocol Outflow'
    case METRIC_OPTIONS.Actuals:
      return 'Actuals'
    case METRIC_OPTIONS.Forecast:
      return 'Forecast'
    default:
      return selectedMetric
  }
}

export const compareString = (a: string | null | undefined, b: string | null | undefined) => {
  if (!a && !b) return 0
  if (!a) return 1
  if (!b) return -1
  return a.localeCompare(b)
}

export const compareDate = (a: string | null | undefined, b: string | null | undefined) => {
  if (!a && !b) return 0
  if (!a) return 1
  if (!b) return -1
  return new Date(a).getTime() - new Date(b).getTime()
}
