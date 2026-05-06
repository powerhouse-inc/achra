export interface MetricDisplayProps {
  amount: string
  currency: string
  unit: string
}

function MetricDisplay({ amount, currency, unit }: MetricDisplayProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-3xl/[120%] font-bold">{amount}</span>

      <div className="flex flex-col gap-0">
        <span className="text-foreground/50 text-xs/4.5 font-medium">{currency}</span>
        <span className="text-xs/4.5 font-medium">{unit}</span>
      </div>
    </div>
  )
}

export { MetricDisplay }
