'use client'

import { Check } from 'lucide-react'
import { type ComponentProps, createContext, useContext } from 'react'
import { formatPrice, isIncludedValue } from '@/modules/service-purchase/lib/utils'
import type { PurchaseOptionGroup } from '@/modules/service-purchase/types'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/modules/shared/components/ui/accordion'
import { Card } from '@/modules/shared/components/ui/card'
import { cn } from '@/shared/lib/utils'

interface SummaryContextValue {
  sectionLabel: string
  totalSuffix: string
  isRecurring: boolean
  headerLabel?: string
  groupPrices?: Map<string, number>
}

const SummaryContext = createContext<SummaryContextValue | null>(null)

function useSummary() {
  const context = useContext(SummaryContext)
  if (!context) {
    throw new Error('Summary subcomponents must be used within Summary.Provider')
  }
  return context
}

interface SummaryProviderProps {
  children: React.ReactNode
  sectionLabel: string
  totalSuffix: string
  headerLabel?: string
  groupPrices?: Map<string, number>
}

function SummaryProvider({
  children,
  sectionLabel,
  totalSuffix,
  headerLabel = 'Pricing Summary',
  groupPrices,
}: SummaryProviderProps) {
  const isRecurring = sectionLabel === 'Recurring'
  const value: SummaryContextValue = {
    sectionLabel,
    totalSuffix,
    isRecurring,
    headerLabel,
    groupPrices,
  }
  return <SummaryContext.Provider value={value}>{children}</SummaryContext.Provider>
}

function SummaryCard(props: ComponentProps<typeof Card>) {
  return <Card className="gap-0 overflow-hidden p-0" {...props} />
}

function SummaryContent(props: ComponentProps<'div'>) {
  return (
    <Accordion type="multiple">
      <div className="flex flex-col gap-0 px-4 py-3 lg:px-6" {...props} />
    </Accordion>
  )
}

interface SummaryRowProps {
  label: string
  value: string | null
}

function SummaryRow({ label, value }: SummaryRowProps) {
  return (
    <div
      className="border-border text-foreground/70 ml-10 flex items-center justify-between border-b py-2 pl-0"
      data-slot="summary-section-row"
    >
      <span className="text-sm/5.5 lg:text-base/6">{label}</span>
      {isIncludedValue(value) ? (
        <Check className="text-status-success size-4 shrink-0" aria-hidden />
      ) : (
        <span className="text-foreground text-sm/5.5 lg:text-base/6">{value}</span>
      )}
    </div>
  )
}

interface SummaryGroupProps {
  group: PurchaseOptionGroup
}

function SummaryGroup({ group }: SummaryGroupProps) {
  const { isRecurring, groupPrices } = useSummary()
  const displayAmount = groupPrices?.get(group.id) ?? group.resolvedPrice
  const formattedPrice = isRecurring
    ? `${formatPrice(displayAmount)}/mo`
    : formatPrice(displayAmount)
  const expandable = group.services.length > 0

  return (
    <AccordionItem value={group.id} className="border-border border-b last:border-b-0">
      <AccordionTrigger
        className={cn(
          'flex-row-reverse items-center justify-end gap-2 py-3 hover:no-underline [&>svg]:shrink-0 [&>svg]:translate-y-0 [&[data-state=open]>svg]:rotate-180',
          !expandable && 'pointer-events-none cursor-default [&>svg]:invisible',
        )}
        aria-label={`${group.name}, ${formattedPrice}`}
      >
        <div className="flex flex-1 items-center justify-between gap-4">
          <span className="text-foreground text-sm/5.5 lg:text-base/6">{group.name}</span>
          <span className="text-foreground text-sm/5.5 font-semibold tabular-nums lg:text-base/6">
            {formattedPrice}
          </span>
        </div>
      </AccordionTrigger>
      {expandable && (
        <AccordionContent>
          <div className="flex flex-col gap-0">
            {group.services.flatMap((service) => [
              ...(service.resolvedValue != null
                ? [
                    <SummaryRow
                      key={service.id}
                      label={service.title}
                      value={service.resolvedValue}
                    />,
                  ]
                : service.metrics.length === 0
                  ? [<SummaryRow key={service.id} label={service.title} value="Included" />]
                  : []),
              ...service.metrics.map((m) => (
                <SummaryRow key={`${service.id}-${m.label}`} label={m.label} value={m.value} />
              )),
            ])}
          </div>
        </AccordionContent>
      )}
    </AccordionItem>
  )
}

function SummaryCardHeader() {
  const { sectionLabel, headerLabel } = useSummary()
  return (
    <header
      className="bg-accent flex items-center justify-between px-4 py-2 font-semibold uppercase lg:px-6"
      data-slot="summary-section-header"
    >
      <span className="text-foreground text-sm tracking-wide lg:text-base/6">{headerLabel}</span>
      <span className="text-foreground/70 text-sm/5.5 font-semibold tracking-wider">
        {sectionLabel}
      </span>
    </header>
  )
}

interface SummaryFooterProps {
  totalAmount: number
}

function SummaryTotal({ totalAmount }: SummaryFooterProps) {
  const { sectionLabel, totalSuffix, isRecurring } = useSummary()
  const formattedTotal = isRecurring
    ? `${formatPrice(totalAmount)}${totalSuffix}`
    : formatPrice(totalAmount)

  return (
    <footer
      className="bg-accent flex items-center justify-between px-4 py-2 lg:px-6"
      data-slot="summary-section-footer"
    >
      <span className="text-foreground/70 text-sm/5.5 font-semibold tracking-wide uppercase">
        Total {sectionLabel.toLowerCase()}
      </span>
      <span className="text-primary text-sm font-semibold tabular-nums lg:text-base/6">
        {formattedTotal}
      </span>
    </footer>
  )
}

const Summary = {
  Provider: SummaryProvider,
  Card: SummaryCard,
  Content: SummaryContent,
  Header: SummaryCardHeader,
  Row: SummaryRow,
  Group: SummaryGroup,
  Total: SummaryTotal,
}

export { Summary }
