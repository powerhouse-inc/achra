'use client'

import { ErrorBoundary } from 'react-error-boundary'
import { SmartErrorState } from './smart-error-state'
import type { LucideIcon } from 'lucide-react'

interface ErrorBoundaryWithPresetsProps {
  children: React.ReactNode
  icon?: LucideIcon
  title?: string
  description?: string
  className?: string
}

function ErrorBoundaryWithPresets({
  children,
  icon,
  title,
  description,
  className,
}: ErrorBoundaryWithPresetsProps) {
  return (
    <ErrorBoundary
      fallback={
        <SmartErrorState
          icon={icon}
          title={title}
          description={description}
          className={className}
        />
      }
    >
      {children}
    </ErrorBoundary>
  )
}

export { ErrorBoundaryWithPresets }
