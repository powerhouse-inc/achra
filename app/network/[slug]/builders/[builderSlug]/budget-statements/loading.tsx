import { AccountSnapshotSkeleton } from '@/modules/expense-reports/components/account-snapshot'
import { ExpenseReportTabsSkeleton } from '@/modules/expense-reports/components/expense-report-tabs'
import { MonthNavigationSkeleton } from '@/modules/expense-reports/components/month-navigation'
import { PageContent } from '@/modules/shared/components/page-containers'

export default function ExpenseReportsLoading() {
  return (
    <PageContent as="div" className="mt-4 mb-0 md:mt-6">
      <MonthNavigationSkeleton />

      <div className="my-6">
        <ExpenseReportTabsSkeleton />
      </div>

      <AccountSnapshotSkeleton />
    </PageContent>
  )
}
