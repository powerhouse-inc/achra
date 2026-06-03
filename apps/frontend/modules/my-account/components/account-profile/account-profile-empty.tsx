import { Button } from '@achra/ui/button'
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@achra/ui/empty'
import { UserRound } from 'lucide-react'
import Link from 'next/link'

interface AccountProfileEmptyProps {
  /**
   * When set, the user has a drive (this slug) but no builder profile resolved
   * for it — typically a drive/profile slug mismatch worth surfacing.
   */
  driveSlug?: string
}

function AccountProfileEmpty({ driveSlug }: AccountProfileEmptyProps) {
  if (driveSlug) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <UserRound aria-hidden="true" />
          </EmptyMedia>
          <EmptyTitle>No builder profile found</EmptyTitle>
          <EmptyDescription>
            We found your drive (<span className="font-mono">{driveSlug}</span>) but no matching
            builder profile.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    )
  }

  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <UserRound aria-hidden="true" />
        </EmptyMedia>
        <EmptyTitle>No builder profile yet</EmptyTitle>
        <EmptyDescription>Complete onboarding to create your builder profile.</EmptyDescription>
      </EmptyHeader>
      <Button asChild>
        <Link href="/get-started">Continue onboarding</Link>
      </Button>
    </Empty>
  )
}

export { AccountProfileEmpty }
