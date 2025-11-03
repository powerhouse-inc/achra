'use client'

import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { use } from 'react'
import { useSuspenseScopeOfWorkQuery } from '@/modules/__generated__/graphql/switchboard-generated'
import { Button } from '@/modules/shared/components/ui/button'
import { SCOPE_OF_WORK_DOCUMENT_ID } from '../../lib/constants'

interface RoadmapLinksProps {
  slug: Promise<string>
}

export function RoadmapLinks({ slug: slugPromise }: RoadmapLinksProps) {
  const slug = use(slugPromise)
  const { data } = useSuspenseScopeOfWorkQuery({
    docId: SCOPE_OF_WORK_DOCUMENT_ID,
  })

  return (
    <div className="flex flex-col gap-2">
      {data.ScopeOfWork?.getDocument?.state.roadmaps.map((roadmap) => (
        <Button asChild variant="default" key={roadmap.slug}>
          <Link href={`/network/${slug}/roadmap/${roadmap.slug}`}>
            {roadmap.title}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      ))}
    </div>
  )
}
