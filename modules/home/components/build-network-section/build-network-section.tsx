'use client'

import Link from 'next/link'

import { Button } from '@/shared/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs'
import { cn } from '@/shared/lib/utils'
import { AchraTabIsotype } from './achra-tab-isotype'
import { OrgTabCollage } from './org-tab-collage'
import { TabCompositePanel } from './tab-composite-panel'

const triggerClassName = cn(
  'group flex w-full flex-col items-stretch gap-0 rounded-none border-0 border-b border-[rgb(229,229,229)] bg-transparent p-0 py-6 text-left shadow-none',
  'focus-visible:ring-[3px] focus-visible:ring-[rgb(5,130,255)]/35 focus-visible:outline-none',
  'data-[state=active]:rounded-xl data-[state=active]:border-b-transparent data-[state=active]:bg-[rgb(240,240,240)] data-[state=active]:px-4 data-[state=active]:py-5 data-[state=active]:-mx-1 data-[state=active]:shadow-none',
  'data-[state=inactive]:cursor-pointer data-[state=inactive]:opacity-100',
)

const inactiveTitleClass =
  'text-[15px] font-medium text-[rgb(156,156,156)] group-data-[state=active]:font-semibold group-data-[state=active]:text-[rgb(10,10,10)]'

const buildersActiveTitleClass =
  'text-[15px] font-medium text-[rgb(156,156,156)] group-data-[state=active]:font-semibold group-data-[state=active]:text-[rgb(122,59,255)]'

const blueCtaClass =
  'mt-5 h-10 rounded-lg border-0 bg-[rgb(5,130,255)] px-5 text-sm font-medium text-white hover:bg-[rgb(5,130,255)]/90'

const pinkCtaClass =
  'mt-5 h-10 rounded-lg border-0 bg-[rgb(221,80,216)] px-5 text-sm font-medium text-white hover:bg-[rgb(221,80,216)]/90'

function BuildNetworkSection() {
  return (
    <section
      className="w-full bg-[rgb(250,249,247)] px-6 py-16 sm:px-10 sm:py-20 lg:py-24"
      aria-labelledby="build-network-heading"
    >
      <div className="mx-auto max-w-[1200px]">
        <header className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
          <h2
            id="build-network-heading"
            className="text-3xl font-semibold tracking-tight text-balance text-[rgb(10,10,10)] sm:text-4xl"
          >
            Build your Network with Achra
          </h2>
          <p className="mt-4 text-base leading-relaxed text-pretty text-[rgb(117,117,117)]">
            Powering the next generation of networked organizations.
          </p>
        </header>

        <Tabs
          defaultValue="organizations"
          orientation="vertical"
          className="grid w-full grid-cols-1 gap-10 lg:grid-cols-[minmax(0,min(100%,380px))_minmax(0,1fr)] lg:items-start lg:gap-x-14 lg:gap-y-0"
        >
          <TabsList className="h-auto w-full flex-col gap-0 rounded-none bg-transparent p-0 lg:col-start-1 lg:row-start-1">
            <TabsTrigger value="organizations" className={triggerClassName}>
              <div className="flex w-full items-start gap-3">
                <span className="shrink-0 transition-opacity group-data-[state=inactive]:opacity-50">
                  <AchraTabIsotype variant="organizations" />
                </span>
                <span className={cn('pt-0.5', inactiveTitleClass)}>For Organizations</span>
              </div>
              <div className="mt-4 w-full pl-10 group-data-[state=inactive]:hidden">
                <p className="text-sm leading-relaxed text-[rgb(117,117,117)]">
                  Set clear objectives for your network organization. Receive structured proposals
                  from the best contributor teams to deliver on your roadmap.
                </p>
                <Button asChild size="lg" className={blueCtaClass}>
                  <Link href="/networks">View networks</Link>
                </Button>
              </div>
            </TabsTrigger>

            <TabsTrigger value="builders" className={triggerClassName}>
              <div className="flex w-full items-start gap-3">
                <span className="shrink-0 transition-opacity group-data-[state=inactive]:opacity-50">
                  <AchraTabIsotype variant="builders" />
                </span>
                <span className={cn('pt-0.5', buildersActiveTitleClass)}>For Builders</span>
              </div>
              <div className="mt-4 w-full pl-10 group-data-[state=inactive]:hidden">
                <p className="text-sm leading-relaxed text-[rgb(117,117,117)]">
                  Discover active projects and roadmaps from leading network organizations. Focus on
                  building with built-in operational support.
                </p>
                <Button asChild size="lg" className={blueCtaClass}>
                  <Link href="/workstreams">Browse workstreams</Link>
                </Button>
              </div>
            </TabsTrigger>

            <TabsTrigger value="operators" className={triggerClassName}>
              <div className="flex w-full items-start gap-3">
                <span className="shrink-0 transition-opacity group-data-[state=inactive]:opacity-50">
                  <AchraTabIsotype variant="operators" />
                </span>
                <span className={cn('pt-0.5', inactiveTitleClass)}>For Operators</span>
              </div>
              <div className="mt-4 w-full pl-10 group-data-[state=inactive]:hidden">
                <p className="text-sm leading-relaxed text-[rgb(117,117,117)]">
                  Provide essential services for teams from legal and accounting to governance.
                  Partner with teams building across the ecosystem.
                </p>
                <Button asChild size="lg" className={pinkCtaClass}>
                  <Link href="/services">Service catalog</Link>
                </Button>
              </div>
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="organizations"
            forceMount
            className="mt-0 hidden outline-none data-[state=active]:block lg:col-start-2 lg:row-start-1"
          >
            <OrgTabCollage priority />
          </TabsContent>

          <TabsContent
            value="builders"
            forceMount
            className="mt-0 hidden outline-none data-[state=active]:block lg:col-start-2 lg:row-start-1"
          >
            <TabCompositePanel
              src="/home/build-network/builders/builders-scene.png"
              alt="Builder profile, project draft, and revenue chart mockups layered on the Achra workspace"
              width={664}
              height={384}
            />
          </TabsContent>

          <TabsContent
            value="operators"
            forceMount
            className="mt-0 hidden outline-none data-[state=active]:block lg:col-start-2 lg:row-start-1"
          >
            <TabCompositePanel
              src="/home/build-network/operators-panel.png"
              alt="Achra services and operational hub preview for operators"
              width={1142}
              height={830}
            />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}

export { BuildNetworkSection }
