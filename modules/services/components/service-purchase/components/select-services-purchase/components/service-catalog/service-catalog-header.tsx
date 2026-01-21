'use client'

import { SectionHeader } from './section-header'
import type { CatalogStatus } from '../types'

export interface ServiceCatalogHeaderProps {
  title: string
  badge?: CatalogStatus
  hasToggle?: boolean
  toggleLabel?: string
  toggleEnabled?: boolean
  onToggleChange?: (enabled: boolean) => void
  oneTimeFee?: string
  oneTimeFeeVariant?: 'primary' | 'muted'
}

export function ServiceCatalogHeader({
  title,
  badge,
  hasToggle,
  toggleLabel,
  toggleEnabled = false,
  onToggleChange,
  oneTimeFee,
  oneTimeFeeVariant = 'muted',
}: Readonly<ServiceCatalogHeaderProps>) {
  return (
    <SectionHeader
      title={title}
      badge={badge}
      hasToggle={hasToggle}
      toggleLabel={toggleLabel}
      toggleEnabled={toggleEnabled}
      onToggleChange={onToggleChange}
      oneTimeFee={oneTimeFee}
      oneTimeFeeVariant={oneTimeFeeVariant}
    />
  )
}
