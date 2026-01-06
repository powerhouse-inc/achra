import { Button } from '@/modules/shared/components/ui/button'
import { useInfiniteArray } from '@/modules/shared/hooks/use-infinite-array'
import BudgetEmptyState from './budget-empty-state'
import { BudgetStatementsItem } from './budget-stament-item/budget-staments-item'
import { mockBudgetStatements } from './mock/budget-stament-mock'
import type { SortOptionValue } from './budget-stament-filters/popover-filter-content'
import type { MetricWithoutBudget } from './type'

interface BudgetStatementsContentProps {
  budgetMetric: MetricWithoutBudget
  sortOption?: SortOptionValue
}

export default function BudgetStatementsContent({
  budgetMetric,
  sortOption,
}: Readonly<BudgetStatementsContentProps>) {
  const { visibleItems, hasMore, loadMore } = useInfiniteArray(mockBudgetStatements, {
    firstPageSize: 10,
    pageSize: 10,
    enabled: true,
  })

  const showEmptyState = visibleItems.length === 0
  return (
    <div className="flex h-fit flex-col gap-6">
      {!showEmptyState && (
        <BudgetStatementsItem
          builders={visibleItems}
          budgetMetric={budgetMetric}
          sortOption={sortOption}
        />
      )}
      {showEmptyState && <BudgetEmptyState />}
      {!showEmptyState && hasMore && (
        <Button variant="outline" size="lg" className="w-58 self-center md:mt-0" onClick={loadMore}>
          Load More
        </Button>
      )}
    </div>
  )
}
