import { ExpenseReportsActuals } from '../expense-reports-actuals'

interface ExpenseReportsSectionProps {
  teamId: string
  month: Date
  builderLabel: string
}

function ExpenseReportsSection({ teamId, month, builderLabel }: ExpenseReportsSectionProps) {
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
