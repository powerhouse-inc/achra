import { cn } from '@achra/ui/lib/utils'

function SurfaceGlow({ angle, className }: { angle: number; className?: string }) {
  return (
    <div
      aria-hidden
      style={
        {
          '--duration': 20,
          '--angle': angle,
        } as React.CSSProperties
      }
      className={cn(
        'animate-orbit pointer-events-none absolute size-10 rounded-full opacity-40 blur-2xl [--radius:48] md:[--radius:58] lg:[--radius:66]',
        className,
      )}
    />
  )
}

export { SurfaceGlow }
