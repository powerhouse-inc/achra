import { RoadmapLinks } from '@/modules/roadmap/components/roadmap-links'
import {
  Breadcrumb,
  PageBreadcrumbContainer,
} from '@/modules/shared/components/breadcrumb/breadcrumb'
import { PageContent } from '@/modules/shared/components/page-containers'
import type { Route } from 'next'

interface RoadmapPageProps {
  params: Promise<{ slug: string }>
}

const items = [
  { label: 'Networks', href: '/networks' as Route },
  { label: 'Powerhouse', href: '/network/powerhouse' as Route },
  { label: 'Roadmaps', href: '/network/powerhouse/roadmaps' as Route },
]
export default async function RoadmapPage({ params }: RoadmapPageProps) {
  const { slug } = await params

  return (
    <main>
      <PageBreadcrumbContainer>
        <Breadcrumb items={items} />
      </PageBreadcrumbContainer>

      <PageContent className="gap-6" variant="with-breadcrumb">
        <div className="flex flex-col">
          <h1 className="text-foreground m-0 text-lg font-bold md:text-xl md:leading-6 xl:text-2xl xl:leading-7">
            Powerhouse All Roadmaps
          </h1>

          <div className="flex h-9 w-full justify-center py-32">
            <RoadmapLinks slug={slug} />
          </div>
        </div>
      </PageContent>
    </main>
  )
}
