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
    <div className="flex flex-col gap-6 md:gap-8">
      <div className="flex flex-col gap-2">
        <span className="text-foreground text-base/6 font-semibold lg:text-lg/5.5 lg:font-bold">
          Operator
        </span>
        <span className="text-foreground text-xs/4.5 lg:text-base/6">
          Lorem ipsum dolor sit amet consectetur. Massa id vitae turpis viverra tortor. Posuere non
          tempor volutpat purus arcu pulvinar viverra. Sed praesent in leo in. Mattis adipiscing
          proin lobortis facilisi etiam tellus. Pharetra scelerisque ornare lacus dolor consectetur.
          Quis pulvinar nam massa tristique tortor dui vitae lectus.
        </span>
      </div>
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
