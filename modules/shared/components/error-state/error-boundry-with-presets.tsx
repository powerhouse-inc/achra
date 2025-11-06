'use client'

import { ErrorBoundary } from 'react-error-boundary'
import { SmartErrorState } from './smart-error-state'
import type { LucideIcon } from 'lucide-react'

interface ErrorBoundaryWithPresetsProps {
  children: React.ReactNode
  icon?: LucideIcon
  title?: string
  description?: string
}

function ErrorBoundaryWithPresets({
  children,
  icon,
  title,
  description,
}: ErrorBoundaryWithPresetsProps) {
  return (
    <ErrorBoundary
      fallback={<SmartErrorState icon={icon} title={title} description={description} />}
    >
      {children}
    </ErrorBoundary>
  )
}

export { ErrorBoundaryWithPresets }
