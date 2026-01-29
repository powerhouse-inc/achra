interface SectionHeaderProps {
  title: string
  selectedValue: string
}

export function SectionHeader({ title, selectedValue }: Readonly<SectionHeaderProps>) {
  return (
    <div className="bg-accent flex items-center justify-between px-3 py-2 lg:px-6">
      <span className="text-foreground text-sm/5.5 font-semibold lg:text-base/6">{title}</span>
      <span className="text-primary text-sm/5.5 font-semibold lg:text-base/6">{selectedValue}</span>
    </div>
  )
}
