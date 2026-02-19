import { ArrowRightLeft } from 'lucide-react'
import { Separator } from '@/modules/shared/components/ui/separator'
import { cn } from '@/modules/shared/lib/utils'

interface OptionGroupRootProps {
  children: React.ReactNode
  variant?: 'default' | 'pricing'
}

function OptionGroupRoot({ children, variant = 'default' }: OptionGroupRootProps) {
  return (
    <div
      className={
        variant === 'pricing'
          ? 'bg-card flex flex-col overflow-hidden rounded-xl shadow-md'
          : 'bg-card flex flex-col overflow-hidden rounded-lg shadow-sm'
      }
    >
      {children}
    </div>
  )
}

function OptionGroupHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-accent flex items-center justify-between gap-4 px-3 py-2 lg:px-6">
      {children}
    </div>
  )
}

function OptionGroupHeaderLeading({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center gap-2">{children}</div>
}

function OptionGroupHeaderTrailing({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center gap-2">{children}</div>
}

function OptionGroupAddOnIcon() {
  return <ArrowRightLeft className="text-muted-foreground size-4 shrink-0" strokeWidth={1.5} />
}

function OptionGroupTitle({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-foreground text-sm/5.5 font-semibold lg:text-base/6">{children}</span>
  )
}

function OptionGroupSubtitle({ children }: { children: React.ReactNode }) {
  return <span className="text-muted-foreground text-xs font-medium">{children}</span>
}

function OptionGroupValue({ children }: { children: React.ReactNode }) {
  return <span className="text-primary text-sm/5.5 font-semibold lg:text-base/6">{children}</span>
}

function OptionGroupHeaderPrice({ children }: { children: React.ReactNode }) {
  return <span className="text-primary text-sm/5.5 font-semibold lg:text-base/6">{children}</span>
}

interface OptionGroupPriceIncludesProps {
  sectionLabel?: string
  priceLabel?: string
  children: React.ReactNode
}

function OptionGroupPriceIncludes({
  sectionLabel,
  priceLabel,
  children,
}: Readonly<OptionGroupPriceIncludesProps>) {
  const showSectionHeader = sectionLabel != null || priceLabel != null

  return (
    <div className={cn('flex flex-col', !showSectionHeader && 'border-t')}>
      {showSectionHeader && (
        <>
          <div className="text-foreground/50 flex items-center justify-between px-3 py-2 lg:px-6">
            {sectionLabel != null && (
              <span className="text-xs/4.5 font-medium tracking-wider uppercase lg:text-sm/5.5">
                {sectionLabel}
              </span>
            )}
            {priceLabel != null && (
              <span className="text-foreground text-sm font-semibold">{priceLabel}</span>
            )}
          </div>
          <div className="px-3 lg:px-6">
            <Separator />
          </div>
        </>
      )}
      {children}
    </div>
  )
}

interface OptionGroupSubtotalProps {
  children: React.ReactNode
  label?: string
}

function OptionGroupSubtotal({ children, label = 'SUBTOTAL' }: OptionGroupSubtotalProps) {
  return (
    <div className="bg-accent flex items-center justify-between border-t px-3 py-2 lg:px-6">
      <span className="text-foreground text-sm font-bold tracking-wide uppercase lg:text-base/6">
        {label}
      </span>
      <span className="text-primary text-sm font-semibold lg:text-base/6">{children}</span>
    </div>
  )
}

interface OptionGroupTotalProps {
  label: string
  children: React.ReactNode
}

function OptionGroupTotal({ label, children }: OptionGroupTotalProps) {
  return (
    <div className="dark:border-border flex items-center justify-between border-b border-[#EEEEEE] px-4 pt-5 pb-3 lg:px-6 lg:pt-6">
      <span className="text-foreground text-sm font-bold tracking-wide uppercase lg:text-base/6">
        {label}
      </span>
      <span className="text-primary text-sm font-bold lg:text-base/6">{children}</span>
    </div>
  )
}

interface OptionGroupPricingLineItemProps {
  label: string
  value: string
  sublabel?: string
  showBorder?: boolean
}

function OptionGroupPricingLineItem({
  label,
  value,
  sublabel,
  showBorder = true,
}: OptionGroupPricingLineItemProps) {
  return (
    <div
      className={cn(
        'flex justify-between px-4 py-3 lg:px-6',
        sublabel ? 'items-start' : 'items-center',
        showBorder && 'dark:border-border border-b border-[#EEEEEE]',
      )}
    >
      <div className="flex flex-col gap-0.5">
        <span className="text-foreground text-sm/5.5 lg:text-base/6">{label}</span>
        {sublabel && <span className="text-muted-foreground text-xs">{sublabel}</span>}
      </div>
      <span className="text-foreground text-sm/5.5 font-normal lg:text-base/6">{value}</span>
    </div>
  )
}

function OptionGroupPricingHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="dark:border-border dark:bg-accent flex items-center justify-between border-b border-[#EEEEEE] bg-[#F8F8F8] px-4 py-3 lg:px-6">
      {children}
    </div>
  )
}

function OptionGroupOneTimeSection({ children }: { children: React.ReactNode }) {
  return <div className="dark:bg-accent/50 bg-[#F5F5F5]">{children}</div>
}

function OptionGroupTotalSetup({ label, children }: OptionGroupTotalProps) {
  return (
    <div className="bg-accent flex items-center justify-between px-4 py-3 lg:px-6">
      <span className="text-foreground text-sm font-bold tracking-wide uppercase lg:text-base/6">
        {label}
      </span>
      <span className="text-primary text-sm font-bold lg:text-base/6">{children}</span>
    </div>
  )
}

const OptionGroup = {
  Root: OptionGroupRoot,
  Header: OptionGroupHeader,
  HeaderLeading: OptionGroupHeaderLeading,
  HeaderTrailing: OptionGroupHeaderTrailing,
  AddOnIcon: OptionGroupAddOnIcon,
  Title: OptionGroupTitle,
  Subtitle: OptionGroupSubtitle,
  Value: OptionGroupValue,
  HeaderPrice: OptionGroupHeaderPrice,
  PriceIncludes: OptionGroupPriceIncludes,
  Subtotal: OptionGroupSubtotal,
  Total: OptionGroupTotal,
  TotalSetup: OptionGroupTotalSetup,
  PricingHeader: OptionGroupPricingHeader,
  PricingLineItem: OptionGroupPricingLineItem,
  OneTimeSection: OptionGroupOneTimeSection,
}

export { OptionGroup }
