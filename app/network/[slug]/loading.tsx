import { PageBackground, PageContent } from '@/modules/shared/components/page-containers'

export default function NetworkPageLoading() {
  return (
    <PageBackground>
      <PageContent className="gap-6">
        <div>Loading...</div>
      </PageContent>
    </PageBackground>
  )
}
