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

  return <div className="text-foreground/50 pl-18 text-base/6">{description}</div>
}

export { BuilderHeaderDescription }
