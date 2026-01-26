import BudgetStatementsSection from './budget-statements-section'
import { getBudgetStatements } from './services/budget-stament-service'

interface BudgetStatementsSectionWrapperProps {
  params: Promise<{
    slug: string
    financeSlug?: string[]
  }>
}

export async function BudgetStatementsSectionWrapper({
  params,
}: Readonly<BudgetStatementsSectionWrapperProps>) {
  const { slug } = await params
  const budgetStatements = await getBudgetStatements(slug)

  return <BudgetStatementsSection budgetStatements={budgetStatements} />
}
