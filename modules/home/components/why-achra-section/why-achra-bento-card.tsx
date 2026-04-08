import Image from 'next/image'

import { InternalLink } from '@/modules/shared/components/internal-link'
import { cn } from '@/shared/lib/utils'
import type { Route } from 'next'

const cardShell =
  'relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)] ring-1 ring-black/6'

const titleClass = 'text-foreground text-lg font-semibold tracking-tight'
const bodyClass = 'text-muted-foreground text-sm leading-relaxed'

interface WhyAchraTextCardProps {
  title: string
  description: string
  className?: string
}

function WhyAchraTextCard({ title, description, className }: WhyAchraTextCardProps) {
  return (
    <article className={cn(cardShell, 'p-10', className)}>
      <div className="relative z-1 flex flex-col gap-6">
        <h3 className={titleClass}>{title}</h3>
        <p className={bodyClass}>{description}</p>
      </div>
    </article>
  )
}

interface WhyAchraAccentCardProps {
  title: string
  description: string
  accent: 'payments' | 'ai'
  className?: string
}

function WhyAchraAccentCard({ title, description, accent, className }: WhyAchraAccentCardProps) {
  return (
    <article className={cn(cardShell, className)}>
      <Image
        src={
          accent === 'payments'
            ? '/home/why-achra/payments-gradient.png'
            : '/home/why-achra/ai-gradient.png'
        }
        alt=""
        fill
        className="pointer-events-none object-cover"
        aria-hidden
        sizes="(min-width: 1024px) 33vw, 100vw"
      />
      {accent === 'ai' && (
        <Image
          src="/home/why-achra/sparkles.svg"
          alt=""
          width={32}
          height={32}
          className="pointer-events-none absolute top-10 right-10 z-1"
          aria-hidden
        />
      )}
      <div className="relative z-1 flex flex-col gap-6 p-10">
        <h3 className={titleClass}>{title}</h3>
        <p className={bodyClass}>{description}</p>
      </div>
    </article>
  )
}

interface WhyAchraCtaCardProps {
  description: string
  href: Route
  linkLabel: string
  className?: string
}

function WhyAchraCtaCard({ description, href, linkLabel, className }: WhyAchraCtaCardProps) {
  return (
    <article className={cn(cardShell, 'justify-center', className)}>
      <Image
        src="/home/why-achra/cta-gradient.png"
        alt=""
        fill
        className="pointer-events-none object-cover"
        aria-hidden
        sizes="(min-width: 1024px) 33vw, 100vw"
      />
      <div className="relative z-1 flex flex-col gap-6 p-10">
        <p className={bodyClass}>{description}</p>
        <InternalLink variant="link" href={href} className="w-fit pl-0!">
          {linkLabel}
        </InternalLink>
      </div>
    </article>
  )
}

interface WhyAchraWorkflowCardProps {
  title: string
  description: string
  className?: string
}

function WhyAchraWorkflowCard({ title, description, className }: WhyAchraWorkflowCardProps) {
  return (
    <article className={cn(cardShell, className)}>
      <div className="flex min-h-40 flex-1 items-center justify-center overflow-hidden">
        <Image
          src="/home/why-achra/workflows.png"
          alt="Workflow templates: connected steps from RFP to payouts"
          width={245}
          height={140}
          className="object-contain"
          priority={false}
        />
      </div>
      <div className="flex flex-col gap-6 p-10">
        <h3 className={titleClass}>{title}</h3>
        <p className={bodyClass}>{description}</p>
      </div>
    </article>
  )
}

export { WhyAchraAccentCard, WhyAchraCtaCard, WhyAchraTextCard, WhyAchraWorkflowCard }
