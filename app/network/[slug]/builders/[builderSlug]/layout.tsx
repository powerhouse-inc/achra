import { Suspense } from 'react'
import {
  SharedBuilderLayout,
  SharedBuilderLayoutSkeleton,
} from '@/modules/builders/components/shared-builder-layout'

interface BuildersProfileLayoutProps {
  params: Promise<{ slug: string; builderSlug: string }>
  children: React.ReactNode
}

export default function BuildersProfileLayout({ params, children }: BuildersProfileLayoutProps) {
  return (
    <>
      <Suspense fallback={<SharedBuilderLayoutSkeleton />}>
        <SharedBuilderLayout params={params} />
      </Suspense>

      {children}
    </>
  )
}
