import { ExpenseComparisonSkeleton } from './components/expense-comparison'
import { FundingOverviewSkeleton } from './components/funding-overview'
import { ReservesSnapshotSkeleton } from './components/reserves-snapshot'

function AccountSnapshotSkeleton() {
  return (
    <div className="flex flex-col gap-6 md:gap-8">
      <FundingOverviewSkeleton />
      <ReservesSnapshotSkeleton />
      <ExpenseComparisonSkeleton hasOffChainData={false} />
    </div>
  )
}

export { AccountSnapshotSkeleton }
