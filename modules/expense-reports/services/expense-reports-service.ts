import { format, parse } from 'date-fns'
import {
  type BudgetStatementsDetailsQuery,
  useBudgetStatementsAvailableMonthsQuery,
  useBudgetStatementsDetailsQuery,
} from '@/modules/__generated__/graphql/switchboard-generated'
import 'server-only'

/**
 * Fetches the available months for a given team
 *
 * @param teamId - The team ID to get the available months for
 * @returns An array of dates representing the available months
 */
export async function getBudgetStatementsAvailableMonths(teamId: string): Promise<Date[]> {
  const data = await useBudgetStatementsAvailableMonthsQuery.fetcher({
    filter: {
      teamId,
    },
  })()

  if (data.budgetStatements.length === 0) {
    return []
  }

  return data.budgetStatements
    .map((month) => parse(month.month, 'MMMyyyy', new Date()))
    .sort((a, b) => a.getTime() - b.getTime())
}

export async function getBudgetStatementForMonth(
  teamId: string,
  month: Date,
): Promise<BudgetStatementsDetailsQuery['budgetStatements'][number] | null> {
  const data = await useBudgetStatementsDetailsQuery.fetcher({
    filter: {
      teamId,
    },
  })()

  const monthString = format(month, 'MMMyyyy').toUpperCase()

  return data.budgetStatements.find((bs) => bs.month === monthString) ?? null
}
