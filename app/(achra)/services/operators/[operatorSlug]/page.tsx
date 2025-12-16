import { OperatorProfileSection } from '@/modules/operator-profile/operator-profile-section'
import { PageContent } from '@/modules/shared/components/page-containers'

export default function OperatorTeamProfilePage() {
  return (
    <PageContent className="mt-6 gap-6">
      <OperatorProfileSection />
    </PageContent>
  )
}
