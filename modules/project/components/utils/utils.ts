import type { ScopeOfWork_Deliverable } from '@/modules/__generated__/graphql/switchboard-generated'

interface CalculateTotalBalanceParams {
  deliverables: ScopeOfWork_Deliverable[]
}

export const calculateTotalBalance = ({ deliverables }: CalculateTotalBalanceParams) => {
  const total = deliverables.reduce((acc, deliverable) => {
    return acc + (deliverable.budgetAnchor?.unitCost ?? 0)
  }, 0)
  return total.toLocaleString()
}
