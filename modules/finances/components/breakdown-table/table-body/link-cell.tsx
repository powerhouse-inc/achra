import Link from 'next/link'
import type { Route } from 'next'
import type { ReactNode } from 'react'

interface LinkCellProps {
  href: string
  isSummaryRow?: boolean
  children: ReactNode
}

const overlayClasses =
  'absolute inset-0 z-10 flex items-center justify-center text-inherit no-underline'

function LinkCell({ href, isSummaryRow, children }: LinkCellProps) {
  if (isSummaryRow) {
    return <span className={overlayClasses}>{children}</span>
  }
  return (
    <Link href={href as Route} scroll={false} className={overlayClasses}>
      {children}
    </Link>
  )
}

export { LinkCell }
