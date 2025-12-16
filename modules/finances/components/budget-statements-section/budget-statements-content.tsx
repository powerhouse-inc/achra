import { mockBuilderTeams } from '@/modules/networks/mocks/builders-section'
import { BudgetStatementsItem } from './budget-stament-item/budget-staments-item'

export default async function BudgetStatementsContent() {
  // TODO: This simulaty fetch data from API
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return <BudgetStatementsItem builders={mockBuilderTeams} />
}
