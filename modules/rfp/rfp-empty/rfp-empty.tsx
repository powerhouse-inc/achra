import { ArrowUpRight, Folder } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/modules/shared/components/ui/button'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/modules/shared/components/ui/empty'

export function RfpEmpty() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Folder />
        </EmptyMedia>
        <EmptyTitle>No request for proposal found </EmptyTitle>
        <EmptyDescription>
          You haven&apos;t created any projects yet. Get started by creating your first project.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex gap-2">
          <Button>Create a new request for proposal</Button>
        </div>
      </EmptyContent>
      <Button variant="link" asChild className="text-muted-foreground" size="sm">
        <Link href="#">
          Learn More <ArrowUpRight />
        </Link>
      </Button>
    </Empty>
  )
}
