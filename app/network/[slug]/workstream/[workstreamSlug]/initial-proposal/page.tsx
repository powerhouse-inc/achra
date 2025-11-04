import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Suspense } from 'react'
import { BreadcrumbSkeleton, PageBreadcrumbContainer } from '@/modules/shared/components/breadcrumb'
import { PageContent } from '@/modules/shared/components/page-containers'
import { Button } from '@/modules/shared/components/ui/button'
import { WorkstreamInitialProposalBreadcrumb } from '@/modules/workstream/components/workstream-breadcrumb'

interface InitialProposalPageProps {
  params: Promise<{ slug: string; workstreamSlug: string }>
}

export default function InitialProposalPage({ params }: InitialProposalPageProps) {
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
          <Button asChild variant="default">
            <Link href="/network/powerhouse/workstream/vetra-beta-launch/initial-proposal/project-details">
              Project Details
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </PageContent>
    </main>
  )
}
