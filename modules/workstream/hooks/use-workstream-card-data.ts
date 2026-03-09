import type { FullQueryWorkstream } from '@/modules/__generated__/graphql/switchboard-generated'
import { slugify } from '@/modules/shared/lib/slug'
import { calculateTotalBudget, countRoadmapStats } from '../lib/roadmap-stats'

function useWorkstreamCardData(workstream: FullQueryWorkstream) {
  const networkSlug = slugify(workstream.network?.name ?? 'Unknown')
  const workstreamSlug = workstream.slug ?? 'unknown'

  const { milestones, deliverables } = countRoadmapStats(workstream)
  const totalBudget = calculateTotalBudget(workstream)
  const initialProposalDeliverables = workstream.initialProposal?.sow?.deliverables ?? []

  return {
    networkSlug,
    workstreamSlug,
    milestones,
    deliverables,
    totalBudget,
    initialProposalDeliverables,
  }
}

export { useWorkstreamCardData }
