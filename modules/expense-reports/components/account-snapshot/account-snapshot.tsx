import {
  type BudgetStatementSnapshotReport,
  SnapAccountType,
} from '@/modules/__generated__/graphql/switchboard-generated'
import { getBalance, getTransactionHistory } from '../../lib/balance'
import { FundingOverview } from './components/funding-overview'
import { ReservesSnapshot } from './components/reserves-snapshot'

interface AccountSnapshotProps {
  expenseReport: Partial<BudgetStatementSnapshotReport>
}

function AccountSnapshot({ expenseReport }: AccountSnapshotProps) {
  const overviewBalance = getBalance(expenseReport, SnapAccountType.Source)
  const reservesBalance = getBalance(expenseReport, SnapAccountType.Internal)
  const transactionHistory = getTransactionHistory(expenseReport)

  return (
    <div className="flex flex-col gap-6 md:gap-8">
      <FundingOverview
        transactionHistory={transactionHistory}
        startDate={expenseReport.startDate}
        endDate={expenseReport.endDate}
        balance={overviewBalance}
      />
      <ReservesSnapshot
        teamName="Powerhouse"
        startDate={expenseReport.startDate}
        endDate={expenseReport.endDate}
        balance={reservesBalance}
        accounts={
          expenseReport.accounts?.filter((account) => account.type === SnapAccountType.Internal) ??
          []
        }
      />
    </div>
  )
}

export { AccountSnapshot }
