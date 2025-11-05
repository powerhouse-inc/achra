interface TotalDisplayProps {
  primaryValue: number
  secondaryValue: number
}

export function TotalDisplay({ primaryValue, secondaryValue }: TotalDisplayProps) {
  const primaryValueFormatted = primaryValue.toLocaleString() || 0
  const secondaryValueFormatted = secondaryValue.toLocaleString() || 0

  return (
    <div data-slot="total-display-container" className="flex items-center gap-3">
      <span data-slot="total-display-title" className="text-base/6 font-semibold">
        Total
      </span>
      <div
        data-slot="total-display-content"
        className="bg-muted flex items-center rounded-lg px-4 py-2"
      >
        <div data-slot="total-display-item" className="flex items-center gap-2">
          <span
            data-slot="total-display-value"
            className="text-accent-foreground text-lg/6 font-semibold"
          >
            {primaryValueFormatted}
          </span>
          <span
            data-slot="total-display-description"
            className="text-muted-foreground text-lg/6 font-semibold"
          >
            USDS
          </span>
        </div>
        <div data-slot="total-display-separator" className="bg-border mx-3 h-6 w-px" />
        <div data-slot="total-display-item" className="flex items-center gap-2">
          <span
            data-slot="total-display-value"
            className="text-accent-foreground text-lg/6 font-semibold"
          >
            {secondaryValueFormatted}
          </span>
          <span
            data-slot="total-display-description"
            className="text-muted-foreground text-lg/6 font-semibold"
          >
            SKY
          </span>
        </div>
      </div>
    </div>
  )
}
