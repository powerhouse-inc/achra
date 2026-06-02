import { cn } from '@/modules/shared/lib/utils'
import type { LucideIcon } from 'lucide-react'

interface ProposalKeyValueElementProps {
  keyValue: string | React.ReactNode
  keyIcon: LucideIcon
  value: string | React.ReactNode
  className?: string
}

function ProposalKeyValueElement({
  keyValue,
  keyIcon: KeyIcon,
  value,
  className,
}: ProposalKeyValueElementProps) {
  return (
    <div className={cn('flex w-full overflow-hidden rounded-lg border', className)}>
      <div className="bg-muted text-foreground/50 flex gap-1 px-2 py-2 text-xs/4.5 font-medium sm:gap-2 sm:px-3 sm:text-sm/5.5 sm:font-semibold xl:text-base/6">
        <div className="whitespace-nowrap">{keyValue}</div>
        <KeyIcon className="size-4 sm:size-4.5 xl:size-6" />
      </div>
      <div className="flex items-center justify-start truncate px-2 text-sm/5.5 font-semibold sm:px-3 xl:text-base/6">
        {value}
      </div>
    </div>
  )
}

export { ProposalKeyValueElement }
