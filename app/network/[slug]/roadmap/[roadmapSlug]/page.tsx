import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  type ScopeOfWorkQuery,
  useScopeOfWorkQuery,
} from '@/modules/__generated__/graphql/switchboard-generated'
import { DetailsSection } from '@/modules/roadmap/components/details-section'
import { OverviewSection } from '@/modules/roadmap/components/overview-section'
import { SCOPE_OF_WORK_DOCUMENT_ID } from '@/modules/roadmap/lib/constants'
import {
  fetchPowerhouseScopeOfWork,
  getRoadmapFromScopeOfWork,
} from '@/modules/roadmap/lib/fetch-scope-of-work'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/modules/shared/components/ui/breadcrumb'

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

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main>
        <div className="bg-background fixed top-18 z-50 w-full border-b py-3 md:top-21">
          <Breadcrumb className="container">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/networks">Networks</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/network/powerhouse">Powerhouse</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/network/powerhouse/roadmap">Roadmap</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{roadmap.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="container mt-16 mb-8 flex flex-col gap-6">
          <div className="flex flex-col">
            <h1 className="m-0 text-lg font-bold text-gray-900 md:text-xl md:leading-6 xl:text-2xl">
              {roadmap.title}
            </h1>
          </div>

          <div className="flex flex-col gap-10">
            <OverviewSection />
            <DetailsSection />
          </div>
        </div>
      </main>
    </HydrationBoundary>
  )
}
