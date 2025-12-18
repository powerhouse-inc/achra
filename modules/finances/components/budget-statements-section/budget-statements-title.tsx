'use client'
import TitleSection from '../title-section-finances'
import BudgetStatementFilters from './budget-stament-filters/budget-stament-filters'

interface BudgetStatementsTitleProps {
  range: string
  hash: string
}

export default function BudgetStatementsTitle({
  range,
  hash,
}: Readonly<BudgetStatementsTitleProps>) {
  return (
    <div className="flex flex-row flex-wrap items-start justify-between">
      <TitleSection
        title="Budget Statements"
        hash={hash}
        tooltipContent={
          <>
            <p>
              Access detailed insights into budget reporting activities, including contributors,
              reporting month, actual expenditures, status, and recent modifications.
            </p>
            <p>
              Click &quot;View&quot; to dive into specific financial data by department, enabling
              effective monitoring and management of fiscal operations.
            </p>
          </>
        }
        range={range}
      />
      <div>
        <BudgetStatementFilters />
      </div>
    </div>
  )
}
