import type { BudgetStatementExpenseReport } from '../type'

interface BuildersStamentProps {
  builders: BudgetStatementExpenseReport[]
}

// TODO: Implement this hook to process correct data
export function useBudgetStamentData({ builders }: Readonly<BuildersStamentProps>) {
  return {
    buildersProcessed: builders,
  }
}
