'use client'

import { cn } from '@achra/ui/lib/utils'
import { ArrowRight, Check, FileText, Shield, Users, Wallet } from 'lucide-react'
import { useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'
import { CountUp } from '@/shared/components/count-up'

const ACTIVITY_CYCLE_MS = 2600

const activityRows = [
  {
    id: 'invoice',
    icon: Check,
    iconClass: 'text-status-success',
    iconBgClass: 'bg-status-success/10',
    title: 'Invoice #1042 paid',
    detail: 'dev@contributor.eth • $4,200',
    time: '2h ago',
  },
  {
    id: 'agreement',
    icon: FileText,
    iconClass: 'text-status-progress',
    iconBgClass: 'bg-status-progress/10',
    title: 'Agreement signed',
    detail: 'New contributor onboarded',
    time: '5h ago',
  },
  {
    id: 'payroll',
    icon: Wallet,
    iconClass: 'text-primary',
    iconBgClass: 'bg-primary/10',
    title: 'Payroll processed',
    detail: '8 contributors • $38,400',
    time: '1d ago',
  },
]

/**
 * Product mock that behaves like a live dashboard: the stats count up on
 * first view and the activity feed pulses through its rows.
 */
function DashboardCard() {
  const prefersReducedMotion = useReducedMotion()
  const [activeRow, setActiveRow] = useState(0)

  useEffect(() => {
    if (prefersReducedMotion) return
    const intervalId = setInterval(() => {
      setActiveRow((current) => (current + 1) % activityRows.length)
    }, ACTIVITY_CYCLE_MS)
    return () => {
      clearInterval(intervalId)
    }
  }, [prefersReducedMotion])

  return (
    <div className="bg-card text-card-foreground ring-border/60 w-full max-w-[375px] overflow-hidden rounded-2xl shadow-lg ring-1">
      <div className="flex items-center gap-3 px-5 pt-5 pb-4">
        <div className="bg-primary shadow-primary flex size-10 items-center justify-center rounded-xl">
          <Shield className="text-primary-foreground size-5" strokeWidth={2.5} />
        </div>
        <div className="flex-1">
          <p className="text-foreground text-sm font-semibold">Your Operational Hub</p>
          <p className="text-muted-foreground text-xs">Swiss Association • Active</p>
        </div>
        <div className="flex items-center gap-1.5 rounded-full">
          <span className="relative flex size-1.5" aria-hidden>
            <span className="bg-status-success absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 motion-reduce:hidden" />
            <span className="bg-status-success relative inline-flex size-1.5 rounded-full" />
          </span>
          <span className="text-status-success text-xs font-medium">LIVE</span>
        </div>
      </div>

      <div className="mx-5 mb-4 grid grid-cols-3 gap-2">
        <div className="bg-secondary flex flex-col items-center rounded-xl px-2 py-2.5">
          <span className="text-foreground text-base font-bold">
            $<CountUp to={47.2} duration={1.4} />k
          </span>
          <span className="text-foreground/80 text-[10px]">This month</span>
        </div>
        <div className="bg-secondary flex flex-col items-center rounded-xl px-2 py-2.5">
          <span className="text-foreground text-base font-bold">
            <CountUp to={8} duration={1.6} />
          </span>
          <span className="text-foreground/80 text-[10px]">Contributors</span>
        </div>
        <div className="bg-secondary flex flex-col items-center rounded-xl px-2 py-2.5">
          <span className="text-status-success text-base font-bold">
            <CountUp to={100} duration={1.8} />%
          </span>
          <span className="text-foreground/80 text-[10px]">Compliant</span>
        </div>
      </div>

      <div className="px-5">
        <p className="text-muted-foreground mb-2.5 text-[10px] font-semibold tracking-[0.08em] uppercase">
          Recent activity
        </p>
        <div className="flex flex-col gap-2">
          {activityRows.map((row, index) => {
            const Icon = row.icon
            const isActive = !prefersReducedMotion && activeRow === index
            return (
              <div
                key={row.id}
                className={cn(
                  'flex items-center gap-3 rounded-xl border p-4 transition-colors duration-700',
                  isActive ? 'border-primary/30 bg-primary/5' : 'border-border/50',
                )}
              >
                <div
                  className={cn(
                    'flex size-8 shrink-0 items-center justify-center rounded-full',
                    row.iconBgClass,
                  )}
                >
                  <Icon className={cn('size-4', row.iconClass)} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-foreground truncate text-sm font-medium">{row.title}</p>
                  <p className="text-muted-foreground truncate text-xs">{row.detail}</p>
                </div>
                <span className="text-muted-foreground shrink-0 text-xs">{row.time}</span>
              </div>
            )
          })}
        </div>
      </div>

      <div className="bg-primary/10 border-primary/10 mx-5 mt-3 mb-5 flex items-center justify-between rounded-xl border px-4 py-2">
        <div className="flex items-center gap-2.5">
          <Users className="text-primary size-4" />
          <span className="text-foreground text-sm font-medium">Your ops team is handling it</span>
        </div>
        <ArrowRight className="text-primary size-4" />
      </div>
    </div>
  )
}

export { DashboardCard }
