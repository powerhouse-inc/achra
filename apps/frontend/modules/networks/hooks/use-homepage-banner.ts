import { useRef } from 'react'
import { useLocalStorage } from 'usehooks-ts'
import { HOME_BANNER_EXPANDED_STORAGE_KEY } from '@/modules/networks/lib/constants'
import { useWhitelistOverlay } from '@/modules/whitelist/hooks/use-whitelist-overlay'

export function useHomepageBanner() {
  const [isExpanded, setIsExpanded] = useLocalStorage(HOME_BANNER_EXPANDED_STORAGE_KEY, true, {
    deserializer(value) {
      return value !== 'false'
    },
    initializeWithValue: false,
  })
  const collapsibleElement = useRef<HTMLDivElement>(null)

  const handleIsExpanded = (value: boolean) => {
    setIsExpanded(value)
  }

  const showWhitelistOverlay = useWhitelistOverlay()

  return {
    isExpanded: showWhitelistOverlay ? false : isExpanded,
    collapsibleElement,
    handleIsExpanded,
    showWhitelistOverlay,
  }
}
