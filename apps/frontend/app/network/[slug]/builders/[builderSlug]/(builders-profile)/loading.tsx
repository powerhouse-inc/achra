import { BuilderProfileSkeleton } from '@/modules/builder-profile/components/builder-profile/builder-profile-skeleton'
import { PageContent } from '@/modules/shared/components/page-containers'

export default function BuilderProfileLoading() {
  return (
    <PageContent className="mt-3 sm:mt-4">
      <BuilderProfileSkeleton />
    </PageContent>
  )
}
