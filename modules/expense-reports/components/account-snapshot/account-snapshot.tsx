'use client'

import type { BudgetStatementSnapshotReport } from '@/modules/__generated__/graphql/switchboard-generated'
import { accountSnapshotMockWithoutActualsComparison } from '../../mocks/account-snapshot-mocks'
import { ExpenseComparison } from './components/expense-comparison'
import { ReservesSnapshot } from './components/reserves-snapshot'
import useAccountsSnapshot from './useAccountsSnapshot'

interface AccountSnapshotProps {
  expenseReport: Partial<BudgetStatementSnapshotReport>
}

// TODO: remove this component in favor of the SSR version once the integration is complete
function AccountSnapshot({ expenseReport: _ }: AccountSnapshotProps) {
  const {
    includeOffChain,
    toggleIncludeOffChain,
    startDate,
    endDate,
    cuReservesBalance,
    onChainData,
    offChainData,
    hasOffChainData,
    hasActualsComparison,
    expenseComparisonLineItems,
  } = useAccountsSnapshot(accountSnapshotMockWithoutActualsComparison)

  return (
    <div className="flex flex-col gap-6 md:gap-8">
      <ReservesSnapshot
        teamName="Powerhouse"
        includeOffChain={includeOffChain}
        toggleIncludeOffChain={toggleIncludeOffChain}
        startDate={startDate}
        endDate={endDate}
        balance={cuReservesBalance}
        onChainData={onChainData}
        offChainData={offChainData}
      />
      {hasActualsComparison && (
        <ExpenseComparison
          lineItems={expenseComparisonLineItems}
          hasOffChainData={hasOffChainData}
        />
      )}
    </div>
  )
}

export { AccountSnapshot }
