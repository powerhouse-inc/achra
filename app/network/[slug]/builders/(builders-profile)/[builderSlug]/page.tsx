import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { PageContent } from '@/modules/shared/components/page-containers'
import { Button } from '@/modules/shared/components/ui/button'
import type { Route } from 'next'

export default function BuildersProfilePage() {
  return (
    <PageContent>
      <h1 className="text-foreground m-0 mb-6 text-lg font-bold md:text-xl md:leading-6 xl:text-2xl">
        Builder profile
      </h1>

      <div className="text-foreground/50 text-sm/4.5 font-medium">
        lorem ipsum dolor sit amet consectetur. Quisque et venenatis hac vel est aenean dui. Enim eu
        venenatis tristique aliquet tincidunt lacus. Donec etiam nunc mi lacus libero purus. Sed
        faucibus fringilla aliquet ac bibendum lorem sed amet. Convallis.
      </div>

      <div className="mt-6 flex flex-col gap-4">
        <Button asChild>
          <Link href={'/network/powerhouse/builders/builder-1/expense-reports' as Route}>
            Expense reports
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
    </PageContent>
  )
}
