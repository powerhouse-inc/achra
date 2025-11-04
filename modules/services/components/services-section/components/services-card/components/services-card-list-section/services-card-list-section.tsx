import type { ComponentType, SVGProps } from 'react'

interface ServicesCardListSectionProps {
  icon: ComponentType<SVGProps<SVGSVGElement>>
  title: string
  items: string[]
}
export function ServicesCardListSection({
  icon: Icon,
  title,
  items,
}: ServicesCardListSectionProps) {
  return (
    <div className="outline-border bg-background flex flex-col gap-2 rounded-lg px-4 pt-2 pb-3 outline sm:flex-1">
      <div className="flex items-center gap-2">
        <Icon className="[&_path]:stroke-foreground size-4" />
        <span className="font-medium sm:font-semibold">{title}</span>
      </div>
      <ul className="text-foreground">
        {items.map((item) => (
          <li key={item} className="mb-0 ml-2 flex items-center gap-2">
            <div className="bg-foreground size-1 min-w-1 rounded-full" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
