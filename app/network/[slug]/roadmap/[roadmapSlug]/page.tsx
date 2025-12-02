import { notFound } from 'next/navigation'
import { RoadmapDetailsContent } from '@/modules/roadmap/components/roadmap-details-content'
import { getRoadmapDetailsData } from '@/modules/roadmap/services/roadmaps'
import { Breadcrumb, PageBreadcrumbContainer } from '@/modules/shared/components/breadcrumb'
import type { BreadcrumbItemNavigation } from '@/modules/shared/components/breadcrumb/types'
import { PageContent } from '@/modules/shared/components/page-containers'

interface RoadmapPageProps {
  params: Promise<{ slug: string; roadmapSlug: string }>
}

export default async function RoadmapPage({ params }: RoadmapPageProps) {
  const { slug: networkSlug, roadmapSlug } = await params
  const { roadmap, deliverables, contributors, projects } = await getRoadmapDetailsData(
    networkSlug,
    roadmapSlug,
  )

  if (!roadmap) {
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

        <RoadmapDetailsContent
          roadmap={roadmap}
          deliverables={deliverables}
          contributors={contributors}
          projects={projects}
        />
      </PageContent>
    </main>
  )
}
