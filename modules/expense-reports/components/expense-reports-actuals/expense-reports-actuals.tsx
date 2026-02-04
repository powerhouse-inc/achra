import { getActualsBreakdownItemsForTable } from '../../lib/actuals-table-helpers'
import {
  getActualsTableData,
  getWalletsFromBudgetStatement,
} from '../../lib/budget-statement-utils'
import { GroupTree } from '../../lib/group-tree'
import { getBudgetStatementForMonth } from '../../services/expense-reports-service'
import { EmptyTablePlaceholder } from '../advanced-inner-table/empty-table-placeholder'
import { BreakdownActualsSection } from './breakdown-actuals-section'
import { TotalWalletSection } from './total-wallet-section'

interface ExpenseReportsActualsProps {
  teamId: string
  month: Date
  builderLabel: string
}

async function ExpenseReportsActuals({ teamId, month, builderLabel }: ExpenseReportsActualsProps) {
  const budgetStatements = await getBudgetStatementForMonth(teamId, month)
  // extract wallets from budget statements
  const wallets = getWalletsFromBudgetStatement(budgetStatements?.expenseReport)

  if (wallets.length === 0) {
    return (
      <div className="flex flex-col pt-4">
        <EmptyTablePlaceholder actorName={builderLabel} />
      </div>
    )
  }

  const { columns, items } = getActualsTableData(wallets)

  const breakdownTabs = wallets.map((wallet) => wallet.name ?? '')

  const groupTree = new GroupTree(budgetStatements?.expenseReport.groups ?? [])
  const breakdownItemsByWallet = wallets.map((wallet) =>
    getActualsBreakdownItemsForTable(wallet, groupTree),
  )

  return (
    <div className="flex flex-col gap-8">
      <TotalWalletSection
        currentMonth={month}
        mainTableColumns={columns}
        mainTableItems={items}
        builderLabel={builderLabel}
      />

      <BreakdownActualsSection
        currentMonth={month}
        hasMainTableItems={items.length > 0}
        breakdownTabs={breakdownTabs}
        breakdownItemsByWallet={breakdownItemsByWallet}
        builderLabel={builderLabel}
      />
    </div>
  )
}

export { ExpenseReportsActuals }
