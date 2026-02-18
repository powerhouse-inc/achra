import {
  type BuilderProfile_BuilderProfileState,
  BuilderProfile_BuilderStatus,
} from '@/modules/__generated__/graphql/switchboard-generated'
import { OperatorCard } from '@/modules/shared/components/operator-card'

export const OPERATORS_MOCK: BuilderProfile_BuilderProfileState[] = [
  {
    id: 'powerhouse-genesis-oh',
    name: 'Powerhouse Genesis OH',
    description: 'Empowering you business with reliable bookkeeping, payroll, and tax solutions.',
    lastModified: '2024-07-01T00:00:00Z',
    status: BuilderProfile_BuilderStatus.Active,
    contributors: ['phid-contributor-1', 'phid-contributor-2'],
    links: [],
    operationalHubMember: { name: 'Powerhouse Genesis OH', phid: 'powerhouse-genesis-oh' },
    scopes: [],
    skills: [],
    isOperator: true,
  },
  {
    id: 'accountable-opc',
    name: 'Accountable OPC',
    description: 'Empowering you business with reliable bookkeeping, payroll, and tax solutions.',
    lastModified: '2024-07-01T00:00:00Z',
    status: BuilderProfile_BuilderStatus.Active,
    contributors: ['phid-contributor-1'],
    links: [],
    operationalHubMember: { name: 'Accountable OPC', phid: 'accountable-opc' },
    scopes: [],
    skills: [],
    isOperator: true,
  },
]

interface SelectOperatorProps {
  onConfigureServices: (operatorId: string) => void
  operator: BuilderProfile_BuilderProfileState
}

export default function SelectOperator({
  onConfigureServices,
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
        <OperatorCard operator={operator} onConfigureServices={onConfigureServices} />
      </div>
    </div>
  )
}
