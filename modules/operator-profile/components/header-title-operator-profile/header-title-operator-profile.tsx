import { FileText } from 'lucide-react'
import type { OperatorChipEnum } from '@/modules/operator-profile/types'
import { OperatorChip } from '../operator-chip'

interface HeaderTitleOperatorProfileProps {
  title: string
  operatorChips: OperatorChipEnum[]
}

function HeaderTitleOperatorProfile({ title, operatorChips }: HeaderTitleOperatorProfileProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-2">
        <FileText className="text-muted-foreground h-14 w-14" strokeWidth={1.5} />
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-lg leading-[120%] font-bold sm:text-xl">{title}</h2>
        <div className="flex flex-wrap gap-2">
          {operatorChips.map((opc) => (
            <OperatorChip key={opc} opc={opc} />
          ))}
        </div>
      </div>
    </div>
  )
}

export { HeaderTitleOperatorProfile }
