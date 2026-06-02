'use client'

import { useSectionActivation, type UseSectionActivationOptions } from './use-section-activation'

interface SectionActivationProps {
  sections: string[]
  options?: UseSectionActivationOptions
}

function SectionActivation({ sections, options }: SectionActivationProps) {
  useSectionActivation(sections, options)

  return null
}

export { SectionActivation }
