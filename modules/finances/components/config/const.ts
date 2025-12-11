import { encodeSectionId } from '@/modules/shared/components/section-activation'

export enum FinancesSections {
  BudgetStatements = 'budget-statements',
  BreakdownChart = 'breakdown-chart',
}

/**
 * Finances sections IDs encoded
 */
export const FINANCES_SECTIONS_ENCODED = [
  encodeSectionId(FinancesSections.BudgetStatements),
  encodeSectionId(FinancesSections.BreakdownChart),
]
