'use client'

import { useMemo } from 'react'
import { GenericErrorState } from './generic-error-state'
import { NetworkErrorState } from './network-error-state'
import type { LucideIcon } from 'lucide-react'

interface SmartErrorStateProps {
  icon?: LucideIcon
  title?: string
  description?: string
  showBorder?: boolean
  className?: string
}

function SmartErrorState({
  icon,
  title,
  description,
  showBorder = true,
  className,
}: SmartErrorStateProps) {
  const isOnline = useMemo(() => {
    if (typeof window === 'undefined') return true

    return navigator.onLine
  }, [])

  if (!isOnline) {
    return <NetworkErrorState showBorder={showBorder} className={className} />
  }

  return (
    <GenericErrorState
      icon={icon}
      title={title}
      description={description}
      showBorder={showBorder}
      className={className}
    />
  )
}

export { SmartErrorState }
