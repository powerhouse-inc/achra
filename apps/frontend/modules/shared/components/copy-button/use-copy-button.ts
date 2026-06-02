import { useCallback, useEffect, useRef, useState } from 'react'
import { useCopyToClipboard } from 'usehooks-ts'

interface UseCopyToClipboardProps {
  resetDelay?: number
}
export function useCopyButton({ resetDelay = 2000 }: UseCopyToClipboardProps = {}) {
  const [, copy] = useCopyToClipboard()
  const [isCopied, setIsCopied] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const previousHoverRef = useRef(false)

  const handleCopy = async (value: string): Promise<void> => {
    try {
      await copy(value)
      setIsCopied(true)
      setError(null)
    } catch (err) {
      setIsCopied(false)
      setError(err instanceof Error ? err : new Error('Failed to copy'))
    }
  }

  const handleSetHovered = useCallback(
    (hovered: boolean) => {
      if (hovered && !previousHoverRef.current && isCopied) {
        setIsCopied(false)
      }
      previousHoverRef.current = hovered
      setIsHovered(hovered)
    },
    [isCopied],
  )

  useEffect(() => {
    if (isCopied && !isHovered) {
      const timer = setTimeout(() => {
        setIsCopied(false)
      }, resetDelay)
      return () => {
        clearTimeout(timer)
      }
    }
  }, [isCopied, isHovered, resetDelay])

  return {
    isCopied,
    error,
    handleCopy,
    setIsHovered: handleSetHovered,
    isHovered,
  }
}
