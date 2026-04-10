import type {
  FullQueryWorkstream,
  Network,
} from '@/modules/__generated__/graphql/switchboard-generated'
import { WorkstreamStatusChip } from '@/modules/shared/components/chips/workstream-status-chip'
import { InternalLink } from '@/modules/shared/components/internal-link'
import { Markdown } from '@/modules/shared/components/markdown'
import { NavigationHeader } from '@/modules/shared/components/navigation-header'
import { WorkstreamStats } from '../workstream-stats/workstream-stats'
import type { Route } from 'next'

interface WorkstreamRfpHeaderProps {
  workstream: FullQueryWorkstream
  networkSlug: string
  workstreamSlug: string
}

function WorkstreamRfpHeader({
  workstream,
  networkSlug,
  workstreamSlug,
}: Readonly<WorkstreamRfpHeaderProps>) {
  return (
    <div className="flex flex-col gap-4 p-2 sm:gap-6 sm:p-3 sm:pb-2 md:p-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <NavigationHeader
          network={workstream.network as Pick<Network, 'name' | 'logo' | 'darkThemeLogo'>}
          title={workstream.title ?? 'Unknown'}
          workstreamSlug={workstreamSlug}
        />

        {workstream.status && <WorkstreamStatusChip status={workstream.status} />}
      </div>

      <WorkstreamStats
        issuer={workstream.client?.name ?? 'Unknown'}
        budgetMin={workstream.rfp?.budgetMin}
        budgetMax={workstream.rfp?.budgetMax}
        budgetCurrency={workstream.rfp?.budgetCurrency}
        submissionDeadline={workstream.rfp?.submissionDeadline}
      />

      <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
        {workstream.rfp?.summary ? (
          <Markdown className="line-clamp-6 sm:line-clamp-4">{workstream.rfp.summary}</Markdown>
        ) : (
          <div className="text-xs/4.5 sm:text-sm/5.5 xl:text-base/6">No summary available</div>
        )}

        <InternalLink
          href={`/network/${networkSlug}/workstream/${workstreamSlug}/rfp` as Route}
          className="ml-auto max-w-fit"
          variant="outline"
        >
          RFP Details
        </InternalLink>
      </div>
    </div>
  )
}

export { WorkstreamRfpHeader }
