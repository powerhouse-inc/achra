import { Suspense } from 'react'
import { ScopeOfWork_DeliverableSetStatus } from '@/modules/__generated__/graphql/switchboard-generated'
import {
  MetricCard,
  MetricCardSkeleton,
  ProgressCard,
  TotalCostField,
} from '@/modules/project/components'
import { AvatarTitleSkeleton } from '@/modules/project/components/avatar-title/avatar-title-skeleton'
import { AvatarTitleProjectDetails } from '@/modules/project/components/avatar-title/project-details-avatar-title'
import { ProjectDetailsBreadcrumb } from '@/modules/project/components/breadcrumb-project/breadcrumb-project'
import { DeliverablesCard } from '@/modules/project/components/deliverables-card'

import { ButtonTriggerKeyResult } from '@/modules/project/components/metric-card/button-trigger-key-result'
import { mockDeliverables } from '@/modules/project/mock/deliverable'
import { BreadcrumbSkeleton, PageBreadcrumbContainer } from '@/modules/shared/components/breadcrumb'

import { ConnectLink } from '@/modules/shared/components/connect-link'
import { PageContent } from '@/modules/shared/components/page-containers'

import { Card } from '@/modules/shared/components/ui/card'

interface ProjectDetailsPageProps {
  params: Promise<{ slug: string; workstreamSlug: string }>
}

export default function ProjectDetailsPage({ params }: ProjectDetailsPageProps) {
  const totalBudget = 100000

  return (
    <main>
      <PageBreadcrumbContainer>
        <Suspense fallback={<BreadcrumbSkeleton segments={4} />}>
          <ProjectDetailsBreadcrumb params={params} />
        </Suspense>
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
                      <Suspense fallback={<AvatarTitleSkeleton />}>
                        <AvatarTitleProjectDetails
                          src="https://makerdao-ses.github.io/ecosystem-dashboard/ecosystem-actors/POWERHOUSE/POWERHOUSE_logo.png"
                          title="Powerhouse OH"
                          params={params}
                        />
                      </Suspense>
                    </div>
                  </div>
                  <div className="text-primary-foreground hidden w-[calc(100%-48px)] max-w-64 sm:flex sm:justify-end">
                    <ConnectLink />
                  </div>
                </div>
                <div className="block sm:hidden">
                  <Suspense fallback={<AvatarTitleSkeleton />}>
                    <AvatarTitleProjectDetails
                      src="https://makerdao-ses.github.io/ecosystem-dashboard/ecosystem-actors/POWERHOUSE/POWERHOUSE_logo.png"
                      title="Powerhouse OH"
                      params={params}
                    />
                  </Suspense>
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

                <Suspense fallback={<MetricCardSkeleton />}>
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
                </Suspense>
              </div>
            </div>
          </div>
          <div className="bg-accent flex flex-col gap-2 border-t px-2 pt-2 pb-3 sm:p-4">
            <p className="text-base/6 font-semibold">Deliverables</p>
            <div className="flex flex-col gap-2">
              <DeliverablesCard deliverables={mockDeliverables} />
            </div>
          </div>
          <div className="flex w-full flex-col gap-2 self-end px-4 pt-4 pb-3 sm:pb-4">
            <TotalCostField label="Total Budget" value={totalBudget} />
          </div>
        </Card>
      </PageContent>
    </main>
  )
}
