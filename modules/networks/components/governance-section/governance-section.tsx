import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { getChiefHat } from '@/web3/api/governance'
import { fetchGovernanceProposals } from '../../lib/fetch-governance-proposals'
import { SectionTitle } from '../section-title'
import { ExecutiveProposals } from './components/executive-proposals/executive-proposals'
import { ExternalLink } from './components/external-link/external-link'
import { GOVERNANCE_CHIEF_HAT_QUERY_KEY, GOVERNANCE_PROPOSALS_QUERY_KEY } from './constants'

export async function GovernanceSection() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: [GOVERNANCE_PROPOSALS_QUERY_KEY],
    queryFn: fetchGovernanceProposals,
  })

  await queryClient.prefetchQuery({
    queryKey: [GOVERNANCE_CHIEF_HAT_QUERY_KEY],
    queryFn: getChiefHat,
  })

  return (
    <section className="flex w-full flex-col gap-6">
      <div className="flex flex-col">
        <SectionTitle title="Governance" hash="governance" />
        <span className="text-foreground/50 text-base/6 font-semibold">
          The Powerhouse Network is build upon the Foundational Governance Document named Atlas.
          Explore this document for yourself through the Atlas Explorer.
        </span>
      </div>
      <div className="align-center flex flex-col gap-4 sm:flex-row md:gap-6">
        <ExternalLink
          href="https://sky-atlas.powerhouse.io/"
          imageSrc="/networks/logos/atlas.png"
          name="Powerhouse Atlas"
          description="Launch Atlas Explorer"
        />
        <ExternalLink
          href="https://vote.sky.money/"
          imageSrc="/networks/logos/sky-vote.png"
          name="Sky Vote"
          description="Launch Sky Vote"
        />
      </div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ExecutiveProposals />
      </HydrationBoundary>
    </section>
  )
}
