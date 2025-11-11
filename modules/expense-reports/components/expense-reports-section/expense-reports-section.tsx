interface ExpenseReportsSectionProps {
  month: Date | null
}

async function ExpenseReportsSection({ month }: ExpenseReportsSectionProps) {
  // simulate api call
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return (
    <div className="flex flex-col gap-4">
      <div className="border-border align-center flex justify-between rounded-xl border p-8">
        Expense Reports {month?.toISOString()}
      </div>
    </div>
  )
}

export { ExpenseReportsSection }
