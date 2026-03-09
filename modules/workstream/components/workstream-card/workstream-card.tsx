import type { FullQueryWorkstream } from '@/modules/__generated__/graphql/switchboard-generated'
import type { WorkstreamDetailsProject } from '@/modules/project/types'
import { Card } from '@/modules/shared/components/ui/card'
import { useWorkstreamCardData } from '../../hooks/use-workstream-card-data'
import { AlternativeProposalsFooter } from '../initial-proposal-list/alternative-proposals-footer'
import { InitialProposalSection } from '../initial-proposal-list/initial-proposal-section'
import { WorkstreamRfpHeader } from '../initial-proposal-list/workstream-rfp-header'

interface WorkstreamCardProps {
  workstream: FullQueryWorkstream
  projects: WorkstreamDetailsProject[]
  fullVersion?: boolean
}

function WorkstreamCard({
  workstream,
  projects,
  fullVersion = true,
}: Readonly<WorkstreamCardProps>) {
  const {
    networkSlug,
    workstreamSlug,
    milestones,
    deliverables,
    totalBudget,
    initialProposalDeliverables,
  } = useWorkstreamCardData(workstream)

  return (
    <Card className="gap-0 overflow-hidden p-0">
      {fullVersion && (
        <WorkstreamRfpHeader
          workstream={workstream}
          networkSlug={networkSlug}
          workstreamSlug={workstreamSlug}
        />
      )}
      <InitialProposalSection
        networkSlug={networkSlug}
        workstreamSlug={workstreamSlug}
        proposal={workstream.initialProposal}
        milestones={milestones}
        deliverables={deliverables}
        totalBudget={totalBudget}
        projects={projects}
      />
      {fullVersion && (
        <AlternativeProposalsFooter isVisible={initialProposalDeliverables.length > 0} />
      )}
    </Card>
  )
}

export { WorkstreamCard }
