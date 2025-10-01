import { useState } from 'react'
import { useCurrentUrl } from '@/modules/shared/hooks/use-current-url'
import { useScrollToSection } from '@/modules/shared/hooks/use-scroll-to-section'

export function useSectionTitle() {
  const [tooltip, setTooltip] = useState<string | null>(null)
  const { copyUrlToClipboard } = useCurrentUrl()

  useScrollToSection()

  const handleLinkMouseEnter = () => {
    setTooltip('Copy link')
  }
  const handleLinkMouseLeave = () => {
    setTooltip(null)
  }

  const handleCopyUrl = async (hash: string) => {
    const result = await copyUrlToClipboard(hash)
    if (result.success) {
      setTooltip('Copied!')
    } else {
      setTooltip('Failed to copy URL')
    }
  }

  return {
    handleCopyUrl,
    handleLinkMouseEnter,
    handleLinkMouseLeave,
    tooltip,
  }
}
