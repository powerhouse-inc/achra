import { useMemo } from 'react'
import type { ExtendedExecutiveProposal } from '@/modules/shared/types/makervote'

interface UseExecutiveProposalsProps {
  executiveProposals?: ExtendedExecutiveProposal[]
  hatAddress?: string | null
}

export function useExecutiveProposals({
  executiveProposals,
  hatAddress,
}: UseExecutiveProposalsProps) {
  const openProposals = useMemo(() => {
    if (!executiveProposals) return []
    return executiveProposals.filter(
      (proposal) => proposal.active && hatAddress !== proposal.address,
    )
  }, [executiveProposals, hatAddress])

  const activeProposals = useMemo(() => {
    if (!executiveProposals) return []
    return executiveProposals.filter((proposal) => hatAddress === proposal.address)
  }, [executiveProposals, hatAddress])

  const passedProposals = useMemo(() => {
    if (!executiveProposals) return []
    return executiveProposals.filter(
      (proposal) => !proposal.active && hatAddress !== proposal.address,
    )
  }, [executiveProposals, hatAddress])

  const slicedPassedProposals = useMemo(() => {
    return passedProposals.slice(0, Math.min(3, passedProposals.length))
  }, [passedProposals])

  return {
    openProposals,
    activeProposals,
    passedProposals,
    slicedPassedProposals,
    hatAddress,
  }
}
