'use client'
import Link from 'next/link'
import { Fragment, useMemo, useRef, useState } from 'react'
import { useMountedState } from 'react-use'
import { useResizeObserver } from 'usehooks-ts'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../ui/breadcrumb'
import DotsSegment from './components/dot-segments'
import { MAX_ALLOWED_WIDTH, MAX_SEGMENT_WIDTH_MOBILE_DEFAULT, THREE_DOTS_WIDTH } from './constants'
import { getTextWidth, mobileRecommendedSegmentWidth } from './utils'
import type { BreadcrumbItemExtended, BreadcrumbItemNavigation } from './types'
import type { Route } from 'next'

interface BreadcrumbNavigatioProps {
  items: BreadcrumbItemNavigation[]
  defaultOpen?: boolean
  className?: string
  maxSegmentWidthMobile?: number
}

function BreadcrumbNavigation({
  items,
  defaultOpen = false,
  className,
  maxSegmentWidthMobile = MAX_SEGMENT_WIDTH_MOBILE_DEFAULT,
}: BreadcrumbNavigatioProps) {
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
      const labelWidth = !isMounted()
        ? MAX_ALLOWED_WIDTH
        : getTextWidth(item.label, `${index === items.length - 1 ? 400 : 600} 16px Inter`)
      return {
        ...item,
        labelWidth,
        recommendedWidth: Math.min(labelWidth, MAX_ALLOWED_WIDTH),
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

  return (
    <Breadcrumb className={`w-ful ${className}`}>
      <div className="w-[calc(100%-32px)] max-md:mx-4 max-md:rounded-xl md:w-full">
        <div>
          <div ref={contentRef} className="flex items-center justify-between max-md:-mx-2">
            <div className="flex w-full items-center lg:hidden">
              <BreadcrumbList>
                {itemsExtended.length > 1 && (
                  <>
                    <BreadcrumbItem>
                      <DotsSegment items={items} defaultOpen={defaultOpen} />
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
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
                {groupedItems.map((item: BreadcrumbItemExtended, index: number) => (
                  <Fragment key={`${item.label}-${item.href}-${item.recommendedWidth}`}>
                    <BreadcrumbItem
                      className="group text-foreground/70 cursor-pointer text-base font-semibold"
                      style={{ maxWidth: item.recommendedWidth }}
                    >
                      {item.label === '...' ? (
                        <DotsSegment items={item.attachedItems ?? []} defaultOpen={defaultOpen} />
                      ) : index === groupedItems.length - 1 ? (
                        <BreadcrumbPage className="overflow-hidden text-base text-ellipsis whitespace-nowrap">
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
                ))}
              </BreadcrumbList>
            </div>
          </div>
        </div>
      </div>
    </Breadcrumb>
  )
}

export default BreadcrumbNavigation
