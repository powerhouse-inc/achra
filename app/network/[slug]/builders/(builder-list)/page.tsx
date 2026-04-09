import { Builders } from '@/modules/builders/components/builders/builders'
import BuilderFilters from '@/modules/builders/components/builders-filters'
import { BuildersFiltersProvider } from '@/modules/builders/components/builders-filters/builders-filters-context'
import { BuildersHeader } from '@/modules/builders/components/builders-header/builders-header'
import { getNetworkBySlug } from '@/modules/networks/services/networks-service'
import { Breadcrumb, PageBreadcrumbContainer } from '@/modules/shared/components/breadcrumb'
import { ErrorBoundaryWithPresets } from '@/modules/shared/components/error-state'
import { PageContent } from '@/modules/shared/components/page-containers'
import type { Route } from 'next'

interface BuildersPageProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<{
    search?: string
    skills?: string[]
  }>
}

export default async function BuildersPage({ params, searchParams }: BuildersPageProps) {
  const { slug } = await params

  const networkData = await getNetworkBySlug(slug)

  const networkName = networkData?.name ?? ''

  const items = [
    { label: networkName, href: `/network/${slug}` as Route },
    { label: 'Builders', href: `/network/${slug}/builders` as Route },
  ]

  return (
    <>
      <PageBreadcrumbContainer>
        <Breadcrumb items={items} />
      </PageBreadcrumbContainer>
      <PageContent variant="with-breadcrumb" className="gap-6">
        <BuildersHeader />
        <BuildersFiltersProvider>
          <BuilderFilters />
          <ErrorBoundaryWithPresets>
            <Builders networkSlug={slug} searchParams={searchParams} />
          </ErrorBoundaryWithPresets>
        </BuildersFiltersProvider>
      </PageContent>
    </>
  )
}
