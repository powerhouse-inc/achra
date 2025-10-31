import { useEffect, useMemo, useRef } from 'react'
import {
  DEFAULT_SECTION_ACTIVATION_THRESHOLD,
  SECTION_SCROLL_RESTORATION_DELAY,
  SMOOTH_SCROLL_BUFFER,
} from '@/modules/shared/config/constants'
import { decodeSectionId } from './section-id-utils'

interface UseSectionActivationOptions {
  /**
   * The threshold percentage from the top of the viewport to activate the section.
   *
   * @default 20
   */
  threshold?: number

  /**
   * The section to skip from the activation. When this section is activated, the hash will be cleared.
   *
   * @default undefined
   */
  skipSection?: string
}

const defaultOptions = {
  threshold: DEFAULT_SECTION_ACTIVATION_THRESHOLD,
}

const useSectionActivation = (
  sections: string[],
  options: UseSectionActivationOptions = defaultOptions,
) => {
  const initializedOptions = useMemo(
    () => ({
      threshold: options.threshold ?? defaultOptions.threshold,
      skipSection: options.skipSection,
    }),
    [options],
  )

  // prevent native scroll restoration
  useEffect(() => {
    if (typeof history === 'undefined') return // SSR

    history.scrollRestoration = 'manual'
    return () => {
      history.scrollRestoration = 'auto'
    }
  }, [])

  // Track if scroll restoration is in progress to prevent hash updates during smooth scroll
  const isRestoringScrollRef = useRef<boolean>(false)

  // observe section intersections to update the URL hash
  useEffect(() => {
    if (typeof window === 'undefined') return // SSR

    // We create an imaginary line at `threshold` from the top of the viewport
    // When a section's top edge crosses this line, it becomes active and updates the URL hash

    // Calculate the rootMargin to create a thin intersection zone at the threshold
    // For 20%, we use: top: -20%, bottom: -79.99% (creates ~0.01% detection zone at 20%)
    const topMargin = -initializedOptions.threshold
    const bottomMargin = -(100 - initializedOptions.threshold - 0.01)
    const rootMargin = `${topMargin}% 0px ${bottomMargin}% 0px`

    let activeSection: string | null = null

    const observer = new IntersectionObserver(
      (entries) => {
        // Skip hash updates during scroll restoration to prevent conflicts
        if (isRestoringScrollRef.current) return

        const intersecting = entries.filter((entry) => entry.isIntersecting)

        if (intersecting.length > 0) {
          // Sort by actual DOM position (top to bottom)
          // (it is highly unlikely that could be intersecting multiple sections at the same time, but just in case)
          const sortedIntersecting = intersecting.sort((a, b) => {
            const aTop = (a.target as HTMLElement).getBoundingClientRect().top
            const bTop = (b.target as HTMLElement).getBoundingClientRect().top
            return aTop - bTop
          })

          const topSection = decodeSectionId(sortedIntersecting[0].target.id)

          // Only update URL if the active section changed
          if (activeSection !== topSection) {
            activeSection = topSection

            // If this is the skip section, clear the hash
            if (initializedOptions.skipSection && topSection === initializedOptions.skipSection) {
              const basePath = window.location.pathname
              window.history.replaceState(null, '', basePath)
            } else {
              const basePath = window.location.pathname
              const newUrl = `${basePath}#${topSection}`
              window.history.replaceState(null, '', newUrl)
            }
          }
        }
      },
      {
        rootMargin,
        threshold: 0,
      },
    )

    sections.forEach((section) => {
      const element = document.getElementById(section)
      if (element) observer.observe(element)
    })

    return () => {
      observer.disconnect()
    }
  }, [initializedOptions, sections])

  // scroll to section on page load
  useEffect(() => {
    if (typeof window === 'undefined') return // SSR
    // scroll to the section based on the URL hash
    const hash = window.location.hash.slice(1)
    if (hash) {
      // scroll if the section is part of the sections array
      const activeSectionId = sections.find((section) => decodeSectionId(section).includes(hash))
      if (activeSectionId) {
        const element = document.getElementById(activeSectionId)
        if (element) {
          // Set flag to prevent hash updates during scroll restoration
          isRestoringScrollRef.current = true

          let clearFlagTimeout: NodeJS.Timeout | undefined

          const scrollTimeout = setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth' })

            // Clear flag after scroll restoration delay + smooth scroll buffer
            clearFlagTimeout = setTimeout(() => {
              isRestoringScrollRef.current = false
            }, SMOOTH_SCROLL_BUFFER)
          }, SECTION_SCROLL_RESTORATION_DELAY)

          // Cleanup: cancel scroll restoration if component unmounts or effect re-runs
          return () => {
            clearTimeout(scrollTimeout)
            if (clearFlagTimeout) {
              clearTimeout(clearFlagTimeout)
            }
            isRestoringScrollRef.current = false
          }
        }
      }
    }
  }, [sections])
}

export { useSectionActivation, type UseSectionActivationOptions }
