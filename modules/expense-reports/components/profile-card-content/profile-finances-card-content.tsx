import { User } from 'lucide-react'
import { InternalLink } from '@/modules/shared/components/internal-link'
import { Avatar, AvatarFallback } from '@/modules/shared/components/ui/avatar'
import type { Route } from 'next'

function ProfileFinancesCardContent() {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-foreground/50 text-sm/4.5 font-semibold">
        View all expenses of the Powerhouse Ecosystem Actor.
      </p>

      <div className="flex gap-4">
        <InternalLink href={'/network/powerhouse/builders/builder-1/expense-reports' as Route}>
          Budget Statements
        </InternalLink>
        <InternalLink href={'/network/powerhouse/builders/builder-1/expense-reports' as Route}>
          Finances
        </InternalLink>
      </div>

      <div className="bg-background relative mt-2 flex flex-wrap gap-6 rounded-lg border p-4">
        <div className="bg-card text-foreground/30 absolute -top-2.5 left-2 px-2 text-sm/4.5 font-medium">
          Auditors
        </div>

        <div className="flex items-center gap-2 text-base/6 font-semibold">
          <Avatar className="size-6">
            <AvatarFallback>
              <User className="size-4" />
            </AvatarFallback>
          </Avatar>
          deniz
        </div>

        <div className="flex items-center gap-2 text-base/6 font-semibold">
          <Avatar className="size-6">
            <AvatarFallback>
              <User className="size-4" />
            </AvatarFallback>
          </Avatar>
          dumitru
        </div>
      </div>
    </div>
  )
}

export { ProfileFinancesCardContent }
