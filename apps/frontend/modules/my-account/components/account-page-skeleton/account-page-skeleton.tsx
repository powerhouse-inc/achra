import { Card, CardContent, CardHeader } from '@achra/ui/card'
import { Skeleton } from '@achra/ui/skeleton'
import { SettingsNavSkeleton } from '@/modules/my-account/components/settings-nav'

const FIELD_KEYS = ['name', 'date-of-birth', 'language'] as const

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
          {/* account form card */}
          <Card>
            <CardHeader>
              {/* card title + description */}
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-4 w-full max-w-xs" />
            </CardHeader>
            <CardContent>
              {/* field group (gap-7 mirrors FieldGroup) */}
              <div className="flex w-full flex-col gap-7">
                {FIELD_KEYS.map((key) => (
                  // field: label + control + description (gap-3 mirrors Field)
                  <div key={key} className="flex w-full flex-col gap-3">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-9 w-full" />
                    <Skeleton className="h-4 w-full max-w-sm" />
                  </div>
                ))}
                {/* submit button */}
                <div>
                  <Skeleton className="h-9 w-32" />
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}

export { AccountPageSkeleton }
