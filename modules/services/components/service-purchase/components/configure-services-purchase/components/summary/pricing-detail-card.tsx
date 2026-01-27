'use client'

import React, { useMemo } from 'react'
import { transformPricingSummary } from '@/modules/services/utils/transform-pricing-summary'
import { Badge } from '@/modules/shared/components/ui/badge'
import { Card, CardContent, CardFooter, CardHeader } from '@/modules/shared/components/ui/card'
import { cn } from '@/modules/shared/lib/utils'
import { PRICING_DATA } from '../../../../mock/mock-data'
import type { Plan } from '../types'

interface PricingDetailCardProps {
  selectedPlan: Plan
  enabledSections: Record<string, boolean>
  className?: string
}

export function PricingDetailCard({
  selectedPlan,
  enabledSections,
  className,
}: Readonly<PricingDetailCardProps>) {
  // Get active addons from enabledSections
  const activeAddons = useMemo(
    () => Object.keys(enabledSections).filter((key) => enabledSections[key]),
    [enabledSections],
  )

  // Transform pricing data using BFF function
  const pricingSummary = useMemo(
    () => transformPricingSummary(PRICING_DATA, selectedPlan, activeAddons),
    [selectedPlan, activeAddons],
  )

  const { summary } = pricingSummary

  // Format Helper - Simplified for summary values
  const formatValue = (value: string): React.ReactNode => {
    if (value === 'Included') {
      return <span className="text-primary text-xs font-bold">Included</span>
    }
    if (value === 'Optional') {
      return (
        <span className="text-muted-foreground bg-muted rounded px-2 py-0.5 text-xs font-semibold">
          Optional
        </span>
      )
    }
    return <span className="text-sm font-medium">{value}</span>
  }

  const formatSublabel = (sublabel: string, variant?: 'badge' | 'default'): React.ReactNode => {
    if (variant === 'badge') {
      return (
        <Badge
          variant="outline"
          className={cn(
            'rounded-md border-2 px-1 py-0 text-sm/5.5 font-semibold',
            'bg-purple/30 text-primary border-purple',
          )}
        >
          {sublabel}
        </Badge>
      )
    }
    return <span className="text-muted-foreground text-xs">{sublabel}</span>
  }

  return (
    <Card className={cn('w-full gap-3! border-none py-0! shadow-lg', className)}>
      <CardHeader className="bg-accent! flex flex-row items-center justify-between px-3 py-2">
        <h3 className="text-base/6 font-bold tracking-tight">Tier</h3>
        <span className="text-primary text-base/6 font-bold capitalize">{summary.tier_name}</span>
      </CardHeader>
      <CardContent className="space-y-6 px-3! pt-0">
        {/* Base Section - Main Features */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b pb-2">
            <span className="text-muted-foreground text-xs font-bold tracking-wide uppercase">
              Price Includes
            </span>
            <span className="text-primary font-bold">
              $
              {summary.total_monthly_price -
                summary.addons.reduce((sum, addon) => sum + addon.price, 0)}
              /mo
            </span>
          </div>

          <div className="space-y-3">
            {summary.main_features.map((feature) => (
              <div key={feature.label} className="flex items-center justify-between">
                <div className="flex flex-col">
                  <div className="flex gap-2">
                    <span className="text-sm font-medium">{feature.label}</span>
                    {feature.sublabel && formatSublabel(feature.sublabel, feature.sublabelVariant)}
                  </div>
                  {feature.hasOneTimeFee && (
                    <span className="text-muted-foreground text-xs">One-time fee</span>
                  )}
                </div>
                <div className="flex flex-col items-end">
                  {feature.hasOneTimeFee ? (
                    <>
                      <span className="text-sm font-bold">~</span>
                      <span className="font-bold">${summary.one_time_fee}</span>
                    </>
                  ) : feature.showApproxSymbol ? (
                    <span className="text-sm font-bold">~</span>
                  ) : (
                    formatValue(feature.value)
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Addons - Recurring Services */}
        {summary.addons.map((addon) => (
          <div key={addon.name} className="space-y-4">
            <div className="bg-muted/30 -mx-6 px-6 py-2">
              <div className="flex items-center justify-between">
                <span className="font-bold">Recurring Services</span>
                <span className="text-primary font-bold">{addon.name}</span>
              </div>
            </div>
            <div className="flex items-center justify-between border-b pb-2">
              <span className="text-muted-foreground text-xs font-bold tracking-wide uppercase">
                Price Includes
              </span>
              <span className="text-primary font-bold">+${addon.price}</span>
            </div>
            <div className="space-y-3">
              {addon.features.map((feature) => (
                <div key={feature.label} className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <span className="text-sm font-medium">{feature.label}</span>
                    {feature.sublabel && formatSublabel(feature.sublabel, feature.sublabelVariant)}
                  </div>
                  <div className="flex flex-col items-end">
                    {formatValue(feature.value)}
                    {feature.showApproxSymbol && <span className="font-bold">~</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter className="bg-accent flex items-center justify-between rounded-b-md border-t px-3! py-2!">
        <span className="text-lg font-bold">Monthly Total</span>
        <span className="text-primary text-lg font-bold">${summary.total_monthly_price}</span>
      </CardFooter>
    </Card>
  )
}
