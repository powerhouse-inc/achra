interface MilestoneTitleSectionProps {
  title: string
  description?: string
}

function MilestoneTitleSection({ title, description }: MilestoneTitleSectionProps) {
  return (
    <div className="milestone-title-section bg-popover flex flex-1 flex-col gap-2 rounded-xl border px-2 py-1">
      <h4 className="text-card-foreground line-clamp-2 text-sm leading-6 font-semibold">{title}</h4>
      {description && (
        <p className="text-card-foreground/50 line-clamp-5 text-xs leading-4.5 font-medium">
          {description}
        </p>
      )}
    </div>
  )
}

export { MilestoneTitleSection }
