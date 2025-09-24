import { useEffect, useRef, useState } from 'react'
import { useLocalStorage } from 'usehooks-ts'
import { HOME_BANNER_EXPANDED_STORAGE_KEY } from './constants'

export function useHomepageBanner() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [storedValue, setStoredValue] = useLocalStorage(HOME_BANNER_EXPANDED_STORAGE_KEY, true, {
    deserializer(value) {
      return value !== 'false'
    },
  })
  const collapsibleElement = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsExpanded(storedValue)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleIsExpanded = (value: boolean) => {
    setIsExpanded(value)
    setStoredValue(value)
  }

  return {
    isExpanded,
    collapsibleElement,
    handleIsExpanded,
  }
}
