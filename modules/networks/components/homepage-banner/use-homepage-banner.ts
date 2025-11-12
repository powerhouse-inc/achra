import { useRef } from 'react'
import { useLocalStorage } from 'usehooks-ts'
import { useWhitelistOverlay } from '@/modules/whitelist/hooks/use-whitelist-overlay'
import { HOME_BANNER_EXPANDED_STORAGE_KEY } from '../../config/constants'

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

  // the banner will be collapsed if the whitelist overlay is visible
  const showWhitelistOverlay = useWhitelistOverlay()

  return {
    isExpanded: showWhitelistOverlay ? false : isExpanded,
    collapsibleElement,
    handleIsExpanded,
    showWhitelistOverlay,
  }
}
