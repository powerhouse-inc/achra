import { subMonths } from 'date-fns'
import type { BudgetStatement } from '@/modules/__generated__/graphql/switchboard-generated'
import type { ExpenseComparisonLineItem } from '@/modules/expense-reports/types'
import { getCurrencyValue } from './budget-statement-utils'
import { formatMonthString, MONTH_NAMES } from './month-utils'

type BudgetStatementForComparison = Pick<
  BudgetStatement,
  'month' | 'netExpenseTxns' | 'reportedActuals'
>

function formatMonthDisplay(date: Date): string {
  const month = MONTH_NAMES[date.getUTCMonth()]
  const year = date.getUTCFullYear()
  return `${month}-${year}`
}

function computeDifferencePercentage(netExpenseTxns: number, reportedActuals: number): number {
  if (reportedActuals === 0 || netExpenseTxns === 0) return 0
  return (Math.abs(netExpenseTxns) / Math.abs(reportedActuals) - 1) * 100
}

/**
 * Builds expense comparison line items for the current month and two prior months,
 * plus a totals row. Used by ExpenseComparison (desktop and mobile).
 */
export function getExpenseComparisonLineItems(
  currentMonth: Date,
  budgetStatements: BudgetStatementForComparison[],
): ExpenseComparisonLineItem[] {
  const byMonthKey = new Map(budgetStatements.map((bs) => [bs.month.toUpperCase(), bs]))

  const months: Date[] = [currentMonth, subMonths(currentMonth, 1), subMonths(currentMonth, 2)]

  const lineItems: ExpenseComparisonLineItem[] = []
  let totalReportedActuals = 0
  let totalNetExpenseTxns = 0

  for (const monthDate of months) {
    const monthKey = formatMonthString(monthDate).toUpperCase()
    const bs = byMonthKey.get(monthKey)

    const reportedActuals = bs ? getCurrencyValue(bs.reportedActuals) : 0
    const netExpenseTxns = bs ? getCurrencyValue(bs.netExpenseTxns) : 0

    totalReportedActuals += reportedActuals
    totalNetExpenseTxns += netExpenseTxns

    const onChainDifference = computeDifferencePercentage(netExpenseTxns, reportedActuals)

    lineItems.push({
      month: formatMonthDisplay(monthDate),
      reportedActuals,
      onChainOnly: netExpenseTxns,
      onChainDifference,
      isTotals: false,
    })
  }

  const totalOnChainDifference = computeDifferencePercentage(
    totalNetExpenseTxns,
    totalReportedActuals,
  )

  lineItems.push({
    isTotals: true,
    reportedActuals: totalReportedActuals,
    onChainOnly: totalNetExpenseTxns,
    onChainDifference: totalOnChainDifference,
  })

  return lineItems
}
