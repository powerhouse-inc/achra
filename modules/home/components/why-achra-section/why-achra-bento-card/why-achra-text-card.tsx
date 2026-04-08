import { cn } from '@/shared/lib/utils'

interface WhyAchraTextCardProps {
  title: string
  description: string
  className?: string
}

function WhyAchraTextCard({ title, description, className }: WhyAchraTextCardProps) {
  return (
    <article
      className={cn(
        'relative flex flex-col overflow-hidden rounded-2xl bg-white p-10 shadow-[0_1px_3px_rgba(0,0,0,0.04)] ring-1 ring-black/6',
        className,
      )}
    >
      <div className="relative z-1 flex flex-col gap-6">
        <h3 className="text-foreground text-xl font-semibold tracking-tight xl:text-2xl">
          {title}
        </h3>
        <p className="text-foreground/80 text-base">{description}</p>
      </div>
    </article>
  )
}

export { WhyAchraTextCard }
