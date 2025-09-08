import { Badge } from '@/modules/shared/components/ui/badge'
import { cn } from '@/modules/shared/lib/utils'
import { type ChipProps } from '../types'
import { chipStyles } from '../utils'

const NetworkChip = ({ variant, className, children }: ChipProps) => {
  const variantClasses = chipStyles[variant]

  return (
    <Badge className={cn('border-2 px-2 py-0 text-sm font-extrabold', variantClasses, className)}>
      {children}
    </Badge>
  )
}

export default NetworkChip
