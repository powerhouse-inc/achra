import { format, parse } from 'date-fns'
import { cacheLife } from 'next/cache'
import {
  type AccountSnapshotsQuery,
  type BudgetStatementsDetailsQuery,
  type BudgetStatementSnapshotReport,
  useAccountSnapshotsQuery,
  useBudgetStatementsAvailableMonthsQuery,
  useBudgetStatementsDetailsQuery,
} from '@/modules/__generated__/graphql/switchboard-generated'
import { formatMonthString } from '@/modules/expense-reports/lib/month-utils'
import type { BudgetStatementMonthMeta } from '@/modules/expense-reports/types'
import 'server-only'

/**
 * Fetches the available months for a given team with status and last update per month.
 *
 * @param teamId - The team ID to get the available months for
 * @returns An array of month metadata (month, status, lastUpdate) sorted by month
 */
export async function getBudgetStatementsAvailableMonths(
  teamId: string,
): Promise<BudgetStatementMonthMeta[]> {
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

  const sorted = data.budgetStatements
    .map((bs) => {
      const parsed = parse(bs.month, 'MMMyyyy', new Date())
      const month = new Date(Date.UTC(parsed.getFullYear(), parsed.getMonth(), 1, 0, 0, 0, 0))
      return {
        month,
        status: bs.status,
        lastUpdate: bs.lastModifiedAtUtcIso ?? null,
      }
    })
    .sort((a, b) => a.month.getTime() - b.month.getTime())

  // fill missing month. The list should cover all months between the first and last month present in the list
  const byMonth = new Map<number, BudgetStatementMonthMeta>()
  for (const entry of sorted) {
    byMonth.set(entry.month.getTime(), entry)
  }

  const minMonth = sorted[0].month
  const maxMonth = sorted[sorted.length - 1].month
  const result: BudgetStatementMonthMeta[] = []

  for (
    let current = new Date(minMonth.getTime());
    current.getTime() <= maxMonth.getTime();
    current = new Date(Date.UTC(current.getUTCFullYear(), current.getUTCMonth() + 1, 1, 0, 0, 0, 0))
  ) {
    const key = current.getTime()
    result.push(byMonth.get(key) ?? { month: current, status: null, lastUpdate: null })
  }

  return result
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

export interface AccountSnapshotResult {
  snapshotReport: Partial<BudgetStatementSnapshotReport> | null
  budgetStatements: AccountSnapshotsQuery['budgetStatements']
}

export async function getAccountSnapshotForMonth(
  teamId: string,
  month: Date,
): Promise<AccountSnapshotResult> {
  'use cache'
  cacheLife('minutes')

  const data = await useAccountSnapshotsQuery.fetcher({
    filter: {
      teamId,
    },
  })()

  const monthString = format(month, 'MMMyyyy').toUpperCase()
  const snapshotReport =
    (data.budgetStatements.find((bs) => bs.month === monthString)
      ?.snapshotReport as Partial<BudgetStatementSnapshotReport> | null) ?? null

  return {
    snapshotReport,
    budgetStatements: data.budgetStatements,
  }
}
