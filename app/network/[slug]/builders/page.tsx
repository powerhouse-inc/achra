import Link from 'next/link'
import { PageContent } from '@/modules/shared/components/page-containers'
import { Button } from '@/modules/shared/components/ui/button'

export default function BuildersPage() {
  return (
    <PageContent>
      <div className="container flex h-screen flex-col items-center justify-center gap-4">
        <h1 className="m-0 text-lg font-bold text-gray-900 md:text-xl md:leading-6 xl:text-2xl">
          Builders
        </h1>

        <Button>
          <Link href="/network/powerhouse/builders/builder-1">Go to builder profile</Link>
        </Button>
      </div>
    </PageContent>
  )
}
