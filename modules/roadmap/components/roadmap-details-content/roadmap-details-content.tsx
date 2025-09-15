'use client'

import { useParams } from 'next/navigation'
import { useScopeOfWorkQuery } from '@/modules/__generated__/graphql/switchboard-generated'
import { FAST_REFRESH_INTERVAL } from '@/modules/shared/config/constants'
import { SCOPE_OF_WORK_DOCUMENT_ID } from '../../lib/constants'
import { getRoadmapFromScopeOfWork } from '../../lib/fetch-scope-of-work'
import { DetailsSection } from '../details-section'
import { OverviewSection } from '../overview-section'

export default function RoadmapDetailsContent() {
  const { roadmapSlug } = useParams()
  const { data } = useScopeOfWorkQuery(
    {
      docId: SCOPE_OF_WORK_DOCUMENT_ID,
    },
    {
      enabled: !!roadmapSlug,
      refetchInterval: FAST_REFRESH_INTERVAL,
    },
  )
  const roadmap = data && getRoadmapFromScopeOfWork(data, roadmapSlug as string)

  return (
    <div className="flex flex-col gap-10">
      <OverviewSection roadmap={roadmap} />
      <DetailsSection scopeOfWorkQuery={data} roadmap={roadmap} />
    </div>
  )
}
