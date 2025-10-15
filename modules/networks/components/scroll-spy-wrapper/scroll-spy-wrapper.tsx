'use client'

import { useScrollHash } from '@/modules/shared/hooks/use-scroll-hash'

interface ScrollSpyWrapperProps {
  sectionHashs: string[]
}

export default function ScrollSpyWrapper({ sectionHashs }: ScrollSpyWrapperProps) {
  useScrollHash(sectionHashs)
  return null
}
