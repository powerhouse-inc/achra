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
              <BreadcrumbPage>Roadmap</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="container mt-18 mb-8 flex flex-col gap-6">
        <div className="flex flex-col">
          <h1 className="text-foreground m-0 text-lg font-bold md:text-xl md:leading-6 xl:text-2xl xl:leading-7">
            Powerhouse Roadmaps
          </h1>
        </div>

        <div className="flex flex-col gap-10">
          <OverviewSection />
          <DetailsSection />
        </div>
      </div>
    </main>
  )
}
