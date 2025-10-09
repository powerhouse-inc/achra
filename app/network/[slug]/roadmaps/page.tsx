import { RoadmapLinks } from '@/modules/roadmap/components/roadmap-links'
import BreadcrumbNavigation from '@/modules/shared/components/breadcrumb/breadcrumb-navigation'
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
      <div className="bg-background border-accent fixed top-18 z-50 w-full border-b py-3 md:top-22">
        <BreadcrumbNavigation items={items} className="container" />
      </div>

      <div className="container mt-18 mb-8 flex flex-col gap-6">
        <div className="flex flex-col">
          <h1 className="text-foreground m-0 text-lg font-bold md:text-xl md:leading-6 xl:text-2xl xl:leading-7">
            Powerhouse All Roadmaps
          </h1>

          <div className="flex h-9 w-full justify-center py-32">
            <RoadmapLinks slug={slug} />
          </div>
        </div>
      </div>
    </main>
  )
}
