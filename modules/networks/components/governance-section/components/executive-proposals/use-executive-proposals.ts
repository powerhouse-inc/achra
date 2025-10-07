import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { fetchGovernanceProposals } from '@/modules/networks/lib/fetch-governance-proposals'
import { getChiefHat } from '@/web3/api/governance'
import { GOVERNANCE_CHIEF_HAT_QUERY_KEY, GOVERNANCE_PROPOSALS_QUERY_KEY } from '../../constants'

export function useExecutiveProposals() {
  const { data: executiveProposals } = useQuery({
    queryKey: [GOVERNANCE_PROPOSALS_QUERY_KEY],
    queryFn: fetchGovernanceProposals,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })

  const { data: hatAddress } = useQuery({
    queryKey: [GOVERNANCE_CHIEF_HAT_QUERY_KEY],
    queryFn: getChiefHat,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })

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
