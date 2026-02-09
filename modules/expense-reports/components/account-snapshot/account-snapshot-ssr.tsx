import {
  AccountTransactionDirection,
  type BudgetStatementSnapshotReport,
  type SnapshotAccountTransaction,
} from '@/modules/__generated__/graphql/switchboard-generated'
import { getCurrencyValue } from '../../lib/budget-statement-utils'
import { FundingOverview } from './components/funding-overview'
import type { CalculatedBalance } from './types'

interface AccountSnapshotProps {
  expenseReport: Partial<BudgetStatementSnapshotReport>
}

// TODO: move the constants and helper functions to a separate file once the integration is complete
const STABLECOIN_UNITS = ['USDC', 'USDT', 'USDS', 'DAI']

function getBalance(expenseReport: Partial<BudgetStatementSnapshotReport>): CalculatedBalance {
  const balance: CalculatedBalance = {
    startingBalance: 0,
    endingBalance: 0,
    inflow: 0,
    outflow: 0,
  }

  expenseReport.accounts?.forEach((account) => {
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

  expenseReport.accounts?.forEach((account) => {
    account.transactions.forEach((transaction) => {
      if (STABLECOIN_UNITS.includes(transaction.amount.unit)) {
        transactionHistory.push(transaction)
      }
    })
  })

  return transactionHistory
}

function AccountSnapshot({ expenseReport }: AccountSnapshotProps) {
  const balance = getBalance(expenseReport)
  const transactionHistory = getTransactionHistory(expenseReport)

  return (
    <div className="flex flex-col gap-6 md:gap-8">
      <FundingOverview
        transactionHistory={transactionHistory}
        startDate={expenseReport.startDate}
        endDate={expenseReport.endDate}
        balance={balance}
      />
    </div>
  )
}

export { AccountSnapshot }
