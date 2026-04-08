import Image from 'next/image'

import { cn } from '@/shared/lib/utils'

/** Layer sizes / positions derived from Framer desktop CSS (500×400 artboard). */
const LAYERS = [
  {
    id: 'base',
    src: '/home/build-network/orgs/base.png',
    alt: 'Operator services frame',
    wrapperClassName:
      'inset-0 z-0 overflow-hidden rounded-xl ring-1 ring-black/[0.08] shadow-[0px_16px_32px_rgba(0,0,0,0.08),0px_8px_16px_rgba(0,0,0,0.08)]',
    imageClassName: 'object-cover object-left-top',
  },
  {
    id: 'card',
    src: '/home/build-network/operators/card.png',
    alt: '',
    wrapperClassName:
      'left-[13.3%] top-[10.25%] z-10 w-[79.4%] aspect-[400/319] overflow-visible rounded-lg shadow-[0_12px_28px_-8px_rgba(0,0,0,0.18)]',
    imageClassName: 'object-cover object-center',
  },
] as const

interface OperatorsTabCollageProps {
  className?: string
  priority?: boolean
}

function OperatorsTabCollage({ className, priority }: OperatorsTabCollageProps) {
  return (
    <div
      className={cn(
        'relative isolate mx-auto w-full max-w-[min(100%,504px)] overflow-visible',
        'aspect-500/400',
        className,
      )}
    >
      {LAYERS.map((layer, index) => (
        <div key={layer.id} className={cn('pointer-events-none absolute', layer.wrapperClassName)}>
          <div className="relative h-full w-full">
            <Image
              src={layer.src}
              alt={layer.alt}
              fill
              priority={Boolean(priority && index === 0)}
              className={cn('rounded-[inherit]', layer.imageClassName)}
              sizes="(min-width: 1024px) 504px, 92vw"
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export { OperatorsTabCollage }
