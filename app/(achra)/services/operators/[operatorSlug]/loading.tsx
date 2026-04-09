import { BuilderProfileSkeleton } from '@/modules/builder-profile/components/builder-profile/builder-profile-skeleton'
import { BuilderProfileHeaderSkeleton } from '@/modules/builder-profile/components/builder-profile-header'
import { PageContent } from '@/modules/shared/components/page-containers'

export default function OperatorProfileLoading() {
  return (
    <>
      <BuilderProfileHeaderSkeleton isOperatorProfile />
      <PageContent className="mt-3 sm:mt-4">
        <BuilderProfileSkeleton isOperatorProfile />
      </PageContent>
    </>
  )
}
