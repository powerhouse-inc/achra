import { getActualsBreakdownItemsForTable } from '../../lib/actuals-table-helpers'
import {
  getActualsTableData,
  getWalletsFromBudgetStatement,
} from '../../lib/budget-statement-utils'
import { GroupTree } from '../../lib/group-tree'
import { getBudgetStatementForMonth } from '../../services/expense-reports-service'
import { BreakdownActualsSection } from './breakdown-actuals-section'
import { TotalWalletSection } from './total-wallet-section'

interface ExpenseReportsActualsProps {
  teamId: string
  month: Date
}

async function ExpenseReportsActuals({ teamId, month }: ExpenseReportsActualsProps) {
  const budgetStatements = await getBudgetStatementForMonth(teamId, month)
  // extract wallets from budget statements
  const wallets = getWalletsFromBudgetStatement(budgetStatements?.expenseReport)

  if (wallets.length === 0) {
    // TODO: add empty state component
    return <div>No wallets found</div>
  }

  const { columns, items } = getActualsTableData(wallets)

  const breakdownTabs = wallets.map((wallet) => wallet.name ?? '')

  const groupTree = new GroupTree(budgetStatements?.expenseReport.groups ?? [])
  const breakdownItems = getActualsBreakdownItemsForTable(wallets[0], groupTree)

  // TODO: implement the breakdown tabs change. Now it is hardcoded to the first wallet.

  return (
    <div className="flex flex-col gap-8">
      <TotalWalletSection currentMonth={month} mainTableColumns={columns} mainTableItems={items} />

      <BreakdownActualsSection
        currentMonth={month}
        mainTableItems={items}
        breakdownTabs={breakdownTabs}
        breakdownItemsForActiveTab={breakdownItems}
        actualAccountTab={null}
      />
    </div>
  )
}

export { ExpenseReportsActuals }
