import { PageContent } from '@/modules/shared/components/page-containers'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Get started',
}

export default function GetStartedPage() {
  return (
    <PageContent>
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight">Welcome to Achra</h1>
        <p className="text-muted-foreground text-base">
          Let&apos;s get you set up. Tell us how you&apos;d like to use Achra.
        </p>
      </div>
    </PageContent>
  )
}
