'use client'
import { ArrowRight, FileText, Info } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/modules/shared/components/ui/button'
import { Card, CardContent, CardHeader } from '@/modules/shared/components/ui/card'
import OperatorKeyPoint from './components/operator-key-point/operator-key-point'
import type { Operator } from '../../select-operator'
import type { Route } from 'next'

interface OperatorCardProps {
  operator: Operator
  onSelectServices: (operatorId: string) => void
  showMoreInfo?: boolean
  onMoreInfo?: () => void
  configureVariant?: 'default' | 'outline'
}

export default function OperatorCard({
  operator,
  onSelectServices,
  showMoreInfo = false,
  configureVariant = 'default',
}: Readonly<OperatorCardProps>) {
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
      <Button
        // TODO: temporary variant based on operator id
        variant={configureVariant}
        className="w-full"
        onClick={() => {
          onSelectServices(operator.id)
        }}
      >
        Configure Services
        <ArrowRight className="size-4" />
      </Button>
      {showMoreInfo && (
        <Button variant="outline" asChild size="lg">
          <Link href={`/services/operators/${operator.id}` as Route}>
            <span>More Info</span>
            <Info className="size-4" />
          </Link>
        </Button>
      )}
    </Card>
  )
}
