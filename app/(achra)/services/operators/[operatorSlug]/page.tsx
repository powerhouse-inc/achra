import { notFound } from 'next/navigation'
import BuilderProfile from '@/modules/builder-profile/components/builder-profile/builder-profile'
import { BuilderProfileHeader } from '@/modules/builder-profile/components/builder-profile-header/builder-profile-header'
import { getBuilderProfile } from '@/modules/builder-profile/services/builder-profile'
import { OperatorServices } from '@/modules/operator-profile/components/operator-services'
import { getServices } from '@/modules/services/services/services-service'
import { PageContent } from '@/modules/shared/components/page-containers'

interface OperatorTeamProfilePageProps {
  params: Promise<{ operatorSlug: string }>
}

export default async function OperatorTeamProfilePage({ params }: OperatorTeamProfilePageProps) {
  const { operatorSlug } = await params

  const operatorProfile = await getBuilderProfile({ slug: operatorSlug })

  if (!operatorProfile) {
    notFound()
  }

  const services = await getServices(operatorProfile.id)

  return (
    <>
      <BuilderProfileHeader builder={operatorProfile} isOperatorProfile />
      <PageContent className="mt-3 flex flex-col gap-4 sm:mt-4 xl:gap-8">
        <BuilderProfile builder={operatorProfile} isOperatorProfile />
        <OperatorServices services={services} />
      </PageContent>
    </>
  )
}
