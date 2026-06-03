'use client'

import { useLayoutEffect, useRef } from 'react'
import { ScrollArea } from '@/modules/shared/components/ui/scroll-area'

interface ServiceSectionsCardListProps {
  items: string[]
}

function ServiceSectionsCardList({ items }: Readonly<ServiceSectionsCardListProps>) {
  const rootRef = useRef<HTMLDivElement>(null)
  const topFadeRef = useRef<HTMLDivElement>(null)
  const bottomFadeRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return
    const viewport = root.querySelector<HTMLDivElement>('[data-slot="scroll-area-viewport"]')
    if (!viewport) return

    const update = () => {
      const distanceToBottom = viewport.scrollHeight - viewport.scrollTop - viewport.clientHeight
      if (bottomFadeRef.current) {
        bottomFadeRef.current.style.opacity = distanceToBottom <= 1 ? '0' : '1'
      }
      if (topFadeRef.current) {
        topFadeRef.current.style.opacity = viewport.scrollTop <= 0 ? '0' : '1'
      }
    }

    update()
    viewport.addEventListener('scroll', update, { passive: true })
    const observer = new ResizeObserver(update)
    observer.observe(viewport)
    const list = viewport.querySelector('ul')
    if (list) observer.observe(list)

    return () => {
      viewport.removeEventListener('scroll', update)
      observer.disconnect()
    }
  }, [])

  return (
    <div ref={rootRef} className="contents">
      <ScrollArea className="h-full">
        <ul className="pr-4">
          {items.map((item) => (
            <li key={item} className="mb-0 ml-2 flex items-center gap-2">
              <div className="bg-foreground size-1 min-w-1 rounded-full" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </ScrollArea>
      <div
        ref={topFadeRef}
        aria-hidden
        className="from-card pointer-events-none absolute inset-x-0 top-0 h-8 bg-linear-to-b to-transparent opacity-0 transition-opacity duration-150"
      />
      <div
        ref={bottomFadeRef}
        aria-hidden
        className="from-card pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-linear-to-t to-transparent opacity-0 transition-opacity duration-150"
      />
    </div>
  )
}

export { ServiceSectionsCardList }
