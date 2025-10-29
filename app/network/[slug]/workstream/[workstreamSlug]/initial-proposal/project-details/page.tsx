import { ScopeOfWork_DeliverableSetStatus } from '@/modules/__generated__/graphql/switchboard-generated'
import { AvatarTitle, MetricCard, ProgressCard, TotalCostField } from '@/modules/project/components'

import { ButtonTriggerKeyResult } from '@/modules/project/components/metric-card/button-trigger-key-result'
import { Breadcrumb, PageBreadcrumbContainer } from '@/modules/shared/components/breadcrumb'

import { ConnectLink } from '@/modules/shared/components/connect-link'
import { PageContent } from '@/modules/shared/components/page-containers'

import { Card } from '@/modules/shared/components/ui/card'
import type { Route } from 'next'

interface ProjectDetailsPageProps {
  params: Promise<{ slug: string; workstreamSlug: string }>
}

export default async function ProjectDetailsPage({ params }: ProjectDetailsPageProps) {
  const { slug, workstreamSlug } = await params
  const totalCost = 1442.5
  const totalBudget = 100
  const items = [
    { label: 'Powerhouse', href: `/network/${slug}` as Route },
    { label: 'Vetra Beta Launch', href: `/network/${slug}/workstream/${workstreamSlug}` as Route },
    {
      label: 'Initiative Proposal',
      href: `/network/${slug}/workstream/${workstreamSlug}/initial-proposal` as Route,
    },
    {
      label: 'PRJ-1 - Front-end Development',
      href: `/network/${slug}/workstream/${workstreamSlug}/initial-proposal/project-details` as Route,
    },
  ]
  return (
    <main>
      <PageBreadcrumbContainer>
        <Breadcrumb items={items} />
      </PageBreadcrumbContainer>

      <PageContent className="gap-6" variant="with-breadcrumb">
        <Card className="gap-0 p-0">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 px-4 pt-3 pb-4 lg:flex-row">
              <div className="flex shrink grow-2 basis-[62.3%] flex-col gap-1 sm:gap-2">
                <div className="flex w-full flex-row items-start justify-between">
                  <div className="flex w-full flex-col gap-1">
                    <div className="flex w-full flex-row items-center gap-1 sm:items-center sm:gap-2">
                      <div className="max-w-100 truncate text-base/6 font-bold sm:text-lg sm:leading-[120%] sm:font-bold md:text-xl md:leading-[120%] xl:text-2xl xl:leading-[120%] xl:font-bold">
                        Front-end Development
                      </div>
                      <div className="text-foreground/50 items-center justify-between text-xs/4.5 font-medium uppercase sm:flex sm:self-end md:text-sm/5.5 md:font-semibold xl:text-base/6 xl:font-semibold">
                        PRJ-1
                      </div>
                    </div>
                    <div className="hidden sm:block">
                      <AvatarTitle
                        avatar="https://makerdao-ses.github.io/ecosystem-dashboard/ecosystem-actors/POWERHOUSE/POWERHOUSE_logo.png"
                        title="Powerhouse OH"
                        href={`/network/${slug}/builders` as Route}
                      />
                    </div>
                  </div>
                  <div className="text-primary-foreground hidden w-[calc(100%-48px)] max-w-64 sm:block">
                    <ConnectLink />
                  </div>
                </div>
                <div className="block sm:hidden">
                  <AvatarTitle
                    avatar="https://makerdao-ses.github.io/ecosystem-dashboard/ecosystem-actors/POWERHOUSE/POWERHOUSE_logo.png"
                    title="Powerhouse OH"
                    href={`/network/${slug}/builders` as Route}
                  />
                </div>

                <div className="mt-1 flex w-full sm:mt-0">
                  Lorem ipsum dolor sit amet consectetur. Quisque et venenatis hac vel est aenean
                  dui. Enim eu venenatis tristique aliquet tincidunt lacus. Donec etiam nunc mi
                  lacus libero purus. Sed faucibus fringilla aliquet ac bibendum lorem sed amet.
                  Convallis.
                </div>
                <div className="text-primary-foreground mt-1 block sm:mt-0 sm:hidden">
                  <ConnectLink />
                </div>
              </div>

              <div className="flex shrink grow flex-col gap-2 sm:w-full sm:flex-row sm:gap-2 lg:basis-[35%] lg:flex-col">
                <MetricCard label="Budget" value="100K" unit="USD" footer="CAPEX" />
                <ProgressCard progress={50} status={ScopeOfWork_DeliverableSetStatus.Todo} />
                <MetricCard
                  label="Key Results"
                  value={
                    <>
                      <span>5</span>
                      <span className="text-foreground/50"> / 12</span>
                    </>
                  }
                  action={<ButtonTriggerKeyResult />}
                />
              </div>
            </div>
          </div>
          <div className="bg-accent flex h-32 flex-col gap-4 border-t p-4 pb-6">
            Deliverables coming soon
          </div>
          <div className="flex w-full flex-col gap-2 self-end px-4 pt-4 pb-3 sm:pb-4">
            <TotalCostField label="Total Cost" value={`${totalCost} USD`} />
            <TotalCostField label="Total Budget" value={`${totalBudget} USD`} />
          </div>
        </Card>
      </PageContent>
    </main>
  )
}
