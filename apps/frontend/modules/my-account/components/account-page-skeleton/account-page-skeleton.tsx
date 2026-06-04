import { Card, CardContent, CardHeader } from '@achra/ui/card'
import { Skeleton } from '@achra/ui/skeleton'
import { AccountProfileSkeleton } from '@/modules/my-account/components/account-profile'
import { RenownIdentitySkeleton } from '@/modules/my-account/components/renown-identity'
import { SettingsNavSkeleton } from '@/modules/my-account/components/settings-nav'

function AccountPageSkeleton() {
  return (
    <div aria-busy="true">
      {/* page heading: title + subtitle */}
      <div className="mb-6 flex flex-col gap-2">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-5 w-full max-w-sm" />
      </div>

      {/* settings layout: nav sidebar + main content */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-[250px_1fr] md:items-start lg:grid-cols-[350px_1fr]">
        <SettingsNavSkeleton />

        <main>
          <div className="flex flex-col gap-6">
            {/* builder profile card */}
            <Card>
              <CardHeader>
                {/* card title + description */}
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-4 w-full max-w-xs" />
              </CardHeader>
              <CardContent className="flex flex-col gap-6">
                <AccountProfileSkeleton />
              </CardContent>
            </Card>

            {/* renown identity card */}
            <Card>
              <CardHeader>
                {/* card title + description */}
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-4 w-full max-w-xs" />
              </CardHeader>
              <CardContent className="flex flex-col gap-6">
                <RenownIdentitySkeleton />
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}

export { AccountPageSkeleton }
