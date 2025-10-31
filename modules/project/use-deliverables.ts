import { useMemo } from 'react'
import type { ScopeOfWork_Deliverable } from '@/modules/__generated__/graphql/switchboard-generated'
import { calculateTotalBalance } from './components/utils'

interface UseDeliverablesProps {
  deliverables: ScopeOfWork_Deliverable[]
}

export function useDeliverables({ deliverables }: UseDeliverablesProps) {
  const totalBalance = useMemo(() => calculateTotalBalance({ deliverables }), [deliverables])

  return {
    totalBalance,
  }
}
