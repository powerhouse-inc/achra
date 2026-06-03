import type { SnapshotAccount } from '@/modules/__generated__/graphql/switchboard-generated'
import { getBalance } from '@/modules/expense-reports/lib/balance'
import type { CalculatedBalance, OperationalGroup } from '@/modules/expense-reports/types'

export function buildOperationalGroup(accounts: SnapshotAccount[]): OperationalGroup {
  const aggregated: CalculatedBalance = {
    startingBalance: 0,
    endingBalance: 0,
    inflow: 0,
    outflow: 0,
  }
  accounts.forEach((account) => {
    const b = getBalance(account)
    aggregated.startingBalance += b.startingBalance
    aggregated.endingBalance += b.endingBalance
    aggregated.inflow += b.inflow
    aggregated.outflow += b.outflow
  })
  return {
    type: 'group',
    id: 'operational',
    label: 'Operational',
    balance: aggregated,
    children: accounts,
  }
}
