'use client'

import { useFinancesYear } from '../../hooks/use-finaces-year'
import { TitleSectionFinances as TitleSection } from '../title-section-finances'

function BudgetStatementsTitle() {
  const { year } = useFinancesYear()
  const range = `Jan - Dec ${year}`

  return (
    <TitleSection
      title="Budget Statements"
      hash="budget-statements"
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
      range={range.toUpperCase()}
    />
  )
}

export { BudgetStatementsTitle }
