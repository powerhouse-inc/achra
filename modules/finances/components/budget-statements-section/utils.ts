import { DateTime } from 'luxon'
import { METRIC_OPTIONS } from '../../types'
import type { BudgetStatement, MetricWithoutBudget } from './type'

/**
 * Formats the month from API format "NOV2025" to display format "Nov 2025"
 * @param month - Month string in format "MMMYYYY" (e.g., "NOV2025")
 * @returns Formatted month string (e.g., "Nov 2025") or "No date" if invalid
 */
export const formatReportingMonth = (month: string | null | undefined): string => {
  if (!month) return 'No date'

  // API returns format like "NOV2025"
  const parsed = DateTime.fromFormat(month.toUpperCase(), 'LLLyyyy')
  if (parsed.isValid) {
    return parsed.toFormat('LLL yyyy')
  }

  // Fallback: try other formats if the above doesn't work
  // Try "yyyy-LL-dd" format (old mock format)
  const parsedDate = DateTime.fromFormat(month, 'yyyy-LL-dd')
  if (parsedDate.isValid) {
    return parsedDate.toFormat('LLL yyyy')
  }

  return month
}

/**
 * Extracts numeric value from Amount_Currency object
 * API returns: { unit: "USDS", value: "206262.8" }
 */
const getAmountValue = (amount: unknown): number => {
  if (amount === null || amount === undefined) return 0

  if (typeof amount === 'number') return amount

  if (typeof amount === 'string') return Number(amount) || 0

  if (typeof amount === 'object' && 'value' in amount) {
    const value = (amount as { value: string | number }).value
    return typeof value === 'number' ? value : Number(value) || 0
  }

  return 0
}

/**
 * Maps metric options to the corresponding API field name in totals
 * TODO: Confirm correct API field mapping for NetExpensesOnChain and NetProtocolOutflow
 */
type TotalsFieldKey = 'totalActuals' | 'totalForecast' | 'totalPayments'

const METRIC_TO_FIELD: Record<MetricWithoutBudget, TotalsFieldKey | null> = {
  [METRIC_OPTIONS.Actuals]: 'totalActuals',
  [METRIC_OPTIONS.Forecast]: 'totalForecast',
  // TODO: Confirm correct field for NetExpensesOnChain
  [METRIC_OPTIONS.NetExpensesOnChain]: null,
  // TODO: Confirm correct field for NetProtocolOutflow
  [METRIC_OPTIONS.NetProtocolOutflow]: null,
}

/**
 * Calculates the total amount for a specific metric from all wallets in a budget statement
 * @param metric - The metric to calculate (Actuals, Forecast, NetExpensesOnChain, NetProtocolOutflow)
 * @param budgetStatement - The budget statement containing wallet data
 * @returns The total sum for the specified metric (returns 0 if field mapping not available)
 */
export const getAmountByMetric = (
  metric: MetricWithoutBudget,
  budgetStatement: BudgetStatement,
): number => {
  const fieldKey = METRIC_TO_FIELD[metric]

  if (fieldKey === null) {
    return 0
  }

  return budgetStatement.expenseReport.wallets.reduce((total, wallet) => {
    const walletTotal = wallet.totals.reduce((sum, t) => {
      const fieldValue = t[fieldKey as keyof typeof t]
      return sum + getAmountValue(fieldValue)
    }, 0)
    return total + walletTotal
  }, 0)
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

/**
 * Parses a month string (e.g., "NOV2025") into a timestamp for chronological comparison.
 */
function parseMonthToTimestamp(month: string | null | undefined): number {
  if (!month) return 0
  const parsed = DateTime.fromFormat(month.toUpperCase(), 'LLLyyyy')
  if (parsed.isValid) return parsed.toMillis()
  const parsedDate = DateTime.fromFormat(month, 'yyyy-LL-dd')
  if (parsedDate.isValid) return parsedDate.toMillis()
  return 0
}

export const compareMonth = (a: string | null | undefined, b: string | null | undefined) => {
  return parseMonthToTimestamp(a) - parseMonthToTimestamp(b)
}

export const compareDate = (a: string | null | undefined, b: string | null | undefined) => {
  if (!a && !b) return 0
  if (!a) return 1
  if (!b) return -1
  return new Date(a).getTime() - new Date(b).getTime()
}
