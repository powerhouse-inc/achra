import {
  getActualsTableData,
  getWalletsFromBudgetStatement,
} from '../../lib/budget-statement-utils'
import { getBudgetStatementForMonth } from '../../services/expense-reports-service'
import { TotalWalletSection } from './total-wallet-section'

interface ExpenseReportsActualsProps {
  teamId: string
  month: Date
}

// TODO: use the month from the param once we integrate the actual api

async function ExpenseReportsActuals({ teamId, month }: ExpenseReportsActualsProps) {
  const budgetStatements = await getBudgetStatementForMonth(teamId, month)
  // extract wallets from budget statements
  const wallets = getWalletsFromBudgetStatement(budgetStatements?.expenseReport)
  const { columns, items } = getActualsTableData(wallets)

  // TODO: this commented code will be used in the next step of the migration

  // const currentMonth = useMemo(() => DateTime.fromISO('2024-12-01'), [])
  // const {
  //   headerIds,
  //   breakdownTitleRef,
  //   breakdownColumnsForActiveTab,
  //   breakdownItemsForActiveTab,
  //   mainTableColumns,
  //   mainTableItems,
  //   breakdownTabs,
  //   actualAccountTab,
  //   setActualAccountTab,
  // } = useBudgetStatementActuals(currentMonth, BUDGET_STATEMENTS_MOCKS)

  // const handleActualAccountTabChange = useCallback(
  //   (value: string | null) => {
  //     void setActualAccountTab(value)
  //   },
  //   [setActualAccountTab],
  // )

  return (
    <div className="flex flex-col gap-8">
      <TotalWalletSection currentMonth={month} mainTableColumns={columns} mainTableItems={items} />

      {/* <BreakdownActualsSection
        currentMonth={currentMonth}
        mainTableItems={mainTableItems}
        breakdownTitleRef={breakdownTitleRef as React.RefObject<HTMLDivElement>}
        breakdownTabs={breakdownTabs}
        headerIds={headerIds}
        breakdownColumnsForActiveTab={breakdownColumnsForActiveTab}
        breakdownItemsForActiveTab={breakdownItemsForActiveTab}
        actualAccountTab={actualAccountTab}
        onActualAccountTabChange={handleActualAccountTabChange}
      /> */}
    </div>
  )
}

export { ExpenseReportsActuals }
