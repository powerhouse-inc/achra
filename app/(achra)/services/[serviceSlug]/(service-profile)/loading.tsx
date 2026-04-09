import { ServiceProfileSkeleton } from '@/modules/service-profile/components/service-profile'
import { PageContent } from '@/modules/shared/components/page-containers'

export default function ServiceProfileLoading() {
  return (
    <PageContent className="mt-6 gap-6">
      <ServiceProfileSkeleton />
    </PageContent>
  )
}
