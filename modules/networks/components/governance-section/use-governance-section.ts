import { useQuery } from '@tanstack/react-query'
import { getChiefHat } from '@/web3/api/governance'
import { fetchGovernanceProposals } from '../../lib/fetch-governance-proposals'
import { GOVERNANCE_CHIEF_HAT_QUERY_KEY, GOVERNANCE_PROPOSALS_QUERY_KEY } from './constants'

export function useGovernanceSection() {
  const { data: governanceProposals } = useQuery({
    queryKey: [GOVERNANCE_PROPOSALS_QUERY_KEY],
    queryFn: fetchGovernanceProposals,
  })

  const { data: governanceChiefHatAddress } = useQuery({
    queryKey: [GOVERNANCE_CHIEF_HAT_QUERY_KEY],
    queryFn: getChiefHat,
  })

  return {
    governanceProposals,
    governanceChiefHatAddress,
  }
}
