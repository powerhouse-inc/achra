interface ServiceBreakdownItemProps {
  title: string
  subtitle?: string
  value: string
}

export function ServiceBreakdownItem({ title, subtitle, value }: ServiceBreakdownItemProps) {
  return (
    <div className="flex h-16 items-center justify-between">
      <div className="flex flex-col">
        <span className="text-foreground text-base font-semibold">{title}</span>
        {subtitle && <span className="text-foreground text-sm">{subtitle}</span>}
      </div>
      <span className="text-foreground text-sm font-bold">{value}</span>
    </div>
  )
}
