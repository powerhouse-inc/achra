import { Separator } from '@/modules/shared/components/ui/separator'

interface SummarySectionHeaderProps {
  title: string
}

function SummarySectionHeader({ title }: Readonly<SummarySectionHeaderProps>) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-foreground text-sm font-semibold lg:text-base/6">{title}</h3>
      <div className="-mx-3 lg:-mx-6">
        <Separator />
      </div>
    </div>
  )
}

export { SummarySectionHeader }
