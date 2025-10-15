import { Breadcrumb, PageBreadcrumbContainer } from '@/modules/shared/components/breadcrumb'
import { PageContent } from '@/modules/shared/components/page-containers'
import { Card } from '@/modules/shared/components/ui/card'

import type { Route } from 'next'

interface RequesForProposalPageProps {
  params: Promise<{ slug: string }>
}

export default async function RequesForProposalPage({ params }: RequesForProposalPageProps) {
  const { slug } = await params

  const items = [
    { label: 'Allocation System v1', href: '/networks/allocation-system-v1' as Route },
    { label: 'Powerhouse', href: `/network/${slug}` as Route },
    { label: 'RPF', href: `/network/${slug}/rpf` as Route },
  ]

  return (
    <main>
      <PageBreadcrumbContainer>
        <Breadcrumb items={items} />
      </PageBreadcrumbContainer>

      <PageContent className="gap-6" variant="with-breadcrumb">
        <Card className="gap-0 p-0">
          <div className="flex flex-col gap-4 p-2 sm:gap-6 sm:p-3 sm:pb-2 md:p-4">Content</div>
        </Card>
      </PageContent>
    </main>
  )
}
