import {
  AccountTransactionDirection,
  type SnapshotAccount,
} from '@/modules/__generated__/graphql/switchboard-generated'
import { getCurrencyValue } from '@/modules/expense-reports/lib/budget-statement-utils'
import type { CalculatedBalance } from '../types'

// TODO: move this to the constants file
export const STABLECOIN_UNITS = ['USDC', 'USDT', 'USDS', 'DAI']

export function getBalance(account: SnapshotAccount): CalculatedBalance {
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
