import { cn } from '@/modules/shared/lib/utils'
import { ServiceEntityEnum } from '@/modules/shared/types/services'
import { Badge } from '../../ui/badge'
import type { ClassValue } from 'clsx'

export const SERVICES_ENTITIES_STYLES: Record<ServiceEntityEnum, ClassValue> = {
  [ServiceEntityEnum.Builders]: 'border-primary bg-primary/30 text-primary',
  [ServiceEntityEnum.Operators]: 'border-to-do bg-to-do/30 text-to-do',
  [ServiceEntityEnum.Founders]: 'border-status-progress bg-status-progress/30 text-status-progress',
  [ServiceEntityEnum['SNO Governors']]:
    'border-status-success bg-status-success/30 text-status-success',
}

interface ServicesEntitiesChipProps {
  entity: ServiceEntityEnum
  className?: string
}

export function ServicesEntitiesChip({ entity, className }: ServicesEntitiesChipProps) {
  const ServiceEntityStyles = SERVICES_ENTITIES_STYLES[entity]

  return (
    <Badge
      variant="outline"
      className={cn(
        'box-border h-6 border-2 px-1.5 py-0.25 text-sm/5.5 font-semibold',
        ServiceEntityStyles,
        className,
      )}
    >
      {entity}
    </Badge>
  )
}
