import { usePathname } from 'next/navigation'
import { useCopyToClipboard } from 'usehooks-ts'

/**
 * Hook to get the current URL with optional hash fragment
 * Uses Next.js usePathname for better reliability
 */
export function useCurrentUrl() {
  const pathname = usePathname()
  const [, copy] = useCopyToClipboard()
  const getUrlWithHash = (hash?: string) => {
    if (typeof window === 'undefined') return ''

    const baseUrl = window.location.origin
    const url = `${baseUrl}${pathname}`
    return hash ? `${url}#${hash}` : url
  }

  const copyUrlToClipboard = async (hash?: string) => {
    try {
      const url = getUrlWithHash(hash)
      await copy(url)
      return { success: true, url }
    } catch (error) {
      return { success: false, error }
    }
  }

  return {
    getUrlWithHash,
    copyUrlToClipboard,
    pathname,
  }
}
