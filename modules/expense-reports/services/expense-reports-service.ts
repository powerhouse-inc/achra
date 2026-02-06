import { parse } from 'date-fns'
import { cacheLife } from 'next/cache'
import {
  type BudgetStatementsDetailsQuery,
  useBudgetStatementsAvailableMonthsQuery,
  useBudgetStatementsDetailsQuery,
} from '@/modules/__generated__/graphql/switchboard-generated'
import { formatMonthString } from '@/modules/expense-reports/lib/month-utils'
import 'server-only'

/**
 * Fetches the available months for a given team
 *
 * @param teamId - The team ID to get the available months for
 * @returns An array of dates representing the available months
 */
export async function getBudgetStatementsAvailableMonths(teamId: string): Promise<Date[]> {
  'use cache'
  cacheLife('minutes')

  const data = await useBudgetStatementsAvailableMonthsQuery.fetcher({
    filter: {
      teamId,
    },
  })()

  if (data.budgetStatements.length === 0) {
    return []
  }

  return data.budgetStatements
    .map((month) => {
      const parsed = parse(month.month, 'MMMyyyy', new Date())
      return new Date(Date.UTC(parsed.getFullYear(), parsed.getMonth(), 1, 0, 0, 0, 0))
    })
    .sort((a, b) => a.getTime() - b.getTime())
}

export async function getBudgetStatementForMonth(
  teamId: string,
  month: Date,
): Promise<BudgetStatementsDetailsQuery['budgetStatements'][number] | null> {
  'use cache'
  cacheLife('minutes')

  const data = await useBudgetStatementsDetailsQuery.fetcher({
    filter: {
      teamId,
    },
  })()

  const monthString = formatMonthString(month).toUpperCase()

  return data.budgetStatements.find((bs) => bs.month === monthString) ?? null
}
