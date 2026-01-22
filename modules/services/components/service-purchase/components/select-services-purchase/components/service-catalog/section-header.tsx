'use client'

import { Lock } from 'lucide-react'
import { Switch } from '@/modules/shared/components/ui/switch'
import { cn } from '@/modules/shared/lib/utils'
import ServiceCatalogStatus from '../service-catalog-status/service-catalog-status'
import { type CatalogStatus, type Plan, PRICING_PLANS } from '../types'

interface SectionHeaderProps {
  title: string
  badge?: CatalogStatus
  hasToggle?: boolean
  toggleLabel?: string
  toggleEnabled?: boolean
  onToggleChange?: (enabled: boolean) => void
  oneTimeFee?: string
  oneTimeFeeVariant?: 'primary' | 'muted'
  activePlan?: Plan
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
        'bg-accent grid items-center gap-4 border-b pl-6',
        'grid-cols-[minmax(0,4fr)_repeat(4,minmax(0,1fr))]',
      )}
    >
      <div className="flex h-14 items-center gap-3">
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

      {PRICING_PLANS.map((plan) => (
        <div
          key={plan}
          className={cn(
            'pointer-events-none flex h-14 min-w-0 items-center justify-center px-2 transition-colors',
            activePlan === plan && 'bg-primary/30',
            plan === 'enterprise' && 'relative pr-6',
          )}
        >
          {plan === 'enterprise' && oneTimeFee && (
            <span
              className={cn(
                'absolute right-6 text-xs font-medium whitespace-nowrap',
                oneTimeFeeVariant === 'primary' ? 'text-primary' : 'text-muted-foreground',
              )}
            >
              {oneTimeFee}
            </span>
          )}
        </div>
      ))}
    </div>
  )
}
