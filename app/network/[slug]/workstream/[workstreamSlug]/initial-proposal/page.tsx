import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Suspense } from 'react'
import { BreadcrumbSkeleton, PageBreadcrumbContainer } from '@/modules/shared/components/breadcrumb'
import { PageContent } from '@/modules/shared/components/page-containers'
import { Button } from '@/modules/shared/components/ui/button'
import { Skeleton } from '@/modules/shared/components/ui/skeleton'
import { WorkstreamInitialProposalBreadcrumb } from '@/modules/workstream/components/workstream-breadcrumb'
import type { Route } from 'next'

interface InitialProposalPageProps {
  params: Promise<{ slug: string; workstreamSlug: string }>
}

export default async function InitialProposalPage({ params }: InitialProposalPageProps) {
  const { slug, workstreamSlug } = await params

  return (
    <main>
      <PageBreadcrumbContainer>
        <Suspense fallback={<BreadcrumbSkeleton segments={3} />}>
          <WorkstreamInitialProposalBreadcrumb params={params} />
        </Suspense>
      </PageBreadcrumbContainer>
      <PageContent className="gap-6" variant="with-breadcrumb">
        <h1 className="text-foreground m-0 text-lg font-bold md:text-xl md:leading-6 xl:text-2xl xl:leading-7">
          Initial Proposal
        </h1>
        <div className="flex h-9 w-full justify-center py-32">
          <Suspense fallback={<Skeleton className="h-9 w-36" />}>
            <Button asChild variant="default">
              <Link
                href={
                  `/network/${slug}/workstream/${workstreamSlug}/initial-proposal/project-details` as Route
                }
              >
                Project Details
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </Suspense>
        </div>
      </PageContent>
    </main>
  )
}
