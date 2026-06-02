import type { ResourceOperatorFieldsFragment } from '@/modules/__generated__/graphql/switchboard-generated'
import { OperatorCard } from '@/modules/services/components/operator-card'

interface SelectOperatorStepProps {
  onSelectOperator: (operatorId: string) => void
  operator: ResourceOperatorFieldsFragment
}

function SelectOperatorStep({ onSelectOperator, operator }: Readonly<SelectOperatorStepProps>) {
  return (
    <div className="flex flex-col gap-6 md:gap-8">
      <div className="flex flex-col gap-2">
        <span className="text-foreground text-base/6 font-semibold lg:text-lg/5.5 lg:font-bold">
          Operator
        </span>
        <span className="text-foreground text-xs/4.5 lg:text-base/6">
          Choose the operator that will manage your subscription. Your selected operator will handle
          day-to-day service administration, including billing adjustments and usage limit changes.
          Click &quot;Configure Services&quot; to proceed with your preferred operator.
        </span>
      </div>
      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
        <OperatorCard operator={operator} onSelectOperator={onSelectOperator} />
      </div>
    </div>
  )
}

export { SelectOperatorStep }
