import Image from 'next/image'

import { InternalLink } from '@/shared/components/internal-link'
import { cn } from '@/shared/lib/utils'
import type { Route } from 'next'

interface WhyAchraCtaCardProps {
  description: string
  href: Route
  linkLabel: string
  className?: string
}

function WhyAchraCtaCard({ description, href, linkLabel, className }: WhyAchraCtaCardProps) {
  return (
    <article
      className={cn(
        'relative flex flex-col justify-center overflow-hidden rounded-2xl bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)] ring-1 ring-black/6',
        className,
      )}
    >
      <Image
        src="/home/why-achra/cta-gradient.png"
        alt=""
        fill
        className="pointer-events-none inset-x-0! -bottom-9! h-auto! w-full! object-cover"
        aria-hidden
        sizes="(min-width: 1024px) 33vw, 100vw"
      />
      <div className="relative z-1 flex flex-col gap-6 p-10">
        <p className="text-foreground/80 text-base">{description}</p>
        <InternalLink variant="link" href={href} className="w-fit pl-0!">
          {linkLabel}
        </InternalLink>
      </div>
    </article>
  )
}

export { WhyAchraCtaCard }
