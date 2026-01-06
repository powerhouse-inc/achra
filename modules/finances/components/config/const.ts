import { encodeSectionId } from '@/modules/shared/components/section-activation'
import ff from '@/modules/shared/lib/feature-flags'

export enum FinancesSections {
  BudgetStatements = 'budget-statements',
  BreakdownChart = 'breakdown-chart',
}

/**
 * Finances sections IDs encoded
 */
export const FINANCES_SECTIONS_ENCODED = [
  encodeSectionId(FinancesSections.BudgetStatements),

  ...(ff.finances.BREAKDOWN_CHART_SECTION_ENABLED
    ? [encodeSectionId(FinancesSections.BreakdownChart)]
    : []),
]
