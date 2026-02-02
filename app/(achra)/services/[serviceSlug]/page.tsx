import ServiceProfile from '@/modules/services/components/service-profile/service-profile'
import { PageBackground, PageContent } from '@/modules/shared/components/page-containers'

export default function ServiceProfilePage() {
  return (
    <PageBackground>
      <PageContent className="gap-6">
        <ServiceProfile />
      </PageContent>
    </PageBackground>
  )
}
