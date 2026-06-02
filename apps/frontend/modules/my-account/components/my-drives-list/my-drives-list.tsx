'use client'

import { MyDrivesListEmpty } from '@/modules/my-account/components/my-drives-list/my-drives-list-empty'
import { MyDrivesListError } from '@/modules/my-account/components/my-drives-list/my-drives-list-error'
import { MyDrivesListSkeleton } from '@/modules/my-account/components/my-drives-list/my-drives-list-skeleton'
import { useUserDrives } from '@/modules/shared/hooks/use-user-drives'
import { driveLinkFor } from '@/modules/shared/lib/switchboard-urls'
import { ConnectLink } from '@/shared/components/connect-link/connect-link'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card'
import type { Route } from 'next'

function MyDrivesList() {
  const { data: drives, isPending, isError, refetch } = useUserDrives()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Drives</CardTitle>
        <CardDescription>Your workspaces for managing documents in Connect.</CardDescription>
      </CardHeader>
      <CardContent>
        {isPending ? (
          <MyDrivesListSkeleton />
        ) : isError ? (
          <MyDrivesListError onRetry={() => void refetch()} />
        ) : drives.length === 0 ? (
          <MyDrivesListEmpty />
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

export { MyDrivesList }
