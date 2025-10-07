'use client'

import { useCallback, useEffect, useRef } from 'react'
import { useMediaQuery } from '@/modules/shared/hooks/use-media-query'

/**
 * WHEN TO USE THIS HOOK:
 *
 * Use this hook when you need to implement smooth scrolling to specific sections
 * on a page, especially in scenarios where:
 *
 * 1. You have expandable/collapsible elements (like banners, drawers, or accordions)
 *    that might affect the target element's position after animation
 *
 * 2. You want to override the browser's default scroll restoration behavior
 *    to ensure consistent scroll positioning across page navigations
 *
 * 3. You need responsive scroll offsets (different offsets for mobile vs desktop)
 *
 * 4. You want to prevent multiple simultaneous scroll operations
 *
 * 5. You need to handle hash-based navigation with custom timing and behavior
 */

interface UseScrollToSectionOptions {
  /**
   * Delay in milliseconds to wait for animations to complete before scrolling.
   * This ensures that any expandable elements (like banners or drawers) have
   * finished their animations before calculating the target position.
   *
   * @default 350 - Slightly longer than typical 300ms banner animations
   */
  animationDelay?: number

  /**
   * Whether to disable the browser's native scroll behavior and take full control.
   * When enabled, this hook will:
   * - Set history.scrollRestoration to 'manual'
   * - Remove 'scroll-smooth' class from document
   * - Handle all scroll positioning manually
   *
   * @default true
   */
  disableNativeScroll?: boolean
}

/**
 * Custom hook that provides advanced scroll-to-section functionality with animation
 * timing control and responsive behavior.
 *
 * FEATURES:
 *
 * 🎯 **Animation-Aware Scrolling**: Waits for expandable animations to complete
 *    before scrolling, ensuring accurate target positioning
 *
 * 📱 **Responsive Offsets**: Automatically adjusts scroll offset based on screen size
 *    (80px for mobile, 96px for desktop) to account for fixed headers
 *
 * 🚫 **Scroll Conflict Prevention**: Prevents multiple simultaneous scroll operations
 *    using a ref-based locking mechanism
 *
 * 🔄 **Hash Navigation Support**: Automatically handles URL hash changes and browser
 *    back/forward navigation with custom scroll behavior
 *
 * ⚡ **Performance Optimized**: Uses timeouts and refs to minimize re-renders and
 *    prevent memory leaks
 *
 * 🎛️ **Customizable Timing**: Configurable animation delay to match your app's
 *    animation durations
 *
 * 🔧 **Native Scroll Override**: Option to disable browser's automatic scroll
 *    restoration for consistent behavior across page loads
 *
 * @param options Configuration options for scroll behavior
 * @returns Object containing scrollToSection function for external use
 */
export function useScrollToSection(options: UseScrollToSectionOptions = {}) {
  const { animationDelay = 800, disableNativeScroll = true } = options

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

  /**
   * Scrolls to a specific section identified by its hash.
   *
   * This function implements the core scrolling logic with the following features:
   * - Prevents multiple simultaneous scroll operations using a ref lock
   * - Waits for the specified animation delay before scrolling
   * - Calculates responsive scroll offset (mobile: 80px, desktop: 96px)
   * - Uses smooth scrolling behavior for better UX
   *
   * @param hash - The hash identifier of the target section (without #)
   */
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

  /**
   * Handles scrolling when a hash is present in the URL.
   *
   * This function extracts the hash from the current URL and triggers
   * a scroll to the corresponding section if a hash exists.
   * Used for initial page load with hash and programmatic hash changes.
   */
  const handleHashScroll = useCallback(() => {
    if (typeof window === 'undefined') return

    const hash = window.location.hash.slice(1)
    if (hash) {
      scrollToSection(hash)
    }
  }, [scrollToSection])

  /**
   * Effect: Handle initial hash scroll on component mount.
   *
   * This effect runs once when the component mounts and checks if there's
   * a hash in the URL. If present, it triggers a scroll to that section.
   * Also sets up cleanup for any pending scroll timeouts.
   */
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

  /**
   * Effect: Set up hash and navigation event listeners.
   *
   * This effect adds event listeners for:
   * - 'hashchange': When the URL hash changes (e.g., clicking a link with #)
   * - 'popstate': When browser back/forward buttons are used
   *
   * Both events trigger the same hash scroll handler to maintain consistent
   * scroll behavior across different navigation methods.
   */
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

  return {
    scrollToSection,
  }
}
