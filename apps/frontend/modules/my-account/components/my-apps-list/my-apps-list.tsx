'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@achra/ui/card'
import { MyAppsListEmpty } from '@/modules/my-account/components/my-apps-list/my-apps-list-empty'
import { MyAppsListError } from '@/modules/my-account/components/my-apps-list/my-apps-list-error'
import { MyAppsListSkeleton } from '@/modules/my-account/components/my-apps-list/my-apps-list-skeleton'
import { useUserDrives } from '@/modules/shared/hooks/use-user-drives'
import { driveLinkFor } from '@/modules/shared/lib/switchboard-urls'
import { ConnectLink } from '@/shared/components/connect-link/connect-link'
import type { Route } from 'next'

function MyAppsList() {
  const { data: drives, isPending, isError, refetch } = useUserDrives()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Apps</CardTitle>
        <CardDescription>Your workspaces for managing documents in Connect.</CardDescription>
      </CardHeader>
      <CardContent>
        {isPending ? (
          <MyAppsListSkeleton />
        ) : isError ? (
          <MyAppsListError onRetry={() => void refetch()} />
        ) : drives.length === 0 ? (
          <MyAppsListEmpty />
        ) : (
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {drives.map((drive) => (
              <li key={drive.driveId}>
                <ConnectLink
                  href={driveLinkFor(drive.driveSlug) as Route}
                  driveName={drive.driveName}
                  className="block"
                  variant="default"
                />
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}

export { MyAppsList }
