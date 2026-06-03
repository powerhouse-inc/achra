import { cn } from '@achra/ui/lib/utils'

function PulsingDot({
  dotClassName,
  waveClassName,
}: {
  dotClassName: string
  waveClassName: string
}) {
  return (
    <div className="relative flex size-4 items-center justify-center">
      <span
        aria-hidden
        className={cn(
          'absolute size-4 rounded-full motion-reduce:hidden',
          waveClassName,
          'animate-pulse-ring',
        )}
      />
      <span
        aria-hidden
        className={cn(
          'absolute size-4 rounded-full motion-reduce:hidden',
          waveClassName,
          'animate-pulse-ring [animation-delay:1s]',
        )}
      />
      <span className={cn('relative size-4 rounded-full', dotClassName)} />
    </div>
  )
}

export { PulsingDot }
