import { useCurrentUrl } from '@/modules/shared/lib/url-utils'

export function useProposalsSection() {
  const { copyUrlToClipboard } = useCurrentUrl()

  const handleCopyUrl = async () => {
    const result = await copyUrlToClipboard('proposals')
    if (result.success) {
      console.log('URL copied to clipboard:', result.url)
    }
  }

  return {
    handleCopyUrl,
  }
}
