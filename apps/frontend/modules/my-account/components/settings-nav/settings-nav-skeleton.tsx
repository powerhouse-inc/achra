import { Skeleton } from '@achra/ui/skeleton'

const NAV_ITEM_KEYS = ['account', 'drives'] as const

function SettingsNavSkeleton() {
  return (
    <nav aria-hidden="true" className="bg-card rounded-xl border p-2 shadow-sm">
      <div className="flex flex-col gap-0.5">
        {NAV_ITEM_KEYS.map((key) => (
          // nav item: icon + label
          <div key={key} className="flex w-full items-center gap-2.5 rounded-md px-3 py-2">
            <Skeleton className="size-4 shrink-0" />
            <Skeleton className="h-5 w-full max-w-24" />
          </div>
        ))}
      </div>
    </nav>
  )
}

export { SettingsNavSkeleton }
