import Image from 'next/image'

import { cn } from '@/shared/lib/utils'

interface WhyAchraWorkflowCardProps {
  title: string
  description: string
  className?: string
}

function WhyAchraWorkflowCard({ title, description, className }: WhyAchraWorkflowCardProps) {
  return (
    <article
      className={cn(
        'relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)] ring-1 ring-black/6',
        className,
      )}
    >
      <div className="flex flex-col gap-4 p-10">
        <div className="relative h-[130px] w-[245px] overflow-hidden">
          <Image
            src="/home/why-achra/workflows.webp"
            alt="Workflow templates: connected steps from RFP to payouts"
            fill
            quality={100}
            className="object-cover object-center"
            priority={false}
            sizes="245px"
          />
        </div>
        <h3 className="text-foreground text-xl font-semibold tracking-tight xl:text-2xl">
          {title}
        </h3>
        <p className="text-foreground/80 text-base">{description}</p>
      </div>
    </article>
  )
}

export { WhyAchraWorkflowCard }
