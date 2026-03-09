interface BudgetDeliverableItemProps {
  code: string
  title: string
}

function BudgetDeliverableItem({ code, title }: Readonly<BudgetDeliverableItemProps>) {
  return (
    <div className="bg-popover flex h-[60px] items-center rounded-lg border p-3">
      <div className="flex items-center gap-2">
        <span className="text-foreground/70 text-sm font-semibold uppercase sm:text-base/6">
          {code}
        </span>
        <span className="text-foreground text-sm font-bold sm:text-lg sm:leading-[1.2]">
          {title}
        </span>
      </div>
    </div>
  )
}

export { BudgetDeliverableItem }
