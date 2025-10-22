import { useEffect, useRef, useState } from 'react'
import { useLocalStorage } from 'usehooks-ts'
import { useWhitelistOverlay } from '@/modules/whitelist/hooks/use-whitelist-overlay'
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

  // the banner will be collapsed if the whitelist overlay is visible
  const showWhitelistOverlay = useWhitelistOverlay()

  return {
    isExpanded: showWhitelistOverlay ? false : isExpanded,
    collapsibleElement,
    handleIsExpanded,
  }
}
