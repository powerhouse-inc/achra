'use client'

import makeBlockie from 'ethereum-blockies-base64'
import { useMemo } from 'react'
import { cn } from '../../lib/utils'
import { Skeleton } from '../ui/skeleton'

interface IdenticonProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
}

function Identicon({ value, className, ...props }: IdenticonProps) {
  const blockie = useMemo(() => {
    try {
      return makeBlockie(value)
    } catch (_) {
      return null
    }
  }, [value])

  const hasSizeClass = className?.includes('size-') ?? false

  return !blockie ? (
    <Skeleton className={cn('rounded-full', { 'size-8': !hasSizeClass }, className)} />
  ) : (
    <div
      style={{
        backgroundImage: `url(${blockie})`,
      }}
      className={cn('rounded-full bg-cover', { 'size-8': !hasSizeClass }, className)}
      {...props}
    />
  )
}

export { Identicon }
