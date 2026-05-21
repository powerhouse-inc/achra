import { GetStartedFlow } from '@/modules/onboarding/components/get-started-flow'
import { PageContent } from '@/modules/shared/components/page-containers'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Get started',
}

export default function GetStartedPage() {
  return (
    <PageContent>
      <div className="mx-auto w-full max-w-3xl">
        <GetStartedFlow />
      </div>
    </PageContent>
  )
}
