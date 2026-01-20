import OperatorCard from './components/operator-card/operator-card'

export interface Operator {
  id: string
  name: string
  description: string
  activeSince: string
  setupTime: string
  recurringCost: string
}

const OPERATORS_MOCK: Operator[] = [
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
}

export default function SelectOperator({ onSelectServices }: SelectOperatorProps) {
  return (
    <div className="flex flex-col gap-4">
      <span className="text-foreground text-lg/5.5 font-bold">Operator</span>
      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
        {OPERATORS_MOCK.map((operator) => (
          <OperatorCard
            key={operator.name}
            operator={operator}
            onSelectServices={onSelectServices}
          />
        ))}
      </div>
    </div>
  )
}
