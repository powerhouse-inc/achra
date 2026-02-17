import { ArrowRight, FileText, Info } from 'lucide-react'
import Link from 'next/link'
import {
  type BuilderProfile_BuilderProfileState,
  BuilderProfile_BuilderStatus,
} from '@/modules/__generated__/graphql/switchboard-generated'
import { Button } from '@/modules/shared/components/ui/button'
import { Card, CardContent, CardHeader } from '@/modules/shared/components/ui/card'
import { formatMonthYear } from '@/modules/shared/lib/date'
import OperatorKeyPoint from './components/operator-key-point/operator-key-point'
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
  onConfigureServices: (operatorId: string) => void
  configureServicesHref?: never
}
interface ConfigureWithHref {
  onConfigureServices?: never
  configureServicesHref: Route
}

interface BaseOperatorCardProps {
  operator: BuilderProfile_BuilderProfileState
  showMoreInfo?: boolean
  moreInfoHref?: Route
}

export type OperatorCardProps = BaseOperatorCardProps & (ConfigureWithCallback | ConfigureWithHref)

const OPERATOR_STATUS_LABELS_MAP: Record<BuilderProfile_BuilderStatus, string> = {
  [BuilderProfile_BuilderStatus.Active]: 'Active',
  [BuilderProfile_BuilderStatus.Inactive]: 'Inactive',
  [BuilderProfile_BuilderStatus.OnHold]: 'On Hold',
  [BuilderProfile_BuilderStatus.Completed]: 'Completed',
  [BuilderProfile_BuilderStatus.Archived]: 'Archived',
}

export default function OperatorCard({
  operator,
  onConfigureServices,
  configureServicesHref,
  showMoreInfo = false,
  moreInfoHref,
}: Readonly<OperatorCardProps>) {
  const resolvedMoreInfoHref = moreInfoHref ?? (`/services/operators/${operator.id}` as Route)

  return (
    <Card className="gap-4 border-none p-3 shadow-lg">
      <CardHeader className="gap-0 p-0">
        <div className="flex items-center gap-2">
          <FileText className="size-4" />
          <span className="text-foreground text-base/6 font-semibold">{operator.name}</span>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 p-0">
        <span className="text-foreground text-sm/5.5">{operator.description}</span>
        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-2 gap-2">
            <OperatorKeyPoint label="Last Active" value={formatMonthYear(operator.lastModified)} />
            <OperatorKeyPoint
              label="Status"
              value={
                OPERATOR_STATUS_LABELS_MAP[operator.status ?? BuilderProfile_BuilderStatus.Active]
              }
            />
          </div>
          <OperatorKeyPoint
            label="Team Size"
            value={`${operator.contributors.length} contributors`}
          />
        </div>
      </CardContent>
      {onConfigureServices ? (
        <Button
          variant="default"
          className="w-full"
          onClick={() => {
            onConfigureServices(operator.id)
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
