import { TabSkeleton, TabsSkeleton } from '@/modules/shared/components/tab-skeleton'

function ExpenseReportTabsSkeleton() {
  return (
    <TabsSkeleton>
      <TabSkeleton className="w-32" active />
      <TabSkeleton className="w-35" />
    </TabsSkeleton>
  )
}

export { ExpenseReportTabsSkeleton }
