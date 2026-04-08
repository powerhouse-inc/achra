import Image from 'next/image'

import { cn } from '@/shared/lib/utils'
import { FloatingLayer } from './floating-layer'

/** Layer sizes / positions derived from Framer desktop CSS (500×400 artboard). */
const LAYERS = [
  {
    id: 'base',
    src: '/home/build-network/orgs/base.png',
    alt: 'Network organization dashboard frame',
    wrapperClassName: 'inset-0 z-0 overflow-hidden rounded-xl ring-1 ring-black/[0.08] shadow-lg',
    imageClassName: 'object-cover object-left-top',
  },
  {
    id: 'network',
    src: '/home/build-network/orgs/network.png',
    alt: '',
    wrapperClassName:
      'left-[6.6%] top-[-5.25%] z-10 w-[55.2%] aspect-[890/540] overflow-visible rounded-lg drop-shadow-xs',
    imageClassName: 'object-cover object-left-top',
  },
  {
    id: 'card-top-right',
    src: '/home/build-network/orgs/card-top-right.png',
    alt: '',
    wrapperClassName:
      'right-[-1.6%] top-[-11.75%] z-20 w-[39.6%] aspect-[872/1234] overflow-visible rounded-lg drop-shadow-xs',
    imageClassName: 'object-cover object-center',
  },
  {
    id: 'card-bottom-left',
    src: '/home/build-network/orgs/card-bottom-left.png',
    alt: '',
    wrapperClassName:
      'bottom-[-0.25%] left-[0.2%] z-30 w-[37.2%] aspect-[879/975] overflow-visible rounded-lg drop-shadow-xs',
    imageClassName: 'object-cover object-center',
  },
  {
    id: 'card-bottom-right',
    src: '/home/build-network/orgs/card-bottom-right.png',
    alt: '',
    wrapperClassName:
      'bottom-[-4%] right-[13%] z-40 w-[49.2%] aspect-[692/698] overflow-visible rounded-lg drop-shadow-xs',
    imageClassName: 'object-cover object-center',
  },
] as const

interface OrgTabCollageProps {
  className?: string
  priority?: boolean
}

function OrgTabCollage({ className, priority }: OrgTabCollageProps) {
  return (
    <div
      className={cn(
        'relative isolate mx-auto w-full max-w-[min(100%,504px)] overflow-visible',
        'aspect-500/400',
        className,
      )}
    >
      {LAYERS.map((layer, index) => {
        const content = (
          <div
            key={layer.id}
            className={cn('pointer-events-none absolute', layer.wrapperClassName)}
          >
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
        )

        if (index === 0) return content

        return (
          <FloatingLayer key={layer.id} index={index - 1}>
            {content}
          </FloatingLayer>
        )
      })}
    </div>
  )
}

export { OrgTabCollage }
