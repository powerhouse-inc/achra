import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import { Breadcrumb, PageBreadcrumbContainer } from '@/modules/shared/components/breadcrumb'
import { PageContent } from '@/modules/shared/components/page-containers'
import { Button } from '@/modules/shared/components/ui/button'
import type { Route } from 'next'

interface InitialProposalPageProps {
  params: Promise<{ slug: string; workstreamSlug: string }>
}

export default async function InitialProposalPage({ params }: InitialProposalPageProps) {
  const { slug, workstreamSlug } = await params
  const items = [
    { label: 'Powerhouse', href: `/network/${slug}` as Route },
    {
      label: 'Vetra Beta Launch',
      href: `/network/${slug}/workstream/${workstreamSlug}` as Route,
    },
    {
      label: 'Initial Proposal',
      href: `/network/${slug}/workstream/${workstreamSlug}/initial-proposal` as Route,
    },
  ]
  return (
    <main>
      <PageBreadcrumbContainer>
        <Breadcrumb items={items} />
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
