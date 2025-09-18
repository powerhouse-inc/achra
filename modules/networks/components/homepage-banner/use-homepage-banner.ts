import { useState, useEffect, useRef } from 'react'
import { LOCAL_STORAGE_KEY } from './constants'

interface UseHomepageBannerProps {
  defaultExpanded: boolean
}

export function useHomepageBanner({ defaultExpanded }: UseHomepageBannerProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)
  const collapsibleElement = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const storedValue = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (storedValue !== null) {
      const waitForElementStyles = () => {
        if (collapsibleElement.current) {
          setIsExpanded(storedValue !== '0')
        }
      }
      requestAnimationFrame(waitForElementStyles)
    }
  }, [])

  const handleIsExpanded = (value: boolean) => {
    setIsExpanded(value)
    localStorage.setItem(LOCAL_STORAGE_KEY, value ? '1' : '0')
  }

  return {
    isExpanded,
    collapsibleElement,
    handleIsExpanded,
  }
}
