'use client'

import { useParams } from 'next/navigation'
import { useScopeOfWorkQuery } from '@/modules/__generated__/graphql/switchboard-generated'
import { FAST_REFRESH_INTERVAL } from '@/modules/shared/config/constants'
import { SCOPE_OF_WORK_DOCUMENT_ID } from '../../lib/constants'
import { getRoadmapFromScopeOfWork } from '../../lib/fetch-scope-of-work'
import { DetailsSection, DetailsSectionSkeleton } from '../details-section'
import { OverviewSection, OverviewSectionSkeleton } from '../overview-section'

function ContentContainer({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-10">{children}</div>
}

function RoadmapDetailsContent() {
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
    <ContentContainer>
      <OverviewSection roadmap={roadmap} />
      <DetailsSection scopeOfWorkQuery={data} roadmap={roadmap} />
    </ContentContainer>
  )
}

function RoadmapDetailsContentSkeleton() {
  return (
    <ContentContainer>
      <OverviewSectionSkeleton />
      <DetailsSectionSkeleton />
    </ContentContainer>
  )
}

export { RoadmapDetailsContent, RoadmapDetailsContentSkeleton }
