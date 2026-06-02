import { Check, Lock } from 'lucide-react'
import { cn } from '@/modules/shared/lib/utils'

type ServiceLineItemValueType = 'check' | 'price' | 'label' | 'text' | 'included' | 'none'

interface ServiceLineItemProps {
  label: string
  sublabel?: string
  value: string
  valueType: ServiceLineItemValueType
  icon?: 'lock' | 'check'
}

function ServiceLineItem({
  label,
  sublabel,
  value,
  valueType,
  icon,
}: Readonly<ServiceLineItemProps>) {
  function renderValue() {
    switch (valueType) {
      case 'check':
        return (
          <span className="text-status-success">
            <Check className="size-4" strokeWidth={2.5} />
          </span>
        )
      case 'included':
        return (
          <span className="bg-status-success/15 text-status-success inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold tracking-wider uppercase">
            Included
          </span>
        )
      case 'none':
        return (
          <span className="text-muted-foreground text-sm/5.5 font-semibold lg:text-base/6">—</span>
        )
      case 'label':
        return (
          <span className="text-muted-foreground text-sm/5.5 font-medium tracking-wider uppercase lg:text-base/6">
            {value}
          </span>
        )
      case 'text':
        return (
          <span className="text-foreground text-sm/5.5 font-medium lg:text-base/6">{value}</span>
        )
      case 'price':
      default:
        return (
          <span className="text-foreground text-sm/5.5 font-semibold lg:text-base/6">{value}</span>
        )
    }
  }

  return (
    <div
      className={cn(
        'flex items-center justify-between gap-4 px-3 py-2 lg:px-6',
        sublabel && 'items-start',
      )}
    >
      <div className="flex min-w-0 flex-1 items-center gap-2">
        {icon === 'lock' && (
          <Lock className="text-muted-foreground size-4 shrink-0" strokeWidth={1.5} />
        )}
        {icon === 'check' && (
          <Check className="text-status-success size-4 shrink-0" strokeWidth={2.5} />
        )}
        <div className="flex min-w-0 flex-col gap-0.5">
          <span className="text-foreground text-sm/5.5 lg:text-base/6">{label}</span>
          {sublabel && <span className="text-muted-foreground text-xs">{sublabel}</span>}
        </div>
      </div>
      {renderValue()}
    </div>
  )
}

export { ServiceLineItem }
export type { ServiceLineItemValueType }
