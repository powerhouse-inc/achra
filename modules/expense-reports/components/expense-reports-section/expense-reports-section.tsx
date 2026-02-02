import { ExpenseReportsActuals } from '../expense-reports-actuals'

interface ExpenseReportsSectionProps {
  teamId: string
  month: Date
}

async function ExpenseReportsSection({ teamId, month }: ExpenseReportsSectionProps) {
  // simulate api call
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-accent pt-2 pb-6 shadow-sm">
        <div className="container">
          <ExpenseReportsActuals teamId={teamId} month={month} />
        </div>
      </div>
    </div>
  )
}

export { ExpenseReportsSection }
