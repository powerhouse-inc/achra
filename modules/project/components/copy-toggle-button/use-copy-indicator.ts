'use client'
import { useEffect, useState } from 'react'

interface UseCopyIndicatorProps {
  resetDelay?: number
}

export function useCopyIndicator({ resetDelay = 1000 }: UseCopyIndicatorProps = {}) {
  const [isCopied, setIsCopied] = useState(false)

  const handleCopyAddress = async (event: React.MouseEvent<HTMLButtonElement>, value: string) => {
    event.stopPropagation()
    try {
      await navigator.clipboard.writeText(value)
      setIsCopied(true)
    } catch {
      setIsCopied(true)
    }
  }

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => {
        setIsCopied(false)
      }, resetDelay)

      return () => {
        clearTimeout(timer)
      }
    }
  }, [isCopied, resetDelay])

  return {
    isCopied,
    handleCopyAddress,
  }
}
