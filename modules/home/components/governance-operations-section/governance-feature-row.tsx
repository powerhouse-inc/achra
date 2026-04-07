import Image from 'next/image'

import { cn } from '@/shared/lib/utils'
import type { ReactNode } from 'react'

const bodyClass = 'text-muted-foreground text-base leading-relaxed text-pretty sm:text-lg'
const labelClass = 'text-foreground text-base font-medium sm:text-lg'

interface GovernanceBulletItem {
  id: string
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
  const imageBlock = (
    <div className="min-w-0 lg:flex-1">
      <div className="relative w-full overflow-hidden rounded-xl">
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={imageWidth}
          height={imageHeight}
          className="h-auto w-full object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>
    </div>
  )

  const textBlock = (
    <div className="flex min-w-0 flex-col gap-[18px] lg:flex-1">
      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
        <span className={labelClass}>{labelStart}</span>
        <span className={labelClass}>{labelEnd}</span>
      </div>
      <p className={bodyClass}>{description}</p>
      <ul className={cn('flex list-none flex-col gap-2.5', bulletListClassName)}>
        {bulletItems.map((item) => (
          <li
            key={item.id}
            className={cn(
              'text-muted-foreground before:bg-foreground/30 relative pl-5 text-base leading-relaxed before:absolute before:top-[0.55em] before:left-0 before:size-1 before:rounded-full before:content-[""]',
              bulletClassName,
            )}
          >
            {item.content}
          </li>
        ))}
      </ul>
    </div>
  )

  return (
    <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-x-[120px]">
      {imagePosition === 'left' ? (
        <>
          {imageBlock}
          {textBlock}
        </>
      ) : (
        <>
          {textBlock}
          {imageBlock}
        </>
      )}
    </div>
  )
}

export { GovernanceFeatureRow }
export type { GovernanceBulletItem, GovernanceFeatureRowProps }
