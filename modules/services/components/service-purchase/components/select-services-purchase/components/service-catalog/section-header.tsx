'use client'

import { Lock } from 'lucide-react'
import { Switch } from '@/modules/shared/components/ui/switch'
import { cn } from '@/modules/shared/lib/utils'
import ServiceCatalogStatus from '../service-catalog-status/service-catalog-status'
import type { CatalogStatus, PricingPlan } from '../types'

interface SectionHeaderProps {
  title: string
  badge?: CatalogStatus
  hasToggle?: boolean
  toggleLabel?: string
  toggleEnabled?: boolean
  onToggleChange?: (enabled: boolean) => void
  oneTimeFee?: string
  oneTimeFeeVariant?: 'primary' | 'muted'
  activePlan?: PricingPlan
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
  activePlan,
}: Readonly<SectionHeaderProps>) {
  return (
    <div
      className={cn(
        'bg-accent relative grid items-stretch gap-4 border-b px-6',
        'grid-cols-[4fr_repeat(4,1fr)]',
      )}
    >
      <div className="flex items-center gap-3 py-3">
        {hasToggle ? (
          <div className="flex items-center gap-2">
            <Switch
              checked={toggleEnabled}
              onCheckedChange={onToggleChange}
              id={`toggle-${title}`}
              className="data-[state=checked]:bg-status-progress"
            />
            <label
              htmlFor={`toggle-${title}`}
              className="text-foreground cursor-pointer text-sm font-semibold"
            >
              {toggleLabel ?? title}
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

      {(['basic', 'team', 'premium', 'enterprise'] as PricingPlan[]).map((plan) => (
        <div
          key={plan}
          className={cn(
            'pointer-events-none flex items-center justify-center transition-colors',
            activePlan === plan && 'bg-primary/30',
          )}
        />
      ))}

      {oneTimeFee && (
        <span
          className={cn(
            'absolute top-1/2 right-6 -translate-y-1/2 text-xs font-medium',
            oneTimeFeeVariant === 'primary' ? 'text-primary' : 'text-muted-foreground',
          )}
        >
          {oneTimeFee}
        </span>
      )}
    </div>
  )
}
