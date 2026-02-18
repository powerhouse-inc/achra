'use client'

import { SectionHeader } from './section-header'
import { useServiceCatalogContext } from './service-catalog-root'
import type { CatalogStatus } from '../types'

export interface ServiceCatalogHeaderProps {
  title: string
  badge?: CatalogStatus
  hasToggle?: boolean
  toggleLabel?: string
  toggleEnabled?: boolean
  onToggleChange?: (enabled: boolean) => void
}

export function ServiceCatalogHeader({
  title,
  badge,
  hasToggle,
  toggleLabel,
  toggleEnabled = false,
  onToggleChange,
}: Readonly<ServiceCatalogHeaderProps>) {
  const { activePlan } = useServiceCatalogContext()
  return (
    <SectionHeader
      title={title}
      badge={badge}
      hasToggle={hasToggle}
      toggleLabel={toggleLabel}
      toggleEnabled={toggleEnabled}
      onToggleChange={onToggleChange}
      activePlan={activePlan}
    />
  )
}
