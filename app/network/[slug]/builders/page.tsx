import { Suspense } from 'react'
import { BuildersHeader } from '@/modules/builders/components/builders-header/builders-header'
import { Breadcrumb, PageBreadcrumbContainer } from '@/modules/shared/components/breadcrumb'
import { ErrorBoundaryWithPresets } from '@/modules/shared/components/error-state'
import { PageBackground, PageContent } from '@/modules/shared/components/page-containers'
import type { Route } from 'next'

interface BuildersPageProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<{
    search: string
    scopes: string[]
    actorRoles: string[]
  }>
}

const items = [
  { label: 'Networks', href: '/networks' as Route },
  { label: 'Powerhouse', href: '/network/powerhouse' as Route },
  { label: 'Builders', href: '/network/powerhouse/builders' as Route },
]

export default async function BuildersPage({ searchParams }: BuildersPageProps) {
  const searchParamsString = JSON.stringify(await searchParams)

  return (
    <PageBackground>
      <PageBreadcrumbContainer>
        <Breadcrumb items={items} />
      </PageBreadcrumbContainer>
      <PageContent variant="with-breadcrumb" className="gap-6">
        <ErrorBoundaryWithPresets>
          {/* TODO: Ask the designer for the skeleton of these components */}
          <Suspense fallback="Loading..." key={searchParamsString}>
            <BuildersHeader />
          </Suspense>
        </ErrorBoundaryWithPresets>
      </PageContent>
    </PageBackground>
  )
}
