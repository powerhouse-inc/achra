'use client'

import { usePathname } from 'next/navigation'

interface BuilderHeaderDescriptionProps {
  description: string
}

function BuilderHeaderDescription({ description }: BuilderHeaderDescriptionProps) {
  const pathname = usePathname()
  const isExpenseReports = pathname.includes('expense-reports')

  if (isExpenseReports) {
    return null
  }

  return (
    <div className="text-foreground/50 mt-2 text-xs/4.5 sm:text-sm/5.5 md:mt-0.5 md:pl-16 lg:pl-18 lg:text-base/6 xl:mt-0">
      {description}
    </div>
  )
}

export { BuilderHeaderDescription }
