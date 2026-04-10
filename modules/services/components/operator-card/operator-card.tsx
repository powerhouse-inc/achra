import { ArrowRight, Info } from 'lucide-react'
import Link from 'next/link'
import {
  type BuilderProfileState,
  BuilderStatus,
} from '@/modules/__generated__/graphql/switchboard-generated'
import { Avatar, AvatarFallback, AvatarImage } from '@/modules/shared/components/ui/avatar'
import { Button } from '@/modules/shared/components/ui/button'
import { Card, CardContent, CardHeader } from '@/modules/shared/components/ui/card'
import { formatMonthYear } from '@/modules/shared/lib/date'
import { OperatorKeyPoint } from './operator-key-point'
import type { Route } from 'next'

export interface Operator {
  id: string
  name: string
  description: string
  activeSince: string
  setupTime: string
  recurringCost: string
}

interface ConfigureWithCallback {
  onSelectOperator: (operatorId: string) => void
  configureServicesHref?: never
}
interface ConfigureWithHref {
  onSelectOperator?: never
  configureServicesHref: Route
}

interface BaseOperatorCardProps {
  operator: BuilderProfileState
  showMoreInfo?: boolean
  moreInfoHref?: Route
}

export type OperatorCardProps = BaseOperatorCardProps & (ConfigureWithCallback | ConfigureWithHref)

const OPERATOR_STATUS_LABELS_MAP: Record<BuilderStatus, string> = {
  [BuilderStatus.Active]: 'Active',
  [BuilderStatus.Inactive]: 'Inactive',
  [BuilderStatus.OnHold]: 'On Hold',
  [BuilderStatus.Completed]: 'Completed',
  [BuilderStatus.Archived]: 'Archived',
}

function OperatorCard({
  operator,
  onSelectOperator,
  configureServicesHref,
  showMoreInfo = false,
  moreInfoHref,
}: Readonly<OperatorCardProps>) {
  const resolvedMoreInfoHref = moreInfoHref ?? (`/services/operators/${operator.slug}` as Route)

  return (
    <Card className="gap-4 border-none p-3 shadow-lg">
      <CardHeader className="gap-0 p-0">
        <div className="flex items-center gap-2">
          <Avatar className="size-12 sm:size-10">
            <AvatarImage src={operator.icon} alt={operator.name ?? ''} />
            <AvatarFallback>{operator.name?.charAt(0).toUpperCase() ?? 'U'}</AvatarFallback>
          </Avatar>
          <div className="flex gap-1 text-base/6 font-semibold">
            <span className="text-foreground/30">{operator.code}</span>
            <span className="text-foreground">{operator.name}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 p-0">
        <span className="text-foreground text-sm/5.5">{operator.description}</span>
        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-2 gap-2">
            <OperatorKeyPoint label="Last Active" value={formatMonthYear(operator.lastModified)} />
            <OperatorKeyPoint
              label="Status"
              value={OPERATOR_STATUS_LABELS_MAP[operator.status ?? BuilderStatus.Active]}
            />
          </div>
          <OperatorKeyPoint
            label="Team Size"
            value={`${operator.contributors.length} contributors`}
          />
        </div>
      </CardContent>
      {onSelectOperator ? (
        <Button
          variant="default"
          className="w-full"
          onClick={() => {
            onSelectOperator(operator.id)
          }}
        >
          Configure Services
          <ArrowRight className="size-4" />
        </Button>
      ) : (
        <Button variant="default" className="w-full" asChild>
          <Link href={configureServicesHref}>
            Configure Services
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      )}
      {showMoreInfo && (
        <Button variant="outline" asChild size="lg">
          <Link href={resolvedMoreInfoHref}>
            <span>More Info</span>
            <Info className="size-4" />
          </Link>
        </Button>
      )}
    </Card>
  )
}

export { OperatorCard }
