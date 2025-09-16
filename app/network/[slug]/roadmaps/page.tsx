import Link from 'next/link'
import { RoadmapLinks } from '@/modules/roadmap/components/roadmap-links'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/modules/shared/components/ui/breadcrumb'

interface RoadmapPageProps {
  params: Promise<{ slug: string }>
}

export default async function RoadmapPage({ params }: RoadmapPageProps) {
  const { slug } = await params

  return (
    <main>
      <div className="bg-background fixed top-18 z-50 w-full border-b py-3 md:top-21">
        <Breadcrumb className="container">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/networks">Networks</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/network/powerhouse">Powerhouse</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Roadmaps</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
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
