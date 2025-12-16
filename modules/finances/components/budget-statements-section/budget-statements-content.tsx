import { mockBuilderTeams } from '@/modules/networks/mocks/builders-section'
import { BudgetStatementsItem } from './budget-stament-item/budget-staments-item'

export default function BudgetStatementsContent() {
  return <BudgetStatementsItem builders={mockBuilderTeams} />
}
