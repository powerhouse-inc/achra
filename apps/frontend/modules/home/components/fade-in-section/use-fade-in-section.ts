'use client'

import { useContext } from 'react'

import { FadeInSectionContext } from './fade-in-section-context'

function useFadeInSection() {
  return useContext(FadeInSectionContext)
}

export { useFadeInSection }
