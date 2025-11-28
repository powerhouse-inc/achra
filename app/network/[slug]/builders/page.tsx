import { Suspense } from 'react'
import { Builders } from '@/modules/builders/components/builders/builders'
import BuilderFilters from '@/modules/builders/components/builders-filters'
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

export default async function BuildersPage({ params, searchParams }: BuildersPageProps) {
  const searchParamsString = JSON.stringify(await searchParams)

  const { slug } = await params

  const items = [
    { label: slug.charAt(0).toUpperCase() + slug.slice(1), href: `/network/${slug}` as Route },
    { label: 'Builders', href: '/network/powerhouse/builders' as Route },
  ]

  return (
    <PageBackground>
      <PageBreadcrumbContainer>
        <Breadcrumb items={items} />
      </PageBreadcrumbContainer>
      <PageContent variant="with-breadcrumb" className="gap-6">
        {/* TODO: Ask the designer for the skeleton of these components */}
        <BuildersHeader />
        <BuilderFilters />
        <ErrorBoundaryWithPresets>
          <Suspense fallback="Loading..." key={searchParamsString}>
            <Builders />
          </Suspense>
        </ErrorBoundaryWithPresets>
      </PageContent>
    </PageBackground>
  )
}
