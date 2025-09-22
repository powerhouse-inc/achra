import { cn } from '@/modules/shared/lib/utils'
import type { LucideIcon } from 'lucide-react'

interface ProposalKeyValueElementProps {
  keyValue: string
  keyIcon: LucideIcon
  value: string | React.ReactNode
  className?: string
}

export default function ProposalKeyValueElement({
  keyValue,
  keyIcon: KeyIcon,
  value,
  className,
}: ProposalKeyValueElementProps) {
  return (
    <div className={cn('flex overflow-hidden rounded-lg border', className)}>
      <div className="bg-muted text-foreground/50 flex gap-2.5 px-3 py-2 text-sm/5.5 font-semibold">
        <span>{keyValue}</span>
        <KeyIcon className="size-4.5" />
      </div>
      <div className="flex items-center justify-start px-4 text-sm/5.5 font-semibold">{value}</div>
    </div>
  )
}
