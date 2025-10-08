import type { ExtendedExecutiveProposal } from '@/modules/shared/types/makervote'

export interface GroupedGovernanceProposals {
  openProposals: ExtendedExecutiveProposal[]
  activeProposals: ExtendedExecutiveProposal[]
  passedProposals: ExtendedExecutiveProposal[]
  slicedPassedProposals: ExtendedExecutiveProposal[]
}

export function groupGovernanceProposals(
  executiveProposals: ExtendedExecutiveProposal[] | undefined,
  hatAddress: string | null | undefined,
): GroupedGovernanceProposals {
  const proposals = executiveProposals ?? []
  const hat = hatAddress ?? null

  const openProposals = proposals.filter((proposal) => proposal.active && hat !== proposal.address)

  const activeProposals = proposals.filter((proposal) => hat === proposal.address)

  const passedProposals = proposals.filter(
    (proposal) => !proposal.active && hat !== proposal.address,
  )

  const slicedPassedProposals = passedProposals.slice(0, Math.min(3, passedProposals.length))

  return {
    openProposals,
    activeProposals,
    passedProposals,
    slicedPassedProposals,
  }
}
