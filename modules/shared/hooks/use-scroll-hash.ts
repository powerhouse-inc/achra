import { useCallback, useEffect, useRef } from 'react'
import { useMediaQuery } from './use-media-query'

/**
 * A custom hook that provides bidirectional synchronization between URL hash and visible sections.
 *
 * Features:
 * - Automatically scrolls to sections when hash changes (browser navigation, direct links)
 * - Updates URL hash when user manually scrolls to different sections
 * - Prevents infinite loops by blocking hash updates during programmatic scrolling
 * - Supports mobile-specific scroll offsets
 * - Provides callback for section change events
 *
 * @param hashes - Array of section hashes to observe and navigate between
 * @param onSectionChange - Optional callback fired when the active section changes
 *
 */
export function useScrollHash(hashes: string[], onSectionChange?: (sectionHash: string) => void) {
  const programmaticScrollRef = useRef(false)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const isMobile = useMediaQuery({ to: 'md' })

  /**
   * Smoothly scrolls to a section with the given hash.
   *
   * @param hash - The section hash to scroll to
   * @param delay - Optional delay before scrolling (useful for animations)
   */
  const scrollToSection = useCallback(
    (hash: string, delay = 0) => {
      const element = document.querySelector(`[data-hash="${hash}"]`)
      if (!element) return

      programmaticScrollRef.current = true
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)
      scrollTimeoutRef.current = setTimeout(() => {
        programmaticScrollRef.current = false
      }, 1200)

      setTimeout(() => {
        const rect = element.getBoundingClientRect()
        // Calculate scroll position with mobile/desktop specific header offsets
        const scrollTop = window.pageYOffset + rect.top - (isMobile ? 80 : 96)
        window.scrollTo({ top: scrollTop, behavior: 'smooth' })
      }, delay)
    },
    [isMobile],
  )

  useEffect(() => {
    const hash = typeof window !== 'undefined' ? window.location.hash.slice(1) : ''
    if (hash && document.querySelector(`[data-hash="${hash}"]`)) {
      scrollToSection(hash)
    }
  }, [scrollToSection])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const onHashNav = () => {
      const hash = window.location.hash.slice(1)
      if (hash && document.querySelector(`[data-hash="${hash}"]`)) {
        scrollToSection(hash)
      }
    }
    window.addEventListener('hashchange', onHashNav)
    window.addEventListener('popstate', onHashNav)
    return () => {
      window.removeEventListener('hashchange', onHashNav)
      window.removeEventListener('popstate', onHashNav)
    }
  }, [scrollToSection])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.4,
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // Only update hash during manual scrolling (not programmatic)
        if (entry.isIntersecting && !programmaticScrollRef.current) {
          const sectionHash = entry.target.getAttribute('data-hash')
          if (sectionHash) {
            const basePath = window.location.pathname
            // Remove hash for the first section (clean URL), add hash for others
            const newUrl = sectionHash === hashes[0] ? basePath : `${basePath}#${sectionHash}`

            // Only update if the hash actually changes to avoid unnecessary history entries
            if (window.location.hash.slice(1) !== sectionHash) {
              window.history.replaceState(null, '', newUrl)
              onSectionChange?.(sectionHash)
            }
          }
        }
      })
    }, observerOptions)

    // Observe all sections with the provided hashes
    hashes.forEach((hash) => {
      const el = document.querySelector(`[data-hash="${hash}"]`)
      if (el) observer.observe(el)
    })

    return () => {
      observer.disconnect()
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)
    }
  }, [hashes, onSectionChange])
}
