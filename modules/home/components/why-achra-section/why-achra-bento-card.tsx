import { Sparkles } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { cn } from '@/shared/lib/utils'
import type { Route } from 'next'

const cardShell =
  'relative flex flex-col overflow-hidden rounded-2xl bg-white p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04)] ring-1 ring-black/[0.06]'

const titleClass = 'text-foreground text-lg font-semibold tracking-tight'
const bodyClass = 'text-muted-foreground text-base leading-relaxed'

interface WhyAchraTextCardProps {
  title: string
  description: string
  className?: string
}

function WhyAchraTextCard({ title, description, className }: WhyAchraTextCardProps) {
  return (
    <article className={cn(cardShell, className)}>
      <div className="relative z-1 flex flex-col gap-4">
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
      {accent === 'payments' ? (
        <div
          className="pointer-events-none absolute -top-28 -right-28 h-[min(280px,55vw)] w-[min(280px,55vw)] rounded-full bg-[radial-gradient(circle_at_center,rgba(244,114,182,0.45)_0%,rgba(192,132,252,0.35)_45%,transparent_72%)] blur-2xl"
          aria-hidden
        />
      ) : (
        <>
          <div
            className="pointer-events-none absolute -top-24 -right-20 h-[min(260px,50vw)] w-[min(260px,50vw)] rounded-full bg-[radial-gradient(circle_at_center,rgba(129,140,248,0.4)_0%,rgba(167,139,250,0.3)_50%,transparent_70%)] blur-2xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute top-5 right-5 flex gap-1.5 opacity-90"
            aria-hidden
          >
            <Sparkles className="size-3.5 text-violet-500" strokeWidth={2} />
            <Sparkles className="size-2.5 translate-y-1 text-sky-500" strokeWidth={2} />
            <Sparkles className="size-3 text-violet-400" strokeWidth={2} />
          </div>
        </>
      )}
      <div className="relative z-1 flex flex-col gap-4">
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
    <article className={cn(cardShell, 'min-h-[140px] justify-center', className)}>
      <div
        className="pointer-events-none absolute -right-16 -bottom-20 h-52 w-52 rounded-full bg-[radial-gradient(circle_at_center,rgba(167,139,250,0.35)_0%,rgba(192,132,252,0.15)_50%,transparent_68%)] blur-3xl"
        aria-hidden
      />
      <div className="relative z-1 flex flex-col gap-4">
        <p className={bodyClass}>{description}</p>
        <Link
          href={href}
          className="text-primary hover:text-primary/85 inline-flex w-fit items-center gap-1 text-sm font-medium transition-colors"
        >
          {linkLabel}
          <span aria-hidden className="text-base leading-none">
            ›
          </span>
        </Link>
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
    <article
      className={cn(
        'relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)] ring-1 ring-black/[0.06]',
        className,
      )}
    >
      <div className="bg-secondary relative aspect-[1128/400] w-full sm:aspect-[1128/360]">
        <Image
          src="/home/why-achra/workflows.png"
          alt="Workflow templates: connected steps from RFP to payouts"
          width={1128}
          height={880}
          className="h-full w-full object-cover object-top"
          sizes="(min-width: 1024px) 33vw, 100vw"
          priority={false}
        />
      </div>
      <div className="flex flex-col gap-4 p-8">
        <h3 className={titleClass}>{title}</h3>
        <p className={bodyClass}>{description}</p>
      </div>
    </article>
  )
}

export { WhyAchraAccentCard, WhyAchraCtaCard, WhyAchraTextCard, WhyAchraWorkflowCard }
