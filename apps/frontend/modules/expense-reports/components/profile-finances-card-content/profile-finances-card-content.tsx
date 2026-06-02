import type { OpHubMember } from '@/modules/__generated__/graphql/switchboard-generated'
import { InternalLink } from '@/modules/shared/components/internal-link'
import ff from '@/modules/shared/lib/feature-flags'
import { cn } from '@/modules/shared/lib/utils'
import type { Route } from 'next'

interface ProfileFinancesCardContentProps {
  builderSlug: string
  operationalHub: OpHubMember
}

function ProfileFinancesCardContent({
  builderSlug,
  operationalHub,
}: ProfileFinancesCardContentProps) {
  const operationalHubName = operationalHub.name ?? ''

  return (
    <div className="flex flex-col gap-4">
      <p className="text-foreground/50 text-sm/4.5 font-semibold">
        View all expenses of the Powerhouse Ecosystem Actor.
      </p>

      <div className="flex gap-4">
        <InternalLink
          href={`/network/powerhouse/builders/${builderSlug}/budget-statements` as Route}
        >
          Budget Statements
        </InternalLink>
        {ff.builders.FINANCES_LINK_ENABLED && (
          <InternalLink href={'/network/powerhouse/finances' as Route}>Finances</InternalLink>
        )}
      </div>

      <div className="bg-background relative mt-2 flex flex-wrap gap-6 rounded-lg border p-4">
        <div className="bg-card text-foreground/30 absolute -top-2.5 left-2 px-2 text-sm/4.5 font-medium">
          Operational Hub
        </div>
        <span
          className={cn(
            'text-foreground text-md/6 font-semibold',
            !operationalHubName && 'text-foreground/50',
          )}
        >
          {operationalHubName || 'No Operational Hub'}
        </span>
      </div>
    </div>
  )
}

export { ProfileFinancesCardContent }
