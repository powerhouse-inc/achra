import { notFound } from 'next/navigation'
import BuilderProfile from '@/modules/builder-profile/components/builder-profile/builder-profile'
import { getBuilderProfile } from '@/modules/builder-profile/services/builder-profile'
import { PageContent } from '@/modules/shared/components/page-containers'

interface BuildersProfilePageProps {
  params: Promise<{ builderSlug: string }>
}

export default async function BuildersProfilePage({ params }: BuildersProfilePageProps) {
  const { builderSlug } = await params

  const builder = await getBuilderProfile({
    slug: builderSlug,
  })

  if (!builder) {
    notFound()
  }

  return (
    <PageContent className="mt-3 sm:mt-4">
      <BuilderProfile builder={builder} />
    </PageContent>
  )
}
