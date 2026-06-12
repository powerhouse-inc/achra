'use client'

import { cn } from '@achra/ui/lib/utils'
import { ChartColumn, type LucideIcon, ReceiptText, ShieldCheck, Wallet } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'

interface ChipSpec {
  id: string
  icon: LucideIcon
  className: string
  delay: number
  duration: number
}

// the four ops capabilities from the copy (invoicing, payouts, reporting,
// compliance) drifting around the dashboard as satellites
const CHIPS: ChipSpec[] = [
  {
    id: 'invoicing',
    icon: ReceiptText,
    className: 'top-[16%] left-2 sm:left-8',
    delay: 0,
    duration: 4.6,
  },
  {
    id: 'payouts',
    icon: Wallet,
    className: 'top-[30%] right-1 sm:right-6',
    delay: 1.4,
    duration: 5.4,
  },
  {
    id: 'reporting',
    icon: ChartColumn,
    className: 'bottom-[20%] left-4 sm:left-12',
    delay: 0.7,
    duration: 5,
  },
  {
    id: 'compliance',
    icon: ShieldCheck,
    className: 'right-3 bottom-[12%] sm:right-10',
    delay: 2.1,
    duration: 4.4,
  },
]

interface FloatingOpsChipsProps {
  className?: string
}

function FloatingOpsChips({ className }: FloatingOpsChipsProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className={cn('pointer-events-none', className)} aria-hidden>
      {CHIPS.map((chip) => {
        const Icon = chip.icon
        return (
          <motion.div
            key={chip.id}
            className={cn(
              'border-border bg-card text-primary absolute flex size-11 items-center justify-center rounded-xl border shadow-md sm:size-12',
              chip.className,
            )}
            animate={prefersReducedMotion ? undefined : { y: [0, -10, 0] }}
            transition={{
              duration: chip.duration,
              delay: chip.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <Icon className="size-5" />
          </motion.div>
        )
      })}
    </div>
  )
}

export { FloatingOpsChips }
