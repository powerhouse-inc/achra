'use client'
import { InternalLink } from '@/modules/shared/components/internal-link'
import type { Route } from 'next'

interface RfpDetailsLinkProps {
  slug: string
}

function RfpDetailsLink({ slug }: RfpDetailsLinkProps) {
  const workstreamSlug = 'vetra-beta-launch'
  return (
    <InternalLink
      href={`/network/${slug}/workstream/${workstreamSlug}/rfp` as Route}
      className="ml-auto max-w-fit"
      variant="outline"
    >
      RFP Details
    </InternalLink>
  )
}

export { RfpDetailsLink }
