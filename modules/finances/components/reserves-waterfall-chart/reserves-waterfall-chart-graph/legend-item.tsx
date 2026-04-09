interface LegendItemProps {
  color: string
  label: string
}

function LegendItem({ color, label }: Readonly<LegendItemProps>) {
  return (
    <div className="flex items-center gap-2">
      <span className="inline-block size-2.5 rounded-full" style={{ backgroundColor: color }} />
      <span className="text-muted-foreground text-sm font-semibold">{label}</span>
    </div>
  )
}

export { LegendItem }
