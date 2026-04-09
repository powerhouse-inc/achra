'use client'

import { useMemo } from 'react'
import type { ExpenseReport_ExpenseReportStatus } from '@/modules/__generated__/graphql/switchboard-generated'
import { BudgetStatementLastUpdate } from '@/modules/expense-reports/components/budget-statement-last-update'
import { MonthNavigation } from '@/modules/expense-reports/components/month-navigation'
import { useMonthNavigation } from '@/modules/expense-reports/components/month-navigation/use-month-navigation'
import { isSameMonth } from '@/modules/expense-reports/lib/month-utils'
import { BudgetStatementsStatus } from '@/modules/finances/components/budget-statements-section/budget-statements-status/budget-statements-status'

export interface BudgetStatementsPageHeaderProps {
  availableMonthsWithMetadata: Array<{
    month: string
    status: string | null
    lastUpdate: string | null
  }>
  /** Fallback month for the hook when the URL has no viewMonth (used only by useMonthNavigation). */
  defaultMonthIso: string
}

function BudgetStatementsPageHeader({
  availableMonthsWithMetadata,
  defaultMonthIso,
}: BudgetStatementsPageHeaderProps) {
  const { availableMonths, defaultMonth } = useMemo(() => {
    const months = availableMonthsWithMetadata.map((m) => new Date(m.month))
    return {
      availableMonths: months,
      defaultMonth: new Date(defaultMonthIso),
    }
  }, [availableMonthsWithMetadata, defaultMonthIso])

  const { selectedMonth } = useMonthNavigation({ availableMonths, defaultMonth })

  const currentEntry = useMemo(
    () =>
      availableMonthsWithMetadata.find((meta) => isSameMonth(new Date(meta.month), selectedMonth)),
    [availableMonthsWithMetadata, selectedMonth],
  )

  return (
    <div className="flex w-full items-start justify-between gap-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <MonthNavigation availableMonths={availableMonths} defaultMonth={defaultMonth} />
        {currentEntry?.status != null && (
          <BudgetStatementsStatus
            status={currentEntry.status as ExpenseReport_ExpenseReportStatus}
          />
        )}
      </div>
      <BudgetStatementLastUpdate lastModifiedAtUtcIso={currentEntry?.lastUpdate ?? null} />
    </div>
  )
}

export { BudgetStatementsPageHeader }
