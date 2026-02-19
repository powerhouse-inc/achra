import { notFound } from 'next/navigation'
import { HeaderTitleOperatorProfile } from '@/modules/operator-profile/components/header-title-operator-profile'
import { OperationalMetric } from '@/modules/operator-profile/components/operational-metric'
import { getOperatorProfile } from '@/modules/operator-profile/services/operator-profile-service'
import EmptyStateService from '@/modules/services/components/empty-state-service/empty-state-service'
import ServicesList from '@/modules/services/components/services-list/services-list'
import { getServices } from '@/modules/services/services/services-service'
import { BuildersStatusChip } from '@/modules/shared/components/chips/builders-status-chip'
import { Markdown } from '@/modules/shared/components/markdown'
import { PageContent } from '@/modules/shared/components/page-containers'
import { formatMonthYear } from '@/modules/shared/lib/date'

interface OperatorTeamProfilePageProps {
  params: Promise<{ operatorSlug: string }>
}

export default async function OperatorTeamProfilePage({ params }: OperatorTeamProfilePageProps) {
  const { operatorSlug } = await params

  const operatorProfile = await getOperatorProfile(operatorSlug)

  console.log('operatorSlug', operatorSlug)
  console.log('operatorProfile', operatorProfile)

  if (!operatorProfile) {
    notFound()
  }

  const services = await getServices(operatorProfile.id)

  return (
    <PageContent className="mt-6 gap-6">
      <div className="flex flex-col gap-4">
        <div className="flex w-full flex-col gap-4 lg:flex-row">
          <div className="flex flex-col gap-2 lg:flex-2">
            <HeaderTitleOperatorProfile
              code={operatorProfile.code ?? undefined}
              name={operatorProfile.name ?? 'Unknown Operator'}
              skills={operatorProfile.skills}
              logo={operatorProfile.icon}
            />

            {operatorProfile.description && (
              <p className="ml-16 text-sm/5.5 font-normal">{operatorProfile.description}</p>
            )}
          </div>

          <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-2 lg:w-86 lg:grid-cols-1 xl:w-108">
            <OperationalMetric
              label="Last Active"
              value={formatMonthYear(operatorProfile.lastModified)}
            />
            <OperationalMetric
              className="h-10"
              label="Status"
              value={
                operatorProfile.status ? (
                  <BuildersStatusChip status={operatorProfile.status} />
                ) : (
                  '-'
                )
              }
            />
            <OperationalMetric
              label="OpHub Member"
              value={operatorProfile.operationalHubMember.name ?? '-'}
            />
            <OperationalMetric
              label="Team Size"
              value={`${operatorProfile.contributors.length} contributors`}
            />
          </div>
        </div>

        {operatorProfile.about && (
          <div className="flex flex-col gap-2 lg:flex-1">
            <h3 className="text-lg/[120%] font-bold">Who we are</h3>
            <Markdown>{operatorProfile.about}</Markdown>
          </div>
        )}

        <div className="flex flex-col gap-4 lg:flex-1">
          {services.length > 0 ? (
            <>
              <h3 className="text-lg leading-[120%] font-bold">What we offer</h3>
              <div className="flex w-full flex-col gap-6">
                <ServicesList services={services} />
              </div>
            </>
          ) : (
            <EmptyStateService
              title="No services listed yet"
              description="This operator has not listed any service offerings yet. Check back later for updates."
            />
          )}
        </div>
      </div>
    </PageContent>
  )
}
