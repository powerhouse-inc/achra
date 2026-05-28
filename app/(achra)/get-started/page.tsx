import { Suspense } from 'react'
import { GetStartedFlow } from '@/modules/onboarding/components/get-started-flow'
import { PageContent } from '@/modules/shared/components/page-containers'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Get started',
}

/**
 * This page is the entry point for the user on-boarding flow.
 */
export default function GetStartedPage() {
  return (
    <PageContent>
      <Suspense fallback={null}>
        <GetStartedFlow />
      </Suspense>
    </PageContent>
  )
}
