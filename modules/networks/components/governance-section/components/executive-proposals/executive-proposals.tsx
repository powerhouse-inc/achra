import { fetchGovernanceProposals } from '@/modules/networks/lib/fetch-governance-proposals'
import { groupGovernanceProposals } from '@/modules/networks/lib/group-governance-proposals'
import { getChiefHat } from '@/modules/web3/api/governance'
import { ExecutiveProposalsList } from './components/executive-proposals-list/executive-proposals-list'

interface ExecutiveProposalsProps {
  className?: string
}

export async function ExecutiveProposals({ className }: ExecutiveProposalsProps) {
  const [executiveProposals, hatAddress] = await Promise.all([
    fetchGovernanceProposals(),
    getChiefHat(),
  ])

  const { openProposals, activeProposals, passedProposals, slicedPassedProposals } =
    groupGovernanceProposals(executiveProposals, hatAddress)

  return (
    <ExecutiveProposalsList
      openProposals={openProposals}
      activeProposals={activeProposals}
      passedProposals={passedProposals}
      slicedPassedProposals={slicedPassedProposals}
      hatAddress={hatAddress}
      className={className}
    />
  )
}
