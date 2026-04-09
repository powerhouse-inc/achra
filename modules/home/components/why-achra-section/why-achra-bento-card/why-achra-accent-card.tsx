import Image from 'next/image'

import Sparkles from '@/public/home/why-achra/sparkles.svg'
import { cn } from '@/shared/lib/utils'

interface WhyAchraAccentCardProps {
  title: string
  description: string
  accent: 'payments' | 'ai'
  className?: string
}

function WhyAchraAccentCard({ title, description, accent, className }: WhyAchraAccentCardProps) {
  return (
    <article
      className={cn(
        'relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)] ring-1 ring-black/6',
        className,
      )}
    >
      <Image
        src={
          accent === 'payments'
            ? '/home/why-achra/payments-gradient.webp'
            : '/home/why-achra/ai-gradient.webp'
        }
        alt=""
        fill
        quality={75}
        className={cn('pointer-events-none object-cover', accent === 'ai' ? 'object-bottom' : '')}
        aria-hidden
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        priority={accent === 'ai'}
      />
      {accent === 'ai' && (
        <Sparkles className="pointer-events-none absolute top-3 right-3 z-1 size-8" aria-hidden />
      )}
      <div className="relative z-1 flex flex-col gap-6 p-10">
        <h3 className="text-foreground text-xl font-semibold tracking-tight xl:text-2xl">
          {title}
        </h3>
        <p className="text-foreground/80 text-base">{description}</p>
      </div>
    </article>
  )
}

export { WhyAchraAccentCard }
