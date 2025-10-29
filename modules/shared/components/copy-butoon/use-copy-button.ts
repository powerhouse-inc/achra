import { useEffect, useState } from 'react'

interface UseCopyToClipboardProps {
  resetDelay?: number
}

export function useCopyToClipboard({ resetDelay = 2000 }: UseCopyToClipboardProps = {}) {
  const [isCopied, setIsCopied] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const handleCopy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value)
      setIsCopied(true)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to copy'))
      setIsCopied(false)
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
    error,
    handleCopy,
  }
}
