'use client'

import { accountSnapshotMock } from '../../mocks/account-snapshot-mocks'
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
  } = useAccountsSnapshot(accountSnapshotMock)

  return (
    <div className="flex flex-col gap-8">
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
    </div>
  )
}

export { AccountSnapshot }
