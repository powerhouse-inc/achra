import { useEffect } from 'react'

/**
 * Updates the hash in the URL as sections are intersected.
 * Optional: executes callback when the active section changes.
 *
 * @param ids Array of ids of the sections to observe
 * @param onSectionChange Optional callback when the active section changes
 */
export function useScrollHash(ids: string[], onSectionChange?: (sectionId: string) => void) {
  useEffect(() => {
    if (typeof window === 'undefined') return

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.4,
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id
          if (sectionId) {
            // Updates the hash using replaceState only in the browser
            const basePath = window.location.pathname
            const newUrl = sectionId === ids[0] ? basePath : `${basePath}#${sectionId}`
            window.history.replaceState(null, '', newUrl)
            onSectionChange?.(sectionId)
          }
        }
      })
    }, observerOptions)

    // Observe all elements with the ids
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => {
      observer.disconnect()
    }
  }, [ids, onSectionChange])
}
