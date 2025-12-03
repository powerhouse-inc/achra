import { Suspense } from 'react'
import type {
  ScopeOfWork_Deliverable,
  ScopeOfWork_DeliverableSetStatus,
  ScopeOfWork_Project,
} from '@/modules/__generated__/graphql/switchboard-generated'
import {
  ButtonTriggerKeyResult,
  DeliverablesCard,
  MetricCard,
  MetricCardSkeleton,
  ProgressCard,
  TotalCostField,
} from '@/modules/project/components'
import { AvatarTitleSkeleton } from '@/modules/project/components/avatar-title/avatar-title-skeleton'
import { AvatarTitleProjectDetails } from '@/modules/project/components/avatar-title/project-details-avatar-title'
import { getProgressPercentage } from '@/modules/roadmap/lib/type-helpers'
import { ConnectLink } from '@/modules/shared/components/connect-link'
import { Card } from '@/modules/shared/components/ui/card'
import { DeliverablesEmpty } from '../deliverables-empty/deliverables-empty'

interface ProjectCardItemProps {
  project: ScopeOfWork_Project
  deliverables: ScopeOfWork_Deliverable[]
  builderName: string
  builderId: string
  params: Promise<{ slug: string; workstreamSlug: string }>
}

export function ProjectCardItem({
  project,
  deliverables,
  builderName,
  builderId,
  params,
}: ProjectCardItemProps) {
  const { title, code, abstract, imageUrl, budget = 0, currency, expenditure, scope } = project
  const status = scope?.status
  const capex = expenditure?.cap

  const projectProgress = getProgressPercentage(scope?.progress)

  return (
    <Card className="bg-background gap-0 border-none p-0 sm:mt-2.25 md:-mt-2.75">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 px-4 pt-3 pb-4 lg:flex-row">
          <div className="flex shrink grow-2 basis-[62.3%] flex-col gap-1 sm:gap-2">
            <div className="flex w-full flex-row items-start justify-between">
              <div className="flex w-full flex-col gap-1">
                <div className="flex w-full flex-row items-center gap-1 sm:items-center sm:gap-2">
                  <div className="max-w-100 truncate text-base/6 font-bold sm:text-lg sm:leading-[120%] sm:font-bold md:text-xl md:leading-[120%] xl:text-2xl xl:leading-[120%] xl:font-bold">
                    {title}
                  </div>
                  <div className="text-foreground/50 items-center justify-between text-xs/4.5 font-medium uppercase sm:flex sm:self-end md:text-sm/5.5 md:font-semibold xl:text-base/6 xl:font-semibold">
                    {code}
                  </div>
                </div>

                <div className="hidden sm:block">
                  <Suspense fallback={<AvatarTitleSkeleton />}>
                    <AvatarTitleProjectDetails
                      src={imageUrl}
                      title={builderName}
                      params={params}
                      builderId={builderId}
                    />
                  </Suspense>
                </div>
              </div>
              <div className="text-primary-foreground hidden w-[calc(100%-48px)] max-w-64 sm:flex sm:justify-end">
                <ConnectLink
                  href="https://connect.achra.network"
                  action="edit"
                  driveName="Sky Network Admin"
                />
              </div>
            </div>

            <div className="block sm:hidden">
              <Suspense fallback={<AvatarTitleSkeleton />}>
                <AvatarTitleProjectDetails
                  src={imageUrl}
                  title={builderName}
                  params={params}
                  builderId={builderId}
                />
              </Suspense>
            </div>

            <div className="mt-1 flex w-full sm:mt-0">{abstract}</div>

            <div className="text-primary-foreground mt-1 block sm:mt-0 sm:hidden">
              <ConnectLink
                href="https://connect.achra.network"
                action="edit"
                driveName="Sky Network Admin"
              />
            </div>
          </div>

          <div className="flex shrink grow flex-col gap-2 sm:w-full sm:flex-row sm:gap-2 lg:basis-[35%] lg:flex-col">
            <MetricCard label="Budget" value={capex} unit={currency ?? undefined} footer="CAPEX" />
            <ProgressCard
              progress={projectProgress}
              status={status as ScopeOfWork_DeliverableSetStatus}
            />

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
        {deliverables.length > 0 ? (
          <div className="flex flex-col gap-2">
            <DeliverablesCard deliverables={deliverables} />
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <DeliverablesEmpty />
          </div>
        )}
      </div>

      <div className="flex w-full flex-col gap-2 self-end px-4 pt-4 pb-3 sm:pb-4">
        <TotalCostField label="Total Budget" value={budget ?? 0} />
      </div>
    </Card>
  )
}
