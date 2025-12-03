import { Suspense } from 'react'
import type {
  ScopeOfWork_Deliverable,
  ScopeOfWork_DeliverableSetStatus,
  ScopeOfWork_Project,
} from '@/modules/__generated__/graphql/switchboard-generated'
import {
  ButtonTriggerKeyResult,
  MetricCard,
  MetricCardSkeleton,
  ProgressCard,
  TotalCostField,
} from '@/modules/project/components'
import { AvatarTitleSkeleton } from '@/modules/project/components/avatar-title/avatar-title-skeleton'
import { AvatarTitleProjectDetails } from '@/modules/project/components/avatar-title/project-details-avatar-title'
import { getProgressPercentage } from '@/modules/roadmap/lib/type-helpers'
import { ConnectLink } from '@/modules/shared/components/connect-link'
import { Card, CardContent, CardFooter, CardHeader } from '@/modules/shared/components/ui/card'
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

  const allKeyResults = deliverables.flatMap((d) => d.keyResults)

  const totalKeyResults = allKeyResults.length

  const completedKeyResults = allKeyResults.filter((kr) => kr.link && kr.link.trim() !== '').length

  return (
    <Card className="bg-background gap-0 border-none p-0 sm:mt-2.25 md:-mt-2.75">
      <CardHeader className="flex flex-col gap-4 px-4 pt-3 pb-4 lg:flex-row [&]:grid-cols-none!">
        <div className="flex w-full shrink grow-2 flex-col gap-1 sm:basis-[62.3%] sm:justify-between">
          <div className="flex w-full items-start justify-between gap-2 sm:gap-4">
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <div className="flex w-full items-center gap-1 sm:items-center sm:gap-2">
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
            <div className="text-primary-foreground hidden shrink-0 sm:flex sm:justify-end md:ml-4">
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

          <div className="text-primary-foreground mt-1 block w-full sm:mt-0 sm:hidden">
            <ConnectLink
              href="https://connect.achra.network"
              action="edit"
              driveName="Sky Network Admin"
              className="w-full [&>div]:w-full"
            />
          </div>
        </div>

        <div className="flex w-full shrink grow flex-col gap-2 sm:gap-2 lg:basis-[35%] lg:flex-col">
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
                  <span>{completedKeyResults}</span>
                  <span className="text-foreground/50"> / {totalKeyResults}</span>
                </>
              }
              action={<ButtonTriggerKeyResult deliverables={deliverables} />}
            />
          </Suspense>
        </div>
      </CardHeader>

      <CardContent className="bg-accent flex flex-col gap-2 border-t px-2 pt-2 pb-3 sm:p-4">
        <p className="text-base/6 font-semibold">Deliverables</p>
        {/* TODO: Add deliverables card  */}
        <div className="flex flex-col gap-2">
          <DeliverablesEmpty />
        </div>
      </CardContent>

      <CardFooter className="flex w-full flex-col gap-2 self-end px-4 pt-4 pb-3 sm:pb-4">
        <TotalCostField label="Total Budget" value={budget ?? 0} />
      </CardFooter>
    </Card>
  )
}
