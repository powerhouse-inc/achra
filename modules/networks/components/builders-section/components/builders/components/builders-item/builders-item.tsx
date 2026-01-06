import Link from 'next/link'
import { useMemo } from 'react'
import type { Builder } from '@/modules/__generated__/graphql/switchboard-generated'
import type { RouteWithDynamicPages } from '@/modules/shared/types/routes'
import CompactItem from './components/compact-item/compact-item'
import LargeItem from './components/large-item/large-item'

export interface BuildersItemProps {
  builder: Builder
}

export function BuildersItem({ builder }: BuildersItemProps) {
  const href = useMemo(() => {
    return `/network/powerhouse/builders/ecosystem-actors/${builder.code}` as RouteWithDynamicPages
  }, [builder.code])

  return (
    <Link href={href}>
      <CompactItem className="min-h-33 lg:hidden" builder={builder} />
      <LargeItem className="hidden min-h-19.5 lg:grid" builder={builder} />
    </Link>
  )
}
