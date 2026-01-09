import { BuilderProfileHeaderSkeleton } from '@/modules/builder-profile/components/builder-profile-header'
import { AccountSnapshotSkeleton } from '@/modules/expense-reports/components/account-snapshot'
import { ExpenseReportTabsSkeleton } from '@/modules/expense-reports/components/expense-report-tabs'
import { MonthNavigationSkeleton } from '@/modules/expense-reports/components/month-navigation'
import { PageContent } from '@/modules/shared/components/page-containers'

export default function ExpenseReportsLoading() {
  return (
    <PageContent as="div">
      <BuilderProfileHeaderSkeleton />
      <MonthNavigationSkeleton />

      <div className="my-6">
        <ExpenseReportTabsSkeleton />
      </div>

      <AccountSnapshotSkeleton />
    </PageContent>
  )
}
