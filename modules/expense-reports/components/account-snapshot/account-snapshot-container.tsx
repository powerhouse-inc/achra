import { getAccountSnapshotForMonth } from '../../services/expense-reports-service'
import { AccountSnapshot } from './account-snapshot'
import { SnapshotEmptyState } from './components/snapshot-empty-state'

interface AccountSnapshotContainerProps {
  teamId: string
  month: Date
}

async function AccountSnapshotContainer({ teamId, month }: AccountSnapshotContainerProps) {
  const snapshotReport = await getAccountSnapshotForMonth(teamId, month)

  if (!snapshotReport || snapshotReport.accounts?.length === 0) {
    return <SnapshotEmptyState />
  }

  return <AccountSnapshot expenseReport={snapshotReport} />
}

export { AccountSnapshotContainer }
