interface TotalDisplayProps {
  primaryValue: number
  secondaryValue: number
}

export function TotalDisplay({ primaryValue, secondaryValue }: TotalDisplayProps) {
  const primaryValueFormatted = primaryValue.toLocaleString() || 0
  const secondaryValueFormatted = secondaryValue.toLocaleString() || 0

  return (
    <div className="flex items-center gap-3">
      <span className="text-base/6 font-semibold">Total</span>
      <div className="bg-muted flex items-center rounded-lg px-4 py-2">
        <div className="flex items-center gap-2">
          <span className="text-accent-foreground text-lg/6 font-semibold">
            {primaryValueFormatted}
          </span>
          <span className="text-muted-foreground text-lg/6 font-semibold">USDS</span>
        </div>
        <div className="bg-border mx-3 h-6 w-px" />
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
