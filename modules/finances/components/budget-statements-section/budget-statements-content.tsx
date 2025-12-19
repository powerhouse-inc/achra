import { Button } from '@/modules/shared/components/ui/button'
import { useInfiniteArray } from '@/modules/shared/hooks/use-infinite-array'
import { BudgetStatementsItem } from './budget-stament-item/budget-staments-item'
import { mockBudgetStatements } from './mock/budget-stament-mock'
import type { MetricWithoutBudget } from './type'

interface BudgetStatementsContentProps {
  budgetMetric: MetricWithoutBudget
}

export default function BudgetStatementsContent({
  budgetMetric,
}: Readonly<BudgetStatementsContentProps>) {
  const { visibleItems, hasMore, loadMore } = useInfiniteArray(mockBudgetStatements, {
    firstPageSize: 10,
    pageSize: 10,
    enabled: true,
  })
  return (
    <div className="flex h-fit flex-col gap-6">
      <BudgetStatementsItem builders={visibleItems} budgetMetric={budgetMetric} />
      {hasMore && (
        <Button variant="outline" size="lg" className="w-58 self-center md:mt-0" onClick={loadMore}>
          Load More
        </Button>
      )}
    </div>
  )
}
