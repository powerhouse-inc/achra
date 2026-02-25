interface KeyValueCardProps {
  label: string
  value: string
}

function KeyValueCard({ label, value }: Readonly<KeyValueCardProps>) {
  return (
    <div className="bg-background border-border flex min-w-0 flex-1 flex-col gap-1 rounded-lg border px-4 py-3">
      <span className="text-muted-foreground truncate text-xs font-medium">{label}</span>
      <span className="text-foreground line-clamp-2 text-sm leading-tight font-semibold">
        {value}
      </span>
    </div>
  )
}

export { KeyValueCard }
