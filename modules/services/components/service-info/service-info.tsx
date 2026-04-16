'use client'

import { AnimatePresence, motion } from 'motion/react'
import Image from 'next/image'
import { type ReactNode, useEffect, useState } from 'react'
import type { Maybe } from '@/modules/__generated__/graphql/switchboard-generated'
import { SERVICE_INFO_DEFAULT_COVER_PATH } from '@/modules/services/lib/constants'
import { Card, CardContent } from '@/modules/shared/components/ui/card'
import { cn } from '@/modules/shared/lib/utils'

interface ServiceInfoProps {
  isCompacted?: boolean
  title?: string
  summary?: Maybe<string>
  thumbnailUrl?: string
  id: string
  children?: ReactNode
  actions?: ReactNode
  operator?: ReactNode
  details?: ReactNode
}

function ServiceInfo({
  isCompacted,
  title,
  summary,
  thumbnailUrl,
  children,
  actions,
  operator,
  details,
}: Readonly<ServiceInfoProps>) {
  const [hasTransition, setHasTransition] = useState(false)
  const coverImage = thumbnailUrl ?? SERVICE_INFO_DEFAULT_COVER_PATH

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setHasTransition(true)
    })
    return () => {
      cancelAnimationFrame(id)
    }
  }, [])

  return (
    <Card
      className="border-none bg-transparent p-0 shadow-none"
      data-mode={isCompacted ? 'light' : 'dense'}
    >
      <CardContent
        className={cn(
          'flex flex-col gap-4 px-0 sm:flex-row lg:gap-6',
          isCompacted && 'flex-row items-center gap-2',
        )}
      >
        <span
          className={cn('text-foreground text-lg/5 font-bold sm:hidden', isCompacted && 'hidden')}
        >
          {title}
        </span>
        <div
          className={cn(
            'flex flex-col gap-2 sm:gap-4',
            isCompacted ? 'gap-0' : 'sm:sticky sm:top-30 sm:self-start',
          )}
        >
          <div
            className={cn(
              'relative h-32 w-full sm:min-w-32 md:h-64 md:min-w-64',
              hasTransition && 'transition-[width,height,border-radius] duration-300 ease-out',
              isCompacted &&
                'border-background shadow-primary size-14! min-w-14! overflow-hidden rounded-full border-2',
            )}
          >
            <Image
              src={thumbnailUrl ?? coverImage}
              alt={title ?? ''}
              fill
              // services images can be stored anywhere, so we can't predict the URL to optimize them
              unoptimized
              className="absolute rounded-lg md:rounded-2xl"
              style={{ objectFit: 'cover' }}
            />
          </div>
          {!isCompacted && children && <div className="flex flex-col gap-2">{children}</div>}
        </div>
        <div
          className={cn('flex w-full flex-col', isCompacted ? 'gap-2 lg:gap-1' : 'gap-4 lg:gap-4')}
        >
          <h1
            className={cn(
              'text-foreground hidden text-xl/6 font-bold sm:block',
              isCompacted && 'block text-base/5 lg:text-2xl/7',
            )}
          >
            {title}
          </h1>
          <AnimatePresence initial={false}>
            {operator && (
              <motion.div
                key="operator"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
                style={{ overflow: 'hidden' }}
              >
                {operator}
              </motion.div>
            )}
          </AnimatePresence>
          <div
            className={cn('text-foreground text-sm/5.5 lg:text-base/6', isCompacted && 'hidden')}
          >
            {summary}
          </div>
          {details}
        </div>
      </CardContent>
      {actions && <div className="flex items-end justify-end">{actions}</div>}
    </Card>
  )
}

export { ServiceInfo }
