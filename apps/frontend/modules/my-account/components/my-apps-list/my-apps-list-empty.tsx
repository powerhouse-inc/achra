import { Button } from '@achra/ui/button'
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@achra/ui/empty'
import { HardDrive } from 'lucide-react'
import Link from 'next/link'

function MyDrivesListEmpty() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <HardDrive aria-hidden="true" />
        </EmptyMedia>
        <EmptyTitle>Finish setting up your account</EmptyTitle>
        <EmptyDescription>Complete onboarding to create your first drive.</EmptyDescription>
      </EmptyHeader>
      <Button asChild>
        <Link href="/get-started">Continue onboarding</Link>
      </Button>
    </Empty>
  )
}

export { MyDrivesListEmpty }
