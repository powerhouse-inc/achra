'use client'

import { accountSnapshotMock } from '../../mocks/account-snapshot-mocks'
import { FundingOverview } from './components/funding-overview'
import useAccountsSnapshot from './useAccountsSnapshot'

interface AccountSnapshotProps {
  month: Date | null
}

function AccountSnapshot({ month: _ }: AccountSnapshotProps) {
  const { transactionHistory } = useAccountsSnapshot(accountSnapshotMock)

  return (
    <div className="flex flex-col gap-8">
      <FundingOverview transactionHistory={transactionHistory} />
    </div>
  )
}

export { AccountSnapshot }
