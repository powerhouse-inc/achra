import Image from 'next/image'

import { cn } from '@/shared/lib/utils'

interface TabCompositePanelProps {
  src: string
  alt: string
  width: number
  height: number
  priority?: boolean
  className?: string
}

/** Single exported mockup (full scene) with the same chrome as the org collage container. */
function TabCompositePanel({
  src,
  alt,
  width,
  height,
  priority,
  className,
}: TabCompositePanelProps) {
  return (
    <div
      className={cn(
        'relative mx-auto w-full max-w-[min(100%,504px)] overflow-hidden rounded-xl bg-[rgb(240,240,240)]',
        'shadow-[0px_16px_32px_rgba(0,0,0,0.08),0px_8px_16px_rgba(0,0,0,0.08)] ring-1 ring-black/[0.08]',
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="h-auto w-full object-contain object-top"
        sizes="(min-width: 1024px) 504px, 92vw"
        priority={priority}
      />
    </div>
  )
}

export { TabCompositePanel }
