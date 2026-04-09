import {
  AccountTransactionDirection,
  type BudgetStatementSnapshotReport,
  SnapAccountType,
  type SnapshotAccount,
  type SnapshotAccountTransaction,
} from '@/modules/__generated__/graphql/switchboard-generated'
import type { CalculatedBalance } from '@/modules/expense-reports/types'
import { getCurrencyValue } from './budget-statement-utils'
import { STABLECOIN_UNITS } from './constants'

function getBalanceForAccount(account: SnapshotAccount): CalculatedBalance {
  const balance: CalculatedBalance = {
    startingBalance: 0,
    endingBalance: 0,
    inflow: 0,
    outflow: 0,
  }

  account.balances.forEach((b) => {
    if (STABLECOIN_UNITS.includes(b.token.symbol)) {
      balance.startingBalance += getCurrencyValue(b.startingBalance)
      balance.endingBalance += getCurrencyValue(b.endingBalance)
    }
  })

  account.transactions.forEach((transaction) => {
    if (STABLECOIN_UNITS.includes(transaction.amount.unit)) {
      if (transaction.direction === AccountTransactionDirection.Inflow) {
        balance.inflow += getCurrencyValue(transaction.amount.value)
      } else {
        balance.outflow += getCurrencyValue(transaction.amount.value)
      }
    }
  })

  return balance
}

function addBalances(a: CalculatedBalance, b: CalculatedBalance): CalculatedBalance {
  return {
    startingBalance: a.startingBalance + b.startingBalance,
    endingBalance: a.endingBalance + b.endingBalance,
    inflow: a.inflow + b.inflow,
    outflow: a.outflow + b.outflow,
  }
}

export function getBalance(account: SnapshotAccount): CalculatedBalance
export function getBalance(
  report: Partial<BudgetStatementSnapshotReport>,
  type: SnapAccountType,
): CalculatedBalance
export function getBalance(
  reportOrAccount: Partial<BudgetStatementSnapshotReport> | SnapshotAccount,
  type?: SnapAccountType,
): CalculatedBalance {
  if (type !== undefined) {
    const report = reportOrAccount as Partial<BudgetStatementSnapshotReport>
    const accounts = report.accounts?.filter((account) => account.type === type) ?? []
    const zero: CalculatedBalance = {
      startingBalance: 0,
      endingBalance: 0,
      inflow: 0,
      outflow: 0,
    }
    return accounts.reduce((sum, account) => addBalances(sum, getBalanceForAccount(account)), zero)
  }

  return getBalanceForAccount(reportOrAccount as SnapshotAccount)
}

export function getTransactionHistory(
  expenseReport: Partial<BudgetStatementSnapshotReport>,
): SnapshotAccountTransaction[] {
  const transactionHistory: SnapshotAccountTransaction[] = []

  expenseReport.accounts
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
