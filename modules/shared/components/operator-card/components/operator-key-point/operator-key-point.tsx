interface OperatorKeyPointProps {
  label: string
  value: string
}

export default function OperatorKeyPoint({ label, value }: OperatorKeyPointProps) {
  return (
    <div className="border-border bg-popover flex flex-col gap-2 rounded-lg border p-2">
      <span className="text-foreground text-xs/4.5 font-medium">{label}</span>
      <span className="text-foreground text-sm/5.5 font-semibold">{value}</span>
    </div>
  )
}
