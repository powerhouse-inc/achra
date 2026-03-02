'use client'

import { Suspense } from 'react'
import {
  PurchaseLoadingFallbackSkeleton,
  PurchaseLoadingSkeleton,
} from '@/modules/service-purchase/components/purchase-loading-skeleton'

export default function ServicePurchaseLoading() {
  return (
    <Suspense fallback={<PurchaseLoadingFallbackSkeleton />}>
      <PurchaseLoadingSkeleton />
    </Suspense>
  )
}
