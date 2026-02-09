import { getAccountSnapshotForMonth } from '../../services/expense-reports-service'
import { AccountSnapshot } from './account-snapshot-ssr'

interface AccountSnapshotContainerProps {
  teamId: string
  month: Date
}

async function AccountSnapshotContainer({ teamId, month }: AccountSnapshotContainerProps) {
  const snapshotReport = await getAccountSnapshotForMonth(teamId, month)

  if (!snapshotReport || snapshotReport.accounts?.length === 0) {
    // TODO: add a proper empty state component UI
    return <div>No snapshot report found</div>
  }

  return <AccountSnapshot expenseReport={snapshotReport} />
}

export { AccountSnapshotContainer }
