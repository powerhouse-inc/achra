import { useState } from 'react'
import { useCurrentUrl } from '@/modules/shared/hooks/use-current-url'

export function useSectionTitle() {
  const [tooltip, setTooltip] = useState<string | null>(null)
  const [showTooltip, setShowTooltip] = useState(false)
  const { copyUrlToClipboard } = useCurrentUrl()

  const handleLinkMouseEnter = () => {
    setTooltip('Copy link')
    setShowTooltip(true)
  }
  const handleLinkMouseLeave = () => {
    setShowTooltip(false)
    setTimeout(() => {
      setTooltip(null)
    }, 300)
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
    showTooltip,
  }
}
