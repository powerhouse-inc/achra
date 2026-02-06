import { cva } from 'class-variance-authority'
import { cn } from '@/modules/shared/lib/utils'
import { ServiceEntityEnum } from '@/modules/shared/types/services'
import { Badge } from '../../ui/badge'

const servicesEntitiesChipVariants = cva(
  'box-border h-6 border-2 px-1.5 py-0.25 text-sm/5.5 font-semibold',
  {
    variants: {
      entity: {
        [ServiceEntityEnum.Builders]: 'border-primary bg-primary/30 text-primary',
        [ServiceEntityEnum.Networks]:
          'border-status-success bg-status-success/30 text-status-success',
        [ServiceEntityEnum.Operators]: 'border-to-do bg-to-do/30 text-to-do',
        [ServiceEntityEnum.Founders]:
          'border-status-progress bg-status-progress/30 text-status-progress',
        [ServiceEntityEnum['SNO Governors']]:
          'border-status-success bg-status-success/30 text-status-success',
      },
    },
    defaultVariants: {
      entity: ServiceEntityEnum.Builders,
    },
  },
)

interface ServicesEntitiesChipProps {
  entity: ServiceEntityEnum
  className?: string
}

export function ServicesEntitiesChip({ entity, className }: ServicesEntitiesChipProps) {
  return (
    <Badge variant="outline" className={cn(servicesEntitiesChipVariants({ entity }), className)}>
      {entity}
    </Badge>
  )
}
