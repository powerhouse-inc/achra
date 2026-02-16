import { notFound } from 'next/navigation'
import { HeaderTitleOperatorProfile } from '@/modules/operator-profile/components/header-title-operator-profile'
import { OperationalMetric } from '@/modules/operator-profile/components/operational-metric'
import { getOperatorProfile } from '@/modules/operator-profile/services/operator-profile-service'
import EmptyStateService from '@/modules/services/components/empty-state-service/empty-state-service'
import ServicesList from '@/modules/services/components/services-list/services-list'
import { getServices } from '@/modules/services/services/services-service'
import { Markdown } from '@/modules/shared/components/markdown'
import { PageContent } from '@/modules/shared/components/page-containers'

interface OperatorTeamProfilePageProps {
  params: Promise<{ operatorSlug: string }>
}

export default async function OperatorTeamProfilePage({ params }: OperatorTeamProfilePageProps) {
  const { operatorSlug } = await params

  const operatorProfile = await getOperatorProfile(operatorSlug)

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
              title={
                operatorProfile.operationalHubMember.name ??
                operatorProfile.name ??
                'Unknown Operator'
              }
              skills={operatorProfile.skills}
            />

            {operatorProfile.description && (
              <p className="ml-16 text-sm/5.5 font-normal">{operatorProfile.description}</p>
            )}
          </div>

          <div className="flex w-full flex-col gap-2 sm:flex-row sm:gap-2 lg:w-86 lg:flex-col xl:w-108">
            {/* TODO: add value once available in the API, value will have format "JUL 2022" */}
            <OperationalMetric label="Active Since" value="-" />
            {/* TODO: add value once available in the API, value will have format "3 month" */}
            <OperationalMetric label="Min Engagement" value="-" />
            {/* TODO: add value once available in the API, value will have format "12 FTEs" */}
            <OperationalMetric label="Team Size" value="-" />
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
