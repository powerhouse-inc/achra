import { InternalLink } from '@/modules/shared/components/internal-link'
import type { Route } from 'next'

function ViewProposalLink() {
  const slug = 'powerhouse'
  const workstreamSlug = 'vetra-beta-launch'

  return (
    <InternalLink
      href={`/network/${slug}/workstream/${workstreamSlug}/initial-proposal` as Route}
      className="ml-auto max-w-fit sm:hidden"
      variant="outline"
    >
      View Proposal
    </InternalLink>
  )
}

export { ViewProposalLink }
