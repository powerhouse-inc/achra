'use client'

import { DateTime } from 'luxon'
import { useCallback, useMemo } from 'react'
import { useBudgetStatementActuals } from '../../hooks/useBudgetStatementActuals'
import { BUDGET_STATEMENTS_MOCKS } from '../../mocks/budget-statements-mocks'
import { BreakdownActualsSection } from './breakdown-actuals-section'
import { TotalWalletSection } from './total-wallet-section'

interface ExpenseReportsActualsProps {
  month: Date | null
}

// TODO: use the month from the param once we integrate the actual api
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function ExpenseReportsActuals({ month }: ExpenseReportsActualsProps) {
  const currentMonth = useMemo(() => DateTime.fromISO('2024-12-01'), [])
  const {
    headerIds,
    breakdownTitleRef,
    breakdownColumnsForActiveTab,
    breakdownItemsForActiveTab,
    mainTableColumns,
    mainTableItems,
    breakdownTabs,
    actualAccountTab,
    setActualAccountTab,
  } = useBudgetStatementActuals(currentMonth, BUDGET_STATEMENTS_MOCKS)

  const handleActualAccountTabChange = useCallback(
    (value: string | null) => {
      void setActualAccountTab(value)
    },
    [setActualAccountTab],
  )

  return (
    <div className="flex flex-col gap-4">
      <TotalWalletSection
        currentMonth={currentMonth}
        mainTableColumns={mainTableColumns}
        mainTableItems={mainTableItems}
      />

      <BreakdownActualsSection
        currentMonth={currentMonth}
        mainTableItems={mainTableItems}
        breakdownTitleRef={breakdownTitleRef as React.RefObject<HTMLDivElement>}
        breakdownTabs={breakdownTabs}
        headerIds={headerIds}
        breakdownColumnsForActiveTab={breakdownColumnsForActiveTab}
        breakdownItemsForActiveTab={breakdownItemsForActiveTab}
        actualAccountTab={actualAccountTab}
        onActualAccountTabChange={handleActualAccountTabChange}
      />
    </div>
  )
}

export { ExpenseReportsActuals }
