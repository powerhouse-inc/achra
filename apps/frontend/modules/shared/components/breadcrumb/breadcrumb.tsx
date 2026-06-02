'use client'
import Link from 'next/link'
import { Fragment, Suspense, useMemo, useRef, useState } from 'react'
import { useMountedState } from 'react-use'
import { useResizeObserver } from 'usehooks-ts'
import { getTextWidth, mobileRecommendedSegmentWidth } from '@/modules/shared/lib/breadcrumb-utils'
import {
  MAX_ALLOWED_WIDTH,
  MAX_SEGMENT_WIDTH_MOBILE_DEFAULT,
  THREE_DOTS_WIDTH,
} from '@/modules/shared/lib/constants'
import type {
  BreadcrumbItemExtended,
  BreadcrumbItemNavigation,
} from '@/modules/shared/types/breadcrumb'
import { cn } from '@/shared/lib/utils'
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  Breadcrumb as BreadcrumbPrimitive,
  BreadcrumbSeparator,
} from '../ui/breadcrumb'
import { DotsSegment } from './components/dot-segments'
import { EllipsisSkeleton } from './components/ellipsis-skeleton'
import type { Route } from 'next'

interface BreadcrumbProps {
  items: BreadcrumbItemNavigation[]
  defaultOpen?: boolean
  className?: string
  maxSegmentWidthMobile?: number
}

function Breadcrumb({
  items,
  defaultOpen = false,
  className,
  maxSegmentWidthMobile = MAX_SEGMENT_WIDTH_MOBILE_DEFAULT,
}: BreadcrumbProps) {
  const isMounted = useMountedState()
  const [elementWidths, setElementWidths] = useState([0, 0])
  const contentRef = useRef<HTMLDivElement>(null)

  useResizeObserver({
    ref: contentRef as React.RefObject<HTMLElement>,
    onResize: (size) => {
      if (size.width) {
        setElementWidths([size.width])
      }
    },
  })

  const itemsExtended = useMemo(() => {
    return items.map((item, index) => {
      const isLastItem = index === items.length - 1
      const labelWidth = !isMounted()
        ? MAX_ALLOWED_WIDTH
        : getTextWidth(item.label, `${isLastItem ? 400 : 600} 16px Inter`)
      return {
        ...item,
        labelWidth,
        recommendedWidth: isLastItem ? labelWidth : Math.min(labelWidth, MAX_ALLOWED_WIDTH),
      }
    })
  }, [isMounted, items])

  const groupedItems = useMemo(() => {
    if (itemsExtended.length <= 3) return itemsExtended
    return [
      itemsExtended[0],
      {
        label: '...',
        href: '#' as Route,
        labelWidth: 0,
        recommendedWidth: THREE_DOTS_WIDTH,
        attachedItems: itemsExtended.slice(1, itemsExtended.length - 2),
      },
      ...itemsExtended.slice(-2),
    ]
  }, [itemsExtended])

  // Calculate the maxWidth for the last item: if it's > 300px, truncate it to 300px, if not, show it completely
  const lastItemMaxWidth = useMemo(() => {
    if (!isMounted() || groupedItems.length === 0) return undefined

    const lastItem = groupedItems[groupedItems.length - 1]

    // If the text is greater than MAX_ALLOWED_WIDTH, truncate it to MAX_ALLOWED_WIDTH
    // If not, show it completely (undefined = no limit)
    return lastItem.labelWidth > MAX_ALLOWED_WIDTH ? MAX_ALLOWED_WIDTH : undefined
  }, [isMounted, groupedItems])

  return (
    <BreadcrumbPrimitive className={cn('w-full', className)}>
      <div className="w-[calc(100%-32px)] max-md:mx-4 max-md:rounded-xl md:w-full">
        <div>
          <div ref={contentRef} className="flex items-center justify-between max-md:-mx-2">
            <div className="flex w-full items-center lg:hidden">
              <BreadcrumbList>
                {itemsExtended.length > 1 && (
                  <>
                    <BreadcrumbItem>
                      <Suspense fallback={<EllipsisSkeleton />}>
                        <DotsSegment items={items} defaultOpen={defaultOpen} />
                      </Suspense>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="text-foreground/30 [&>svg]:size-6" />
                  </>
                )}
                <BreadcrumbItem
                  style={{
                    maxWidth:
                      mobileRecommendedSegmentWidth(isMounted(), elementWidths) ??
                      maxSegmentWidthMobile,
                  }}
                >
                  <BreadcrumbPage className="overflow-hidden text-base font-semibold text-ellipsis whitespace-nowrap">
                    {itemsExtended[itemsExtended.length - 1]?.label}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </div>

            {/* --- Desktop view --- */}
            <div className="hidden w-full items-center lg:flex">
              <BreadcrumbList>
                {groupedItems.map((item: BreadcrumbItemExtended, index: number) => {
                  const isLastItem = index === groupedItems.length - 1
                  return (
                    <Fragment key={`${item.label}-${item.href}-${item.recommendedWidth}`}>
                      <BreadcrumbItem
                        className={cn(
                          'group text-foreground/30 cursor-pointer text-base font-normal',
                          isLastItem && 'min-w-0',
                          isLastItem && lastItemMaxWidth === undefined && 'flex-1',
                        )}
                        style={
                          isLastItem
                            ? lastItemMaxWidth !== undefined
                              ? {
                                  maxWidth: `${lastItemMaxWidth}px`,
                                  width: `${lastItemMaxWidth}px`,
                                }
                              : undefined
                            : { maxWidth: item.recommendedWidth }
                        }
                      >
                        {item.label === '...' ? (
                          <Suspense fallback={<EllipsisSkeleton />}>
                            <DotsSegment
                              items={item.attachedItems ?? []}
                              defaultOpen={defaultOpen}
                            />
                          </Suspense>
                        ) : isLastItem ? (
                          <BreadcrumbPage className="block w-full min-w-0 overflow-hidden text-base font-semibold text-ellipsis whitespace-nowrap">
                            {item.label}
                          </BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink asChild>
                            <Link
                              href={item.href}
                              className="text-foreground/50 flex items-center overflow-hidden font-normal text-ellipsis whitespace-nowrap no-underline"
                            >
                              <span className="cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap">
                                {item.label}
                              </span>
                            </Link>
                          </BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                      {index < groupedItems.length - 1 && (
                        <BreadcrumbSeparator className="text-foreground/30 pr-1 [&>svg]:size-6" />
                      )}
                    </Fragment>
                  )
                })}
              </BreadcrumbList>
            </div>
          </div>
        </div>
      </div>
    </BreadcrumbPrimitive>
  )
}

export { Breadcrumb }
