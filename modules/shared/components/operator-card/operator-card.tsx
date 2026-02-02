import { ArrowRight, FileText, Info } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/modules/shared/components/ui/button'
import { Card, CardContent, CardHeader } from '@/modules/shared/components/ui/card'
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
  operator: Operator
  configureVariant?: 'default' | 'outline'
  showMoreInfo?: boolean
  moreInfoHref?: Route
}

export type OperatorCardProps = BaseOperatorCardProps & (ConfigureWithCallback | ConfigureWithHref)

export default function OperatorCard({
  operator,
  onConfigureServices,
  configureServicesHref,
  configureVariant = 'default',
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
            <OperatorKeyPoint label="Active Since" value={operator.activeSince} />
            <OperatorKeyPoint label="Setup Time" value={operator.setupTime} />
          </div>
          <OperatorKeyPoint label="Recurring Cost" value={operator.recurringCost} />
        </div>
      </CardContent>
      {onConfigureServices ? (
        <Button
          variant={configureVariant}
          className="w-full"
          onClick={() => {
            onConfigureServices(operator.id)
          }}
        >
          Configure Services
          <ArrowRight className="size-4" />
        </Button>
      ) : (
        <Button variant={configureVariant} className="w-full" asChild>
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
