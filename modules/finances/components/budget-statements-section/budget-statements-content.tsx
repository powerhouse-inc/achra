import { mockBuilderTeams } from '@/modules/networks/mocks/builders-section'
import { BudgetStatementsItem } from './budget-stament-item/budget-staments-item'

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export default async function BudgetStatementsContent() {
  // TODO: This simulaty fetch data from API 
  await delay(2000)
  return <BudgetStatementsItem builders={mockBuilderTeams} />
}
