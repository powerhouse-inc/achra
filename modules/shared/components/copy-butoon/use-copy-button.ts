import { useState } from 'react'

interface UseCopyButtonProps {
  tooltip: string | null
  copiedTooltip: string | null
}

export function useCopyButton({ tooltip, copiedTooltip }: UseCopyButtonProps) {
  const [currentTooltip, setCurrentTooltip] = useState<string | null>(null)

  const handleMouseEnter = () => {
    setCurrentTooltip(tooltip)
  }
  const handleMouseLeave = () => {
    setCurrentTooltip(null)
  }

  const handleCopyAddress = async (event: React.MouseEvent<HTMLButtonElement>, value: string) => {
    event.stopPropagation()
    try {
      await navigator.clipboard.writeText(value)
      setCurrentTooltip(copiedTooltip)
    } catch {
      setCurrentTooltip('Failed to copy')
    }
  }

  return {
    currentTooltip,
    handleMouseEnter,
    handleMouseLeave,
    handleCopyAddress,
  }
}
