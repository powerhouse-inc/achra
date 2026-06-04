'use client'

import { Button } from '@achra/ui/button'
import { Card, CardContent } from '@achra/ui/card'
import Link from 'next/link'
import OperatorIcon from '@/modules/shared/components/svgs/operator-icon.svg'

interface AlreadyOperatorCardProps {
  /** Link to the user's Service Offering drive; absent if it can't be resolved. */
  operatorDriveLink?: string
}

/**
 * Shown when a user arriving with operator intent has already completed
 * onboarding and is already an operator. Points them at their Service Offering
 * drive (where services are created) and the My Apps page.
 */
function AlreadyOperatorCard({ operatorDriveLink }: AlreadyOperatorCardProps) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center gap-5 px-8 py-12 text-center">
        <div className="bg-primary/10 text-primary flex size-12 items-center justify-center rounded-full">
          <OperatorIcon className="size-6" />
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold tracking-tight">You&apos;re already an operator</h2>
          <p className="text-muted-foreground max-w-md text-sm">
            Use your Service Offering drive to create and publish the services builders across Achra
            can subscribe to.
          </p>
        </div>
        <div className="grid w-full max-w-md grid-cols-1 gap-3 sm:grid-cols-2">
          <Button variant="outline" className="w-full min-w-0" asChild>
            <Link href="/my-account/apps">My Apps</Link>
          </Button>
          <Button className="w-full min-w-0" asChild disabled={!operatorDriveLink}>
            {operatorDriveLink ? (
              <a href={operatorDriveLink} target="_blank" rel="noopener noreferrer">
                Open Service Offering
              </a>
            ) : (
              <span aria-disabled="true">Open Service Offering</span>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export { AlreadyOperatorCard }
