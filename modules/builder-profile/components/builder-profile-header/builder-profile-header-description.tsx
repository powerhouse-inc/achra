'use client'

import { usePathname } from 'next/navigation'
import type { Maybe, Scalars } from '@/modules/__generated__/graphql/switchboard-generated'

interface BuilderProfileHeaderDescriptionProps {
  description?: Maybe<Scalars['String']['output']>
}

function BuilderProfileHeaderDescription({ description }: BuilderProfileHeaderDescriptionProps) {
  const pathname = usePathname()
  const isBudgetStatements = pathname.includes('budget-statements')

  if (isBudgetStatements) {
    return null
  }

  return (
    <div className="text-foreground/50 text-xs/4.5 sm:text-sm/5.5 md:pl-16 lg:pl-18 lg:text-base/6">
      {description}
    </div>
  )
}

export { BuilderProfileHeaderDescription }
