import { cacheLife, cacheTag } from 'next/cache'
import { normalizeMonth, parseMonthString } from '../../lib/month-utils'
import { ExpenseReportsActuals } from '../expense-reports-actuals'

interface ExpenseReportsSectionProps {
  teamId: string
  monthKey: string
  builderLabel: string
}

async function ExpenseReportsSection({
  teamId,
  monthKey,
  builderLabel,
}: ExpenseReportsSectionProps) {
  'use cache'
  cacheLife('minutes')
  cacheTag('expense-reports', `builder-${teamId}`, `month-${monthKey}`)

  await Promise.resolve()

  const parsedMonth = parseMonthString(monthKey)
  if (!parsedMonth) {
    throw new Error(`Invalid monthKey for expense reports: ${monthKey}`)
  }
  const month = normalizeMonth(parsedMonth)

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-accent pt-2 pb-6 shadow-sm">
        <div className="container">
          <ExpenseReportsActuals teamId={teamId} month={month} builderLabel={builderLabel} />
        </div>
      </div>
    </div>
  )
}

export { ExpenseReportsSection }
