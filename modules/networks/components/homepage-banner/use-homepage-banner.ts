import { useState, useEffect, useRef } from 'react'
import { HOME_BANNER_EXPANDED_STORAGE_KEY } from './constants'

interface UseHomepageBannerProps {
  defaultExpanded: boolean
}

export function useHomepageBanner({ defaultExpanded }: UseHomepageBannerProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)
  const collapsibleElement = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const storedValue = localStorage.getItem(HOME_BANNER_EXPANDED_STORAGE_KEY)
    if (storedValue !== null) {
      const waitForElementStyles = () => {
        if (collapsibleElement.current) {
          setIsExpanded(storedValue === 'true')
        }
      }
      requestAnimationFrame(waitForElementStyles)
    }
  }, [])

  const handleIsExpanded = (value: boolean) => {
    setIsExpanded(value)
    localStorage.setItem(HOME_BANNER_EXPANDED_STORAGE_KEY, value ? 'true' : 'false')
  }

  return {
    isExpanded,
    collapsibleElement,
    handleIsExpanded,
  }
}
