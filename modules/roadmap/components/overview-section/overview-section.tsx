'use client'

import { useParams } from 'next/navigation'
import { useScopeOfWorkQuery } from '@/modules/__generated__/graphql/switchboard-generated'
import { FAST_REFRESH_INTERVAL } from '@/modules/shared/config/constants'
import { SCOPE_OF_WORK_DOCUMENT_ID } from '../../lib/constants'
import { getRoadmapFromScopeOfWork } from '../../lib/fetch-scope-of-work'
import { SectionTitle } from '../section-title'
import { Timeline } from '../timeline'

export default function OverviewSection() {
  const { roadmapSlug } = useParams()
  const { data } = useScopeOfWorkQuery(
    {
      docId: SCOPE_OF_WORK_DOCUMENT_ID,
    },
    // {
    //   enabled: !!roadmapSlug,
    //   refetchInterval: FAST_REFRESH_INTERVAL,
    // },
  )
  const roadmap = data && getRoadmapFromScopeOfWork(data, roadmapSlug as string)

  return (
    <div className="flex flex-col gap-6">
      <SectionTitle
        title="Milestones Roadmap Overview"
        tooltip="Milestones represent checkpoints on the way to full completion of the roadmap,
      where a well-defined subset of the deliverables is deployed as an intermediate, integrated solution."
      />

      <Timeline milestones={roadmap?.milestones ?? []} />
    </div>
  )
}
