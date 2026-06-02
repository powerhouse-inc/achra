import { InternalLink } from '@/modules/shared/components/internal-link'
import type { Route } from 'next'

interface ViewProposalLinkProps {
  networkSlug: string
  workstreamSlug: string
}

function ViewProposalLink({ networkSlug, workstreamSlug }: ViewProposalLinkProps) {
  return (
    <InternalLink
      href={`/network/${networkSlug}/workstream/${workstreamSlug}/initial-proposal` as Route}
      className="ml-auto max-w-fit sm:hidden"
      variant="outline"
    >
      View Proposal
    </InternalLink>
  )
}

export { ViewProposalLink }
