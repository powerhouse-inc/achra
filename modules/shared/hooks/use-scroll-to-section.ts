'use client'

import { useCallback, useEffect, useRef } from 'react'
import { useMediaQuery } from '@/modules/shared/hooks/use-media-query'

interface UseScrollToSectionOptions {
  /**
   * Delay in milliseconds to wait for animations to complete
   * Default: 350ms (slightly longer than the 300ms banner animation)
   */
  animationDelay?: number
  /**
   * Whether to disable the native scroll behavior
   * Default: true
   */
  disableNativeScroll?: boolean
}

/**
 * Custom hook that provides scroll-to-section functionality that waits for
 * expandable animations to complete before scrolling to the target element.
 *
 * This hook also disables the browser's automatic scroll restoration behavior
 * by setting history.scrollRestoration to 'manual', ensuring that our custom
 * scroll behavior takes full control over scroll positioning.
 */
export function useScrollToSection(options: UseScrollToSectionOptions = {}) {
  const { animationDelay = 350, disableNativeScroll = true } = options

  const scrollTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)
  const isScrollingRef = useRef(false)
  const isMobile = useMediaQuery({ to: 'md' })

  useEffect(() => {
    if (disableNativeScroll && typeof window !== 'undefined') {
      const hash = window.location.hash.slice(1)

      if ('scrollRestoration' in history && hash) {
        history.scrollRestoration = 'manual'
      }

      document.documentElement.classList.remove('scroll-smooth')

      return () => {
        document.documentElement.classList.add('scroll-smooth')
      }
    }
  }, [disableNativeScroll])

  const scrollToSection = useCallback(
    (hash: string) => {
      if (isScrollingRef.current) return

      const element = document.querySelector(`[data-hash="${hash}"]`)
      if (!element) return

      isScrollingRef.current = true

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }

      scrollTimeoutRef.current = setTimeout(() => {
        const elementRect = element.getBoundingClientRect()
        const scrollTop = window.pageYOffset + elementRect.top - (isMobile ? 80 : 96)
        window.scrollTo({
          top: scrollTop,
          behavior: 'smooth',
        })

        isScrollingRef.current = false
      }, animationDelay)
    },
    [animationDelay, isMobile],
  )

  const handleHashScroll = useCallback(() => {
    if (typeof window === 'undefined') return

    const hash = window.location.hash.slice(1)
    if (hash) {
      scrollToSection(hash)
    }
  }, [scrollToSection])

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      handleHashScroll()
    }

    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [handleHashScroll])

  useEffect(() => {
    const handleHashChange = () => {
      handleHashScroll()
    }

    const handlePopState = () => {
      handleHashScroll()
    }

    window.addEventListener('hashchange', handleHashChange)
    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('hashchange', handleHashChange)
      window.removeEventListener('popstate', handlePopState)
    }
  }, [handleHashScroll])
}
