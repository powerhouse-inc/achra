'use client'

import { accountSnapshotMockWithoutActualsComparison } from '../../mocks/account-snapshot-mocks'
import { ExpenseComparison } from './components/expense-comparison'
import { FundingOverview } from './components/funding-overview'
import { ReservesSnapshot } from './components/reserves-snapshot'
import useAccountsSnapshot from './useAccountsSnapshot'

interface AccountSnapshotProps {
  month: Date | null
}

function AccountSnapshot({ month: _ }: AccountSnapshotProps) {
  const {
    transactionHistory,
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
      <FundingOverview transactionHistory={transactionHistory} />
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
