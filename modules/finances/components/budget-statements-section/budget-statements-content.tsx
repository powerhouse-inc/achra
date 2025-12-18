import { Button } from '@/modules/shared/components/ui/button'
import { BudgetStatementsItem } from './budget-stament-item/budget-staments-item'
import { mockBudgetStatements } from './mock/budget-stament-mock'

export default async function BudgetStatementsContent() {
  // TODO: This simulaty fetch data from API
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return (
    <div className="flex h-fit flex-col gap-6">
      <BudgetStatementsItem builders={mockBudgetStatements} />
      <Button variant="outline" size="lg" className="w-58 self-center md:mt-0">
        Load More
      </Button>
    </div>
  )
}
