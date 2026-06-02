import { cn } from '@/modules/shared/lib/utils'

function MagicDot({
  className,
  dotClassName,
  glowClassName,
}: {
  className?: string
  dotClassName: string
  glowClassName: string
}) {
  return (
    <div
      aria-hidden
      className={cn('pointer-events-none absolute flex items-center justify-center', className)}
    >
      <span className={cn('absolute rounded-full blur-md', glowClassName)} />
      <span className={cn('relative rounded-full', dotClassName)} />
    </div>
  )
}

export { MagicDot }
