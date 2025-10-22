import { Breadcrumb, PageBreadcrumbContainer } from '@/modules/shared/components/breadcrumb'
import { PageContent } from '@/modules/shared/components/page-containers'

import { Card } from '@/modules/shared/components/ui/card'

import type { Route } from 'next'

interface ProjectDetailsPageProps {
  params: Promise<{ slug: string }>
}

export default async function ProjectDetailsPage({ params }: ProjectDetailsPageProps) {
  const { slug } = await params

  const items = [
    { label: 'Powerhouse', href: `/network/${slug}` as Route },
    { label: 'Vetra Beta Launch', href: `/network/${slug}/workstream/vetra-beta-launch` as Route },
    { label: 'Initiative Proposal', href: `/network/${slug}/project-details` as Route },
    {
      label: 'PRJ-1 - Front-end Development',
      href: `/network/${slug}/project-details/PRJ-1 - Front-end Development` as Route,
    },
  ]
  return (
    <main>
      <PageBreadcrumbContainer>
        <Breadcrumb items={items} />
      </PageBreadcrumbContainer>

      <PageContent className="gap-6" variant="with-breadcrumb">
        <Card className="gap-0 p-0">
          <div className="flex p-4">Content here</div>
        </Card>
      </PageContent>
    </main>
  )
}
