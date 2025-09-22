import { cn } from '@/modules/shared/lib/utils'

interface ProposalCardOutlineProps {
  title: string
  className?: string
  children: React.ReactNode
}

export default function ProposalCardOutline({
  title,
  children,
  className,
}: ProposalCardOutlineProps) {
  return (
    <div
      className={cn('bg-background flex w-full flex-col gap-4 rounded-lg border p-3', className)}
    >
      <div className="text-foreground/50 text-center leading-6 font-semibold uppercase">
        {title}
      </div>
      <div className="h-full">{children}</div>
    </div>
  )
}
