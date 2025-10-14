import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { notFound } from 'next/navigation'
import {
  type ScopeOfWorkQuery,
  useScopeOfWorkQuery,
} from '@/modules/__generated__/graphql/switchboard-generated'
import { RoadmapDetailsContent } from '@/modules/roadmap/components/roadmap-details-content'
import { SCOPE_OF_WORK_DOCUMENT_ID } from '@/modules/roadmap/lib/constants'
import {
  fetchPowerhouseScopeOfWork,
  getRoadmapFromScopeOfWork,
} from '@/modules/roadmap/lib/fetch-scope-of-work'
import { Breadcrumb, PageBreadcrumbContainer } from '@/modules/shared/components/breadcrumb'
import type { BreadcrumbItemNavigation } from '@/modules/shared/components/breadcrumb/types'
import { PageContent } from '@/modules/shared/components/page-containers'

interface RoadmapPageProps {
  params: Promise<{ roadmapSlug: string }>
}

export default async function RoadmapPage({ params }: RoadmapPageProps) {
  const { roadmapSlug } = await params

  const scopeOfWork = await fetchPowerhouseScopeOfWork()
  const roadmap = getRoadmapFromScopeOfWork(scopeOfWork, roadmapSlug)

  const queryClient = new QueryClient()
  queryClient.setQueryData<ScopeOfWorkQuery>(
    useScopeOfWorkQuery.getKey({
      docId: SCOPE_OF_WORK_DOCUMENT_ID,
    }),
    scopeOfWork,
  )

  if (!scopeOfWork || !roadmap) {
    notFound()
  }

  const items: BreadcrumbItemNavigation[] = [
    { label: 'Networks', href: '/networks' },
    { label: 'Powerhouse', href: '/network/powerhouse' },
    { label: 'Roadmaps', href: '/network/powerhouse/roadmaps' },
    {
      label: roadmap.title,
      href: `/network/powerhouse/roadmap/${roadmapSlug}`,
    },
  ]

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main>
        <PageBreadcrumbContainer>
          <Breadcrumb items={items} />
        </PageBreadcrumbContainer>

        <PageContent className="gap-6" as="div" variant="with-breadcrumb">
          <div className="flex flex-col">
            <h1 className="text-foreground m-0 text-lg font-bold md:text-xl md:leading-6 xl:text-2xl xl:leading-7">
              {roadmap.title}
            </h1>
          </div>

          <RoadmapDetailsContent />
        </PageContent>
      </main>
    </HydrationBoundary>
  )
}
