'use client'

import { useScrollHash } from '@/modules/shared/hooks/use-scroll-hash'

interface ScrollSpyWrapperProps {
  sectionIds: string[]
}

export default function ScrollSpyWrapper({ sectionIds }: ScrollSpyWrapperProps) {
  useScrollHash(sectionIds)
  return null
}
