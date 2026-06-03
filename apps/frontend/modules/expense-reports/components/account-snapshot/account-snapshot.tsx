import {
  type AccountSnapshotsQuery,
  type BudgetStatementSnapshotReport,
  SnapAccountType,
} from '@/modules/__generated__/graphql/switchboard-generated'
import { getBalance, getTransactionHistory } from '../../lib/balance'
import { getExpenseComparisonLineItems } from '../../lib/expense-comparison-line-items'
import { ExpenseComparison } from './components/expense-comparison'
import { FundingOverview } from './components/funding-overview'
import { ReservesSnapshot } from './components/reserves-snapshot'

interface AccountSnapshotProps {
  expenseReport: Partial<BudgetStatementSnapshotReport>
  builderName: string
  budgetStatements: AccountSnapshotsQuery['budgetStatements']
  currentMonth: Date
}

function AccountSnapshot({
  expenseReport,
  builderName,
  budgetStatements,
  currentMonth,
}: AccountSnapshotProps) {
  const overviewBalance = getBalance(expenseReport, SnapAccountType.Source)
  const reservesBalance = getBalance(expenseReport, SnapAccountType.Internal)
  const transactionHistory = getTransactionHistory(expenseReport)
  const lineItems = getExpenseComparisonLineItems(currentMonth, budgetStatements)

  return (
    <div className="flex flex-col gap-6 md:gap-8">
      <FundingOverview
        builderName={builderName}
        transactionHistory={transactionHistory}
        startDate={expenseReport.startDate}
        endDate={expenseReport.endDate}
        balance={overviewBalance}
      />
      <ReservesSnapshot
        builderName={builderName}
        startDate={expenseReport.startDate}
        endDate={expenseReport.endDate}
        balance={reservesBalance}
        accounts={
          expenseReport.accounts?.filter((account) => account.type === SnapAccountType.Internal) ??
          []
        }
      />

      <ExpenseComparison lineItems={lineItems} hasOffChainData={false} />
    </div>
  )
}

export { AccountSnapshot }
