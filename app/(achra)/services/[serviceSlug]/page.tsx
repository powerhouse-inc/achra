import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { PageContent } from '@/modules/shared/components/page-containers'
import { Button } from '@/modules/shared/components/ui/button'
import type { Route } from 'next'

// TODO: Remove this page and replace it with the operator team profile page
export default function ServiceListOperatorPage() {
  return (
    <PageContent className="gap-6" variant="with-breadcrumb">
      <h1 className="text-foreground m-0 text-lg font-bold md:text-xl md:leading-6 xl:text-2xl xl:leading-7">
        Services
      </h1>
      <div className="flex h-9 w-full justify-center py-32">
        <Button asChild variant="default">
          <Link href={'/services/sno-embryonic-hub/operator-team-profile' as Route}>
            SNO Embryonic Hub
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </PageContent>
  )
}
