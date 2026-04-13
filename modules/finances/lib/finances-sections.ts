import { encodeSectionId } from '@/modules/shared/components/section-activation'
import ff from '@/modules/shared/lib/feature-flags'

export enum FinancesSections {
  BudgetStatements = 'budget-statements',
  BreakdownChart = 'breakdown-chart',
  ExpensesMetricChart = 'expenses-metric-chart',
  ReservesWaterfallChart = 'reserves-waterfall-chart',
}

/**
 * Finances sections IDs encoded
 */
export const FINANCES_SECTIONS_ENCODED = [
  encodeSectionId(FinancesSections.BudgetStatements),

  ...(ff.finances.BREAKDOWN_CHART_SECTION_ENABLED
    ? [encodeSectionId(FinancesSections.BreakdownChart)]
    : []),
  ...(ff.finances.EXPENSES_METRIC_CHART_SECTION_ENABLED
    ? [encodeSectionId(FinancesSections.ExpensesMetricChart)]
    : []),
  ...(ff.finances.RESERVES_WATERFALL_CHART_SECTION_ENABLED
    ? [encodeSectionId(FinancesSections.ReservesWaterfallChart)]
    : []),
]
