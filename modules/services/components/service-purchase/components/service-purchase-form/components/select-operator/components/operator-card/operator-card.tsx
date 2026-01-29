import { FileText } from 'lucide-react'
import { InternalLink } from '@/modules/shared/components/internal-link/internal-link'
import { Card, CardContent, CardHeader } from '@/modules/shared/components/ui/card'
import OperatorKeyPoint from './components/operator-key-point/operator-key-point'
import type { Operator } from '../../select-operator'

interface OperatorCardProps {
  operator: Operator
  onSelectServices: (operatorId: string) => void
}

export default function OperatorCard({ operator, onSelectServices }: OperatorCardProps) {
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
      <InternalLink
        // TODO: temporary variant based on operator id
        variant={operator.id === 'powerhouse-genesis-oh' ? 'default' : 'outline'}
        className="w-full"
        onClick={() => {
          onSelectServices(operator.id)
        }}
      >
        Configure Services
      </InternalLink>
    </Card>
  )
}
