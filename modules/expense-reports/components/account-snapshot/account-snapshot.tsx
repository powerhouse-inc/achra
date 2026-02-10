import {
  AccountTransactionDirection,
  type BudgetStatementSnapshotReport,
  SnapAccountType,
  type SnapshotAccountTransaction,
} from '@/modules/__generated__/graphql/switchboard-generated'
import { getCurrencyValue } from '../../lib/budget-statement-utils'
import { FundingOverview } from './components/funding-overview'
import { ReservesSnapshot } from './components/reserves-snapshot'
import type { CalculatedBalance } from './types'

interface AccountSnapshotProps {
  expenseReport: Partial<BudgetStatementSnapshotReport>
}

// TODO: move the constants and helper functions to a separate file once the integration is complete
const STABLECOIN_UNITS = ['USDC', 'USDT', 'USDS', 'DAI']

function getBalance(
  expenseReport: Partial<BudgetStatementSnapshotReport>,
  type: SnapAccountType,
): CalculatedBalance {
  const balance: CalculatedBalance = {
    startingBalance: 0,
    endingBalance: 0,
    inflow: 0,
    outflow: 0,
  }

  expenseReport.accounts
    ?.filter((account) => account.type === type)
    .forEach((account) => {
      account.balances.forEach((balance) => {
        if (STABLECOIN_UNITS.includes(balance.token.symbol)) {
          balance.startingBalance += getCurrencyValue(balance.startingBalance)
          balance.endingBalance += getCurrencyValue(balance.endingBalance)
        }
      })

      // calculate the inflow and outflow
      account.transactions.forEach((transaction) => {
        if (STABLECOIN_UNITS.includes(transaction.amount.unit)) {
          if (transaction.direction === AccountTransactionDirection.Inflow) {
            balance.inflow += getCurrencyValue(transaction.amount.value)
          } else {
            // if it is not an inflow, it is an outflow (there are no other options)
            balance.outflow += getCurrencyValue(transaction.amount.value)
          }
        }
      })
    })

  return balance
}

function getTransactionHistory(
  expenseReport: Partial<BudgetStatementSnapshotReport>,
): SnapshotAccountTransaction[] {
  const transactionHistory: SnapshotAccountTransaction[] = []

  expenseReport.accounts
    // only source accounts are included in the funding overview section
    ?.filter((account) => account.type === SnapAccountType.Source)
    .forEach((account) => {
      account.transactions.forEach((transaction) => {
        if (STABLECOIN_UNITS.includes(transaction.amount.unit)) {
          transactionHistory.push(transaction)
        }
      })
    })

  return transactionHistory
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
