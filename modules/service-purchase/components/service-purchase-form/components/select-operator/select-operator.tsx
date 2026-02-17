import type { BuilderProfile_BuilderProfileState } from '@/modules/__generated__/graphql/switchboard-generated'
import { type Operator, OperatorCard } from '@/modules/shared/components/operator-card'

export type { Operator }

export const OPERATORS_MOCK: Operator[] = [
  {
    id: 'powerhouse-genesis-oh',
    name: 'Powerhouse Genesis OH',
    description: 'Empowering you business with reliable bookkeeping, payroll, and tax solutions.',
    activeSince: 'JUL 2022',
    setupTime: '7 days',
    recurringCost: 'From $800/Month',
  },
  {
    id: 'accountable-opc',
    name: 'Accountable OPC',
    description: 'Empowering you business with reliable bookkeeping, payroll, and tax solutions.',
    activeSince: 'JUL 2022',
    setupTime: '7 days',
    recurringCost: 'From $500/Month',
  },
]

interface SelectOperatorProps {
  onSelectServices: (operatorId: string) => void
  operator: BuilderProfile_BuilderProfileState
}

export default function SelectOperator({
  onSelectServices,
  operator,
}: Readonly<SelectOperatorProps>) {
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
        <OperatorCard operator={operator} onConfigureServices={onSelectServices} />
      </div>
    </div>
  )
}
