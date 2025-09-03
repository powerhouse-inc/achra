import Link from 'next/link'
import { DetailsSection } from '@/modules/roadmap/components/details-section'
import { OverviewSection } from '@/modules/roadmap/components/overview-section'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/modules/shared/components/ui/breadcrumb'

export default function RoadmapPage() {
  return (
    <main>
      <div className="bg-background fixed top-[calc(var(--spacing)*1.5+92px)] z-50 w-full border-b py-3">
        <Breadcrumb className="container mx-auto px-4">
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
              <BreadcrumbPage>Roadmap</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="container mx-auto mt-18 mb-8 px-4">
        <div className="flex flex-col">
          <h1 className="m-0 text-lg font-bold text-gray-900 md:text-xl md:leading-6 xl:text-2xl">
            Powerhouse Roadmaps
          </h1>
        </div>

        <div className="mt-16">
          <OverviewSection />
          <DetailsSection />
        </div>
      </div>
    </main>
  )
}
