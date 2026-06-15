'use client'

import { type RefObject, useEffect, useRef, useState } from 'react'

interface UseNearViewportOptions {
  /** Distance outside the viewport at which the element counts as "near". */
  rootMargin?: string
}

/**
 * Tracks whether an element has come within `rootMargin` of the viewport. Once
 * true it stays true (the observer disconnects), so it's a one-shot "mount now"
 * gate for expensive, purely-decorative subtrees — e.g. a WebGL canvas whose
 * static CSS fallback is already painted underneath. Deferring the mount keeps
 * the canvas's code-split chunk and its WebGL context out of the initial load.
 *
 * SSR/first paint returns `false`, so the heavy child is never in the initial
 * markup; it appears once the section approaches the viewport.
 */
export function useNearViewport<T extends HTMLElement = HTMLDivElement>(
  options: UseNearViewportOptions = {},
): [RefObject<T | null>, boolean] {
  const { rootMargin = '300px' } = options
  const ref = useRef<T>(null)
  const [near, setNear] = useState(false)

  useEffect(() => {
    if (near) return
    const el = ref.current
    if (!el) return

    // If IntersectionObserver is unavailable, fail open (mount immediately).
    if (typeof IntersectionObserver === 'undefined') {
      setNear(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setNear(true)
          observer.disconnect()
        }
      },
      { rootMargin },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [near, rootMargin])

  return [ref, near]
}
