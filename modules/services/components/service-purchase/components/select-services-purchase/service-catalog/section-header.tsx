'use client'

import { Lock } from 'lucide-react'
import { Switch } from '@/modules/shared/components/ui/switch'
import ServiceCatalogStatus from '../service-catalog-status/service-catalog-status'
import type { CatalogStatus } from '../types'

interface SectionHeaderProps {
  title: string
  badge?: CatalogStatus
  hasToggle?: boolean
  toggleLabel?: string
  toggleEnabled?: boolean
  onToggleChange?: (enabled: boolean) => void
  oneTimeFee?: string
  oneTimeFeeVariant?: 'primary' | 'muted'
}

export function SectionHeader({
  title,
  badge,
  hasToggle,
  toggleLabel,
  toggleEnabled = false,
  onToggleChange,
  oneTimeFee,
  oneTimeFeeVariant = 'muted',
}: Readonly<SectionHeaderProps>) {
  return (
    <div className="bg-muted/30 flex items-center justify-between border-b px-6 py-3">
      <div className="flex items-center gap-3">
        {hasToggle ? (
          <div className="flex items-center gap-2">
            <Switch
              checked={toggleEnabled}
              onCheckedChange={onToggleChange}
              id={`toggle-${title}`}
            />
            <label
              htmlFor={`toggle-${title}`}
              className="text-foreground cursor-pointer text-sm font-semibold"
            >
              {toggleLabel || title}
            </label>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Lock className="text-muted-foreground size-4" />
            <span className="text-foreground text-sm font-semibold">{title}</span>
          </div>
        )}

        {badge && <ServiceCatalogStatus catalogStatus={badge} />}
      </div>

      {oneTimeFee && (
        <span
          className={`text-xs font-medium ${
            oneTimeFeeVariant === 'primary' ? 'text-primary' : 'text-muted-foreground'
          }`}
        >
          {oneTimeFee}
        </span>
      )}
    </div>
  )
}
