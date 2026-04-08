import Image from 'next/image'

import { cn } from '@/shared/lib/utils'

/** Layer sizes / positions derived from Framer desktop CSS (500×400 artboard). */
const LAYERS = [
  {
    id: 'base',
    src: '/home/build-network/orgs/base.png',
    alt: 'Builder workspace frame',
    wrapperClassName:
      'inset-0 z-0 overflow-hidden rounded-xl ring-1 ring-black/[0.08] shadow-[0px_16px_32px_rgba(0,0,0,0.08),0px_8px_16px_rgba(0,0,0,0.08)]',
    imageClassName: 'object-cover object-left-top',
  },
  {
    id: 'profile',
    src: '/home/build-network/builders/profile.png',
    alt: '',
    wrapperClassName:
      'left-[8.7%] top-[-3.75%] z-10 w-[56.7%] aspect-[286/136] overflow-visible rounded-lg shadow-[0_12px_28px_-8px_rgba(0,0,0,0.18)]',
    imageClassName: 'object-cover object-center',
  },
  {
    id: 'chart',
    src: '/home/build-network/builders/chart.png',
    alt: '',
    wrapperClassName:
      'right-[-2.4%] top-[34.75%] z-20 w-[52%] aspect-[262/273] overflow-visible rounded-lg shadow-[0_12px_28px_-8px_rgba(0,0,0,0.18)]',
    imageClassName: 'object-cover object-center',
  },
  {
    id: 'rfp',
    src: '/home/build-network/builders/rfp.png',
    alt: '',
    wrapperClassName:
      'left-[4.2%] top-[48%] z-30 w-[44.2%] aspect-[223/114] overflow-visible rounded-lg shadow-[0_12px_28px_-8px_rgba(0,0,0,0.18)]',
    imageClassName: 'object-cover object-center',
  },
] as const

interface BuildersTabCollageProps {
  className?: string
  priority?: boolean
}

function BuildersTabCollage({ className, priority }: BuildersTabCollageProps) {
  return (
    <div
      className={cn(
        'relative isolate mx-auto w-full max-w-[min(100%,504px)] overflow-visible',
        'aspect-[500/400]',
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

export { BuildersTabCollage }
