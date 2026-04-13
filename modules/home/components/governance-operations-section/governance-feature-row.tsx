import Image from 'next/image'
import { cn } from '@/shared/lib/utils'
import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

interface GovernanceBulletItem {
  id: string
  icon: LucideIcon
  content: ReactNode
}

interface GovernanceFeatureRowProps {
  imageSrc: string
  imageAlt: string
  imageWidth: number
  imageHeight: number
  imagePosition: 'left' | 'right'
  labelStart: string
  labelEnd: string
  description: string
  bulletItems: GovernanceBulletItem[]
  bulletListClassName?: string
  bulletClassName?: string
}

function GovernanceFeatureRow({
  imageSrc,
  imageAlt,
  imageWidth,
  imageHeight,
  imagePosition,
  labelStart,
  labelEnd,
  description,
  bulletItems,
  bulletListClassName,
  bulletClassName,
}: GovernanceFeatureRowProps) {
  return (
    <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-x-[120px]">
      <div className={cn('min-w-0 lg:flex-1', imagePosition === 'right' && 'lg:order-2')}>
        <div className="border-border relative w-full overflow-hidden rounded-xl border shadow-xs">
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={imageWidth}
            height={imageHeight}
            priority
            className="h-auto w-full object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>
      <div
        className={cn(
          'flex min-w-0 flex-col gap-[18px] lg:flex-1',
          imagePosition === 'right' && 'lg:order-1',
        )}
      >
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-lg font-semibold tracking-tight sm:text-2xl">
          <span className="text-primary">{labelStart}</span>
          <span className="text-foreground">{labelEnd}</span>
        </div>
        <p className="text-foreground/80 text-base leading-relaxed text-pretty">{description}</p>
        <ul className={cn('flex list-none flex-col gap-2.5', bulletListClassName)}>
          {bulletItems.map((item) => {
            const Icon = item.icon
            return (
              <li
                key={item.id}
                className={cn(
                  'text-foreground/80 flex items-center gap-2.5 text-sm leading-relaxed',
                  bulletClassName,
                )}
              >
                <div className="bg-primary/10 flex size-7.5 shrink-0 items-center justify-center rounded-lg">
                  <Icon className="text-primary size-5" aria-hidden />
                </div>
                {item.content}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export { GovernanceFeatureRow }
export type { GovernanceBulletItem, GovernanceFeatureRowProps }
