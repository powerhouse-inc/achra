interface TotalDisplayProps {
  primaryValue: number
  secondaryValue: number
}

export function TotalDisplay({ primaryValue, secondaryValue }: TotalDisplayProps) {
  const primaryValueFormatted = primaryValue.toLocaleString() || 0
  const secondaryValueFormatted = secondaryValue.toLocaleString() || 0

  return (
    <div className="flex items-center gap-4">
      <span className="text-base/6 font-semibold">Total</span>
      <div className="bg-secondary border-input flex flex-col items-center rounded-lg border px-3 py-2 sm:flex-row sm:border-none sm:px-4 sm:py-2">
        <div className="flex items-center gap-2">
          <span className="text-accent-foreground text-lg/6 font-semibold">
            {primaryValueFormatted}
          </span>
          <span className="text-muted-foreground text-lg/6 font-semibold">USDS</span>
        </div>
        <div className="bg-border mx-3 hidden h-6 w-px sm:block" />
        <div className="flex items-center gap-2">
          <span className="text-accent-foreground text-lg/6 font-semibold">
            {secondaryValueFormatted}
          </span>
          <span className="text-muted-foreground text-lg/6 font-semibold">SKY</span>
        </div>
      </div>
    </div>
  )
}
