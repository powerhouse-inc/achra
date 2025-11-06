import type {
  ExecutiveProposal,
  ExecutiveProposalSupporters,
  ExtendedExecutiveProposal,
} from '@/shared/types/makervote'

export async function fetchGovernanceProposals(): Promise<ExtendedExecutiveProposal[]> {
  const executiveResponse = await fetch('https://vote.sky.money/api/executive')
  const proposals = (await executiveResponse.json()) as ExecutiveProposal[]

  const supportersResponse = await fetch('https://vote.sky.money/api/executive/supporters')
  const supporters = (await supportersResponse.json()) as ExecutiveProposalSupporters

  proposals.forEach((proposal) => {
    // the address can contain upper/lower case letters differently from the proposal address
    // but it still represents the same address
    const key = Object.keys(supporters).find(
      (key) => key.toLowerCase() === proposal.address.toLowerCase(),
    )
    ;(proposal as ExtendedExecutiveProposal).supporters = key ? supporters[key].length : 0
  })

  return proposals as ExtendedExecutiveProposal[]
}
