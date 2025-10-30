import { useEffect, useRef, useState } from 'react'
import { useCopyToClipboard as useCopyToClipboardHook } from 'usehooks-ts'

interface UseCopyToClipboardProps {
  resetDelay?: number
}
export function useCopyToClipboard({ resetDelay = 2000 }: UseCopyToClipboardProps = {}) {
  const [copiedText, copy] = useCopyToClipboardHook()
  const [isHovered, setIsHovered] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const previousHoverRef = useRef(false)

  const handleCopy = async (value: string): Promise<void> => {
    try {
      await copy(value)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to copy'))
    }
  }

  useEffect(() => {
    if (isHovered && !previousHoverRef.current && !!copiedText) {
      void copy('')
    }
    previousHoverRef.current = isHovered
  }, [isHovered, copiedText, copy])

  useEffect(() => {
    if (!!copiedText && !isHovered) {
      const timer = setTimeout(() => {
        void copy('')
      }, resetDelay)
      return () => {
        clearTimeout(timer)
      }
    }
  }, [copiedText, isHovered, copy, resetDelay])

  return {
    isCopied: !!copiedText,
    error,
    handleCopy,
    setIsHovered,
    isHovered,
  }
}
